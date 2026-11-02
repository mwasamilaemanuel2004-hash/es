export type MarketGroup = 'FOREX' | 'DERIV' | 'METALS' | 'CRYPTO' | 'COMMODITIES' | 'INDICES';

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
    { id: 'forex-institutional-sniper', name: 'Institutional Sniper Bot', market: 'FOREX', strategy: 'Institutional Sniper Strategy', priority: 1, status: 'ACTIVE', description: 'Precision entries with liquidity and structure confirmation.' },
    { id: 'forex-super-scalping', name: 'Super Scalping Bot', market: 'FOREX', strategy: 'Super Scalping Strategy', priority: 2, status: 'ACTIVE', description: 'M1/M3/M5 ultra-short momentum and depth-based execution.' },
    { id: 'forex-adaptive-trend-rider', name: 'Adaptive Trend Rider', market: 'FOREX', strategy: 'Adaptive Trend Following', priority: 3, status: 'PAPER', description: 'Dynamically adjusts to changing volatility and trend structure.' },
    { id: 'forex-smart-money-liquidity', name: 'Smart Money & Liquidity Bot', market: 'FOREX', strategy: 'Smart Money Concepts', priority: 4, status: 'ACTIVE', description: 'Targets liquidity zones and institutional ordering flow.' },
    { id: 'forex-breakout-momentum', name: 'Breakout & Momentum Bot', market: 'FOREX', strategy: 'Breakout Momentum', priority: 5, status: 'ACTIVE', description: 'Captures strong directional expansion after release events.' },
    { id: 'forex-mean-reversion', name: 'Mean Reversion Bot', market: 'FOREX', strategy: 'Statistical Mean Reversion', priority: 6, status: 'PAPER', description: 'Trades statistically stretched moves back toward fair value.' },
    { id: 'forex-fundamental-news', name: 'News & Fundamental Intelligence Bot', market: 'FOREX', strategy: 'Macro News Reaction', priority: 7, status: 'HOLD', description: 'Reacts to economic events and volatility expansion.' },
    { id: 'forex-quant-ai', name: 'Quantitative AI Bot', market: 'FOREX', strategy: 'Quantitative Signal Engine', priority: 8, status: 'ACTIVE', description: 'Uses statistical filtering and model-based confirmation.' },

    { id: 'deriv-synthetic-sniper', name: 'Synthetic Market Sniper', market: 'DERIV', strategy: 'Synthetic Sniper Strategy', priority: 9, status: 'ACTIVE', description: 'Targets synthetic market structure and volatility bursts.' },
    { id: 'deriv-super-scalping', name: 'Super Scalping Bot', market: 'DERIV', strategy: 'Super Scalping Strategy', priority: 10, status: 'ACTIVE', description: 'Fast execution for synthetic indices and micro swings.' },
    { id: 'deriv-volatility-adaptive', name: 'Volatility Adaptive Bot', market: 'DERIV', strategy: 'Adaptive Volatility Breakout', priority: 11, status: 'PAPER', description: 'Tails risk and sizing to rapid volatility shifts.' },
    { id: 'deriv-boom-crash-intelligence', name: 'Boom & Crash Intelligence Bot', market: 'DERIV', strategy: 'Boom Crash Regime Filter', priority: 12, status: 'ACTIVE', description: 'Detects high-volatility pattern conditions for index contracts.' },
    { id: 'deriv-digit-intelligence', name: 'Digit Intelligence Bot', market: 'DERIV', strategy: 'Digit Probability Engine', priority: 13, status: 'ACTIVE', description: 'Uses contract probability and timing models for digit markets.' },
    { id: 'deriv-reversal-hunter', name: 'Reversal Hunter Bot', market: 'DERIV', strategy: 'Reversal Hunter', priority: 14, status: 'ACTIVE', description: 'Seeks structurally exhausted trend conditions.' },
    { id: 'deriv-trend-momentum', name: 'Trend & Momentum Bot', market: 'DERIV', strategy: 'Trend Momentum Engine', priority: 15, status: 'ACTIVE', description: 'Follows clean directional momentum after confirmation.' },
    { id: 'deriv-pattern-recognition', name: 'Pattern Recognition Bot', market: 'DERIV', strategy: 'Pattern Recognition', priority: 16, status: 'ACTIVE', description: 'Uses chart structure recognition and signal clustering.' },

    { id: 'metals-gold-sniper', name: 'Gold XAUUSD Sniper', market: 'METALS', strategy: 'Gold Sniper Strategy', priority: 17, status: 'ACTIVE', description: 'Optimized for gold intraday structure and sessions.' },
    { id: 'metals-super-scalping', name: 'Super Scalping Bot', market: 'METALS', strategy: 'Super Scalping Strategy', priority: 18, status: 'ACTIVE', description: 'Micro-trend execution for metals with low latency focus.' },
    { id: 'metals-silver-intelligence', name: 'Silver XAGUSD Intelligence', market: 'METALS', strategy: 'Silver Intelligence', priority: 19, status: 'PAPER', description: 'Combines momentum and fundamental context for metals.' },
    { id: 'metals-adaptive-trend-rider', name: 'Adaptive Trend Rider', market: 'METALS', strategy: 'Adaptive Trend Engine', priority: 20, status: 'ACTIVE', description: 'Adjusts to volatility and session shifts in metals.' },
    { id: 'metals-liquidity-hunter', name: 'Institutional Liquidity Hunter', market: 'METALS', strategy: 'Liquidity Sweep Strategy', priority: 21, status: 'ACTIVE', description: 'Tracks high-impact liquidity zones and sweeps.' },
    { id: 'metals-breakout-reversal', name: 'Breakout & Reversal Bot', market: 'METALS', strategy: 'Breakout Reversal', priority: 22, status: 'ACTIVE', description: 'Captures continuation and reversal after technical release.' },
    { id: 'metals-macro-news', name: 'Macro & News Intelligence Bot', market: 'METALS', strategy: 'Macro Event Strategy', priority: 23, status: 'HOLD', description: 'Aligns price action with macro headlines and event risks.' },
    { id: 'metals-quant-ai', name: 'Metals Quantitative AI Bot', market: 'METALS', strategy: 'Metals Quant Model', priority: 24, status: 'PAPER', description: 'Statistical and adaptive model output for precious metals.' },

    { id: 'crypto-sniper', name: 'Crypto Institutional Sniper', market: 'CRYPTO', strategy: 'Institutional Crypto Sniper', priority: 25, status: 'ACTIVE', description: 'High-quality entry model for crypto volatility expansion.' },
    { id: 'crypto-super-scalping', name: 'Super Scalping Bot', market: 'CRYPTO', strategy: 'Crypto Super Scalping', priority: 26, status: 'ACTIVE', description: 'Rapid execution on micro structure and momentum acceleration.' },
    { id: 'crypto-adaptive-trend', name: 'Adaptive Trend Following Bot', market: 'CRYPTO', strategy: 'Adaptive Directional Trend', priority: 27, status: 'ACTIVE', description: 'Switches between trend and volatility-optimized modes.' },
    { id: 'crypto-orderflow-liquidity', name: 'Order Flow & Liquidity Bot', market: 'CRYPTO', strategy: 'Order Flow Imbalance', priority: 28, status: 'ACTIVE', description: 'Uses microstructure and throughput patterns.' },
    { id: 'crypto-momentum', name: 'Momentum Explosion Bot', market: 'CRYPTO', strategy: 'Momentum Explosion', priority: 29, status: 'ACTIVE', description: 'Scans for acceleration, impulse and breakout conditions.' },
    { id: 'crypto-reversion', name: 'Mean Reversion Bot', market: 'CRYPTO', strategy: 'Crypto Mean Reversion', priority: 30, status: 'PAPER', description: 'Reversion style entries during de-risking episodes.' },
    { id: 'crypto-arbitrage', name: 'Arbitrage Intelligence Bot', market: 'CRYPTO', strategy: 'Arbitrage Intelligence', priority: 31, status: 'HOLD', description: 'Captures spread and route inefficiency across venues.' },
    { id: 'crypto-swing', name: 'Swing & Position Trading Bot', market: 'CRYPTO', strategy: 'Swing Position Engine', priority: 32, status: 'ACTIVE', description: 'Balances macro trend conviction with risk controls.' },

    { id: 'commodities-balance-bot', name: 'Commodities Institutional Pulse Bot', market: 'COMMODITIES', strategy: 'Baseline Commodities Structure', priority: 33, status: 'ACTIVE', description: 'Manages macro commodity structure and continuation moves.' },
    { id: 'commodities-super-scalp', name: 'Commodities Super Scalping Bot', market: 'COMMODITIES', strategy: 'Commodity Micro Trend', priority: 34, status: 'PAPER', description: 'Optimized for low-latency commodity microstructure.' },
    { id: 'commodities-trend-bot', name: 'Commodities Trend & Momentum Bot', market: 'COMMODITIES', strategy: 'Trend Following', priority: 35, status: 'ACTIVE', description: 'Tracks directional persistence with volatility-aware risk.' },
    { id: 'commodities-breakout-bot', name: 'Commodities Breakout Bot', market: 'COMMODITIES', strategy: 'Breakout Confirmation', priority: 36, status: 'ACTIVE', description: 'Follows momentum expansion beyond defined ranges.' },
    { id: 'commodities-reversal-bot', name: 'Commodities Reversal Bot', market: 'COMMODITIES', strategy: 'Reversal Hunter', priority: 37, status: 'PAPER', description: 'Targets failed breakouts and distribution zones.' },
    { id: 'commodities-news-bot', name: 'Commodities News Intelligence Bot', market: 'COMMODITIES', strategy: 'Macro News Flow', priority: 38, status: 'HOLD', description: 'Uses supply-shock and macro event analysis.' },
    { id: 'commodities-liquidity-bot', name: 'Commodities Liquidity Bot', market: 'COMMODITIES', strategy: 'Liquidity Sweep Filter', priority: 39, status: 'ACTIVE', description: 'Cleans out false breakouts using depth and sweep logic.' },
    { id: 'commodities-quant-bot', name: 'Commodities Quantitative AI Bot', market: 'COMMODITIES', strategy: 'Quantitative Regime Model', priority: 40, status: 'ACTIVE', description: 'Evaluates cyclicality and statistical relationship changes.' },

    { id: 'indices-structure-bot', name: 'Indices Institutional Structure Bot', market: 'INDICES', strategy: 'Index Structure Strategy', priority: 41, status: 'ACTIVE', description: 'Measures index trend structure and broad-market context.' },
    { id: 'indices-super-scalp-bot', name: 'Indices Super Scalping Bot', market: 'INDICES', strategy: 'Index Micro Trend', priority: 42, status: 'ACTIVE', description: 'Fast reaction to broad market microstructure and liquidity events.' },
    { id: 'indices-breakout-bot', name: 'Indices Breakout & Momentum Bot', market: 'INDICES', strategy: 'Breakout Momentum', priority: 43, status: 'ACTIVE', description: 'Builds conviction around broad-market regime shift.' },
    { id: 'indices-reversal-bot', name: 'Indices Reversal Hunter', market: 'INDICES', strategy: 'Market Reversal', priority: 44, status: 'PAPER', description: 'Targets failed continuation and exhausted momentum.' },
    { id: 'indices-liquid-bot', name: 'Indices Liquidity Intel Bot', market: 'INDICES', strategy: 'Liquidity Sweep Strategy', priority: 45, status: 'ACTIVE', description: 'Scans liquidity pockets and broad-market depth signals.' },
    { id: 'indices-trend-bot', name: 'Indices Trend & Momentum Bot', market: 'INDICES', strategy: 'Trend Momentum Engine', priority: 46, status: 'ACTIVE', description: 'Tracks index trend quality and acceleration.' },
    { id: 'indices-hedge-bot', name: 'Indices Portfolio Hedge Bot', market: 'INDICES', strategy: 'Dynamic Hedging', priority: 47, status: 'HOLD', description: 'Reduces systemic risk during broad drawdown periods.' },
    { id: 'indices-quant-bot', name: 'Indices Quantitative AI Bot', market: 'INDICES', strategy: 'Index Quant Model', priority: 48, status: 'ACTIVE', description: 'Integrates statistical model filtering with market structure.' },
];

export const getBotsByMarket = (market: MarketGroup) => botRegistry.filter(bot => bot.market === market);
export const getActiveBots = () => botRegistry.filter(bot => bot.status === 'ACTIVE');
