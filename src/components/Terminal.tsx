'use client';

import { useMemo, useState } from 'react';
import { candleChart } from '@/lib/charts';
import { Window } from './ui';

type Market = {
  label: string; symbol: string; tf: string; seed: number; signal: string; sigColor: string; conf: string;
  regime: string; vol: string; size: string; risk: string; watch: [string, string][]; models: [string, number][];
};

const MARKETS: Record<'stocks' | 'crypto' | 'fx', Market> = {
  stocks: { label: 'Stocks', symbol: 'NIFTY 50 FUT', tf: '5 min · NSE', seed: 11, signal: 'LONG BIAS', sigColor: '#2BD48A', conf: '0.64', regime: 'Trending', vol: 'Normal', size: '2 lots', risk: '0.8%',
    watch: [['NIFTY', '+0.42%'], ['BANKNIFTY', '+0.31%'], ['FINNIFTY', '+0.18%'], ['RELIANCE', '+0.65%'], ['HDFCBANK', '-0.22%'], ['INFY', '+1.04%'], ['TCS', '-0.37%'], ['ICICIBANK', '+0.29%']],
    models: [['XGBoost', 0.67], ['LightGBM', 0.63], ['Random Forest', 0.61]] },
  crypto: { label: 'Crypto', symbol: 'BTC / USDT PERP', tf: '15 min · 24×7', seed: 29, signal: 'WAIT', sigColor: '#F5B94B', conf: '0.52', regime: 'High volatility', vol: 'Elevated', size: '0.5×', risk: '0.5%',
    watch: [['BTC', '+1.12%'], ['ETH', '-0.84%'], ['SOL', '+3.40%'], ['BNB', '+0.27%'], ['XRP', '-1.05%'], ['ADA', '+0.66%'], ['DOGE', '-2.10%'], ['AVAX', '+1.48%']],
    models: [['XGBoost', 0.55], ['LightGBM', 0.51], ['Random Forest', 0.49]] },
  fx: { label: 'Currency', symbol: 'USD / INR', tf: '5 min · NSE CDS', seed: 47, signal: 'MEAN REVERT', sigColor: '#9DB4FF', conf: '0.58', regime: 'Range-bound', vol: 'Low', size: '3 lots', risk: '0.6%',
    watch: [['USDINR', '+0.06%'], ['EURINR', '-0.12%'], ['GBPINR', '+0.09%'], ['JPYINR', '-0.21%'], ['EURUSD', '-0.18%'], ['GBPUSD', '+0.04%'], ['USDJPY', '+0.27%'], ['AUDUSD', '-0.33%']],
    models: [['XGBoost', 0.60], ['LightGBM', 0.57], ['Random Forest', 0.56]] }
};

export default function Terminal() {
  const [mk, setMk] = useState<keyof typeof MARKETS>('stocks');
  const m = MARKETS[mk];
  const ch = useMemo(() => candleChart(m.seed), [m.seed]);

  const tabs = (
    <div role="tablist" aria-label="Market" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {(Object.keys(MARKETS) as (keyof typeof MARKETS)[]).map((k) => (
        <button key={k} className="ttab" role="tab" aria-selected={k === mk} onClick={() => setMk(k)}>{MARKETS[k].label}</button>
      ))}
    </div>
  );

  return (
    <Window title="TAS Terminal — AI trading workspace" note="" right={tabs}>
      <div className="term-grid">
        <div className="pane watchlist" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="lbl" style={{ paddingBottom: 6 }}>Watchlist</div>
          {m.watch.map(([s, c]) => (
            <div key={s} className="watch-row"><b>{s}</b><span className={`num ${c.startsWith('-') ? 'dn' : 'up'}`}>{c}</span></div>
          ))}
        </div>

        <div className="pane" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span className="hd" style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{m.symbol}</span>
              <span className="lbl">{m.tf}</span>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11.5, flexWrap: 'wrap' }}>
              <span style={{ color: '#F5B94B' }}>EMA 20</span><span style={{ color: '#7C9BFF' }}>EMA 50</span><span style={{ color: '#C084FC' }}>VWAP</span><span style={{ color: '#8592AE' }}>RSI 14</span>
            </div>
          </div>
          <svg className="chart-svg" viewBox="0 0 800 300" preserveAspectRatio="none" style={{ height: 300 }} role="img" aria-label={`${m.symbol} candlestick chart with moving averages, sample data`}>
            <path d="M0 60H800M0 120H800M0 180H800M0 240H800" stroke="#16213A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d={ch.wick} stroke="#4F5D7D" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d={ch.up} fill="#2BD48A" />
            <path d={ch.dn} fill="#FF6B6B" />
            <path d={ch.vwap} stroke="#C084FC" strokeWidth="1.4" fill="none" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            <path d={ch.e20} stroke="#F5B94B" strokeWidth="1.8" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={ch.e50} stroke="#7C9BFF" strokeWidth="1.8" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg className="chart-svg" viewBox="0 0 800 50" preserveAspectRatio="none" style={{ height: 50 }} aria-hidden="true">
            <path d={ch.vup} fill="#1E6B4F" /><path d={ch.vdn} fill="#7A3A43" />
          </svg>
          <div style={{ borderTop: '1px solid #1B2640', paddingTop: 6 }}>
            <svg className="chart-svg" viewBox="0 0 800 70" preserveAspectRatio="none" style={{ height: 70 }} aria-hidden="true">
              <rect x="0" y="21" width="800" height="28" fill="#141E35" />
              <path d="M0 21H800M0 49H800" stroke="#26324F" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
              <path d={ch.rsi} stroke="#A9B6D3" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="pane">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="lbl">AI ensemble signal</span>
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontSize: 11, color: '#2BD48A' }}><span className="live-dot pulse" />Live</span>
            </div>
            <div className="hd" style={{ fontSize: 24, fontWeight: 800, marginTop: 6, color: m.sigColor }}>{m.signal}</div>
            <div className="lbl" style={{ marginTop: 2 }}>Calibrated confidence <span className="num" style={{ color: '#E7ECF7' }}>{m.conf}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {m.models.map(([n, p]) => (
                <div key={n}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>{n}</span><span className="num">{p.toFixed(2)}</span></div>
                  <div className="meter"><div style={{ width: `${Math.round(p * 100)}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="pane kv">
            <div><div className="lbl">Regime</div><div style={{ fontWeight: 600, color: '#fff' }}>{m.regime}</div></div>
            <div><div className="lbl">Volatility</div><div style={{ fontWeight: 600, color: '#fff' }}>{m.vol}</div></div>
            <div><div className="lbl">Position size</div><div className="num" style={{ color: '#fff' }}>{m.size}</div></div>
            <div><div className="lbl">Risk / trade</div><div className="num" style={{ color: '#fff' }}>{m.risk}</div></div>
          </div>
          <div className="pane" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div><div className="lbl">Circuit breaker</div><div style={{ fontWeight: 600, color: '#fff' }}>Armed · daily loss limit</div></div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2BD48A" strokeWidth="2" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
          </div>
        </div>
      </div>
    </Window>
  );
}
