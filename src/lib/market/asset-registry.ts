export type AssetClass = 'crypto' | 'forex' | 'metals' | 'commodities' | 'stocks' | 'indices';

export type AssetItem = {
    symbol: string;
    market: AssetClass | 'Deriv' | 'Binance' | 'MT5';
    label: string;
    price: string;
    change: string;
    volume: string;
    trend: 'Bullish' | 'Neutral' | 'Bearish';
    signal: string;
};

export const assetClassCatalog: Record<AssetClass, { label: string; color: string }> = {
    crypto: { label: 'Crypto', color: '#54d7d0' },
    forex: { label: 'Forex', color: '#7aa2ff' },
    metals: { label: 'Metals', color: '#f4c95d' },
    commodities: { label: 'Commodities', color: '#ff9f6e' },
    stocks: { label: 'Stocks', color: '#c084fc' },
    indices: { label: 'Indices', color: '#94a3b8' },
};

export const defaultWatchlist: AssetItem[] = [
    { symbol: 'BTC/USD', market: 'crypto', label: 'Bitcoin', price: '$68,420', change: '+3.84%', volume: '$28.4B', trend: 'Bullish', signal: 'Breakout' },
    { symbol: 'ETH/USD', market: 'crypto', label: 'Ethereum', price: '$3,480', change: '+2.56%', volume: '$12.8B', trend: 'Bullish', signal: 'Momentum' },
    { symbol: 'EUR/USD', market: 'forex', label: 'Euro / Dollar', price: '1.0842', change: '+0.21%', volume: '$2.1T', trend: 'Bullish', signal: 'Trend' },
    { symbol: 'XAU/USD', market: 'metals', label: 'Gold', price: '$2,410', change: '+1.14%', volume: '$9.3B', trend: 'Bullish', signal: 'Safe haven' },
    { symbol: 'WTI', market: 'commodities', label: 'WTI Crude', price: '$79.80', change: '-0.72%', volume: '$4.1B', trend: 'Bearish', signal: 'Supply' },
    { symbol: 'NASDAQ', market: 'indices', label: 'NASDAQ 100', price: '18,920', change: '+1.96%', volume: '$4.8B', trend: 'Bullish', signal: 'Risk on' },
    { symbol: 'AAPL', market: 'stocks', label: 'Apple', price: '$214.36', change: '+1.08%', volume: '$2.7B', trend: 'Bullish', signal: 'Earnings' },
];

export const assetAllocation = [
    { name: 'Crypto', value: 32, color: '#54d7d0' },
    { name: 'Forex', value: 24, color: '#7aa2ff' },
    { name: 'Metals', value: 18, color: '#f4c95d' },
    { name: 'Indices', value: 16, color: '#ff9f6e' },
    { name: 'Stocks', value: 10, color: '#c084fc' },
];

export const signalFeed = [
    { title: 'Trend alignment', status: 'Strong', note: 'BTC and ETH remain above short-term VWAP', accent: 'positive' },
    { title: 'Macro regime', status: 'Risk-on', note: 'Equities and crypto are expanding together', accent: 'positive' },
    { title: 'Volatility pulse', status: 'Elevated', note: 'Gold and EUR are absorbing rate repricing', accent: 'warning' },
    { title: 'Capital guard', status: 'Protect', note: 'Reduce exposure if DXY rebounds above 105.2', accent: 'neutral' },
];

export const capitalRiskPanels = [
    { label: 'Net exposure', value: '42%', tone: 'good' },
    { label: 'Drawdown guard', value: '8.1%', tone: 'warning' },
    { label: 'Sharpe proxy', value: '1.74', tone: 'good' },
    { label: 'Liquidity buffer', value: '$180K', tone: 'neutral' },
];

export const portfolioMetrics = [
    { label: 'Portfolio value', value: '$1.42M', change: '+4.8%' },
    { label: 'Open P/L', value: '$117.2K', change: '+2.3%' },
    { label: 'Win rate', value: '68.4%', change: '+5.1%' },
    { label: 'Risk score', value: 'Moderate', change: '-1.2%' },
];

export const supportedProviders = ['deriv', 'binance', 'mt5', 'broker'] as const;
export type ProviderName = (typeof supportedProviders)[number];

export const providerLabels: Record<ProviderName, string> = {
    deriv: 'Deriv',
    binance: 'Binance',
    mt5: 'MT5 / MetaTrader',
    broker: 'Broker / FX Gateway',
};
