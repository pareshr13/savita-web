import { CtaBanner, IntegrationsSection } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { integrations } from '@/lib/data';
import { breadcrumbLd, JsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Broker, Exchange & Data Integrations — Zerodha, Fyers, Alpaca, Binance, OANDA',
  description: `Trading API integrations with ${integrations.length} platforms: Zerodha Kite Connect, Fyers, Upstox, Angel One, ICICI Breeze, Dhan, Groww, Alpaca, Interactive Brokers, Binance, Coinbase, OANDA, MetaTrader 5 and more.`,
  path: '/integrations',
  keywords: ['Zerodha Kite Connect integration', 'Fyers API developer', 'Alpaca API integration', 'Binance API developer India']
});

export default function IntegrationsPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Integrations' }]} eyebrow="Integrations" title="Connect your platform to the brokers and exchanges that matter." lead={`Official-API integrations with ${integrations.length} Indian brokers, global brokers, crypto exchanges, forex platforms and data providers.`} />
      <IntegrationsSection />
      <CtaBanner title="Need an integration that isn't listed?" body="If a broker or exchange has an official API, we can integrate it. Tell us which one." />
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Integrations', path: '/integrations' }])} />
    </>
  );
}
