import Link from 'next/link';
import { linePath, walk } from '@/lib/charts';
import {
  agentGroups, business, cases, decisionFilters, faqs, facts, flow, forexFeatures, instruments, integrations, marquee,
  optionsModules, pillars, plans, principles, researchTools, services, stack
} from '@/lib/data';
import { site } from '@/lib/site';
import ContactForm from './ContactForm';
import Gallery from './Gallery';
import IntegrationGrid from './IntegrationGrid';
import Terminal from './Terminal';
import { CheckIcon, Icon, SectionHead, Window } from './ui';
import { ModuleCatalogue, YantraScreens } from './Yantra';
import { OptionChainScreen } from './Screens';

/* ---------------- Hero ---------------- */
export function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-copy">
        <Link href="/products/trading-yantra" className="announce"><span>New</span>Introducing Trading Yantra, our AI research platform for NSE</Link>
        <h1 className="h1">{site.tagline}</h1>
        <p className="lead">Trading AI Software builds AI-powered trading terminals, signal engines, analytics portals and broker integrations for stock, crypto and currency markets — designed by traders, engineered by solution architects.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" className="btn btn-primary">Start your project</Link>
          <Link href="#screens" className="btn btn-light">Explore product screens</Link>
        </div>
        <div className="hero-meta">
          <span>NSE · BSE · MCX</span><span>Crypto spot &amp; perpetuals</span><span>INR &amp; global FX pairs</span><span>{integrations.length} broker, exchange &amp; data integrations</span>
        </div>
      </div>
      <div className="wrap hero-shot">
        <Terminal />
        <p className="preview-note">Product interface preview with sample data. Figures shown are illustrative, not live prices or recommendations.</p>
      </div>
    </header>
  );
}

export function Marquee() {
  return (
    <section aria-label="Integrations" style={{ padding: '56px 0 40px', overflow: 'hidden' }}>
      <p className="center" style={{ margin: '0 16px 22px', color: '#5B6479', fontSize: 14.5 }}>Connects with India&apos;s leading brokers, global crypto exchanges and currency platforms</p>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">{[...marquee, ...marquee].map((b, i) => <span key={b + i}>{b}</span>)}</div>
      </div>
      <p className="sr-only">Integrations include {marquee.join(', ')}.</p>
    </section>
  );
}

/* ---------------- Facts + signature technology ---------------- */
export function FactsBand() {
  return (
    <div className="facts">
      <div className="split-head" style={{ marginBottom: 28 }}>
        <h2 className="hd" style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1, maxWidth: '18em' }}>Three production platforms. Built, measured and running.</h2>
        <span style={{ fontSize: 13.5, color: '#A9B4CE' }}>Facts from our own codebases, not marketing estimates</span>
      </div>
      <div className="grid g6">
        {facts.map((f) => (
          <div key={f.k} className="fact"><b className="num">{f.v === 'INTEGRATIONS' ? integrations.length : f.v}</b><span>{f.k}</span></div>
        ))}
      </div>
    </div>
  );
}

export function Signature({ withFacts = true, headingAs = 'h2' }: { withFacts?: boolean; headingAs?: 'h1' | 'h2' }) {
  return (
    <section id="innovation" className="band" style={{ paddingTop: withFacts ? 24 : undefined }}>
      <div className="wrap">
        {withFacts && <FactsBand />}
        <div style={{ marginTop: withFacts ? 88 : 0 }}>
          <SectionHead as={headingAs} eyebrow="Signature technology" title="Concepts most trading software doesn't have." lead="Sixteen capabilities engineered into our platforms — from dealer gamma maps to AI agents that are not allowed to touch your risk settings." />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {pillars.map((p, i) => (
            <div key={p.title}>
              <div className="pillar-head">
                <span className="pillar-num" style={{ background: p.color }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3" style={{ fontSize: 24 }}>{p.title}</h3>
                <span style={{ color: '#5B6479', fontSize: 15 }}>{p.sub}</span>
              </div>
              <div className="grid g4">
                {p.cards.map((c) => (
                  <article key={c.t} className="sig-card" style={{ borderTopColor: p.color }}>
                    <div className="icon-box" style={{ background: p.tint, color: p.color }}><Icon d={c.icon} /></div>
                    <h4>{c.t}</h4>
                    <p>{c.d}</p>
                    <div className="why" style={{ color: p.color }}>{c.w}</div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, border: '1px solid #E3E8F2', borderRadius: 20, padding: 'clamp(22px,3vw,32px)', background: '#F6F8FC' }}>
          <h3 className="hd" style={{ fontSize: 20, fontWeight: 800, marginBottom: 18 }}>Built for business, not just for charts</h3>
          <div className="grid g3" style={{ gap: 18 }}>
            {business.map((b) => (
              <div key={b.t} style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                <CheckIcon />
                <div><div style={{ fontWeight: 600 }}>{b.t}</div><div style={{ fontSize: 14, color: '#4A5368' }}>{b.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
export function Services({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  return (
    <section id="platform" className="band bg-soft">
      <div className="wrap">
        <SectionHead as={headingAs} eyebrow="What we build" title="A complete AI technology partner for trading businesses." lead="From research and model development to the terminal your traders use every day — one team, one architecture, full ownership of your code." />
        <div className="grid g3">
          {services.map((s) => (
            <article key={s.title} className="card">
              <div className="icon-box icon-dark"><Icon d={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="tags">{s.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Product screens ---------------- */
export function ScreensSection() {
  return (
    <section id="screens" className="band bg-dark">
      <div className="wrap">
        <div className="split-head">
          <div style={{ maxWidth: 720 }}>
            <p className="eyebrow">Product screens</p>
            <h2 className="h2">Analytics your traders will actually open every morning.</h2>
          </div>
          <p style={{ color: '#A9B4CE' }}>Six modules from our platforms: option-chain analytics, strategy building, backtesting, AI stock analysis, a crypto desk and a currency-strength monitor.</p>
        </div>
        <Gallery />
      </div>
    </section>
  );
}

/* ---------------- Trading Yantra ---------------- */
export function YantraSection({ showCatalogue = true, headingAs = 'h2' }: { showCatalogue?: boolean; headingAs?: 'h1' | 'h2' }) {
  const H = headingAs;
  return (
    <section id="yantra" className="band">
      <div className="wrap">
        <div className="grid g2 align-end" style={{ marginBottom: 44, gap: 32 }}>
          <div>
            <p className="eyebrow">Flagship product · Trading Yantra</p>
            <H className="h2">An AI research and signal platform for NSE that shows its evidence.</H>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="lead" style={{ fontSize: 17 }}>Trading Yantra scans the NSE cash market every night, prices setups against live quotes, runs them through hard risk gates and measures every rule against history — with Indian costs, out-of-sample periods and clustered statistics. Traders see what a signal has actually been worth, not just that it fired.</p>
            <div className="grid g3" style={{ gap: 12 }}>
              {[['24', 'product modules'], ['40', 'automated processes'], ['0.593%', 'Indian cost model']].map(([v, k]) => (
                <div key={k} style={{ borderLeft: '2px solid #2350FF', paddingLeft: 12 }}><div className="hd num" style={{ fontSize: 26, fontWeight: 800 }}>{v}</div><div style={{ fontSize: 13.5, color: '#5B6479' }}>{k}</div></div>
              ))}
            </div>
          </div>
        </div>
        <YantraScreens />
        {showCatalogue && (
          <>
            <h3 className="h3" style={{ margin: '64px 0 8px' }}>Everything inside Trading Yantra</h3>
            <p className="muted" style={{ margin: '0 0 22px', maxWidth: '46em' }}>Twenty-four modules across signal discovery, live trading, AI research and data automation.</p>
            <ModuleCatalogue />
          </>
        )}
        <div style={{ marginTop: 28, padding: '20px 22px', borderRadius: 14, background: '#F6F8FC', border: '1px solid #E3E8F2', display: 'flex', gap: 14, alignItems: 'start' }}>
          <Icon d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16h.01" stroke="#2350FF" />
          <p style={{ color: '#2A3247', fontSize: 15 }}><strong>Evidence first, by design.</strong> Trading Yantra labels which rules are unproven, which have failed, and why a row was blocked. That honesty is what lets professional traders trust the rest of the platform.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Options intelligence ---------------- */
export function OptionsSection({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const H = headingAs;
  return (
    <section id="options" className="band bg-soft">
      <div className="wrap">
        <div className="grid g2 align-end" style={{ marginBottom: 40, gap: 32 }}>
          <div>
            <p className="eyebrow">TradingYantra AI · Intraday options</p>
            <H className="h2">Institutional option-chain intelligence for Nifty, in real time.</H>
          </div>
          <p className="lead" style={{ fontSize: 17 }}>A multi-agent intraday platform for NSE option chain and equity markets. Deterministic quant rules and a calibrated three-model ensemble classify every moment as bullish, bearish or choppy — and a regime detector and circuit breaker decide whether trading is allowed at all.</p>
        </div>
        <Window title="Nifty OI Pro · option chain analytics"><OptionChainScreen /></Window>
        <div className="grid g3" style={{ marginTop: 28 }}>
          {optionsModules.map((m) => (
            <article key={m.t} className="card" style={{ padding: 22, gap: 8 }}><h3 style={{ fontSize: 17.5 }}>{m.t}</h3><p style={{ fontSize: 14.5 }}>{m.d}</p></article>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <h3 className="h3" style={{ marginBottom: 6 }}>A five-tool AI research agent</h3>
          <p className="muted" style={{ marginBottom: 20, maxWidth: '46em' }}>Ask in plain language. A local ReAct agent orchestrates five research tools and returns a reasoned answer with trade levels — without cloud costs or data leaving your servers.</p>
          <div className="grid g4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {researchTools.map((r, i) => (
              <div key={r.t} style={{ borderTop: '2px solid #2350FF', paddingTop: 14 }}>
                <div className="num" style={{ color: '#2350FF', fontSize: 13 }}>Tool {i + 1}</div>
                <div className="hd" style={{ fontWeight: 700, fontSize: 17, margin: '4px 0' }}>{r.t}</div>
                <div className="muted" style={{ fontSize: 14.5 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Forex AI ---------------- */
export function ForexSection({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const H = headingAs;
  return (
    <section id="forex" className="band bg-dark" style={{ backgroundImage: 'radial-gradient(900px 420px at 10% 0%, rgba(107,63,212,.30), rgba(107,63,212,0) 70%)' }}>
      <div className="wrap">
        <div className="grid g2 align-end" style={{ marginBottom: 44, gap: 32 }}>
          <div>
            <p className="eyebrow" style={{ color: '#C9B6FF' }}>AI Forex &amp; Commodities Intelligence Platform</p>
            <H className="h2">Eighteen specialist AI agents, one qualified trade decision.</H>
          </div>
          <p className="lead" style={{ fontSize: 17 }}>An orchestrated pipeline of 18 agents reads live FX, metals, energy, index and crypto data every 60 seconds, votes on direction, filters every decision for confidence and risk, executes it in a risk-managed paper account and learns from each realised outcome.</p>
        </div>
        <div className="grid g2" style={{ gap: 24, alignItems: 'stretch' }}>
          <div className="win" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}><span className="hd" style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Agent pipeline</span><span className="lbl">Runs in dependency order · every 60 s per instrument</span></div>
            {agentGroups.map((g) => (
              <div key={g.t}>
                <div style={{ fontSize: 12, fontWeight: 600, color: g.color }}>{g.t} · {g.items.length}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {g.items.map((a) => <span key={a} style={{ fontSize: 12.5, borderRadius: 8, padding: '6px 10px', background: g.tint, color: '#E7ECF7', border: '1px solid rgba(255,255,255,.06)' }}>{a}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="win" style={{ padding: 18 }}>
              <div className="hd" style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Decision filters</div>
              <div className="kv">
                {decisionFilters.map((f) => (
                  <div key={f.k} className="pane"><div className="lbl">{f.k}</div><div className="num kv-big">{f.v}</div><div style={{ fontSize: 12, color: '#8592AE', marginTop: 2 }}>{f.d}</div></div>
                ))}
              </div>
              <p style={{ marginTop: 12, fontSize: 13, color: '#A9B4CE' }}>Blocked decisions are stored with the exact filter that refused them, so thresholds are calibrated against what they rejected — not just what passed.</p>
            </div>
            <div className="win" style={{ padding: 18 }}>
              <div className="hd" style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Instruments</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {instruments.map((i) => <span key={i.n} className="num" style={{ fontSize: 12.5, borderRadius: 8, padding: '5px 9px', ...(i.active ? { background: '#2350FF', color: '#fff' } : { background: '#141E35', color: '#A9B4CE', border: '1px solid #1E2A45' }) }}>{i.n}</span>)}
              </div>
              <p style={{ marginTop: 10, fontSize: 13, color: '#A9B4CE' }}>M15 · H1 · H4 · D1 timeframes on TradingView lightweight charts, with live data from Twelve Data.</p>
            </div>
          </div>
        </div>
        <div className="grid g4" style={{ marginTop: 24, gap: 14 }}>
          {forexFeatures.map((f) => <div key={f.t} className="dcard"><b>{f.t}</b><span>{f.d}</span></div>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */
export function Portfolio() {
  return (
    <section id="work" className="band">
      <div className="wrap">
        <SectionHead eyebrow="Portfolio" title="Platforms we have built." lead="Three production platforms we designed, engineered and run — for NSE options, NSE swing trading, and global forex, commodities and crypto." />
        <div className="grid g3">
          {cases.map((c) => {
            const pts = walk(c.seed, 40, 0.004, 0.03);
            const line = linePath(pts, 300, 120);
            return (
              <article key={c.slug} className="case">
                <div style={{ background: c.grad, paddingTop: 28 }}>
                  <svg className="chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none" style={{ height: 120 }} aria-hidden="true">
                    <path d={`${line}L300 120L0 120Z`} fill="rgba(255,255,255,.12)" />
                    <path d={line} stroke="#fff" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
                <div className="case-body">
                  <span className="pill" style={{ background: c.tint, color: c.color }}>{c.tag}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <ul>{c.pts.map((p) => <li key={p}>{p}</li>)}</ul>
                  <Link className="case-link" href={`/products/${c.slug}`} style={{ color: c.color }}>Explore the platform →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Architecture ---------------- */
export function Architecture() {
  return (
    <section className="band bg-soft">
      <div className="wrap">
        <SectionHead eyebrow="Architecture" title="Risk is engineered in, not bolted on." lead="Every platform follows the same proven pipeline — from raw ticks to monitored execution — with a dedicated risk layer that can stop trading before losses compound." />
        <ol className="flow" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {flow.map((f) => <li key={f.t} className={`flow-step${f.risk ? ' risk' : ''}`}><div className="flow-dot" /><b>{f.t}</b><span>{f.d}</span></li>)}
        </ol>
        <div className="grid g4" style={{ marginTop: 40 }}>
          {principles.map((p) => <div key={p.t} className="principle"><b>{p.t}</b><span>{p.d}</span></div>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Integrations ---------------- */
export function IntegrationsSection({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const H = headingAs;
  return (
    <section id="integrations" className="band">
      <div className="wrap">
        <div className="split-head" style={{ marginBottom: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <p className="eyebrow">Integrations</p>
            <H className="h2">Plug into the brokers and exchanges your users already trust.</H>
          </div>
          <p className="muted">Order placement, live market data, positions and portfolio sync through each platform&apos;s official API.</p>
        </div>
        <IntegrationGrid />
      </div>
    </section>
  );
}

export function TechStack() {
  return (
    <section className="band" style={{ paddingTop: 0 }}>
      <div className="wrap" style={{ background: '#0A1020', color: '#fff', borderRadius: 24, padding: 'clamp(28px,4vw,56px)' }}>
        <div className="grid g2 align-center">
          <div>
            <h2 className="h2" style={{ fontSize: 'clamp(28px,3.4vw,40px)', marginBottom: 14 }}>A modern, open technology stack.</h2>
            <p style={{ color: '#A9B4CE', fontSize: 17 }}>Proven tools chosen for low latency, reliability and transparency. No black boxes — you own and understand every component.</p>
          </div>
          <div className="grid g2" style={{ gap: 24 }}>
            {stack.map((g) => (
              <div key={g.t}>
                <div style={{ fontWeight: 600, color: '#9DB4FF', marginBottom: 8, fontSize: 14 }}>{g.t}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{g.items.map((i) => <span key={i} style={{ fontSize: 13.5, background: '#151E35', border: '1px solid #243052', borderRadius: 8, padding: '4px 10px' }}>{i}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Engagement ---------------- */
export function Engagement() {
  return (
    <section id="engage" className="band bg-soft">
      <div className="wrap">
        <SectionHead center eyebrow="Engagement models" title="Work with us the way that fits." lead="Fixed-scope builds, ready platforms under your brand, or a dedicated team that grows with you." />
        <div className="grid g3">
          {plans.map((p) => (
            <article key={p.t} className={`plan${p.featured ? ' featured' : ''}`}>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
              <div className="hd" style={{ fontSize: 17, fontWeight: 700 }}>Pricing on request</div>
              <ul>{p.pts.map((x) => <li key={x}>{x}</li>)}</ul>
              <Link href="/contact" className={`btn ${p.featured ? 'btn-primary' : 'btn-light'}`}>Discuss this model</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <section id="about" className="band">
      <div className="wrap grid g2 align-center">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p className="eyebrow" style={{ margin: 0 }}>Company</p>
          <h2 className="h2">Market expertise and enterprise architecture, in one team.</h2>
          <p style={{ fontSize: 17, color: '#2A3247' }}>{site.name} is an India-based, AI-first technology company focused on capital markets. We help brokers, trading desks, fintech startups and professional traders turn market insight into intelligent, dependable software.</p>
          <p style={{ fontSize: 17, color: '#2A3247' }}>We know what an expiry day feels like, and we know how to build systems that hold up on one.</p>
        </div>
        <div style={{ border: '1px solid #E3E8F2', borderRadius: 22, padding: 32, display: 'flex', flexDirection: 'column', gap: 20, background: 'linear-gradient(180deg,#F6F8FC,#fff)' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div aria-hidden="true" className="hd" style={{ width: 68, height: 68, borderRadius: 18, background: '#0A1020', color: '#9DB4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800 }}>P</div>
            <div><div className="hd" style={{ fontSize: 21, fontWeight: 700 }}>{site.founder}</div><div style={{ color: '#5B6479', fontSize: 15 }}>Founder &amp; Chief Solution Architect</div></div>
          </div>
          <p style={{ color: '#2A3247' }}>Former Director and Solution Architect at a technology product company, with around five years of active stock-market trading and a strong technical-analysis background.</p>
          <div className="chips">{['Solution architecture', 'AI / ML systems', 'Technical analysis', 'F&O strategies'].map((t) => <span key={t} className="chip" style={{ minHeight: 34, cursor: 'default' }}>{t}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  return (
    <section className="band bg-soft">
      <div className="wrap grid g2" style={{ alignItems: 'start' }}>
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2" style={{ marginBottom: 14 }}>Questions clients ask us.</h2>
          <p className="muted">Can&apos;t find your answer? <Link href="/contact">Talk to our team</Link>.</p>
        </div>
        <div className="faq">
          {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function ContactSection({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const H = headingAs;
  return (
    <section id="contact" className="band bg-dark" style={{ backgroundImage: 'radial-gradient(900px 400px at 85% 0%, rgba(35,80,255,.28), rgba(35,80,255,0) 70%)' }}>
      <div className="wrap grid g2" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <H className="h2" style={{ fontSize: 'clamp(32px,4.2vw,48px)' }}>Let&apos;s build your trading platform.</H>
          <p style={{ color: '#A9B4CE', fontSize: 18 }}>Share your idea, strategy or product plan. We will come back with an architecture, a timeline and a clear estimate.</p>
          <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
            <div className="contact-line"><Icon d="M4 6h16v12H4zM4 7l8 6 8-6" stroke="#9DB4FF" />{site.email.includes('@') ? <a href={`mailto:${site.email}`} style={{ color: '#fff' }}>{site.email}</a> : <span>{site.email}</span>}</div>
            <div className="contact-line"><Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" stroke="#9DB4FF" /><span>{site.phone}</span></div>
            {site.whatsapp && <div className="contact-line"><Icon d="M4 20l1.4-4A8 8 0 1 1 8 18.6z" stroke="#9DB4FF" /><a href={`https://wa.me/${site.whatsapp}`} style={{ color: '#fff' }} rel="noopener">Chat on WhatsApp</a></div>}
            <div className="contact-line"><Icon d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="#9DB4FF" /><span>{site.address}</span></div>
          </address>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function CtaBanner({ title = 'Ready to build smarter trading technology?', body = 'Tell us what you are building. We will reply with an approach, a timeline and a clear estimate.' }: { title?: string; body?: string }) {
  return (
    <section className="band" style={{ paddingTop: 0 }}>
      <div className="wrap cta">
        <div style={{ maxWidth: 640 }}>
          <h2 className="h2" style={{ fontSize: 'clamp(26px,3.2vw,38px)', marginBottom: 10 }}>{title}</h2>
          <p style={{ color: '#A9B4CE', fontSize: 17 }}>{body}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-primary">Start your project</Link>
          <Link href="/contact?type=demo" className="btn btn-ghost">Request a demo</Link>
        </div>
      </div>
    </section>
  );
}
