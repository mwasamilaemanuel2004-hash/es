export type AdaptiveRegime = 'TREND' | 'RANGE' | 'BREAKOUT' | 'VOLATILITY' | 'NEWS' | 'CRISIS';

export interface AdaptiveInput {
    volatility: number;
    trendStrength: number;
    liquidity: number;
    volumeDelta: number;
    spread: number;
    momentum: number;
    marketRegime: AdaptiveRegime;
    session: 'ASIA' | 'LONDON' | 'NEW_YORK';
    confidence: number;
}

export interface AdaptiveDecision {
    timeframe: 'M1' | 'M3' | 'M5' | 'M15' | 'H1';
    regime: AdaptiveRegime;
    confidence: number;
    signalBias: 'BUY' | 'SELL' | 'WAIT';
    riskMultiplier: number;
    frequency: 'LOW' | 'MEDIUM' | 'HIGH';
    parameterProfile: {
        atrMultiplier: number;
        momentumFilter: number;
        spreadFilter: number;
    };
    adaptationNote: string;
}

export const buildAdaptiveDecision = (input: AdaptiveInput): AdaptiveDecision => {
    const regime =
        input.volatility > 0.82 ? 'VOLATILITY' :
        input.trendStrength > 0.7 ? 'TREND' :
        input.liquidity < 0.45 ? 'RANGE' :
        input.volumeDelta > 0.8 ? 'BREAKOUT' :
        input.marketRegime === 'NEWS' ? 'NEWS' :
        'TREND';

    const timeframe =
        regime === 'VOLATILITY' || regime === 'BREAKOUT' ? 'M1' :
        regime === 'TREND' ? 'M5' :
        regime === 'NEWS' ? 'M3' :
        'M15';

    const signalBias =
        input.momentum > 0.6 && input.liquidity > 0.55 ? 'BUY' :
        input.momentum < -0.6 && input.liquidity > 0.55 ? 'SELL' :
        'WAIT';

    const confidence = Math.min(0.98, Math.max(0.2, input.confidence + (input.trendStrength * 0.2) - (input.spread * 10)));
    const riskMultiplier =
        regime === 'VOLATILITY' ? 0.65 :
        regime === 'BREAKOUT' ? 0.8 :
        regime === 'NEWS' ? 0.55 :
        1;

    const frequency =
        regime === 'VOLATILITY' || regime === 'BREAKOUT' ? 'HIGH' :
        regime === 'RANGE' ? 'LOW' :
        'MEDIUM';

    return {
        timeframe,
        regime,
        confidence,
        signalBias,
        riskMultiplier,
        frequency,
        parameterProfile: {
            atrMultiplier: regime === 'VOLATILITY' ? 1.6 : regime === 'TREND' ? 1.2 : 1,
            momentumFilter: regime === 'RANGE' ? 0.7 : 0.55,
            spreadFilter: regime === 'VOLATILITY' ? 0.0005 : 0.0008,
        },
        adaptationNote: `Adaptive intelligence adjusted to ${regime} conditions in ${input.session} session with volatility-aware scaling.`,
    };
};
