export type MaxAlgoSignal = 'BUY' | 'SELL' | 'WAIT';

export interface MaxAlgoSignalInput {
    price: number;
    ema200: number;
    rsi: number;
    volume: number;
    liquiditySweep: number;
    momentum: number;
    volatility: number;
    session?: 'ASIA' | 'LONDON' | 'NEW_YORK';
}

export interface StrategySignal {
    signal: MaxAlgoSignal;
    confidence: number;
    entryPrice?: number;
    stopLoss?: number;
    targets: number[];
    rationale: string[];
    strategy: 'MAXALGO_MOMENTUM';
}

export const maxAlgoStrategy = ({
    price,
    ema200,
    rsi,
    volume,
    liquiditySweep,
    momentum,
    volatility,
    session = 'LONDON',
}: MaxAlgoSignalInput): StrategySignal => {
    const momentumBias = momentum >= 1 ? 1 : -1;
    const priceAboveEma200 = price >= ema200;
    const trendOk = priceAboveEma200 && rsi > 55;
    const reversalOk = !priceAboveEma200 && rsi < 45;
    const volumeBubble = volume > 1.2;
    const liquidityBreak = liquiditySweep > 0.5;
    const chopFilter = volatility < 0.8;

    const sessionFilter = session === 'LONDON' || session === 'NEW_YORK';

    const signal: MaxAlgoSignal =
        trendOk && volumeBubble && liquidityBreak && chopFilter && sessionFilter ? 'BUY' :
        reversalOk && volumeBubble && liquidityBreak && chopFilter && sessionFilter ? 'SELL' :
        'WAIT';

    const confidence =
        signal === 'BUY'
            ? Math.min(0.95, 0.55 + (momentumBias > 0 ? 0.12 : 0) + (liquidityBreak ? 0.1 : 0) + (volumeBubble ? 0.08 : 0))
            : signal === 'SELL'
              ? Math.min(0.95, 0.57 + (momentumBias < 0 ? 0.12 : 0) + (liquidityBreak ? 0.1 : 0) + (volumeBubble ? 0.08 : 0))
              : 0.35;

    const entryPrice = price;
    const stopLoss = signal === 'BUY' ? price * 0.995 : price * 1.005;
    const targets =
        signal === 'BUY'
            ? [price * 1.015, price * 1.03, price * 1.045]
            : signal === 'SELL'
              ? [price * 0.985, price * 0.97, price * 0.955]
              : [];

    return {
        signal,
        confidence,
        entryPrice,
        stopLoss,
        targets,
        rationale: [
            `EMA 200 side: ${priceAboveEma200 ? 'bullish' : 'bearish'}`,
            `RSI trend: ${rsi}`,
            `Volume bubble: ${volumeBubble ? 'active' : 'inactive'}`,
            `Liquidity sweep: ${liquidityBreak ? 'confirmed' : 'not confirmed'}`,
            `Session filter: ${sessionFilter ? 'eligible' : 'filtered out'}`,
        ],
        strategy: 'MAXALGO_MOMENTUM',
    };
};
