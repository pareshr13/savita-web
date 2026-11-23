import { PageHero } from '@/components/ui';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({ title: 'Terms of Service', description: `Terms governing use of the ${site.name} website.`, path: '/terms' });

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/', label: 'Home' }, { label: 'Terms' }]} title="Terms of service" lead="Draft — have this reviewed by a qualified lawyer before launch." />
      <section className="band"><div className="wrap prose">
        <h2>Use of this website</h2>
        <p>This website describes the technology services and software of {site.name}. By using it you agree to these terms. Content may change without notice.</p>
        <h2>No investment advice</h2>
        <p>Nothing on this website is investment advice, a research recommendation or an offer to buy or sell any security, derivative, crypto asset or currency. See our <a href="/disclaimer">risk disclaimer</a>.</p>
        <h2>Product previews</h2>
        <p>Interface previews on this website use illustrative sample data. They do not show live prices, real trades or actual performance.</p>
        <h2>Intellectual property</h2>
        <p>All content, design and code on this website belong to {site.name} unless stated otherwise. Third-party names and trademarks belong to their owners and are used only to indicate API compatibility.</p>
        <h2>Limitation of liability</h2>
        <p>The website is provided &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for losses arising from use of the website or reliance on its content.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India. Courts at {site.city} have jurisdiction.</p>
      </div></section>
    </>
  );
}
