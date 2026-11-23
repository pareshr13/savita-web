/* All website content in one place. Edit copy here, not in components. */

export type IconPath = string;

export const services: { title: string; text: string; icon: IconPath; tags: string[] }[] = [
  { title: 'AI trading signal engines', text: 'Ensemble machine-learning models that turn price, volume, open interest and volatility into calibrated buy, sell or wait signals.', icon: 'M3 17l5-5 4 4 8-8M15 8h5v5', tags: ['XGBoost', 'LightGBM', 'Random Forest'] },
  { title: 'Trading terminals & portals', text: 'Fast web and mobile terminals, screeners and dashboards for stock, crypto and forex users, under your brand.', icon: 'M3 4h18v12H3zM8 20h8M12 16v4', tags: ['Web', 'Mobile', 'Real-time'] },
  { title: 'Broker & exchange integration', text: 'Order automation and live data through the official APIs of Indian brokers, global brokers and crypto exchanges.', icon: 'M13 2L4 14h7l-1 8 9-12h-7z', tags: ['Kite Connect', 'Fyers', 'Alpaca'] },
  { title: 'Options analytics', text: 'Option-chain intelligence, OI build-up, PCR suites, max pain, gamma exposure and multi-leg strategy builders for F&O traders.', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2', tags: ['OI · PCR', 'GEX', 'Payoff'] },
  { title: 'Backtesting & research', text: 'Walk-forward backtests with Indian costs, slippage, real option premiums and out-of-sample validation before capital is at risk.', icon: 'M3 3v18h18M7 14l4-4 3 3 5-6', tags: ['Walk-forward', 'Clustered t-stats', 'VectorBT'] },
  { title: 'Risk & compliance tooling', text: 'Position sizing, loss limits, circuit breakers, audit trails and reporting built for regulated markets.', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', tags: ['Circuit breakers', 'Audit logs', 'Alerts'] }
];

export const facts: { v: string; k: string }[] = [
  { v: '3', k: 'production trading platforms' },
  { v: '18', k: 'specialist AI agents in one pipeline' },
  { v: '36', k: 'option-chain indicators in Nifty OI Pro' },
  { v: '24', k: 'modules in Trading Yantra' },
  { v: '40', k: 'automated data and model processes' },
  { v: '14', k: 'breakout detectors' },
  { v: '12', k: 'candlestick detectors, measured in context' },
  { v: '13', k: 'FX, metal, energy, index and crypto instruments' },
  { v: '150+', k: 'Indian stock names recognised in news' },
  { v: '4', k: 'languages: English, Hindi, Gujarati, Marathi' },
  { v: '0.593%', k: 'Indian round-trip cost model in every backtest' },
  { v: 'INTEGRATIONS', k: 'broker, exchange and data integrations' }
];

export type Pillar = { title: string; sub: string; color: string; tint: string; cards: { t: string; d: string; w: string; icon: IconPath }[] };

export const pillars: Pillar[] = [
  {
    title: 'Options intelligence', sub: 'See what institutions are positioned for.', color: '#2350FF', tint: '#E8EDFF',
    cards: [
      { t: 'Gamma exposure maps', d: 'Net dealer gamma is computed from the option chain and fed into regime detection, flagging squeeze risk when a quiet market sits on short-gamma positioning.', w: 'Spot explosive moves before they start', icon: 'M3 12h4l3-8 4 16 3-8h4' },
      { t: 'IV-rank adaptive structuring', d: 'India VIX is ranked against its 20-session history. Above the 85th percentile trades are vetoed; between the 70th and 85th they are restructured into debit spreads.', w: 'Stops overpaying for expensive options', icon: 'M4 19h16M7 15l3-4 3 2 4-6' },
      { t: 'Participant OI and wall persistence', d: 'FII, DII, Pro and Client open interest plus futures basis, and a five-day score of how persistently each call and put wall has held.', w: 'Follow the big money, not the noise', icon: 'M3 21V10M9 21V3M15 21v-7M21 21v-4' },
      { t: 'Option-chain time machine', d: 'Minute-by-minute replay of the full Nifty option chain at 1×, 2× and 5× speed — PCR suite, max pain, walls and strike-level build-up.', w: 'Study any session the way it unfolded', icon: 'M12 8v4l3 2M3 12a9 9 0 1 0 3-6.7M3 4v4h4' }
    ]
  },
  {
    title: 'Trustworthy AI', sub: 'AI you can audit, not just believe.', color: '#6B3FD4', tint: '#F2ECFF',
    cards: [
      { t: 'Calibrated probability ensemble', d: 'XGBoost, LightGBM and Random Forest combined with isotonic calibration, so a 70% signal behaves like 70%. Models go live only after passing a skill floor.', w: 'Confidence numbers you can size positions on', icon: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5' },
      { t: 'Zero-hallucination copilot', d: 'The LLM assistant only chooses which database query to run and explains the result. Every figure comes from real data and the exact query is shown.', w: 'An AI analyst that never invents a number', icon: 'M4 5h16v11H8l-4 4zM8 10h8' },
      { t: 'Private, local LLM', d: 'Research agents run on a self-hosted model through Ollama — no cloud token costs, no rate limits and no client data leaving your servers.', w: 'Your strategies stay yours', icon: 'M6 10V7a6 6 0 0 1 12 0v3M5 10h14v11H5z' },
      { t: 'Propose-only AI agents', d: 'AI reviewers can suggest threshold changes inside hard bounds, but position size, leverage and execution are permanently off limits — enforced in three separate places.', w: 'Automation without handing over the keys', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4' }
    ]
  },
  {
    title: 'Institutional risk engine', sub: 'Built to survive bad days.', color: '#0E8A55', tint: '#EAF7F0',
    cards: [
      { t: 'Four-state regime detector', d: 'Every session is classified as trending, ranging, high volatility or crisis, with a hard India VIX above 30 override — strategies adapt instead of trading every day the same way.', w: 'Different market, different playbook', icon: 'M3 17l6-6 4 4 8-8' },
      { t: 'Circuit-breaker sentinel', d: 'Real-time daily loss caps, consecutive-loss lockouts and trade-count limits that stop the system before a bad streak compounds.', w: 'Capital protection on autopilot', icon: 'M13 2L4 14h7l-1 8 9-12h-7z' },
      { t: 'Real 0-DTE expiry profile', d: 'Expiry is detected from the actual option chain, not a weekday guess. Zero-day trades get tighter stops and a faster theta-stop schedule.', w: "Built for India's expiry-day reality", icon: 'M8 2v4M16 2v4M3 9h18M5 4h14v17H5z' },
      { t: 'Portfolio heat limits', d: '1% risk per trade, 20× per-trade and 50× gross leverage caps, sector heat limits and a re-entry cooldown — with spread and commission charged on every fill.', w: 'Risk measured across the whole book', icon: 'M12 2a10 10 0 1 0 10 10H12z' }
    ]
  },
  {
    title: 'Evidence-first research', sub: 'Every rule earns its place.', color: '#A86A00', tint: '#FFF4DF',
    cards: [
      { t: 'Blocked-signal ledger', d: 'Rejected trades are stored with the exact gate that blocked them, and each gate is scored on what it saved or cost using month-clustered statistics.', w: 'Know which filters actually make money', icon: 'M4 4h16v16H4zM9 9l6 6M15 9l-6 6' },
      { t: 'Honest backtesting', d: 'Walk-forward tests with purged boundaries, unseen confirmation periods, real option premiums, Indian costs and a comparison against random entries on the same days.', w: 'Results that hold up in live markets', icon: 'M3 3v18h18M7 14l4-4 3 3 5-6' },
      { t: 'Self-learning agents', d: 'Every signal is resolved against real price afterwards. Agents are scored on outcomes, their votes re-weighted, and winning regime-specific patterns saved as a skill library.', w: 'A system that improves as it trades', icon: 'M21 12a9 9 0 1 1-3-6.7M21 4v5h-5' },
      { t: 'Safe strategy language', d: 'Clients write their own rules in a small strategy language with a hand-built parser and an indicator whitelist — user text is never executed as code.', w: 'Custom strategies without security risk', icon: 'M8 6l-6 6 6 6M16 6l6 6-6 6' }
    ]
  }
];

export const business: { t: string; d: string }[] = [
  { t: 'SaaS subscriptions & GST invoicing', d: 'Free, Pro, Quant Elite and Enterprise plans with coupons and GST-compliant invoices.' },
  { t: 'Desktop, mobile and web terminals', d: 'Separate trader terminals for desktop and mobile, plus fast, SEO-friendly marketing sites.' },
  { t: 'Four Indian languages', d: 'Interfaces and content in English, Hindi, Gujarati and Marathi for wider reach.' },
  { t: 'Time-series data at scale', d: 'PostgreSQL with TimescaleDB hypertables and Redis for tick-level market snapshots.' },
  { t: 'Cloud-ready deployment', d: 'Dockerised services with Nginx, ready for AWS or your own servers.' },
  { t: 'Telegram & WhatsApp alerts', d: 'Signals and risk events delivered to the channels your users already use.' }
];

/* ---------------- Trading Yantra modules ---------------- */
export const moduleGroups: Record<string, { name: string; tint: string; color: string }> = {
  sd: { name: 'Signal discovery', tint: '#E8EDFF', color: '#2350FF' },
  lt: { name: 'Live trading desk', tint: '#EAF7F0', color: '#0E8A55' },
  rs: { name: 'AI & research', tint: '#F2ECFF', color: '#6B3FD4' },
  da: { name: 'Data & automation', tint: '#FFF4DF', color: '#A86A00' }
};

export const modules: { g: keyof typeof moduleGroups; n: string; d: string; tags: string[] }[] = [
  { g: 'sd', n: 'Adaptive Swing Trading Platform', d: 'Screens NSE cash equities for 20 EMA pullbacks, VCP squeeze breakouts, relative-strength leaders and oversold dips, with ATR stops, targets and share quantity sized to your capital and risk.', tags: ['Triple-barrier exits', 'Daily + weekly', 'EV net of costs'] },
  { g: 'sd', n: 'Breakout Scanner', d: 'Fourteen breakout detectors — all-time and 52-week highs, Darvas boxes, EMA 50/200, golden cross, trendlines, gaps and multi-year weekly resistance — each shown with its measured record.', tags: ['14 detectors', 'Strategy evidence'] },
  { g: 'sd', n: 'Price Action Scanner', d: 'Candlestick patterns scored in context: trend, pullback, structure, volume, relative strength and market regime, with risk-reward and historically measured probability.', tags: ['Shape + signal score', 'Regime aware'] },
  { g: 'sd', n: 'RSI Strategy Scanner', d: "Tomorrow's momentum watchlist from RSI and RSI-EMA crosses, relative strength and volume filters, with stop, target and risk-reward for each candidate.", tags: ['Buy / strong buy', 'Volume filter'] },
  { g: 'sd', n: 'RSI Momentum Turn', d: 'Finds stocks whose RSI is rising session over session and expands each one into its full daily RSI progression.', tags: ['Multi-session RSI'] },
  { g: 'sd', n: 'SMA40 Cross Scanner', d: 'A dual-rule mechanical scanner — pullback versus breakout — evaluated out-of-sample, with point-in-time fundamentals captured for research.', tags: ['Pullback vs breakout', 'Forward tested'] },
  { g: 'sd', n: 'Structure + Participation', d: "Cross-references SMA40 pullback setups with the day's delivery percentage and turnover, flagging delivery-backed and churn-heavy moves.", tags: ['Bhavcopy confluence'] },
  { g: 'lt', n: 'Live Signals', d: 'Setups priced against live quotes every 60 seconds and run through every hard gate, with clear states from triggered to stale quote and the reason any row was blocked.', tags: ['Auto-refresh 60s', 'Gate verdicts'] },
  { g: 'lt', n: 'Opportunity Watchlist', d: 'Watchlisted symbols monitored during market hours for breakout, pullback-bounce and exit alerts, exportable straight to Fyers.', tags: ['Live alerts', 'Fyers CSV export'] },
  { g: 'lt', n: 'Swing Trade Analyzer', d: "Daily-chart analysis of the session's strongest setups: chart-level targets, a structural stop, 1%-risk position size and an eight-point scorecard.", tags: ['Structural stops', 'Position sizing'] },
  { g: 'lt', n: 'Risk List', d: 'Exchange-published facts and tape conditions that make a stock harder to enter, harder to exit or riskier than its stop suggests.', tags: ['Exchange data', 'Scanner refusals'] },
  { g: 'lt', n: 'Paper Trades', d: 'Every signal recorded as a simulated trade and followed to today under its own stop, target and 20-day rules, after costs — exportable to CSV.', tags: ['0.593% costs', 'CSV export'] },
  { g: 'rs', n: 'Ask the Trading Yantra', d: "A natural-language assistant running on a private local LLM. It answers from the platform's own data and shows the exact query behind every answer.", tags: ['Local LLM', 'No made-up numbers'] },
  { g: 'rs', n: 'Backtest Your Rule', d: 'Test any rule against NSE history with costs, an unseen confirmation period and a comparison against buying random stocks on the same days.', tags: ['Out-of-sample', 'Free tier'] },
  { g: 'rs', n: 'Strategy Builder', d: 'Compose strategies from a catalogue of technical indicators and conditions, then send them to backtesting.', tags: ['Indicator catalogue'] },
  { g: 'rs', n: 'Candlestick Research', d: 'Twelve pattern detectors measured in context: probability of target before stop, lift versus base rate, profit factor and month-clustered t-statistics.', tags: ['12 detectors', 'Clustered t-stats'] },
  { g: 'rs', n: 'Strategy A/B Live Test', d: 'Head-to-head, out-of-sample comparison of strategies scored against live bars over a 20-session hold, net of Indian costs.', tags: ['Live out-of-sample'] },
  { g: 'rs', n: 'Signal Performance', d: 'Forward realised returns of every signal, ranked by actual close versus peak and measured against the index benchmark after round-trip costs.', tags: ['Benchmarked'] },
  { g: 'rs', n: 'Gate Attribution', d: 'Measures whether each risk gate earns its keep — trades blocked, average net and win rate — using clustered statistics across months.', tags: ['Clustered t-stat'] },
  { g: 'da', n: 'NSE Bhavcopy Analysis', d: 'Automated daily Bhavcopy ingestion from NSE archives: high-delivery breakouts, turnover surges, volume expansion and momentum gainers.', tags: ['Auto-sync from NSE', 'Delivery %'] },
  { g: 'da', n: 'Technical Feature Explorer', d: 'A multi-factor indicator explorer covering ADX, ATR, RSI, Williams %R, EMAs and 40-, 50- and 200-day moving averages.', tags: ['20+ features'] },
  { g: 'da', n: 'Processes & Automation', d: 'Forty scheduled processes — a 30-job nightly chain at 20:30 IST, weekly model retraining and monthly deep evaluation — each runnable on demand.', tags: ['40 processes', 'Fyers ingestion'] },
  { g: 'da', n: 'Config Proposals', d: 'An autonomous calibration review that proposes setting changes within hard bounds, applied only after human approval.', tags: ['Human in the loop'] },
  { g: 'da', n: 'System Logs', d: 'Live server activity, diagnostics and background-job traces with level and module filters, retained for 30 days.', tags: ['Auto-refresh', '30-day retention'] }
];

/* ---------------- Options intelligence (TradingYantra AI) ---------------- */
export const optionsModules: { t: string; d: string }[] = [
  { t: 'Yantra AI screener', d: 'Multi-timeframe ML screener with 0–100 bull/bear scores built from trend, momentum, VWAP and SuperTrend alignment.' },
  { t: 'Nifty OI Pro', d: '36 option-chain indicators: standard, dynamic, weighted and OI-change PCR, max pain, put/call walls, gamma acceleration wall and strike build-up.' },
  { t: 'Yantra News', d: 'Live news harvesting, 150+ Indian symbol recognition, event-to-sector mapping and sentiment from −1.0 to +1.0.' },
  { t: 'Live signals & circuit breakers', d: 'Intraday signals with daily loss caps, drawdown lockouts and one-click Fyers OAuth login.' },
  { t: 'Backtest engine', d: 'Real-premium option P&L, win rate, profit factor, max drawdown and equity curves.' },
  { t: 'Institutional analytics', d: 'P&L distribution, trade history and risk-reward analytics from the order log.' },
  { t: 'Multi-engine charting', d: 'A custom HTML5 canvas chart engine alongside broker and TradingView charts.' },
  { t: 'LLM copilot & strategy builder', d: 'A five-tool research agent and a no-code custom indicator condition builder.' },
  { t: 'Watchlists & entry tracker', d: 'Multiple watchlists with live RSI, ADX, SuperTrend, VWAP and bull/bear score.' }
];

export const researchTools: { t: string; d: string }[] = [
  { t: 'Technical analysis', d: '15+ indicators including EMA 50/200, VWAP, SuperTrend, ADX, MACD, Bollinger Bands, OBV, MFI and volume profile.' },
  { t: 'News catalysts', d: 'Headline harvesting with LLM and rule-based sentiment and an impact score.' },
  { t: 'Fundamentals', d: 'PE, PB, ROE, ROCE, debt-to-equity, growth and a composite fundamental score.' },
  { t: 'Option chain', d: 'PCR, max pain, IV skew and long/short build-up and unwinding classification.' },
  { t: 'Sector momentum', d: 'Index returns and breadth across 12+ NSE sectors.' }
];

/* ---------------- Forex AI ---------------- */
export const agentGroups: { t: string; tint: string; color: string; items: string[] }[] = [
  { t: 'Data', tint: '#1B2A55', color: '#9DB4FF', items: ['Market data', 'Correlation', 'News', 'Macro'] },
  { t: 'Analysis', tint: '#123A2C', color: '#2BD48A', items: ['Technical', 'Smart money', 'Market structure', 'Liquidity', 'Pattern', 'Quant'] },
  { t: 'Intelligence', tint: '#2A1F55', color: '#C9B6FF', items: ['Machine learning', 'Continuous learning', 'Explanation'] },
  { t: 'Risk & execution', tint: '#3A2A10', color: '#F5B94B', items: ['Risk management', 'Portfolio', 'Execution', 'Notification', 'Monitoring'] }
];

export const decisionFilters = [
  { k: 'Confidence', v: '≥ 0.55', d: 'Ensemble agreement on direction' },
  { k: 'Risk score', v: '≤ 0.70', d: 'Volatility, drawdown and spread' },
  { k: 'Agent agreement', v: '≥ 0.50', d: 'Share of agents voting the same way' },
  { k: 'Volatility percentile', v: '< 0.95', d: 'Skips anomalous conditions' }
];

export const instruments: { n: string; active: boolean }[] = [
  ['EURUSD', 1], ['GBPUSD', 1], ['USDJPY', 1], ['XAUUSD', 1], ['XAGUSD', 0], ['USOIL', 0], ['UKOIL', 0], ['NGAS', 0], ['NAS100', 0], ['US500', 0], ['US30', 0], ['BTCUSD', 0], ['ETHUSD', 0]
].map(([n, a]) => ({ n: n as string, active: a === 1 }));

export const forexFeatures: { t: string; d: string }[] = [
  { t: 'Live charting', d: 'Real-time candles across 13 instruments and four timeframes, updated every 10 seconds without losing your zoom.' },
  { t: 'Qualified signals', d: 'Every decision carries entry, stop, target and a plain-language reason — and is later resolved against real price.' },
  { t: 'Paper trading engine', d: '1% risk per trade, 20× per-trade and 50× gross leverage caps, sector heat limits and spread plus commission on every fill.' },
  { t: 'Portfolio & daily P&L', d: 'Equity curve, exposure, open positions and daily results in one view.' },
  { t: 'Research lab', d: 'Model registry, walk-forward evaluation, edge over baseline, Brier scores and live ensemble forecasts.' },
  { t: 'Continuous learning', d: 'Agents are scored on realised outcomes and their votes re-weighted; winning patterns become a skill library.' },
  { t: 'Custom strategies', d: 'A safe strategy language with a validated indicator whitelist, compiled straight into walk-forward backtests.' },
  { t: 'Alerts & AI reviewers', d: 'Telegram, WhatsApp, email and push alerts, plus self-hosted AI agents that review results and file proposals.' }
];

/* ---------------- Portfolio ---------------- */
export const cases = [
  {
    slug: 'options-intelligence', tag: 'NSE options · Intraday', tint: '#E8EDFF', color: '#2350FF', grad: 'linear-gradient(135deg,#0A1020,#1B2D6B)', seed: 14,
    t: 'TradingYantra AI — intraday option-chain intelligence',
    d: 'A multi-agent intraday platform for NSE option chain and equity markets, combining quantitative rules with a calibrated machine-learning ensemble and institutional risk controls.',
    pts: ['3-class XGBoost, LightGBM and Random Forest ensemble with isotonic calibration', 'Market regime detector: trending, ranging, high volatility, crisis', 'Circuit breaker: daily loss cap, loss-streak lockout, trade limits', 'Fyers API v3 live WebSocket with automatic NSE fallback feed', 'Local-LLM research agent: technicals, news, fundamentals, option chain, sectors', 'News intelligence, SaaS tiers, GST invoicing, desktop and mobile terminals']
  },
  {
    slug: 'trading-yantra', tag: 'NSE equities · Swing', tint: '#EAF7F0', color: '#0E8A55', grad: 'linear-gradient(135deg,#06231A,#0E6B4A)', seed: 33,
    t: 'Trading Yantra — swing and breakout research platform',
    d: 'Twenty-four modules that scan the NSE cash market nightly, price setups against live quotes and measure every rule against history with Indian costs.',
    pts: ['Swing, breakout, price-action, RSI and SMA40 scanners', 'Live signals with hard risk gates and clear verdicts', 'Backtesting with out-of-sample checks and clustered statistics', 'NSE Bhavcopy delivery and turnover analytics', '40-process automation pipeline with human-approved calibration', 'Private local-LLM assistant that answers only from platform data']
  },
  {
    slug: 'forex-ai', tag: 'Forex · Commodities · Crypto', tint: '#F2ECFF', color: '#6B3FD4', grad: 'linear-gradient(135deg,#120B26,#3E2A85)', seed: 52,
    t: 'AI forex and commodities intelligence platform',
    d: 'An 18-agent orchestrated pipeline over live FX, gold, energy, index and crypto data, producing filtered trade decisions and learning from every outcome.',
    pts: ['13 instruments across M15, H1, H4 and D1', 'Confidence, risk, agreement and volatility decision filters', 'Paper trading with 1% risk, leverage caps and real spread and commission', 'Walk-forward backtests and a custom strategy language', 'Continuous learning that re-weights agents on realised results', 'Telegram, WhatsApp, email and in-app alerts']
  }
];

/* ---------------- Architecture ---------------- */
export const flow = [
  { t: 'Market data', d: 'Ticks, option chains, order books and on-chain feeds.', risk: false },
  { t: 'Feature engine', d: 'OI, PCR, CVD, VWAP, ATR, volatility and indicators.', risk: false },
  { t: 'AI ensemble', d: 'Calibrated tree and neural models with regime awareness.', risk: false },
  { t: 'Risk engine', d: 'Sizing, loss limits, circuit breakers, time exits.', risk: true },
  { t: 'Execution', d: 'Smart orders through broker and exchange APIs.', risk: false },
  { t: 'Monitoring', d: 'Live dashboards, alerts and model drift checks.', risk: false }
];

export const principles = [
  { t: 'Regime-aware', d: 'Models detect trending, range-bound and volatile markets and adapt their behaviour.' },
  { t: 'Calibrated', d: 'Signal probabilities are calibrated, so position sizing rests on honest numbers.' },
  { t: 'Capital-protecting', d: 'Daily loss limits, circuit breakers and time exits are part of the core design.' },
  { t: 'Realistically tested', d: 'Costs, slippage and expiry-week behaviour are modelled before go-live.' }
];

/* ---------------- Integrations ---------------- */
export const integrationCats: Record<string, { name: string; tint: string; color: string }> = {
  in: { name: 'Indian brokers', tint: '#E8EDFF', color: '#2350FF' },
  gl: { name: 'Global brokers', tint: '#EAF7F0', color: '#0E8A55' },
  cr: { name: 'Crypto exchanges', tint: '#FFF4DF', color: '#A86A00' },
  fx: { name: 'Currency & forex', tint: '#F2ECFF', color: '#6B3FD4' },
  dt: { name: 'Data & AI', tint: '#EEF1F6', color: '#3A4357' }
};

export const integrations: { n: string; api: string; c: keyof typeof integrationCats }[] = [
  { n: 'Zerodha', api: 'Kite Connect', c: 'in' }, { n: 'Fyers', api: 'Fyers API v3', c: 'in' }, { n: 'Upstox', api: 'Upstox API', c: 'in' },
  { n: 'Angel One', api: 'SmartAPI', c: 'in' }, { n: 'ICICI Direct', api: 'Breeze API', c: 'in' }, { n: 'Dhan', api: 'DhanHQ API', c: 'in' },
  { n: 'Groww', api: 'Trade API', c: 'in' }, { n: 'Kotak Securities', api: 'Neo Trade API', c: 'in' }, { n: '5paisa', api: 'Xtream API', c: 'in' },
  { n: 'Alice Blue', api: 'ANT API', c: 'in' }, { n: 'Shoonya by Finvasia', api: 'Shoonya API', c: 'in' }, { n: 'Motilal Oswal', api: 'Trading API', c: 'in' },
  { n: 'Alpaca', api: 'Trading & market data API', c: 'gl' }, { n: 'Interactive Brokers', api: 'TWS / Client Portal API', c: 'gl' }, { n: 'TradeStation', api: 'TradeStation API', c: 'gl' }, { n: 'Tradier', api: 'Brokerage API', c: 'gl' },
  { n: 'Binance', api: 'Spot & futures API', c: 'cr' }, { n: 'Coinbase', api: 'Advanced Trade API', c: 'cr' }, { n: 'Kraken', api: 'REST & WebSocket API', c: 'cr' }, { n: 'Bybit', api: 'V5 API', c: 'cr' },
  { n: 'OKX', api: 'V5 API', c: 'cr' }, { n: 'Delta Exchange', api: 'Derivatives API', c: 'cr' }, { n: 'CoinDCX', api: 'Exchange API', c: 'cr' },
  { n: 'OANDA', api: 'v20 REST API', c: 'fx' }, { n: 'MetaTrader 5', api: 'MT5 gateway', c: 'fx' }, { n: 'cTrader', api: 'Open API', c: 'fx' }, { n: 'FXCM', api: 'REST API', c: 'fx' }, { n: 'NSE currency F&O', api: 'Via Indian broker APIs', c: 'fx' },
  { n: 'TradingView', api: 'Charting library', c: 'dt' }, { n: 'Twelve Data', api: 'FX, metals & crypto data', c: 'dt' }, { n: 'Telegram & WhatsApp', api: 'Trade alerts', c: 'dt' },
  { n: 'TrueData', api: 'NSE market data', c: 'dt' }, { n: 'Global Datafeeds', api: 'NSE / MCX feeds', c: 'dt' }, { n: 'Polygon.io', api: 'US market data', c: 'dt' },
  { n: 'Alpha Vantage', api: 'Market data API', c: 'dt' }, { n: 'OpenAI', api: 'LLM API', c: 'dt' }, { n: 'Anthropic Claude', api: 'LLM API', c: 'dt' }, { n: 'Google Gemini', api: 'LLM API', c: 'dt' }
];

export const marquee = ['Zerodha', 'Fyers', 'Upstox', 'Angel One', 'ICICI Direct', 'Dhan', 'Groww', 'Kotak Neo', 'Alpaca', 'Interactive Brokers', 'Binance', 'Coinbase', 'Kraken', 'Bybit', 'OKX', 'Delta Exchange', 'CoinDCX', 'OANDA', 'MetaTrader 5', 'TradingView'];

export const stack = [
  { t: 'AI & ML', items: ['PyTorch', 'XGBoost', 'LightGBM', 'scikit-learn', 'Ollama LLMs'] },
  { t: 'Backend & data', items: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'TimescaleDB', 'Redis', 'MongoDB'] },
  { t: 'Research', items: ['VectorBT', 'Backtrader', 'Pandas', 'Walk-forward'] },
  { t: 'Front end & ops', items: ['React', 'Next.js', 'Astro', 'Docker', 'Nginx', 'AWS'] }
];

export const plans = [
  { t: 'Custom build', d: 'A platform designed and engineered around your strategy and users.', pts: ['Discovery and architecture', 'AI models and backtesting', 'Portal, terminal and integrations', 'Source code handover'], featured: false },
  { t: 'White-label platform', d: 'Launch faster on our proven modules, under your brand.', pts: ['Terminal, screener and option analytics', 'Your branding and domain', 'Broker integrations included', 'Ongoing updates'], featured: true },
  { t: 'Dedicated AI team', d: 'Engineers and quants working as an extension of your team.', pts: ['Monthly engagement', 'Model research and upkeep', 'New features on your roadmap', 'Production support'], featured: false }
];

export const faqs = [
  { q: 'What does Savita IT Solutions build?', a: 'AI-powered trading software for stock, crypto and currency markets: signal engines, trading terminals and portals, option-chain analytics, backtesting platforms, risk systems and broker or exchange integrations.' },
  { q: 'Which brokers and exchanges can you integrate with?', a: 'We build against official APIs including Zerodha Kite Connect, Fyers, Upstox, Angel One SmartAPI, ICICI Direct Breeze, Dhan, Groww, Alpaca, Interactive Brokers, Binance, Coinbase, OANDA and MetaTrader 5, among others.' },
  { q: 'Do you provide investment advice or trading tips?', a: 'No. Savita IT Solutions is a technology company. We build software for market participants and do not provide investment advice, research recommendations or portfolio management.' },
  { q: 'Can you deliver under our brand?', a: 'Yes. Our white-label model delivers our proven modules — terminal, screeners, option analytics and integrations — on your branding and domain.' },
  { q: 'Who owns the code?', a: 'For custom builds, the source code is handed over to you at the end of the engagement.' },
  { q: 'How do you validate trading strategies?', a: 'With walk-forward backtests, purged train/test boundaries, out-of-sample confirmation periods, realistic Indian costs and slippage, and comparisons against random-entry baselines.' }
];
