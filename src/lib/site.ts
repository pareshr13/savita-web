/**
 * Central site configuration.
 * Update these values (or the matching NEXT_PUBLIC_* environment variables) before going live.
 */
export const site = {
  name: 'Savita IT Solutions',
  shortName: 'Savita IT',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.savitaitsolutions.com').replace(/\/$/, ''),
  tagline: 'Institutional-grade AI trading technology, engineered in India.',
  description:
    'Savita IT Solutions builds AI-powered trading terminals, signal engines, option-chain analytics, backtesting platforms and broker integrations for stock, crypto and currency markets.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '[YOUR EMAIL]',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '[YOUR PHONE / WHATSAPP]',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  city: process.env.NEXT_PUBLIC_CITY || '[YOUR CITY]',
  country: 'India',
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
    'fintech software company India'
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
