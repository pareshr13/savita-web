import { ImageResponse } from 'next/og';
import { integrations } from '@/lib/data';
import { site } from '@/lib/site';

export const alt = `${site.name} — AI trading software for stocks, crypto and forex`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg,#0A1020 0%,#13214F 100%)', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: '#2350FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800 }}>S</div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>AI trading technology for stocks, crypto &amp; forex</div>
          <div style={{ fontSize: 28, color: '#A9B4CE' }}>Signal engines · Option-chain analytics · Trading terminals · Broker integrations</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {['18 AI agents', '36 OI indicators', `${integrations.length} integrations`, 'Built in India'].map((t) => (
            <div key={t} style={{ fontSize: 24, padding: '10px 20px', borderRadius: 999, border: '1px solid #3A4766', color: '#DCE3F2' }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
