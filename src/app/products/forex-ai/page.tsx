import { Architecture, CtaBanner, ForexSection } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { breadcrumbLd, JsonLd, pageMeta, softwareLd } from '@/lib/seo';

const description = 'An AI forex and commodities intelligence platform: 18 specialist agents, decision filters, walk-forward backtests, risk-managed paper trading, continuous learning and Telegram/WhatsApp alerts across FX, gold, energy, indices and crypto.';

export const metadata = pageMeta({
  title: 'AI Forex & Commodities Trading Platform — 18-Agent Intelligence',
  description,
  path: '/products/forex-ai',
  keywords: ['AI forex trading platform', 'multi-agent trading system', 'gold XAUUSD AI', 'forex trading software development']
});

export default function ForexPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Products' }, { label: 'Forex AI' }]} eyebrow="Product" title="Forex, commodities and crypto, analysed by eighteen AI agents." lead="Every decision is voted on, filtered for confidence and risk, executed in a risk-managed account and scored against what the market did next." />
      <ForexSection />
      <Architecture />
      <CtaBanner />
      <JsonLd data={[softwareLd({ name: 'AI Forex & Commodities Intelligence Platform', description, path: '/products/forex-ai', category: 'Forex and commodities analytics' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Forex AI', path: '/products/forex-ai' }])]} />
    </>
  );
}
