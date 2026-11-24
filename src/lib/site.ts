/**
 * Central site configuration.
 * Update these values (or the matching NEXT_PUBLIC_* environment variables) before going live.
 */
export const site = {
  name: 'Trading AI Software',
  shortName: 'TAS',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://tradingaisoftware.com').replace(/\/$/, ''),
  tagline: 'Institutional-grade AI trading technology, engineered in India.',
  description:
    'Trading AI Software is a custom software development company building AI-powered trading terminals, signal engines, option-chain analytics, backtesting platforms and broker integrations for stock, crypto and currency markets.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@tradingaisoftware.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 84607 71378',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '918460771378',
  city: process.env.NEXT_PUBLIC_CITY || 'Gandhinagar',
  country: 'India',
  address: 'C-404, Pancham Kimberly, New Chandkheda, Gandhinagar – 382421, Gujarat, India',
  postalCode: '382421',
  region: 'Gujarat',
  founder: 'Paresh',
  foundedYear: 2026,
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || '',
    x: process.env.NEXT_PUBLIC_X || '',
    github: process.env.NEXT_PUBLIC_GITHUB || ''
  },
  keywords: [
    'AI trading software company India',
    'algo trading software development',
    'NSE option chain analytics',
    'Nifty options AI',
    'trading terminal development',
    'broker API integration India',
    'Zerodha Kite Connect developer',
    'Fyers API integration',
    'crypto trading platform development',
    'forex trading platform development',
    'backtesting platform',
    'fintech software company India',
    'custom software development company India',
    'software development company Gandhinagar',
    'Trading AI Software'
  ]
};

export const nav = [
  { href: '/technology', label: 'Technology' },
  { href: '/products/trading-yantra', label: 'Trading Yantra' },
  { href: '/products/options-intelligence', label: 'Options AI' },
  { href: '/products/forex-ai', label: 'Forex AI' },
  { href: '/services', label: 'Services' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/about', label: 'Company' }
];

/** Absolute canonical URL for a path, with the trailing slash the site uses. */
export const absUrl = (path = '') => `${site.url}${path ? path.replace(/\/?$/, '/') : '/'}`;

export const ogImage = { url: '/og-image.png', width: 1200, height: 630, alt: `${site.name} — AI trading software for stocks, crypto and forex` };
