export type RiskBand = 'low' | 'medium' | 'high';

export type CapitalGuardState = {
    exposurePct: number;
    drawdownPct: number;
    volatilityPct: number;
    liquidityBuffer: number;
    riskBand: RiskBand;
};

export const buildCapitalGuard = (
    exposurePct: number,
    drawdownPct: number,
    volatilityPct: number,
    liquidityBuffer: number
): CapitalGuardState => {
    const riskBand: RiskBand =
        exposurePct > 60 || drawdownPct > 12 || volatilityPct > 20 ? 'high' :
        exposurePct > 40 || drawdownPct > 8 || volatilityPct > 12 ? 'medium' : 'low';

    return {
        exposurePct,
        drawdownPct,
        volatilityPct,
        liquidityBuffer,
        riskBand,
    };
};

export const riskPolicy = {
    maxExposurePct: 55,
    maxDrawdownPct: 10,
    minLiquidityBufferUsd: 150000,
    preferredRiskBand: 'medium' as RiskBand,
};

export const shouldReduceExposure = (state: CapitalGuardState) =>
    state.exposurePct > riskPolicy.maxExposurePct ||
    state.drawdownPct > riskPolicy.maxDrawdownPct ||
    state.liquidityBuffer < riskPolicy.minLiquidityBufferUsd;

export const summarizeCapitalGuard = (state: CapitalGuardState) => {
    if (shouldReduceExposure(state)) {
        return 'Reduce exposure and raise liquidity buffer before adding new positions.';
    }

    return 'System remains within acceptable risk tolerance and can continue monitoring.';
};
