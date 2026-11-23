import {
  About, Architecture, ContactSection, Engagement, Faq, ForexSection, Hero, IntegrationsSection, Marquee, OptionsSection,
  Portfolio, ScreensSection, Services, Signature, TechStack, YantraSection
} from '@/components/Sections';
import { faqLd, JsonLd, serviceLd } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Signature />
      <Services />
      <YantraSection showCatalogue={false} />
      <OptionsSection />
      <ForexSection />
      <ScreensSection />
      <Portfolio />
      <Architecture />
      <IntegrationsSection />
      <TechStack />
      <Engagement />
      <About />
      <Faq />
      <ContactSection />
      <JsonLd data={[serviceLd(), faqLd()]} />
    </>
  );
}
