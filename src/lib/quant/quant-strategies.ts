import type { IndicatorContext, IndicatorSignal } from './quant-indicators';

export interface QuantStrategyInput extends IndicatorContext {
    market: string;
    strategyName: string;
    sourceState: string;
    riskScore: number;
}

export interface QuantStrategyResult {
    strategyName: string;
    market: string;
    signal: 'BUY' | 'SELL' | 'WAIT';
    confidence: number;
    score: number;
    reasons: string[];
    status: 'APPROVED' | 'REVIEW' | 'REJECTED';
}

export const quantStrategyFactory = (strategyName: string) => ({
    strategyName,
    market: 'FOREX',
    sourceState: 'LIVE',
    riskScore: 0,
} as QuantStrategyInput);

export const evaluateQuantStrategy = (input: QuantStrategyInput): QuantStrategyResult => {
    const signals = [
        input.emaFast > input.emaSlow ? 1 : -1,
        input.rsi > 60 ? 1 : input.rsi < 40 ? -1 : 0,
        input.macd > input.signalLine ? 1 : -1,
        input.price > input.vwap ? 1 : -1,
        input.volumeDelta > 0.2 ? 1 : input.volumeDelta < -0.2 ? -1 : 0,
        input.liquidity > 0.6 ? 1 : 0,
    ];

    const score = signals.reduce((sum, item) => sum + item, 0);
    const direction: 'BUY' | 'SELL' | 'WAIT' =
        score >= 4 ? 'BUY' : score <= -4 ? 'SELL' : 'WAIT';

    const confidence = Math.min(0.99, Math.max(0.4, (Math.abs(score) / signals.length) * 0.9 + 0.28));
    const reasons = [
        `Trend pulse: ${input.emaFast > input.emaSlow ? 'bullish' : 'bearish'}`,
        `RSI: ${input.rsi}`,
        `VWAP distance: ${input.price - input.vwap}`,
        `Volume delta: ${input.volumeDelta}`,
    ];

    const status =
        direction === 'WAIT' || input.riskScore > 75 || ['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(input.sourceState)
            ? 'REVIEW'
            : confidence > 0.7
              ? 'APPROVED'
              : 'REVIEW';

    return {
        strategyName: input.strategyName,
        market: input.market,
        signal: direction,
        confidence,
        score,
        reasons,
        status,
    };
};
