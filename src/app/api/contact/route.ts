import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ---------- Validation ---------- */
const clean = (max: number) => z.string().trim().max(max).optional().default('');

const LeadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  phone: clean(40),
  company: clean(160),
  market: clean(60),
  type: clean(80),
  budget: clean(60),
  message: z.string().trim().min(10, 'Please tell us a little more.').max(5000),
  consent: z.literal(true, { message: 'Consent is required.' }),
  website: clean(200), // honeypot
  elapsedMs: z.coerce.number().optional().default(0),
  page: clean(300),
  referrer: clean(500),
  utm_source: clean(120), utm_medium: clean(120), utm_campaign: clean(160), utm_term: clean(160), utm_content: clean(160)
});

type Lead = z.infer<typeof LeadSchema>;

/* ---------- Simple in-memory rate limit (per server instance) ---------- */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/* ---------- Delivery channels ---------- */
async function saveToFile(record: Record<string, unknown>) {
  const file = process.env.LEADS_FILE || path.join(process.cwd(), 'data', 'leads.jsonl');
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, JSON.stringify(record) + '\n', 'utf8');
}

async function sendEmail(lead: Lead, record: Record<string, unknown>) {
  if (!process.env.SMTP_HOST || !process.env.LEAD_NOTIFY_TO) return false;
  const nodemailer = await import('nodemailer');
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@localhost';
  const rows = Object.entries(record)
    .filter(([, v]) => v !== '' && v !== undefined)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5B6479">${esc(k)}</td><td style="padding:4px 0">${esc(String(v)).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  await transport.sendMail({
    from,
    to: process.env.LEAD_NOTIFY_TO,
    replyTo: lead.email,
    subject: `New enquiry: ${lead.type || 'General'} — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
    text: Object.entries(record).map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: `<h2 style="font-family:sans-serif">New website enquiry</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`
  });
  if (process.env.SEND_AUTOREPLY === 'true') {
    await transport.sendMail({
      from,
      to: lead.email,
      subject: 'We received your enquiry — Savita IT Solutions',
      text: `Hi ${lead.name},\n\nThank you for contacting Savita IT Solutions. Our team has received your enquiry and will reply within one business day.\n\nRegards,\nSavita IT Solutions`
    });
  }
  return true;
}

async function sendWebhook(record: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record), signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

/* ---------- Handler ---------- */
export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message || 'Please check the form and try again.', field: first?.path?.[0] }, { status: 400 });
  }
  const lead = parsed.data;

  // Bots: honeypot filled or submitted unrealistically fast. Pretend success, store nothing.
  if (lead.website || (lead.elapsedMs > 0 && lead.elapsedMs < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const { website: _hp, elapsedMs: _e, consent: _c, ...fields } = lead;
  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ...fields,
    consent: 'yes',
    ip,
    userAgent: (req.headers.get('user-agent') || '').slice(0, 300)
  };

  const results = await Promise.allSettled([saveToFile(record), sendEmail(lead, record), sendWebhook(record)]);
  const [file, email, hook] = results;
  results.forEach((r, i) => { if (r.status === 'rejected') console.error(`[contact] channel ${['file', 'email', 'webhook'][i]} failed:`, r.reason); });

  const delivered = file.status === 'fulfilled' || (email.status === 'fulfilled' && email.value) || (hook.status === 'fulfilled' && hook.value);
  if (!delivered) {
    return NextResponse.json({ error: 'We could not send your message right now. Please email us directly.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: record.id });
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'POST' } });
}
