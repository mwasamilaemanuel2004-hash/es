export type QuantDirection = 'BUY' | 'SELL' | 'WAIT';

export interface IndicatorContext {
    price: number;
    emaFast: number;
    emaSlow: number;
    rsi: number;
    macd: number;
    signalLine: number;
    atr: number;
    vwap: number;
    volumeDelta: number;
    spread: number;
    liquidity: number;
    volatility: number;
}

export interface IndicatorSignal {
    name: string;
    value: number;
    direction: QuantDirection;
    strength: number;
}

export const computeEma = (fast: number, slow: number) => ({
    fastBias: fast > slow ? 1 : fast < slow ? -1 : 0,
    trend: fast > slow ? 'bullish' : fast < slow ? 'bearish' : 'neutral',
});

export const computeRsiSignal = (rsi: number): IndicatorSignal => ({
    name: 'RSI',
    value: rsi,
    direction: rsi > 70 ? 'SELL' : rsi < 30 ? 'BUY' : 'WAIT',
    strength: Math.abs(rsi - 50) / 50,
});

export const computeMacdSignal = (macd: number, signalLine: number): IndicatorSignal => ({
    name: 'MACD',
    value: macd - signalLine,
    direction: macd > signalLine ? 'BUY' : macd < signalLine ? 'SELL' : 'WAIT',
    strength: Math.abs(macd - signalLine),
});

export const computeAtrSignal = (atr: number, volatility: number): IndicatorSignal => ({
    name: 'ATR',
    value: atr,
    direction: volatility > 0.8 ? 'WAIT' : 'BUY',
    strength: volatility,
});

export const computeVwapSignal = (price: number, vwap: number): IndicatorSignal => ({
    name: 'VWAP',
    value: price - vwap,
    direction: price > vwap ? 'BUY' : price < vwap ? 'SELL' : 'WAIT',
    strength: Math.abs(price - vwap) / Math.max(vwap, 1),
});

export const computeVolumeSignal = (volumeDelta: number): IndicatorSignal => ({
    name: 'CVD',
    value: volumeDelta,
    direction: volumeDelta > 0.25 ? 'BUY' : volumeDelta < -0.25 ? 'SELL' : 'WAIT',
    strength: Math.abs(volumeDelta),
});

export const computeLiquiditySignal = (liquidity: number): IndicatorSignal => ({
    name: 'LIQUIDITY',
    value: liquidity,
    direction: liquidity > 0.6 ? 'BUY' : liquidity < 0.4 ? 'SELL' : 'WAIT',
    strength: Math.abs(liquidity - 0.5) * 2,
});

export const evaluateIndicatorBundle = (context: IndicatorContext): IndicatorSignal[] => [
    computeRsiSignal(context.rsi),
    computeMacdSignal(context.macd, context.signalLine),
    computeAtrSignal(context.atr, context.volatility),
    computeVwapSignal(context.price, context.vwap),
    computeVolumeSignal(context.volumeDelta),
    computeLiquiditySignal(context.liquidity),
];
