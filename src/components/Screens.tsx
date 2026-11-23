/* Product interface previews (sample data). Pure render components — safe on server and client. */
import { backtest, fxMatrix, ironCondor, linePath, optionChain, stockScores, walk } from '@/lib/charts';
import { Badge } from './ui';

const scoreBadge = (sc: number) =>
  sc >= 70 ? { bg: 'rgba(43,212,138,.18)', color: '#2BD48A' } : sc >= 55 ? { bg: 'rgba(245,185,75,.16)', color: '#F5B94B' } : { bg: 'rgba(255,107,107,.16)', color: '#FF6B6B' };

export function OptionChainScreen() {
  const oc = optionChain();
  return (
    <div className="split-screen">
      <div className="pane scroll-x" style={{ padding: 6 }}>
        <table className="data">
          <thead><tr><th>Call OI</th><th>Chg OI</th><th>Call LTP</th><th className="c" style={{ color: '#E7ECF7' }}>Strike</th><th>Put LTP</th><th>Chg OI</th><th>Put OI</th></tr></thead>
          <tbody>
            {oc.rows.map((r) => (
              <tr key={r.k} style={r.atm ? { background: '#16224A' } : undefined}>
                <td style={{ background: `linear-gradient(270deg, rgba(255,107,107,.30) ${r.cPct}%, transparent 0)` }}><span className="num">{r.cOI}</span></td>
                <td className={`num ${r.cChgUp ? 'up' : 'dn'}`}>{r.cChg}</td>
                <td className="num">{r.cL}</td>
                <td className="num c" style={{ fontWeight: 700, color: '#fff' }}>{r.k}</td>
                <td className="num">{r.pL}</td>
                <td className={`num ${r.pChgUp ? 'up' : 'dn'}`}>{r.pChg}</td>
                <td style={{ background: `linear-gradient(90deg, rgba(43,212,138,.30) ${r.pPct}%, transparent 0)` }}><span className="num">{r.pOI}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="pane kv">
          <div><div className="lbl">Put–call ratio</div><div className="num kv-big">{oc.pcr}</div></div>
          <div><div className="lbl">Max pain</div><div className="num kv-big">{oc.maxPain}</div></div>
          <div><div className="lbl">Call wall</div><div className="num dn" style={{ fontSize: 16 }}>{oc.callWall}</div></div>
          <div><div className="lbl">Put wall</div><div className="num up" style={{ fontSize: 16 }}>{oc.putWall}</div></div>
        </div>
        <div className="pane">
          <div className="lbl" style={{ marginBottom: 8 }}>AI read of the option chain</div>
          <p style={{ lineHeight: 1.55 }}>Heavy put writing below spot and call writing at the wall suggest a range between the two walls into expiry. Bias stays neutral-to-positive while price holds above the put wall.</p>
        </div>
        <div className="pane">
          <div className="lbl" style={{ marginBottom: 8 }}>Signals tracked</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{['OI build-up', 'Short covering', 'IV skew', 'Gamma exposure', 'PCR trend'].map((t) => <span key={t} className="tchip">{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

export function StrategyScreen() {
  const pf = ironCondor();
  return (
    <div className="split-screen">
      <div className="pane">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}><span style={{ fontWeight: 600, color: '#fff' }}>Iron condor · NIFTY weekly</span><span className="lbl">Payoff at expiry, points per unit</span></div>
        <svg className="chart-svg" viewBox="0 0 600 260" preserveAspectRatio="none" style={{ height: 280 }} role="img" aria-label="Iron condor payoff diagram">
          <path d={pf.loss} fill="rgba(255,107,107,.22)" />
          <path d={pf.gain} fill="rgba(43,212,138,.22)" />
          <path d={pf.zero} stroke="#3A4766" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={pf.line} stroke="#E7ECF7" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
          <path d={pf.spotLine} stroke="#7C9BFF" strokeWidth="1.2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="lbl num" style={{ display: 'flex', justifyContent: 'space-between' }}><span>{pf.x0}</span><span style={{ color: '#9DB4FF' }}>Spot {pf.spot}</span><span>{pf.x1}</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="pane">
          <div className="lbl" style={{ marginBottom: 6 }}>Legs</div>
          {pf.legs.map((l) => (
            <div key={l.k + l.t} className="watch-row"><span className={l.side === 'SELL' ? 'dn' : 'up'} style={{ fontWeight: 600 }}>{l.side}</span><span className="num">{l.k.toLocaleString('en-IN')} {l.t}</span><span className="num">@ {l.p}</span></div>
          ))}
        </div>
        <div className="pane kv">
          <div><div className="lbl">Max profit</div><div className="num up" style={{ fontSize: 18 }}>{pf.maxProfit}</div></div>
          <div><div className="lbl">Max loss</div><div className="num dn" style={{ fontSize: 18 }}>{pf.maxLoss}</div></div>
          <div><div className="lbl">Breakevens</div><div className="num" style={{ color: '#fff' }}>{pf.breakevens}</div></div>
          <div><div className="lbl">Net credit</div><div className="num" style={{ color: '#fff' }}>{pf.credit}</div></div>
        </div>
      </div>
    </div>
  );
}

export function BacktestScreen() {
  const bt = backtest();
  return (
    <div className="stack-screen">
      <div className="grid g4" style={{ gap: 10 }}>
        <div className="pane"><div className="lbl">Strategy return</div><div className="num kv-big up">{bt.ret}</div></div>
        <div className="pane"><div className="lbl">Benchmark return</div><div className="num kv-big">{bt.bret}</div></div>
        <div className="pane"><div className="lbl">Max drawdown</div><div className="num kv-big dn">{bt.mdd}</div></div>
        <div className="pane"><div className="lbl">Trades · win rate</div><div className="num kv-big">{bt.trades}</div></div>
      </div>
      <div className="pane">
        <div style={{ display: 'flex', gap: 16, fontSize: 12, marginBottom: 6, flexWrap: 'wrap' }}>
          <span style={{ color: '#7C9BFF' }}>Strategy equity</span><span style={{ color: '#8592AE' }}>Benchmark</span><span style={{ color: '#FF6B6B' }}>Drawdown</span>
          <span className="lbl" style={{ marginLeft: 'auto' }}>Walk-forward · slippage and costs included</span>
        </div>
        <svg className="chart-svg" viewBox="0 0 800 220" preserveAspectRatio="none" style={{ height: 230 }} role="img" aria-label="Backtest equity curve versus benchmark, sample data">
          <path d="M0 55H800M0 110H800M0 165H800" stroke="#16213A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={bt.area} fill="rgba(124,155,255,.14)" />
          <path d={bt.bench} stroke="#6E7B98" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
          <path d={bt.eq} stroke="#7C9BFF" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="chart-svg" viewBox="0 0 800 60" preserveAspectRatio="none" style={{ height: 60, marginTop: 6 }} aria-hidden="true"><path d={bt.dd} fill="rgba(255,107,107,.35)" /></svg>
      </div>
    </div>
  );
}

export function StockAnalysisScreen() {
  const stocks = stockScores();
  const top = stocks[0];
  const tech: [string, string, boolean][] = [['Price vs EMA 20 / 50', 'Above both', true], ['RSI 14', '61 · firm', true], ['MACD', 'Bullish cross', true], ['Volume', 'Above average', true], ['Fibonacci', 'Holding 38.2%', false]];
  return (
    <div className="split-screen">
      <div className="pane scroll-x" style={{ padding: 6 }}>
        <table className="data">
          <thead><tr><th className="l">Stock</th><th className="l">Sector</th><th>Trend</th><th>Momentum</th><th>Quality</th><th>AI score</th></tr></thead>
          <tbody>
            {stocks.map((s) => {
              const b = scoreBadge(s.sc);
              return (
                <tr key={s.n}>
                  <td className="l sym">{s.n}</td><td className="l" style={{ color: '#A9B4CE' }}>{s.sec}</td>
                  <td style={{ color: s.t === 'Uptrend' ? '#2BD48A' : s.t === 'Downtrend' ? '#FF6B6B' : '#F5B94B' }}>{s.t}</td>
                  <td className="num">{s.m}</td><td className="num">{s.q}</td>
                  <td><span className="num badge" style={{ background: b.bg, color: b.color, minWidth: 40, textAlign: 'center' }}>{s.sc}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="pane">
          <div className="lbl">Selected</div>
          <div className="hd" style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{top.n} <span style={{ fontSize: 13, color: '#A9B4CE', fontWeight: 500 }}>{top.sec}</span></div>
          <svg className="chart-svg" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ height: 80, marginTop: 10 }} aria-hidden="true"><path d={linePath(walk(77, 50, 0.004, 0.025), 300, 80)} stroke="#2BD48A" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" /></svg>
        </div>
        <div className="pane">
          <div className="lbl" style={{ marginBottom: 8 }}>Technical summary</div>
          {tech.map(([k, v, g]) => <div key={k} className="watch-row"><span style={{ color: '#A9B4CE' }}>{k}</span><span className={g ? 'up' : ''}>{v}</span></div>)}
        </div>
        <div className="pane"><div className="lbl" style={{ marginBottom: 6 }}>AI commentary</div><p>Price is above its 20 and 50 EMAs with rising volume; RSI is firm without being overbought. The model rates the trend as healthy and flags the 50 EMA as the key level.</p></div>
      </div>
    </div>
  );
}

export function CryptoScreen() {
  const CO: [string, string, string, number, number][] = [['BTC', '+1.12%', '0.010%', 71, 31], ['ETH', '-0.84%', '-0.004%', 46, 37], ['SOL', '+3.40%', '0.021%', 82, 41], ['BNB', '+0.27%', '0.008%', 55, 53], ['XRP', '-1.05%', '-0.006%', 39, 59], ['AVAX', '+1.48%', '0.012%', 64, 61]];
  return (
    <div className="stack-screen">
      <div className="grid g3" style={{ gap: 10 }}>
        {CO.map(([n, ch, f, m, seed]) => {
          const up = !ch.startsWith('-');
          return (
            <div key={n} className="pane">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span className="hd" style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{n}</span><span className={`num ${up ? 'up' : 'dn'}`}>{ch}</span></div>
              <svg className="chart-svg" viewBox="0 0 200 50" preserveAspectRatio="none" style={{ height: 50, margin: '8px 0' }} aria-hidden="true"><path d={linePath(walk(seed, 40, up ? 0.003 : -0.003, 0.03), 200, 50)} stroke={up ? '#2BD48A' : '#FF6B6B'} strokeWidth="1.8" fill="none" vectorEffect="non-scaling-stroke" /></svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span className="lbl">Funding <span className="num" style={{ color: '#DCE3F2' }}>{f}</span></span><span className="lbl">AI momentum <span className="num" style={{ color: '#DCE3F2' }}>{m}</span></span></div>
            </div>
          );
        })}
      </div>
      <div className="pane" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}><span className="lbl">Alerts</span><span>Volatility expansion detected on SOL · funding turning negative on ETH perpetuals · BTC holding above weekly VWAP</span></div>
    </div>
  );
}

export function FxScreen() {
  const fx = fxMatrix();
  return (
    <div className="stack-screen">
      <div className="pane scroll-x">
        <div className="lbl" style={{ marginBottom: 10 }}>Currency strength matrix · row vs column, % change today</div>
        <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(6, minmax(64px, 1fr))', gap: 4, minWidth: 520 }}>
          <span />
          {fx.ccy.map((c) => <span key={c} style={{ textAlign: 'center', fontWeight: 600, color: '#A9B4CE', fontSize: 12 }}>{c}</span>)}
          {fx.rows.map((r) => [
            <span key={r.ccy} style={{ fontWeight: 600, color: '#A9B4CE', fontSize: 12, display: 'flex', alignItems: 'center' }}>{r.ccy}</span>,
            ...r.cells.map((c, j) => {
              const al = Math.min(0.85, Math.abs(c.v) * 1.8 + 0.08).toFixed(2);
              return (
                <span key={r.ccy + j} className="num" style={{ textAlign: 'center', padding: '9px 0', borderRadius: 6, fontSize: 12, color: '#fff', background: c.self ? '#141E35' : c.v >= 0 ? `rgba(43,212,138,${al})` : `rgba(255,107,107,${al})` }}>
                  {c.self ? '—' : `${c.v > 0 ? '+' : ''}${c.v.toFixed(2)}`}
                </span>
              );
            })
          ])}
        </div>
      </div>
      <div className="grid g3" style={{ gap: 10 }}>
        <div className="pane"><div className="lbl">Strongest</div><div className="hd up" style={{ fontSize: 20, fontWeight: 800 }}>{fx.top}</div></div>
        <div className="pane"><div className="lbl">Weakest</div><div className="hd dn" style={{ fontSize: 20, fontWeight: 800 }}>{fx.bottom}</div></div>
        <div className="pane"><div className="lbl">USD/INR model view</div><div className="hd" style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Range-bound</div></div>
      </div>
    </div>
  );
}

export { Badge };
