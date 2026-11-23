import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { JsonLd, organizationLd, websiteLd } from '@/lib/seo';
import { ogImage, site } from '@/lib/site';
import './globals.css';

// Self-hosted fonts (SIL Open Font License) — no runtime request to Google, better privacy and speed.
const jakarta = localFont({ src: '../fonts/jakarta-latin-var.woff2', weight: '200 800', variable: '--font-jakarta', display: 'swap' });
const inter = localFont({ src: '../fonts/inter-latin-var.woff2', weight: '100 900', variable: '--font-inter', display: 'swap' });
const mono = localFont({ src: '../fonts/jetbrains-mono-latin-500.woff2', weight: '500', variable: '--font-mono-jb', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI Trading Software for Stocks, Crypto & Forex`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  alternates: { canonical: `${site.url}/` },
  openGraph: { type: 'website', locale: 'en_IN', url: site.url, siteName: site.name, title: `${site.name} — AI Trading Software`, description: site.description, images: [ogImage] },
  twitter: { card: 'summary_large_image', title: `${site.name} — AI Trading Software`, description: site.description, images: [ogImage.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  themeColor: '#0A1020',
  width: 'device-width',
  initialScale: 1
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
