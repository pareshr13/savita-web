import { Architecture, CtaBanner, Engagement, Faq, Services, TechStack } from '@/components/Sections';
import { PageHero } from '@/components/ui';
import { breadcrumbLd, faqLd, JsonLd, pageMeta, serviceLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Trading Software Development Services — AI, Terminals, Broker APIs',
  description: 'Custom AI signal engines, trading terminals, option analytics, backtesting platforms, risk systems and broker/exchange integrations — custom builds, white-label platforms or a dedicated AI team.',
  path: '/services',
  keywords: ['algo trading software development India', 'trading terminal development', 'white label trading platform']
});

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Services' }]} eyebrow="Services" title="Trading technology, from first model to live production." lead="We design, build and run AI-powered trading software for brokers, fintech startups, trading desks and professional traders." />
      <Services />
      <Architecture />
      <TechStack />
      <Engagement />
      <Faq />
      <CtaBanner />
      <JsonLd data={[serviceLd(), faqLd(), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])]} />
    </>
  );
}
