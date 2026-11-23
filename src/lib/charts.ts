/*
 * Deterministic sample-data generators for the product interface previews.
 * Seeded, so server and client render identical markup (no hydration mismatch).
 * All figures are illustrative sample data — never live prices.
 */

export function rng(seed: number) {
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}

export function walk(seed: number, n: number, drift: number, vol: number) {
  const r = rng(seed);
  let v = 100;
  const a: number[] = [];
  for (let i = 0; i < n; i++) {
    v *= 1 + drift + (r() - 0.5) * vol;
    a.push(v);
  }
  return a;
}

export function linePath(a: number[], W: number, H: number, lo?: number, hi?: number, pad = 6) {
  const mn = lo ?? Math.min(...a);
  const mx = hi ?? Math.max(...a);
  return a
    .map((v, i) => `${i ? 'L' : 'M'}${((i * W) / (a.length - 1)).toFixed(1)} ${(pad + (H - 2 * pad) * (1 - (v - mn) / (mx - mn || 1))).toFixed(1)}`)
    .join('');
}

export type CandleChart = { up: string; dn: string; wick: string; e20: string; e50: string; vwap: string; vup: string; vdn: string; rsi: string };

export function candleChart(seed: number): CandleChart {
  const r = rng(seed);
  const n = 64;
  const d: { o: number; c: number; h: number; l: number; vol: number }[] = [];
  let v = 100;
  for (let i = 0; i < n; i++) {
    const o = v;
    const c = o * (1 + (r() - 0.46) * 0.018);
    const h = Math.max(o, c) * (1 + r() * 0.006);
    const l = Math.min(o, c) * (1 - r() * 0.006);
    d.push({ o, c, h, l, vol: 0.3 + r() });
    v = c;
  }
  const ema = (k: number) => {
    const m = 2 / (k + 1);
    let e = d[0].c;
    return d.map((x) => (e = x.c * m + e * (1 - m)));
  };
  const e20 = ema(20);
  const e50 = ema(50);
  let pv = 0;
  let vv = 0;
  const vw = d.map((x) => {
    pv += ((x.h + x.l + x.c) / 3) * x.vol;
    vv += x.vol;
    return pv / vv;
  });
  const mn = Math.min(...d.map((x) => x.l));
  const mx = Math.max(...d.map((x) => x.h));
  const W = 800;
  const H = 300;
  const cw = W / n;
  const y = (p: number) => 10 + (H - 20) * (1 - (p - mn) / (mx - mn));
  let up = '', dn = '', wick = '', vup = '', vdn = '';
  d.forEach((x, i) => {
    const cx = i * cw + cw / 2;
    const bw = cw * 0.62;
    const top = y(Math.max(x.o, x.c));
    const bh = Math.max(1, y(Math.min(x.o, x.c)) - top);
    const rect = `M${(cx - bw / 2).toFixed(1)} ${top.toFixed(1)}h${bw.toFixed(1)}v${bh.toFixed(1)}h-${bw.toFixed(1)}Z`;
    const vh = (x.vol / 1.3) * 46;
    const vr = `M${(cx - bw / 2).toFixed(1)} ${(50 - vh).toFixed(1)}h${bw.toFixed(1)}v${vh.toFixed(1)}h-${bw.toFixed(1)}Z`;
    if (x.c >= x.o) { up += rect; vup += vr; } else { dn += rect; vdn += vr; }
    wick += `M${cx.toFixed(1)} ${y(x.h).toFixed(1)}V${y(x.l).toFixed(1)}`;
  });
  const pl = (a: number[]) => a.map((p, i) => `${i ? 'L' : 'M'}${(i * cw + cw / 2).toFixed(1)} ${y(p).toFixed(1)}`).join('');
  const rs: number[] = [];
  for (let i = 0; i < n; i++) {
    let g = 0, l = 0;
    for (let j = Math.max(1, i - 13); j <= i; j++) {
      const ch = d[j].c - d[j - 1].c;
      if (ch > 0) g += ch; else l -= ch;
    }
    rs.push(i < 2 ? 50 : 100 - 100 / (1 + g / (l || 1e-9)));
  }
  const rsi = rs.map((p, i) => `${i ? 'L' : 'M'}${(i * cw + cw / 2).toFixed(1)} ${(70 * (1 - p / 100)).toFixed(1)}`).join('');
  return { up, dn, wick, e20: pl(e20), e50: pl(e50.map((p, i) => (i < 8 ? e20[i] : p))), vwap: pl(vw), vup, vdn, rsi };
}

const inr = (v: number) => v.toLocaleString('en-IN');

/* ---------- Option chain ---------- */
export function optionChain() {
  const spot = 24962;
  const ks: number[] = [];
  for (let k = 24700; k <= 25200; k += 50) ks.push(k);
  const r = rng(5);
  const rows = ks.map((k) => {
    const dk = (k - spot) / 50;
    const cOI = Math.max(4, Math.round((k >= spot ? 60 + dk * 18 + (k === 25100 ? 60 : 0) : 25 + (dk + 6) * 4) * (0.85 + r() * 0.3)));
    const pOI = Math.max(4, Math.round((k <= spot ? 60 - dk * 18 + (k === 24800 ? 55 : 0) : 22 - dk * 2) * (0.85 + r() * 0.3)));
    const tv = 90 * Math.exp(-Math.abs(k - spot) / 180);
    return { k, cOI, pOI, cChg: Math.round((r() - 0.3) * 30), pChg: Math.round((r() - 0.3) * 30), cL: Math.max(2, Math.max(0, spot - k) + tv), pL: Math.max(2, Math.max(0, k - spot) + tv) };
  });
  const mxOI = Math.max(...rows.map((x) => Math.max(x.cOI, x.pOI)));
  const sumC = rows.reduce((a, x) => a + x.cOI, 0);
  const sumP = rows.reduce((a, x) => a + x.pOI, 0);
  let maxPain = ks[0];
  let best = Infinity;
  ks.forEach((s) => {
    const pay = rows.reduce((a, x) => a + x.cOI * Math.max(0, s - x.k) + x.pOI * Math.max(0, x.k - s), 0);
    if (pay < best) { best = pay; maxPain = s; }
  });
  const callWall = rows.reduce((a, x) => (x.cOI > a.cOI ? x : a)).k;
  const putWall = rows.reduce((a, x) => (x.pOI > a.pOI ? x : a)).k;
  const atm = ks.reduce((a, k) => (Math.abs(k - spot) < Math.abs(a - spot) ? k : a));
  return {
    pcr: (sumP / sumC).toFixed(2), maxPain: inr(maxPain), callWall: inr(callWall), putWall: inr(putWall),
    rows: rows.map((x) => ({
      k: inr(x.k), atm: x.k === atm, cOI: inr(x.cOI * 1000), pOI: inr(x.pOI * 1000),
      cChg: `${x.cChg > 0 ? '+' : ''}${x.cChg}K`, pChg: `${x.pChg > 0 ? '+' : ''}${x.pChg}K`, cChgUp: x.cChg >= 0, pChgUp: x.pChg >= 0,
      cL: x.cL.toFixed(1), pL: x.pL.toFixed(1), cPct: Math.round((x.cOI / mxOI) * 100), pPct: Math.round((x.pOI / mxOI) * 100)
    }))
  };
}

/* ---------- Iron condor payoff ---------- */
export function ironCondor() {
  const spot = 24962;
  const legs = [
    { side: 'SELL', k: 24500, t: 'PE', p: 60, q: -1, call: false },
    { side: 'BUY', k: 24300, t: 'PE', p: 25, q: 1, call: false },
    { side: 'SELL', k: 25000, t: 'CE', p: 55, q: -1, call: true },
    { side: 'BUY', k: 25200, t: 'CE', p: 22, q: 1, call: true }
  ];
  const credit = legs.reduce((a, l) => a - l.q * l.p, 0);
  const pnl = (x: number) => legs.reduce((a, l) => a + l.q * ((l.call ? Math.max(0, x - l.k) : Math.max(0, l.k - x)) - l.p), 0);
  const x0 = 24000, x1 = 25500, W = 600, H = 260, ymax = 120, ymin = -200;
  const px = (x: number) => (((x - x0) / (x1 - x0)) * W).toFixed(1);
  const py = (v: number) => (((ymax - v) / (ymax - ymin)) * H).toFixed(1);
  const xs: number[] = [];
  for (let x = x0; x <= x1; x += 10) xs.push(x);
  const area = (f: (v: number) => number) => `M${px(x0)} ${py(0)}${xs.map((x) => `L${px(x)} ${py(f(pnl(x)))}`).join('')}L${px(x1)} ${py(0)}Z`;
  return {
    line: xs.map((x, i) => `${i ? 'L' : 'M'}${px(x)} ${py(pnl(x))}`).join(''),
    gain: area((v) => Math.max(0, v)), loss: area((v) => Math.min(0, v)),
    zero: `M0 ${py(0)}H${W}`, spotLine: `M${px(spot)} 0V${H}`,
    x0: inr(x0), x1: inr(x1), spot: inr(spot), legs,
    maxProfit: `+${credit} pts`, maxLoss: `${Math.min(...xs.map(pnl))} pts`, credit: `${credit} pts`,
    breakevens: `${inr(24500 - credit)} / ${inr(25000 + credit)}`
  };
}

/* ---------- Backtest ---------- */
export function backtest() {
  const eq = walk(6, 160, 0.0022, 0.018);
  const bn = walk(8, 160, 0.0007, 0.018);
  const lo = Math.min(...eq, ...bn);
  const hi = Math.max(...eq, ...bn);
  let pk = eq[0];
  const dd = eq.map((v) => { pk = Math.max(pk, v); return (v - pk) / pk; });
  const mdd = Math.min(...dd);
  const eqL = linePath(eq, 800, 220, lo, hi, 10);
  const pct = (a: number[]) => (a[a.length - 1] / 100 - 1) * 100;
  return {
    eq: eqL, bench: linePath(bn, 800, 220, lo, hi, 10), area: `${eqL}L800 220L0 220Z`,
    dd: `M0 0${dd.map((v, i) => `L${((i * 800) / (dd.length - 1)).toFixed(1)} ${((v / mdd) * 56).toFixed(1)}`).join('')}L800 0Z`,
    ret: `+${pct(eq).toFixed(1)}%`, bret: `${pct(bn) >= 0 ? '+' : ''}${pct(bn).toFixed(1)}%`, mdd: `${(mdd * 100).toFixed(1)}%`, trades: '412 · 54%'
  };
}

/* ---------- AI stock analysis ---------- */
export function stockScores() {
  const ST: [string, string, string, number, number][] = [
    ['RELIANCE', 'Energy', 'Uptrend', 72, 81], ['INFY', 'IT', 'Uptrend', 78, 84], ['HDFCBANK', 'Banking', 'Sideways', 51, 88], ['TCS', 'IT', 'Sideways', 47, 90],
    ['ICICIBANK', 'Banking', 'Uptrend', 69, 83], ['LT', 'Infra', 'Uptrend', 74, 77], ['ITC', 'FMCG', 'Downtrend', 38, 80], ['TATAMOTORS', 'Auto', 'Downtrend', 34, 66]
  ];
  return ST.map(([n, sec, t, m, q]) => ({ n, sec, t, m, q, sc: Math.round(m * 0.55 + q * 0.45) })).sort((a, b) => b.sc - a.sc);
}

/* ---------- FX strength matrix ---------- */
export function fxMatrix() {
  const ccy = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD'];
  const str = [0.18, -0.12, 0.05, -0.26, -0.04, 0.21];
  const rows = ccy.map((a, i) => ({ ccy: a, cells: ccy.map((_, j) => ({ self: i === j, v: str[i] - str[j] })) }));
  const order = ccy.map((c, i) => ({ c, s: str[i] })).sort((a, b) => b.s - a.s);
  return { ccy, rows, top: order[0].c, bottom: order[order.length - 1].c };
}

/* ---------- Trading Yantra swing table ---------- */
export function swingRows(capital = 500000, riskPct = 1) {
  const SW: [string, string, string, number, number, number, number][] = [
    ['RS leader', 'Daily', 'LT', 3612.4, 72.5, 88, 0.71], ['20 EMA pullback', 'Daily', 'ICICIBANK', 1288.6, 24.1, 84, 0.58], ['VCP squeeze', 'Weekly', 'TRENT', 5420.0, 168.0, 79, 0.52],
    ['20 EMA pullback', 'Daily', 'BHARTIARTL', 1872.3, 31.8, 76, 0.44], ['RS leader', 'Daily', 'DIXON', 15890.0, 520.0, 73, 0.39], ['Oversold dip', 'Weekly', 'ASIANPAINT', 2318.5, 61.2, 61, 0.12]
  ];
  const risk = (capital * riskPct) / 100;
  return SW.map(([setup, tf, sym, e, atr, rank, ev]) => {
    const st = e - 1.5 * atr;
    const tg = e + 3 * atr;
    const q = Math.floor(risk / (e - st));
    return { setup, tf, sym, e, st, tg, q, pos: q * e, rank, ev };
  });
}

export const money = (v: number) => v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const inrRound = (v: number) => Math.round(v).toLocaleString('en-IN');
