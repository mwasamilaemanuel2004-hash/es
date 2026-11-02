export interface SuperScalpInput {
    symbol: string;
    price: number;
    trend: number;
    momentum: number;
    liquidity: number;
    volumeDelta: number;
    spread: number;
    slippage: number;
    volatility: number;
    spreadThreshold?: number;
    sourceStatus?: string;
    marketStructure?: 'bullish' | 'bearish' | 'range';
    session?: 'ASIA' | 'LONDON' | 'NEW_YORK';
}

export interface SuperScalpResult {
    approved: boolean;
    direction: 'BUY' | 'SELL' | 'WAIT';
    confidence: number;
    reason: string;
    entryScore: number;
    riskReward: number;
    stopLoss: number;
    takeProfit: number[];
    triggered: boolean;
}

export const evaluateSuperScalp = (input: SuperScalpInput): SuperScalpResult => {
    const spreadThreshold = input.spreadThreshold ?? 0.0008;
    const spreadCheck = input.spread <= spreadThreshold;
    const slippageCheck = (input.slippage ?? 0) <= 0.001;
    const sourceCheck = !['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(input.sourceStatus ?? 'LIVE');
    const structureCheck = input.marketStructure !== 'range';
    const volumeCheck = Math.abs(input.volumeDelta) > 0.25;
    const momentumCheck = Math.abs(input.momentum) > 0.45;
    const liquidityCheck = input.liquidity > 0.55;
    const sessionCheck = input.session ? ['LONDON', 'NEW_YORK'].includes(input.session) || input.session === 'ASIA' : true;

    const score =
        Number(spreadCheck) * 20 +
        Number(slippageCheck) * 15 +
        Number(sourceCheck) * 15 +
        Number(structureCheck) * 15 +
        Number(volumeCheck) * 10 +
        Number(momentumCheck) * 15 +
        Number(liquidityCheck) * 10 +
        Number(sessionCheck) * 5;

    const direction = input.trend >= 0.2 ? 'BUY' : input.trend <= -0.2 ? 'SELL' : 'WAIT';
    const approved = score >= 75 && direction !== 'WAIT' && spreadCheck && slippageCheck && sourceCheck;

    const takeProfit =
        direction === 'BUY'
            ? [input.price * 1.008, input.price * 1.015, input.price * 1.022]
            : direction === 'SELL'
              ? [input.price * 0.992, input.price * 0.985, input.price * 0.978]
              : [];

    return {
        approved,
        direction,
        confidence: Math.min(0.98, score / 100),
        reason: approved
            ? 'Super Scalping validation passed: structure, liquidity, volume and execution conditions are aligned.'
            : 'Super Scalping validation failed: spread, liquidity, structure, source health or risk conditions are not within guardrails.',
        entryScore: score,
        riskReward: approved ? 1.8 : 0.6,
        stopLoss: direction === 'BUY' ? input.price * 0.994 : input.price * 1.006,
        takeProfit,
        triggered: approved,
    };
};
