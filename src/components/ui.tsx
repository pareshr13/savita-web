import type { ReactNode } from 'react';

/** Trading AI Software "TAS" mark — same artwork as the business card (lettering converted to paths). */
export function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#0A1020" />
      <path d="M10.06 21.5V13.26H7.51V11.44H14.66V13.26H12.15V21.5ZM14.56 21.5 17.96 11.44H20.74L24.15 21.5H21.86L21.19 19.44H17.50L16.83 21.5ZM18.08 17.62H20.61L19.07 12.87H19.64ZM28.44 21.66Q27.50 21.66 26.67 21.31Q25.84 20.97 25.24 20.33Q24.64 19.70 24.34 18.84L26.05 18.07Q26.43 18.89 27.10 19.36Q27.77 19.83 28.58 19.83Q29.01 19.83 29.32 19.70Q29.63 19.56 29.81 19.33Q29.98 19.09 29.98 18.77Q29.98 18.42 29.77 18.17Q29.55 17.92 29.09 17.77L27.12 17.12Q25.92 16.73 25.31 16.01Q24.70 15.29 24.70 14.27Q24.70 13.38 25.14 12.71Q25.58 12.03 26.37 11.65Q27.16 11.28 28.19 11.28Q29.09 11.28 29.86 11.59Q30.63 11.90 31.19 12.46Q31.75 13.03 32.04 13.83L30.33 14.60Q30.05 13.89 29.48 13.50Q28.92 13.10 28.19 13.10Q27.77 13.10 27.45 13.23Q27.12 13.37 26.95 13.62Q26.77 13.87 26.77 14.19Q26.77 14.54 27.00 14.81Q27.23 15.07 27.69 15.22L29.62 15.84Q30.83 16.23 31.43 16.93Q32.04 17.63 32.04 18.65Q32.04 19.52 31.58 20.21Q31.12 20.89 30.31 21.27Q29.51 21.66 28.44 21.66Z" fill="#FFFFFF" />
      <path d="M8 32 L15 28.5 L21 30.5 L30 25" stroke="#7C9BFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30.5" cy="24.8" r="2.3" fill="#2350FF" stroke="#FFFFFF" strokeWidth="1" />
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
