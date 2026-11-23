import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid g4 footer-cols">
          <div className="footer-col">
            <span className="hd" style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>{site.name}</span>
            <span>AI-first technology for stock, crypto and currency markets.</span>
            <span>{site.address}</span>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="footer-col">
            <b>Products</b>
            <Link href="/products/trading-yantra">Trading Yantra</Link>
            <Link href="/products/options-intelligence">Options intelligence</Link>
            <Link href="/products/forex-ai">Forex AI platform</Link>
            <Link href="/technology">Signature technology</Link>
          </div>
          <div className="footer-col">
            <b>Company</b>
            <Link href="/services">Services</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <b>Legal</b>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
            <Link href="/disclaimer">Risk disclaimer</Link>
            {site.social.linkedin && <a href={site.social.linkedin} rel="noopener">LinkedIn</a>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span style={{ maxWidth: '52em' }}>
            {site.name} is a technology provider and does not offer investment advice. Trading in securities, derivatives, crypto assets and currencies involves risk. Interface previews use sample data.
          </span>
        </div>
      </div>
    </footer>
  );
}
