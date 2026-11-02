export type KillSwitchReason =
    | 'drawdown'
    | 'liquidity'
    | 'source_verification'
    | 'exposure'
    | 'correlation'
    | 'emergency_threshold'
    | 'manual_override';

export interface KillSwitchState {
    enabled: boolean;
    reason?: KillSwitchReason;
    message: string;
    triggeredAt?: string;
}

export const createKillSwitch = (
    enabled = false,
    reason: KillSwitchReason | undefined = undefined,
    message = 'System is operating under normal risk controls.'
): KillSwitchState => ({
    enabled,
    reason,
    message,
    triggeredAt: enabled ? new Date().toISOString() : undefined,
});

export const evaluateKillSwitch = (
    drawdownPercent: number,
    exposurePercent: number,
    sourceStatus: string,
    correlationIndex: number,
    forceManualOverride = false
): KillSwitchState => {
    if (forceManualOverride) {
        return createKillSwitch(true, 'manual_override', 'Manual override enabled. Safe execution is blocked.');
    }

    if (drawdownPercent >= 12) {
        return createKillSwitch(true, 'drawdown', 'Drawdown threshold exceeded. Trade execution is suspended.');
    }

    if (exposurePercent >= 25) {
        return createKillSwitch(true, 'exposure', 'Exposure exceeds portfolio guardrails. Risk kill switch activated.');
    }

    if (['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(sourceStatus)) {
        return createKillSwitch(true, 'source_verification', 'Source verification failed. Execution is blocked until status is confirmed.');
    }

    if (correlationIndex > 0.75) {
        return createKillSwitch(true, 'correlation', 'Correlation risk is too high. Portfolio is temporarily paused.');
    }

    return createKillSwitch(false, undefined, 'System is operating under normal risk controls.');
};
