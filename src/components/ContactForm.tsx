'use client';

import { useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

// Where enquiries go:
//  1. NEXT_PUBLIC_WEB3FORMS_KEY set → Web3Forms (free; emails each lead to you). Best for GitHub Pages.
//  2. NEXT_PUBLIC_FORM_ENDPOINT set → POST JSON to any endpoint (Formspree, Google Apps Script, n8n, CRM...).
//  3. Static build with neither → opens the visitor's email app with the enquiry pre-filled.
//  4. Otherwise (server build) → this site's own /api/contact route.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_SITE === 'true';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@tradingaisoftware.com';

async function deliver(payload: Record<string, unknown>): Promise<'sent' | 'mailto'> {
  if (WEB3FORMS_KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New website enquiry: ${payload.type || 'General'} — ${payload.name}`,
        from_name: 'tradingaisoftware.com',
        replyto: payload.email,
        botcheck: '',
        ...payload
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) throw new Error(data.message || 'Something went wrong. Please try again.');
    return 'sent';
  }
  if (FORM_ENDPOINT || !IS_STATIC) {
    const res = await fetch(FORM_ENDPOINT || '/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
    return 'sent';
  }
  const lines = ['name', 'email', 'phone', 'company', 'market', 'type', 'budget', 'message'].map((k) => `${k[0].toUpperCase() + k.slice(1)}: ${payload[k] ?? ''}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Website enquiry: ${payload.type || 'General'}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  return 'mailto';
}

const PROJECT_TYPES = ['AI signal engine', 'Trading portal / terminal', 'Broker integration / algo trading', 'Option-chain analytics', 'Backtesting platform', 'White-label platform', 'Product demo', 'Other'];

export default function ContactForm({ defaultType }: { defaultType?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState('');
  const [name, setName] = useState('');
  const startedAt = useRef<number>(0);
  const [meta, setMeta] = useState<Record<string, string>>({});
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [viaMail, setViaMail] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
    const p = new URLSearchParams(window.location.search);
    const m: Record<string, string> = { page: window.location.pathname, referrer: document.referrer || '' };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => { const v = p.get(k); if (v) m[k] = v; });
    setMeta(m);
    const t = p.get('type') || defaultType;
    if (t === 'demo') setType('Product demo');
  }, [defaultType]);

  function validate(f: FormData): Errors {
    const e: Errors = {};
    if (String(f.get('name') || '').trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(f.get('email') || '').trim())) e.email = 'Please enter a valid email address.';
    if (String(f.get('message') || '').trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).';
    if (!f.get('consent')) e.consent = 'Please agree so we can contact you.';
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setServerError('');
    const form = ev.currentTarget;
    const f = new FormData(form);
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus('sending');
    const payload: Record<string, unknown> = { ...Object.fromEntries(f.entries()), consent: true, elapsedMs: Date.now() - startedAt.current, ...meta };
    try {
      // Bots: hidden honeypot filled, or submitted unrealistically fast. Pretend success, send nothing.
      if (payload.website || (Number(payload.elapsedMs) > 0 && Number(payload.elapsedMs) < 2500)) { setStatus('sent'); return; }
      const { website: _hp, elapsedMs: _e, ...clean } = payload;
      const how = await deliver(clean);
      setViaMail(how === 'mailto');
      setStatus('sent');
      window.gtag?.('event', 'generate_lead', { form: 'contact', project_type: String(f.get('type') || ''), method: how });
      form.reset();
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-card" role="status" aria-live="polite">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 0' }}>
          <div className="hd" style={{ fontSize: 26, fontWeight: 800 }}>Thank you{name ? `, ${name.split(' ')[0]}` : ''}.</div>
          <p className="muted">{viaMail ? `Your email app should now open with your enquiry ready to send to ${CONTACT_EMAIL}. If it didn't, please email us directly.` : 'Your enquiry has reached our team. We usually reply within one business day.'}</p>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => { setStatus('idle'); setName(''); }}>Send another enquiry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <form className="form" onSubmit={onSubmit} noValidate>
        <h2 className="hd" style={{ fontSize: 21, fontWeight: 700 }}>Request a consultation</h2>
        {status === 'error' && <div className="alert alert-err" role="alert">{serverError}</div>}

        {/* Honeypot — hidden from people, filled by bots */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="f-name">Full name *</label>
            <input id="f-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span id="e-name" className="err">{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="f-email">Work email *</label>
            <input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
            {errors.email && <span id="e-email" className="err">{errors.email}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="field"><label htmlFor="f-phone">Phone / WhatsApp</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" /></div>
          <div className="field"><label htmlFor="f-company">Company</label><input id="f-company" name="company" autoComplete="organization" /></div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="f-market">Market</label>
            <select id="f-market" name="market" defaultValue="Stock market"><option>Stock market</option><option>Crypto</option><option>Currency / forex</option><option>Multiple markets</option></select>
          </div>
          <div className="field">
            <label htmlFor="f-type">Project type</label>
            <select id="f-type" name="type" value={type} onChange={(e) => setType(e.target.value)}>{PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-budget">Estimated budget</label>
          <select id="f-budget" name="budget" defaultValue="Not sure yet"><option>Not sure yet</option><option>Under ₹5 lakh</option><option>₹5–15 lakh</option><option>₹15–50 lakh</option><option>Above ₹50 lakh</option></select>
        </div>
        <div className="field">
          <label htmlFor="f-msg">Tell us about your project *</label>
          <textarea id="f-msg" name="message" rows={4} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-msg' : undefined} />
          {errors.message && <span id="e-msg" className="err">{errors.message}</span>}
        </div>
        <label className="check">
          <input type="checkbox" name="consent" value="yes" aria-invalid={!!errors.consent} />
          <span>I agree to be contacted about my enquiry and accept the <a href="/privacy-policy">privacy policy</a>.</span>
        </label>
        {errors.consent && <span className="err" style={{ fontSize: 13, color: '#C62A2F' }}>{errors.consent}</span>}
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
        <p style={{ fontSize: 13, color: '#6B7489' }}>We usually reply within one business day. Your details are never sold or shared.</p>
      </form>
    </div>
  );
}
