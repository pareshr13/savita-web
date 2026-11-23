import type { NextConfig } from 'next';

/**
 * Two build targets:
 *  - Default (Docker / VPS / Vercel): `standalone` server build with the /api/contact route and security headers.
 *  - STATIC_EXPORT=true (GitHub Pages): plain static HTML in ./out. No server, so the contact form posts to a
 *    form service instead (see NEXT_PUBLIC_WEB3FORMS_KEY / NEXT_PUBLIC_FORM_ENDPOINT in .env.example).
 */
const isStatic = process.env.STATIC_EXPORT === 'true';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
];

const nextConfig: NextConfig = isStatic
  ? {
      output: 'export',
      trailingSlash: true,
      images: { unoptimized: true },
      poweredByHeader: false,
      reactStrictMode: true
    }
  : {
      output: 'standalone',
      trailingSlash: true,
      poweredByHeader: false,
      reactStrictMode: true,
      async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
      }
    };

export default nextConfig;
