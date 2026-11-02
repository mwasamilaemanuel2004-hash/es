export type RiskDecisionStatus = 'APPROVED' | 'REJECTED' | 'REDUCE' | 'PAUSE' | 'BLOCK' | 'EMERGENCY';

export interface RiskProfile {
    maxDrawdownPercent: number;
    maxExposurePercent: number;
    maxLeverage: number;
    maxCorrelation: number;
    minConfidence: number;
    emergencyExitThreshold: number;
    maxPositionSizePercent: number;
}

export interface RiskContext {
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
    equity: number;
    balance: number;
    freeMargin: number;
    drawdownPercent: number;
    exposurePercent: number;
    leverageUsed: number;
    correlationIndex: number;
    confidence: number;
    sourceStatus: 'LIVE' | 'PAPER' | 'BACKTEST' | 'UNKNOWN' | 'UNVERIFIED' | 'STALE' | 'DISCONNECTED' | 'UNAVAILABLE';
    volatility?: number;
    accountRiskPercent?: number;
    positionCount?: number;
    expectedLoss?: number;
}

export interface RiskDecision {
    status: RiskDecisionStatus;
    approved: boolean;
    reason: string;
    adjustedExposurePercent?: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    requiresManualReview?: boolean;
    emergencyMode?: boolean;
}

export const defaultRiskProfile: RiskProfile = {
    maxDrawdownPercent: 12,
    maxExposurePercent: 25,
    maxLeverage: 3,
    maxCorrelation: 0.75,
    minConfidence: 0.55,
    emergencyExitThreshold: 85,
    maxPositionSizePercent: 10,
};
