export type MarketGroup = 'FOREX' | 'DERIV' | 'METALS' | 'CRYPTO' | 'COMMODITIES' | 'INDICES' | 'STOCKS';

export interface BotDefinition {
    id: string;
    name: string;
    market: MarketGroup;
    strategy: string;
    priority: number;
    status: 'ACTIVE' | 'PAPER' | 'HOLD' | 'DISABLED';
    description: string;
}

export const botRegistry: BotDefinition[] = [
    { id: 'forex-institutional-sniper', name: 'Institutional Sniper Bot', market: 'FOREX', strategy: 'Institutional Sniper Strategy', priority: 1, status: 'ACTIVE', description: 'Precision entries for major FX pairs and macro-driven setups.' },
    { id: 'forex-super-scalping', name: 'Super Scalping Bot', market: 'FOREX', strategy: 'Super Scalping Strategy', priority: 2, status: 'ACTIVE', description: 'M1/M3/M5 ultra-short momentum and delta-driven FX execution.' },
    { id: 'forex-adaptive-trend-rider', name: 'Adaptive Trend Rider', market: 'FOREX', strategy: 'Adaptive Trend Following', priority: 3, status: 'PAPER', description: 'Dynamic FX trend-following that adapts to regime shifts.' },
    { id: 'forex-smart-money-liquidity', name: 'Smart Money & Liquidity Bot', market: 'FOREX', strategy: 'Smart Money Concepts', priority: 4, status: 'ACTIVE', description: 'Targets liquidity zones and smart-money structure in FX.' },
    { id: 'forex-breakout-momentum', name: 'Breakout & Momentum Bot', market: 'FOREX', strategy: 'Breakout Momentum', priority: 5, status: 'ACTIVE', description: 'Captures strong directional expansion in high-volatility FX sessions.' },
    { id: 'forex-mean-reversion', name: 'Mean Reversion Bot', market: 'FOREX', strategy: 'Statistical Mean Reversion', priority: 6, status: 'PAPER', description: 'Trades stretched FX conditions with statistical reset logic.' },
    { id: 'forex-fundamental-news', name: 'News & Fundamental Intelligence Bot', market: 'FOREX', strategy: 'Macro News Reaction', priority: 7, status: 'HOLD', description: 'Reacts to macro events and news-driven FX volatility.' },
    { id: 'forex-quant-ai', name: 'Quantitative AI Bot', market: 'FOREX', strategy: 'Quantitative Signal Engine', priority: 8, status: 'ACTIVE', description: 'Signals with model confidence filtering and regime adaptation.' },

    { id: 'deriv-synthetic-sniper', name: 'Synthetic Market Sniper', market: 'DERIV', strategy: 'Synthetic Sniper Strategy', priority: 9, status: 'ACTIVE', description: 'Targets synthetic markets with precision entry logic.' },
    { id: 'deriv-super-scalping', name: 'Super Scalping Bot', market: 'DERIV', strategy: 'Super Scalping Strategy', priority: 10, status: 'ACTIVE', description: 'Fast execution for synthetic index micro-structure.' },
    { id: 'deriv-volatility-adaptive', name: 'Volatility Adaptive Bot', market: 'DERIV', strategy: 'Adaptive Volatility Breakout', priority: 11, status: 'PAPER', description: 'Adjust risk and sizing around synthetic volatility bursts.' },
    { id: 'deriv-boom-crash-intelligence', name: 'Boom & Crash Intelligence Bot', market: 'DERIV', strategy: 'Boom Crash Regime Filter', priority: 12, status: 'ACTIVE', description: 'Detects high-impulse synthetic moves and regime shifts.' },
    { id: 'deriv-digit-intelligence', name: 'Digit Intelligence Bot', market: 'DERIV', strategy: 'Digit Probability Engine', priority: 13, status: 'ACTIVE', description: 'Uses distribution probability logic for synthetic digit setups.' },
    { id: 'deriv-reversal-hunter', name: 'Reversal Hunter Bot', market: 'DERIV', strategy: 'Reversal Hunter', priority: 14, status: 'ACTIVE', description: 'Seeks structurally exhausted trend conditions on synthetic markets.' },
    { id: 'deriv-trend-momentum', name: 'Trend & Momentum Bot', market: 'DERIV', strategy: 'Trend Momentum Engine', priority: 15, status: 'ACTIVE', description: 'Follows clean directional momentum in synthetic indices.' },
    { id: 'deriv-pattern-recognition', name: 'Pattern Recognition Bot', market: 'DERIV', strategy: 'Pattern Recognition', priority: 16, status: 'ACTIVE', description: 'Recognizes repeated chart structures and breakout triggers.' },

    { id: 'metals-gold-sniper', name: 'Gold XAUUSD Sniper', market: 'METALS', strategy: 'Gold Sniper Strategy', priority: 17, status: 'ACTIVE', description: 'Optimized for gold intraday structure and reaction zones.' },
    { id: 'metals-super-scalping', name: 'Super Scalping Bot', market: 'METALS', strategy: 'Super Scalping Strategy', priority: 18, status: 'ACTIVE', description: 'Micro-trend execution for metals with rapid adaptation.' },
    { id: 'metals-silver-intelligence', name: 'Silver XAGUSD Intelligence', market: 'METALS', strategy: 'Silver Intelligence', priority: 19, status: 'PAPER', description: 'Combines momentum and macro context for silver trades.' },
    { id: 'metals-adaptive-trend-rider', name: 'Adaptive Trend Rider', market: 'METALS', strategy: 'Adaptive Trend Engine', priority: 20, status: 'ACTIVE', description: 'Adjusts to metals volatility and breakout quality.' },
    { id: 'metals-liquidity-hunter', name: 'Institutional Liquidity Hunter', market: 'METALS', strategy: 'Liquidity Sweep Strategy', priority: 21, status: 'ACTIVE', description: 'Tracks high-impact zones in metals.' },
    { id: 'metals-breakout-reversal', name: 'Breakout & Reversal Bot', market: 'METALS', strategy: 'Breakout Reversal', priority: 22, status: 'ACTIVE', description: 'Captures continuation and reversal in metals.' },
    { id: 'metals-macro-news', name: 'Macro & News Intelligence Bot', market: 'METALS', strategy: 'Macro Event Strategy', priority: 23, status: 'HOLD', description: 'Aligns metals price action with macro and event risks.' },
    { id: 'metals-quant-ai', name: 'Metals Quantitative AI Bot', market: 'METALS', strategy: 'Metals Quant Model', priority: 24, status: 'PAPER', description: 'Statistical and adaptive model outputs for metals.' },

    { id: 'crypto-sniper', name: 'Crypto Institutional Sniper', market: 'CRYPTO', strategy: 'Institutional Crypto Sniper', priority: 25, status: 'ACTIVE', description: 'High-quality entry model for liquid crypto structures.' },
    { id: 'crypto-super-scalping', name: 'Super Scalping Bot', market: 'CRYPTO', strategy: 'Crypto Super Scalping', priority: 26, status: 'ACTIVE', description: 'Rapid execution on micro structure and intraday impulse.' },
    { id: 'crypto-adaptive-trend', name: 'Adaptive Trend Following Bot', market: 'CRYPTO', strategy: 'Adaptive Directional Trend', priority: 27, status: 'ACTIVE', description: 'Switches between trend and consolidation logic in crypto.' },
    { id: 'crypto-orderflow-liquidity', name: 'Order Flow & Liquidity Bot', market: 'CRYPTO', strategy: 'Order Flow Imbalance', priority: 28, status: 'ACTIVE', description: 'Uses microstructure and order-flow imbalance cues.' },
    { id: 'crypto-momentum', name: 'Momentum Explosion Bot', market: 'CRYPTO', strategy: 'Momentum Explosion', priority: 29, status: 'ACTIVE', description: 'Scans for acceleration, impulse and breakout momentum.' },
    { id: 'crypto-reversion', name: 'Mean Reversion Bot', market: 'CRYPTO', strategy: 'Crypto Mean Reversion', priority: 30, status: 'PAPER', description: 'Reversion entries during de-risking and exhaustion events.' },
    { id: 'crypto-arbitrage', name: 'Arbitrage Intelligence Bot', market: 'CRYPTO', strategy: 'Arbitrage Intelligence', priority: 31, status: 'HOLD', description: 'Captures spread and route inefficiency with risk controls.' },
    { id: 'crypto-swing', name: 'Swing & Position Trading Bot', market: 'CRYPTO', strategy: 'Swing Position Engine', priority: 32, status: 'ACTIVE', description: 'Balances macro trend conviction with risk-managed position sizing.' },

    { id: 'commodities-balance-bot', name: 'Commodities Institutional Pulse Bot', market: 'COMMODITIES', strategy: 'Baseline Commodities Structure', priority: 33, status: 'ACTIVE', description: 'Measures broad commodity structure and regime quality.' },
    { id: 'commodities-super-scalp', name: 'Commodities Super Scalping Bot', market: 'COMMODITIES', strategy: 'Commodity Micro Trend', priority: 34, status: 'PAPER', description: 'Optimized for low-latency commodity micro trend detection.' },
    { id: 'commodities-trend-bot', name: 'Commodities Trend & Momentum Bot', market: 'COMMODITIES', strategy: 'Trend Following', priority: 35, status: 'ACTIVE', description: 'Tracks directional price pulses across commodities.' },
    { id: 'commodities-breakout-bot', name: 'Commodities Breakout Bot', market: 'COMMODITIES', strategy: 'Breakout Confirmation', priority: 36, status: 'ACTIVE', description: 'Follows momentum expansion and confirmation triggers.' },
    { id: 'commodities-reversal-bot', name: 'Commodities Reversal Bot', market: 'COMMODITIES', strategy: 'Reversal Hunter', priority: 37, status: 'PAPER', description: 'Targets failed breakouts and exhaustion in commodities.' },
    { id: 'commodities-news-bot', name: 'Commodities News Intelligence Bot', market: 'COMMODITIES', strategy: 'Macro News Flow', priority: 38, status: 'HOLD', description: 'Uses supply shock and macro scheduling signals.' },
    { id: 'commodities-liquidity-bot', name: 'Commodities Liquidity Bot', market: 'COMMODITIES', strategy: 'Liquidity Sweep Filter', priority: 39, status: 'ACTIVE', description: 'Filters false momentum with liquidity sweep detection.' },
    { id: 'commodities-quant-bot', name: 'Commodities Quantitative AI Bot', market: 'COMMODITIES', strategy: 'Quantitative Regime Model', priority: 40, status: 'ACTIVE', description: 'Evaluates cycle and regime strength for commodities.' },

    { id: 'indices-structure-bot', name: 'Indices Institutional Structure Bot', market: 'INDICES', strategy: 'Index Structure Strategy', priority: 41, status: 'ACTIVE', description: 'Measures index structure and regime alignment.' },
    { id: 'indices-super-scalp-bot', name: 'Indices Super Scalping Bot', market: 'INDICES', strategy: 'Index Micro Trend', priority: 42, status: 'ACTIVE', description: 'Fast reaction to broad market short-term movement.' },
    { id: 'indices-breakout-bot', name: 'Indices Breakout & Momentum Bot', market: 'INDICES', strategy: 'Breakout Momentum', priority: 43, status: 'ACTIVE', description: 'Builds conviction around index acceleration and continuation.' },
    { id: 'indices-reversal-bot', name: 'Indices Reversal Hunter', market: 'INDICES', strategy: 'Market Reversal', priority: 44, status: 'PAPER', description: 'Targets failed continuation and exhaustion in index trading.' },
    { id: 'indices-liquid-bot', name: 'Indices Liquidity Intel Bot', market: 'INDICES', strategy: 'Liquidity Sweep Strategy', priority: 45, status: 'ACTIVE', description: 'Scans liquidity pockets for index-based entries.' },
    { id: 'indices-trend-bot', name: 'Indices Trend & Momentum Bot', market: 'INDICES', strategy: 'Trend Momentum Engine', priority: 46, status: 'ACTIVE', description: 'Tracks index trend quality and continuation energy.' },
    { id: 'indices-hedge-bot', name: 'Indices Portfolio Hedge Bot', market: 'INDICES', strategy: 'Dynamic Hedging', priority: 47, status: 'HOLD', description: 'Reduces systemic risk during broad drawdown conditions.' },
    { id: 'indices-quant-bot', name: 'Indices Quantitative AI Bot', market: 'INDICES', strategy: 'Index Quant Model', priority: 48, status: 'ACTIVE', description: 'Integrates statistical model filtering for index structures.' },

    { id: 'stocks-institutional-swing', name: 'Stocks Institutional Swing Bot', market: 'STOCKS', strategy: 'Equity Swing & Momentum', priority: 49, status: 'ACTIVE', description: 'Built for stock trend strength, earnings risk and breakout conviction.' },
    { id: 'stocks-super-scalp', name: 'Stocks Super Scalping Bot', market: 'STOCKS', strategy: 'Equity Micro Trend', priority: 50, status: 'PAPER', description: 'Short-term stock rotation and intraday microstructure logic.' },
    { id: 'stocks-breakout-momentum', name: 'Stocks Breakout Momentum Bot', market: 'STOCKS', strategy: 'Breakout Momentum', priority: 51, status: 'ACTIVE', description: 'Captures sustained stock breakouts with confirmation filters.' },
    { id: 'stocks-earnings-sentinel', name: 'Earnings Sentinel Bot', market: 'STOCKS', strategy: 'Earnings Risk Filter', priority: 52, status: 'HOLD', description: 'Filters stock setups around catalysts and volatility spikes.' },
    { id: 'stocks-value-rotation', name: 'Value Rotation Bot', market: 'STOCKS', strategy: 'Sector Rotation & Relative Strength', priority: 53, status: 'ACTIVE', description: 'Tracks sector rotation and relative strength across equities.' },
    { id: 'stocks-liquidity-sniper', name: 'Stocks Liquidity Sniper', market: 'STOCKS', strategy: 'Equity Liquidity Sweep', priority: 54, status: 'ACTIVE', description: 'Targets stock liquidity zones and institutional absorption.' },
    { id: 'stocks-mean-reversion', name: 'Stocks Mean Reversion Bot', market: 'STOCKS', strategy: 'Equity Mean Reversion', priority: 55, status: 'PAPER', description: 'Flags overextended stock conditions for corrective entries.' },
    { id: 'stocks-quant-ai', name: 'Stocks Quant AI Bot', market: 'STOCKS', strategy: 'Equity Quant Model', priority: 56, status: 'ACTIVE', description: 'Statistical and adaptive model for equities and rotation conditions.' },
];

export const getBotsByMarket = (market: MarketGroup) => botRegistry.filter(bot => bot.market === market);
export const getActiveBots = () => botRegistry.filter(bot => bot.status === 'ACTIVE');
