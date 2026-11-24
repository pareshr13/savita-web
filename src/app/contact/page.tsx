import { ContactSection, Faq } from '@/components/Sections';
import { breadcrumbLd, faqLd, JsonLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact Us — Start Your Trading Software Project',
  description: 'Talk to Trading AI Software about AI trading software, broker integrations, option analytics or a white-label platform. We reply within one business day.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <>
      <ContactSection headingAs="h1" />
      <Faq />
      <JsonLd data={[faqLd(), breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]} />
    </>
  );
}
