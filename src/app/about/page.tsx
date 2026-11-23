import { About, CtaBanner, Portfolio } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { breadcrumbLd, JsonLd, pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About Us — AI-First Fintech Company in India',
  description: `${site.name} is an India-based, AI-first technology company building trading software for stock, crypto and currency markets, led by a solution architect and active trader.`,
  path: '/about'
});

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Company' }]} eyebrow="Company" title="Built by traders. Engineered by architects." lead="Most trading software is written either by developers who have never sat through an expiry day, or by traders who cannot scale code. We bring both." />
      <About />
      <Portfolio />
      <CtaBanner />
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
    </>
  );
}
