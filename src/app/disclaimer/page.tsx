import { PageHero } from '@/components/ui';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({ title: 'Risk Disclaimer', description: `${site.name} is a technology provider, not an investment adviser. Read our risk disclaimer.`, path: '/disclaimer' });

export default function DisclaimerPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Disclaimer' }]} title="Risk disclaimer" lead="Please read this before relying on anything shown on this website." />
      <section className="band"><div className="wrap prose">
        <p>{site.name} is a software and technology company. We are not registered with SEBI as an investment adviser or research analyst, and we do not provide investment advice, stock tips or portfolio management.</p>
        <p>Trading and investing in equities, derivatives, crypto assets and currencies involves substantial risk, including the loss of capital. Past performance, backtests and simulations do not guarantee future results.</p>
        <p>Signals, scores and analytics produced by software we build are tools for analysis. Decisions to trade remain the sole responsibility of the user. Interface previews on this website use sample data only.</p>
        <p>Forex trading by residents of India is regulated under FEMA and permitted only in specified currency pairs on recognised Indian exchanges. Users are responsible for complying with the laws that apply to them.</p>
      </div></section>
    </>
  );
}
