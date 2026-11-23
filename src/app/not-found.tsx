import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="band" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <p className="num" style={{ color: '#2350FF', fontSize: 15 }}>404</p>
        <h1 className="h2">This page moved or never existed.</h1>
        <p className="lead">Try the home page, or tell us what you were looking for.</p>
        <div style={{ display: 'flex', gap: 12 }}><Link href="/" className="btn btn-primary">Go home</Link><Link href="/contact" className="btn btn-light">Contact us</Link></div>
      </div>
    </section>
  );
}
