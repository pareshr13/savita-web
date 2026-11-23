import type { ReactNode } from 'react';

export function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" aria-hidden="true">
      <rect width="38" height="38" rx="10" fill="#0A1020" />
      <path d="M9 25.5l6-6.5 4.5 4 9.5-10" stroke="#7C9BFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29" cy="13" r="2.8" fill="#FFFFFF" />
    </svg>
  );
}

export function Icon({ d, size = 22, stroke = 'currentColor', width = 2 }: { d: string; size?: number; stroke?: string; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function CheckIcon({ color = '#2350FF' }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

export function SectionHead({ eyebrow, title, lead, center, as = 'h2' }: { eyebrow?: string; title: string; lead?: ReactNode; center?: boolean; as?: 'h1' | 'h2' }) {
  const H = as;
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className="h2">{title}</H>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function Window({ title, note = 'Sample data', right, children, style }: { title: string; note?: string; right?: ReactNode; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="win" style={style}>
      <div className="win-bar">
        <span className="dot" style={{ background: '#FF5F57' }} />
        <span className="dot" style={{ background: '#FEBC2E' }} />
        <span className="dot" style={{ background: '#28C840' }} />
        <span className="win-title">{title}</span>
        <span className="spacer" />
        {right}
        {note && <span className="win-note">{note}</span>}
      </div>
      {children}
    </div>
  );
}

export function Badge({ children, bg, color }: { children: ReactNode; bg: string; color: string }) {
  return <span className="badge" style={{ background: bg, color }}>{children}</span>;
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {items.map((it, i) => (
        <span key={it.label} style={{ display: 'inline-flex', gap: 8 }}>
          {it.href ? <a href={it.href}>{it.label}</a> : <span aria-current="page">{it.label}</span>}
          {i < items.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({ crumbs, eyebrow, title, lead, children }: { crumbs: { href?: string; label: string }[]; eyebrow?: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <Crumbs items={crumbs} />
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="h1">{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </header>
  );
}
