import type { Metadata } from 'next';
import { faqs } from './data';
import { site } from './site';

export function pageMeta({ title, description, path, keywords = [] }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords: [...keywords, ...site.keywords],
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title: `${title} | ${site.name}`, description, siteName: site.name, locale: 'en_IN' },
    twitter: { card: 'summary_large_image', title: `${title} | ${site.name}`, description }
  };
}

/** Renders schema.org JSON-LD safely. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  founder: { '@type': 'Person', name: site.founder },
  address: { '@type': 'PostalAddress', addressLocality: site.city.startsWith('[') ? undefined : site.city, addressCountry: 'IN' },
  ...(site.email.includes('@') ? { email: site.email } : {}),
  sameAs: Object.values(site.social).filter(Boolean),
  knowsAbout: ['Algorithmic trading software', 'Machine learning', 'Option-chain analytics', 'Broker API integration', 'Backtesting', 'Crypto trading platforms', 'Forex trading platforms']
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-IN'
});

export const faqLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` }))
});

export const softwareLd = ({ name, description, path, category }: { name: string; description: string; path: string; category: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url: `${site.url}${path}`,
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: category,
  operatingSystem: 'Web',
  creator: { '@id': `${site.url}/#organization` }
});

export const serviceLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Fintech and algorithmic trading software development',
  provider: { '@id': `${site.url}/#organization` },
  areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
  url: `${site.url}/services`
});
