import { PageHero } from '@/components/ui';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({ title: 'Privacy Policy', description: `How ${site.name} collects, uses and protects personal data submitted through this website.`, path: '/privacy-policy' });

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Privacy policy' }]} title="Privacy policy" lead="Draft — have this reviewed by a qualified lawyer before launch." />
      <section className="band"><div className="wrap prose">
        <p>This policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal data collected through this website, in line with India&apos;s Digital Personal Data Protection Act, 2023 and other applicable law.</p>
        <h2>What we collect</h2>
        <ul>
          <li><strong>Enquiry details you submit:</strong> name, email, phone or WhatsApp number, company, market and project type, budget range and your message.</li>
          <li><strong>Context of the enquiry:</strong> the page you submitted from, the referring page and campaign tags (UTM parameters), so we know how you found us.</li>
          <li><strong>Technical data:</strong> IP address and browser user-agent, used for security and spam prevention.</li>
          <li><strong>Analytics:</strong> if enabled, Google Analytics collects anonymised usage data through cookies.</li>
        </ul>
        <h2>Why we use it</h2>
        <p>To respond to your enquiry, prepare proposals, provide our services, keep the website secure and understand which pages are useful. We process enquiry data on the basis of your consent, which you give when you submit the form.</p>
        <h2>Sharing</h2>
        <p>We do not sell personal data. We share it only with service providers who help us operate (for example email delivery and hosting), under confidentiality obligations, or when required by law.</p>
        <h2>Retention</h2>
        <p>Enquiry data is kept for as long as needed to handle your enquiry and any resulting engagement, and then deleted or anonymised.</p>
        <h2>Your rights</h2>
        <p>You can ask to access, correct or delete your personal data, or withdraw consent, by writing to {site.email}. You may also raise a grievance with us at the same address.</p>
        <h2>Contact</h2>
        <p>{site.name}, {site.city}, {site.country} · {site.email}</p>
      </div></section>
    </>
  );
}
