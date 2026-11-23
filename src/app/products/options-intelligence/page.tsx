import { CtaBanner, OptionsSection, Signature } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { breadcrumbLd, JsonLd, pageMeta, softwareLd } from '@/lib/seo';

const description = 'TradingYantra AI: intraday NSE option-chain intelligence with 36 OI indicators, gamma exposure, PCR suite, max pain, a calibrated XGBoost/LightGBM/Random Forest ensemble, regime detection and circuit breakers.';

export const metadata = pageMeta({
  title: 'Nifty Option Chain AI — Intraday Options Intelligence Platform',
  description,
  path: '/products/options-intelligence',
  keywords: ['Nifty option chain analysis software', 'OI analysis tool', 'max pain PCR Nifty', 'intraday options AI India']
});

export default function OptionsPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Products' }, { label: 'Options intelligence' }]} eyebrow="Product" title="Intraday option-chain intelligence, built for Nifty." lead="Thirty-six option-chain indicators, dealer gamma maps, a calibrated machine-learning ensemble and an institutional risk engine — in one real-time terminal." />
      <OptionsSection />
      <Signature withFacts={false} />
      <CtaBanner />
      <JsonLd data={[softwareLd({ name: 'TradingYantra AI', description, path: '/products/options-intelligence', category: 'Options analytics and algorithmic trading' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Options intelligence', path: '/products/options-intelligence' }])]} />
    </>
  );
}
