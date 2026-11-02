export type ExecutionSide = 'BUY' | 'SELL';
export type ExecutionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FILLED' | 'CANCELLED';

export interface ExecutionRequest {
    symbol: string;
    side: ExecutionSide;
    quantity: number;
    price?: number;
    stopLoss?: number;
    takeProfit?: number[];
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
    sourceStatus: 'LIVE' | 'PAPER' | 'BACKTEST' | 'UNKNOWN' | 'UNVERIFIED' | 'STALE' | 'DISCONNECTED' | 'UNAVAILABLE';
    requiredRiskApproval: boolean;
    confidence: number;
    positionCount?: number;
    riskExposurePercent?: number;
    drawdownPercent?: number;
    leverageUsed?: number;
    correlationIndex?: number;
}

export interface ExecutionResult {
    orderId: string;
    status: ExecutionStatus;
    symbol: string;
    side: ExecutionSide;
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
    approved: boolean;
    reason: string;
    riskGatePassed: boolean;
    sourceStatus: ExecutionRequest['sourceStatus'];
}

export const verifyExecutionEligibility = (request: ExecutionRequest): { approved: boolean; reason: string; riskGatePassed: boolean } => {
    const invalidSource = ['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(request.sourceStatus);

    if (invalidSource) {
        return {
            approved: false,
            reason: 'Execution blocked because the market or broker source is not verified.',
            riskGatePassed: false,
        };
    }

    if (request.requiredRiskApproval && request.confidence < 0.55) {
        return {
            approved: false,
            reason: 'Execution blocked because confidence is below minimum risk threshold.',
            riskGatePassed: false,
        };
    }

    if ((request.riskExposurePercent ?? 0) > 25) {
        return {
            approved: false,
            reason: 'Execution blocked because portfolio exposure exceeds permitted limits.',
            riskGatePassed: false,
        };
    }

    if ((request.drawdownPercent ?? 0) >= 12) {
        return {
            approved: false,
            reason: 'Execution blocked because drawdown exceeds the active guardrail.',
            riskGatePassed: false,
        };
    }

    if ((request.leverageUsed ?? 0) > 3) {
        return {
            approved: false,
            reason: 'Execution blocked because leverage exceeds maximum permitted leverage.',
            riskGatePassed: false,
        };
    }

    if ((request.correlationIndex ?? 0) > 0.75) {
        return {
            approved: false,
            reason: 'Execution blocked because portfolio correlation is too high.',
            riskGatePassed: false,
        };
    }

    return {
        approved: true,
        reason: 'Execution passed all required risk and source checks.',
        riskGatePassed: true,
    };
};

export const createExecutionResult = (request: ExecutionRequest): ExecutionResult => {
    const validation = verifyExecutionEligibility(request);

    if (!validation.approved) {
        return {
            orderId: `blocked-${Date.now()}`,
            status: 'REJECTED',
            symbol: request.symbol,
            side: request.side,
            mode: request.mode,
            approved: false,
            reason: validation.reason,
            riskGatePassed: false,
            sourceStatus: request.sourceStatus,
        };
    }

    return {
        orderId: `exec-${Date.now()}`,
        status: request.mode === 'LIVE' ? 'PENDING' : 'APPROVED',
        symbol: request.symbol,
        side: request.side,
        mode: request.mode,
        approved: true,
        reason: 'Execution request verified and ready for routing.',
        riskGatePassed: true,
        sourceStatus: request.sourceStatus,
    };
};
