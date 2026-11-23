'use client';

import { useState } from 'react';
import { Window } from './ui';
import { BacktestScreen, CryptoScreen, FxScreen, OptionChainScreen, StockAnalysisScreen, StrategyScreen } from './Screens';

const SCREENS = [
  { id: 'oc', t: 'Option chain analytics', d: 'Live OI, PCR, max pain and call/put walls with an AI read of the chain.', title: 'Option Chain · NIFTY weekly expiry', C: OptionChainScreen },
  { id: 'sb', t: 'Strategy builder', d: 'Multi-leg options strategies with payoff, breakevens and risk at a glance.', title: 'Strategy Builder · Iron condor', C: StrategyScreen },
  { id: 'bt', t: 'Backtest reports', d: 'Walk-forward results with costs, slippage, equity and drawdown.', title: 'Backtest Report · Intraday ensemble strategy', C: BacktestScreen },
  { id: 'sa', t: 'AI stock analysis', d: 'Screens stocks on trend, momentum and quality into one AI score.', title: 'AI Stock Analysis · NIFTY 50 universe', C: StockAnalysisScreen },
  { id: 'cd', t: 'Crypto desk', d: 'Momentum, funding and volatility alerts across major coins, 24×7.', title: 'Crypto Desk · Perpetuals overview', C: CryptoScreen },
  { id: 'fx', t: 'Currency strength', d: 'A strength matrix across INR and major pairs with model views.', title: 'Currency Strength · Majors and INR', C: FxScreen }
];

export default function Gallery() {
  const [id, setId] = useState('oc');
  const cur = SCREENS.find((s) => s.id === id)!;
  const C = cur.C;
  return (
    <div className="gallery">
      <div role="tablist" aria-label="Product screens" className="gallery-tabs">
        {SCREENS.map((s) => (
          <button key={s.id} role="tab" id={`tab-${s.id}`} aria-controls="gallery-panel" aria-selected={s.id === id} className="gallery-tab" onClick={() => setId(s.id)}>
            <b>{s.t}</b><span>{s.d}</span>
          </button>
        ))}
      </div>
      <div id="gallery-panel" role="tabpanel" aria-labelledby={`tab-${id}`}>
        <Window title={cur.title} style={{ boxShadow: '0 40px 90px -30px rgba(0,0,0,.8)' }}>
          <C />
        </Window>
      </div>
    </div>
  );
}
