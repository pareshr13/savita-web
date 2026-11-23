export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { absUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
    ['', 1, 'weekly'], ['/technology', 0.9, 'monthly'], ['/products/trading-yantra', 0.9, 'monthly'], ['/products/options-intelligence', 0.9, 'monthly'],
    ['/products/forex-ai', 0.9, 'monthly'], ['/services', 0.8, 'monthly'], ['/integrations', 0.8, 'monthly'], ['/about', 0.6, 'yearly'],
    ['/contact', 0.7, 'yearly'], ['/privacy-policy', 0.2, 'yearly'], ['/terms', 0.2, 'yearly'], ['/disclaimer', 0.2, 'yearly']
  ];
  return routes.map(([p, priority, changeFrequency]) => ({ url: absUrl(p), lastModified: now, changeFrequency, priority }));
}
