'use client';

import { useState } from 'react';
import { money, inrRound, swingRows } from '@/lib/charts';
import { moduleGroups, modules } from '@/lib/data';
import { Badge, Window } from './ui';

const SETUP: Record<string, [string, string]> = { '20 EMA pullback': ['#16304F', '#7FB2FF'], 'VCP squeeze': ['#2A1F55', '#C9B6FF'], 'RS leader': ['#123A2C', '#2BD48A'], 'Oversold dip': ['#3A2A10', '#F5B94B'] };
const STATE: Record<string, [string, string]> = { Triggered: ['rgba(43,212,138,.16)', '#2BD48A'], Waiting: ['rgba(124,155,255,.16)', '#9DB4FF'], Chased: ['rgba(245,185,75,.16)', '#F5B94B'], 'Below stop': ['rgba(255,107,107,.16)', '#FF6B6B'] };

function SwingScreen() {
  const [capital, setCapital] = useState(500000);
  const [risk, setRisk] = useState(1);
  const rows = swingRows(capital, risk);
  return (
    <div className="stack-screen" style={{ padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div className="hd" style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Adaptive Swing Trading Platform <Badge bg="#1B2A55" color="#9DB4FF">20-day / 20-week hold</Badge></div>
          <div className="lbl">NSE cash equities · long-only · triple-barrier exits · 1.5× ATR stop / 3.0× ATR target · 0.593% Indian friction model</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="tchip">Setup: all families</span><span className="tchip">Daily + weekly</span><span className="tchip">Min R:R 1.5 : 1</span>
        <label className="tchip" style={{ gap: 6 }}>Capital ₹
          <select aria-label="Capital" value={capital} onChange={(e) => setCapital(Number(e.target.value))} style={{ background: 'transparent', color: '#fff', border: 0, font: 'inherit' }}>
            {[200000, 500000, 1000000, 2500000].map((v) => <option key={v} value={v} style={{ color: '#000' }}>{inrRound(v)}</option>)}
          </select>
        </label>
        <label className="tchip" style={{ gap: 6 }}>Risk
          <select aria-label="Risk per trade" value={risk} onChange={(e) => setRisk(Number(e.target.value))} style={{ background: 'transparent', color: '#fff', border: 0, font: 'inherit' }}>
            {[0.5, 1, 1.5, 2].map((v) => <option key={v} value={v} style={{ color: '#000' }}>{v}%</option>)}
          </select>
        </label>
      </div>
      <div className="pane scroll-x" style={{ padding: 6 }}>
        <table className="data">
          <thead><tr><th className="l">Setup</th><th className="l">TF</th><th className="l">Symbol</th><th>Entry ₹</th><th>Stop ₹</th><th>Target ₹</th><th>R:R</th><th>Qty</th><th>Position ₹</th><th>Rank</th><th>EV % net</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.sym}>
                <td className="l"><Badge bg={SETUP[r.setup][0]} color={SETUP[r.setup][1]}>{r.setup}</Badge></td>
                <td className="l" style={{ color: '#A9B4CE' }}>{r.tf}</td><td className="l sym">{r.sym}</td>
                <td className="num">{money(r.e)}</td><td className="num dn">{money(r.st)}</td><td className="num up">{money(r.tg)}</td>
                <td className="num">2.0</td><td className="num">{r.q}</td><td className="num">{inrRound(r.pos)}</td><td className="num">{r.rank}</td>
                <td className="num" style={{ color: r.ev >= 0.3 ? '#2BD48A' : '#DCE3F2' }}>+{r.ev.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lbl">Quantity is sized live from your capital and risk — try changing them. Stop at 1.5× 14-day ATR · scale 50% at 2.0× ATR, trail the rest to 3.0× ATR · exit after 20 sessions.</div>
    </div>
  );
}

function LiveScreen() {
  const LV: [string, string, string, number, number, number, number, number, string][] = [
    ['LT', 'Swing · RS leader', 'Triggered', 3618.0, 3612.4, 3503.65, 3829.9, 88, '—'], ['ICICIBANK', 'Swing · EMA pullback', 'Waiting', 1281.2, 1288.6, 1252.45, 1360.9, 84, '—'],
    ['TRENT', 'Breakout · 52-week high', 'Chased', 5598.0, 5420.0, 5168.0, 5924.0, 79, 'Chase gate'], ['POLYCAB', 'Breakout · Darvas box', 'Triggered', 7244.5, 7230.0, 6985.0, 7720.0, 74, '—'],
    ['DIXON', 'Swing · RS leader', 'Waiting', 15802.0, 15890.0, 15110.0, 17450.0, 73, '—'], ['IRFC', 'Breakout · gap up', 'Triggered', 142.6, 141.9, 136.4, 152.9, 66, 'Risk list'],
    ['ASIANPAINT', 'Swing · oversold dip', 'Below stop', 2201.0, 2318.5, 2226.7, 2502.1, 61, '—']
  ];
  return (
    <div className="stack-screen" style={{ padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div><div className="hd" style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Live Signals</div><div className="lbl">Swing and breakout setups priced against live quotes and run through every hard gate. Gated rows stay visible with the gate that refused them.</div></div>
        <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#2BD48A' }}><span className="live-dot pulse" />Auto-refresh 60s</span>
      </div>
      <div className="pane scroll-x" style={{ padding: 6 }}>
        <table className="data">
          <thead><tr><th className="l">Symbol</th><th className="l">Setup</th><th className="l">State</th><th>LTP</th><th>Entry</th><th>From entry</th><th>Stop</th><th>Target</th><th>Score</th><th className="l">Blocked by</th></tr></thead>
          <tbody>
            {LV.map(([sym, setup, st, ltp, e, s, t, sc, bl]) => {
              const fe = (ltp / e - 1) * 100;
              return (
                <tr key={sym}>
                  <td className="l sym">{sym}</td><td className="l" style={{ color: '#A9B4CE' }}>{setup}</td>
                  <td className="l"><Badge bg={STATE[st][0]} color={STATE[st][1]}>{st}</Badge></td>
                  <td className="num">{money(ltp)}</td><td className="num">{money(e)}</td>
                  <td className={`num ${fe >= 0 ? 'up' : 'dn'}`}>{fe >= 0 ? '+' : ''}{fe.toFixed(2)}%</td>
                  <td className="num">{money(s)}</td><td className="num">{money(t)}</td><td className="num">{sc}</td><td className="l" style={{ color: '#A9B4CE' }}>{bl}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="lbl">States: triggered · waiting · chased · past target · below stop · stale quote. Triggered is a timing state, not a recommendation.</div>
    </div>
  );
}

function AssistantScreen() {
  const rows = [['BHARTIARTL', '₹1,872.30', 'vol 1.8× avg'], ['TATACONSUM', '₹1,104.55', 'vol 1.4× avg'], ['HAL', '₹4,512.00', 'vol 2.1× avg'], ['CIPLA', '₹1,498.20', 'vol 1.2× avg']];
  return (
    <div className="split-screen">
      <div className="pane" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}><span className="hd" style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Ask the Trading Yantra</span><Badge bg="#2A1F55" color="#C9B6FF">Local LLM · private</Badge></div>
        <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: '#2350FF', color: '#fff', borderRadius: '14px 14px 4px 14px', padding: '10px 14px' }}>Which stocks crossed above their 50-day SMA today?</div>
        <div style={{ maxWidth: '92%', background: '#141E35', border: '1px solid #1E2A45', borderRadius: '14px 14px 14px 4px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span>Four stocks in the liquid universe closed above their 50-day SMA after closing below it in the previous session:</span>
          {rows.map(([s, c, v]) => <div key={s} className="watch-row"><b>{s}</b><span className="num">{c}</span><span className="num" style={{ color: '#A9B4CE' }}>{v}</span></div>)}
          <span style={{ fontSize: 12, color: '#9DB4FF' }}>▸ Data looked up · 1 query · indicator snapshot, latest session</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}><span style={{ flex: 1, border: '1px solid #23304F', borderRadius: 10, padding: '10px 12px', color: '#6E7B98' }}>e.g. Which stocks broke resistance on the weekly chart?</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="pane"><div className="lbl" style={{ marginBottom: 8 }}>How it stays trustworthy</div><p>Every number comes from the platform&apos;s own database queries, never from the model&apos;s memory. The model only chooses which lookup to run and explains the result — and the exact query is shown under each answer.</p></div>
        <div className="pane"><div className="lbl" style={{ marginBottom: 8 }}>Suggested questions</div><div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span>Show me stocks with RSI above 70</span><span>Which stocks had the biggest volume spike today?</span><span>Which stocks broke support in the last session?</span><span>What is the verdict on the trained models?</span></div></div>
      </div>
    </div>
  );
}

function PipelineScreen() {
  const JC: Record<string, [string, string]> = { Done: ['#2BD48A', 'rgba(43,212,138,.15)'], Running: ['#7C9BFF', 'rgba(124,155,255,.16)'], Queued: ['#8592AE', 'rgba(133,146,174,.15)'] };
  const jobs = [['NSE daily data ingestion', 'Fyers candles', 'Done'], ['NSE Bhavcopy sync', 'Delivery & turnover', 'Done'], ['Indices & security master', 'Reference data', 'Done'], ['Corporate actions', 'Splits, bonuses', 'Done'], ['Indicator & price-action snapshots', 'RSI, EMA, ATR, ADX', 'Done'], ['All scanners', 'Swing, breakout, RSI, SMA40', 'Running'], ['ML models', 'Scoring', 'Queued'], ['Outcome resolution', 'Paper trades', 'Queued'], ['Agent calibration review', 'Proposals', 'Queued']];
  return (
    <div className="split-screen">
      <div className="pane" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <div><div className="hd" style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Processes &amp; Automation</div><div className="lbl">Master pipeline · runs nightly at 20:30 IST after NSE close, in dependency order</div></div>
          <Badge bg="rgba(43,212,138,.15)" color="#2BD48A">Scheduler armed</Badge>
        </div>
        {jobs.map(([n, k, st]) => (
          <div key={n} style={{ display: 'grid', gridTemplateColumns: '22px minmax(0,1fr) auto auto', gap: 10, alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #141E35' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: JC[st][0] }} /><span style={{ color: '#E7ECF7' }}>{n}</span><span className="lbl hide-sm">{k}</span><Badge bg={JC[st][1]} color={JC[st][0]}>{st}</Badge>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="pane kv">
          <div><div className="lbl">Daily chain</div><div className="num kv-big">30 jobs</div></div>
          <div><div className="lbl">Weekly retrain</div><div className="num kv-big">8 jobs</div></div>
          <div><div className="lbl">Monthly deep eval</div><div className="num kv-big">2 jobs</div></div>
          <div><div className="lbl">Log retention</div><div className="num kv-big">30 days</div></div>
        </div>
        <div className="pane"><div className="lbl" style={{ marginBottom: 8 }}>Autonomous calibration, human approval</div><p>A review job files configuration proposals only when a gate is measurably costing money across at least three months. Every value is checked against hard bounds and nothing changes until you approve it. Position sizing and the cost model can never be auto-proposed.</p></div>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'sw', label: 'Swing platform', title: 'Adaptive Swing Trading Platform', C: SwingScreen },
  { id: 'ls', label: 'Live signals', title: 'Live Signals', C: LiveScreen },
  { id: 'ai', label: 'AI assistant', title: 'Ask the Trading Yantra', C: AssistantScreen },
  { id: 'pp', label: 'Automation', title: 'Processes & Automation', C: PipelineScreen }
];

export function YantraScreens() {
  const [id, setId] = useState('sw');
  const cur = TABS.find((t) => t.id === id)!;
  const C = cur.C;
  return (
    <>
      <div role="tablist" aria-label="Trading Yantra screens" className="chips" style={{ marginBottom: 18 }}>
        {TABS.map((t) => <button key={t.id} role="tab" aria-selected={t.id === id} className="chip" onClick={() => setId(t.id)}>{t.label}</button>)}
      </div>
      <div role="tabpanel"><Window title={`Trading Yantra — ${cur.title}`}><C /></Window></div>
    </>
  );
}

export function ModuleCatalogue() {
  const [g, setG] = useState<'all' | keyof typeof moduleGroups>('all');
  const list = modules.filter((m) => g === 'all' || m.g === g);
  const groups = [['all', `All modules · ${modules.length}`], ...Object.entries(moduleGroups).map(([k, v]) => [k, `${v.name} · ${modules.filter((m) => m.g === k).length}`])] as [string, string][];
  return (
    <>
      <div role="tablist" aria-label="Module groups" className="chips" style={{ marginBottom: 24 }}>
        {groups.map(([k, l]) => <button key={k} role="tab" aria-selected={k === g} className="chip" onClick={() => setG(k as typeof g)}>{l}</button>)}
      </div>
      <div className="grid g3" style={{ gap: 16 }}>
        {list.map((m) => {
          const grp = moduleGroups[m.g];
          return (
            <article key={m.n} className="card" style={{ padding: 22, gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'start' }}>
                <h3 style={{ fontSize: 17.5 }}>{m.n}</h3>
                <span className="pill" style={{ background: grp.tint, color: grp.color, fontSize: 11, padding: '3px 9px', flex: 'none' }}>{grp.name}</span>
              </div>
              <p style={{ fontSize: 14.5 }}>{m.d}</p>
              <div className="tags">{m.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            </article>
          );
        })}
      </div>
    </>
  );
}
