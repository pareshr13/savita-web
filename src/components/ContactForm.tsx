'use client';

import { useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
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
    const payload = { ...Object.fromEntries(f.entries()), consent: true, elapsedMs: Date.now() - startedAt.current, ...meta };
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('sent');
      window.gtag?.('event', 'generate_lead', { form: 'contact', project_type: String(f.get('type') || '') });
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
          <p className="muted">Your enquiry has reached our team. We usually reply within one business day.</p>
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
