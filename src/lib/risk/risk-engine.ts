import type { RiskContext, RiskDecision, RiskProfile } from './types';

export const evaluateRisk = (
    context: RiskContext,
    profile: RiskProfile = {
        maxDrawdownPercent: 12,
        maxExposurePercent: 25,
        maxLeverage: 3,
        maxCorrelation: 0.75,
        minConfidence: 0.55,
        emergencyExitThreshold: 85,
        maxPositionSizePercent: 10,
    }
): RiskDecision => {
    const invalidSource = ['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(context.sourceStatus);
    const drawdownRisk = context.drawdownPercent >= profile.maxDrawdownPercent;
    const exposureRisk = context.exposurePercent >= profile.maxExposurePercent;
    const leverageRisk = context.leverageUsed > profile.maxLeverage;
    const correlationRisk = context.correlationIndex > profile.maxCorrelation;
    const confidenceRisk = context.confidence < profile.minConfidence;
    const volatilityRisk = (context.volatility ?? 0) > 0.9;

    if (invalidSource) {
        return {
            status: 'BLOCK',
            approved: false,
            reason: 'Source is not verified. Risk gate blocks execution until data source is validated.',
            riskLevel: 'CRITICAL',
            requiresManualReview: true,
            emergencyMode: false,
        };
    }

    if (drawdownRisk || exposureRisk || leverageRisk || correlationRisk || volatilityRisk) {
        return {
            status: 'REDUCE',
            approved: false,
            reason: 'Portfolio risk exceeds acceptable limits. Reduce exposure or pause the trade flow.',
            adjustedExposurePercent: Math.min(context.exposurePercent, profile.maxExposurePercent * 0.7),
            riskLevel: 'HIGH',
            requiresManualReview: true,
            emergencyMode: false,
        };
    }

    if (context.expectedLoss && context.expectedLoss > 0.12) {
        return {
            status: 'PAUSE',
            approved: false,
            reason: 'Expected loss exceeds allowed risk tolerance. Execution is paused pending approval.',
            riskLevel: 'MEDIUM',
            requiresManualReview: true,
            emergencyMode: false,
        };
    }

    if (confidenceRisk) {
        return {
            status: 'REJECTED',
            approved: false,
            reason: 'Model confidence is below minimum threshold. No execution is permitted.',
            riskLevel: 'MEDIUM',
            requiresManualReview: true,
            emergencyMode: false,
        };
    }

    if (context.positionCount && context.positionCount >= 8) {
        return {
            status: 'PAUSE',
            approved: false,
            reason: 'Position count is too high for current portfolio risk budget.',
            riskLevel: 'HIGH',
            requiresManualReview: true,
            emergencyMode: false,
        };
    }

    if (context.drawdownPercent > profile.emergencyExitThreshold) {
        return {
            status: 'EMERGENCY',
            approved: false,
            reason: 'Emergency threshold reached. Risk manager has forced protective action.',
            riskLevel: 'CRITICAL',
            requiresManualReview: true,
            emergencyMode: true,
        };
    }

    return {
        status: 'APPROVED',
        approved: true,
        reason: 'Risk profile is within guardrails. Execution can proceed with controlled limits.',
        riskLevel: 'LOW',
        requiresManualReview: false,
        emergencyMode: false,
    };
};

export const createRiskSnapshot = (context: RiskContext) => evaluateRisk(context);

export const applyAdaptiveRiskAdjustment = (context: RiskContext, profile: RiskProfile = defaultRiskProfile) => {
    const baseRisk = evaluateRisk(context, profile);

    if (baseRisk.status === 'APPROVED') {
        return {
            ...baseRisk,
            adjustedExposurePercent: Math.min(context.exposurePercent, profile.maxExposurePercent * 0.9),
        };
    }

    return baseRisk;
};
