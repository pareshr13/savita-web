import { CtaBanner, Signature } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { breadcrumbLd, JsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Signature Trading Technology — Gamma Exposure, Calibrated AI & Risk Engines',
  description: 'Sixteen signature capabilities: gamma exposure maps, IV-rank adaptive structuring, calibrated ML ensembles, zero-hallucination AI copilots, regime detection, circuit breakers and evidence-first backtesting.',
  path: '/technology',
  keywords: ['gamma exposure NSE', 'IV rank India VIX', 'calibrated machine learning trading', 'market regime detection']
});

export default function TechnologyPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Technology' }]} eyebrow="Technology" title="The engineering behind institutional-grade trading software." lead="Options intelligence, trustworthy AI, an institutional risk engine and evidence-first research — the four pillars every Savita platform is built on." />
      <Signature />
      <CtaBanner />
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Technology', path: '/technology' }])} />
    </>
  );
}
