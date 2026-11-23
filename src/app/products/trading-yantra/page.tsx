import { CtaBanner, ScreensSection, YantraSection } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { breadcrumbLd, JsonLd, pageMeta, softwareLd } from '@/lib/seo';

const description = 'Trading Yantra is an AI research and signal platform for NSE: swing and breakout scanners, live signals with risk gates, honest backtesting, Bhavcopy analytics, a private LLM assistant and a 40-process automation pipeline.';

export const metadata = pageMeta({
  title: 'Trading Yantra — AI Swing & Breakout Research Platform for NSE',
  description,
  path: '/products/trading-yantra',
  keywords: ['NSE swing trading scanner', 'breakout scanner India', 'NSE bhavcopy analysis', 'stock backtesting India']
});

export default function TradingYantraPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Products' }, { label: 'Trading Yantra' }]} eyebrow="Product" title="Trading Yantra: AI research for NSE traders who want evidence." lead="Twenty-four modules that scan the NSE cash market every night, price setups against live quotes and measure every rule against history with Indian costs." />
      <YantraSection />
      <ScreensSection />
      <CtaBanner title="Want Trading Yantra for your clients?" body="Launch it under your brand with our white-label model, or let us build a custom version around your strategies." />
      <JsonLd data={[softwareLd({ name: 'Trading Yantra', description, path: '/products/trading-yantra', category: 'Stock market research and screening' }), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Trading Yantra', path: '/products/trading-yantra' }])]} />
    </>
  );
}
