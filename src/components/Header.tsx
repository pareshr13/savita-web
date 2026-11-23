'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './ui';
import { nav, site } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <nav aria-label="Main" className="wrap">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <Logo />
          <span className="brand-name"><b>Savita</b><small>IT Solutions</small></span>
        </Link>
        <div className="nav-links">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}>{n.label}</Link>
          ))}
        </div>
        <div className="nav-cta">
          <Link href="/contact?type=demo" className="btn btn-light btn-sm">Request demo</Link>
          <Link href="/contact" className="btn btn-primary btn-sm">Talk to an expert</Link>
          <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A1020" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" className={`mobile-menu wrap${open ? ' open' : ''}`}>
        {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </div>
    </header>
  );
}
