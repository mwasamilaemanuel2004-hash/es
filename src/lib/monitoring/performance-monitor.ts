export type VerificationState =
    | 'VERIFIED'
    | 'UNVERIFIED'
    | 'STALE'
    | 'DISCONNECTED'
    | 'UNAVAILABLE'
    | 'LIVE'
    | 'PAPER'
    | 'BACKTEST';

export type MonitoringStatus = 'STABLE' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

export interface BotPerformanceSnapshot {
    botId: string;
    name: string;
    market: string;
    strategy: string;
    status: MonitoringStatus;
    dataState: VerificationState;
    signal: 'BUY' | 'SELL' | 'WAIT';
    winRate: number;
    profitFactor: number;
    sharpeRatio: number;
    drawdown: number;
    exposure: number;
    pnl: number;
    lastUpdated: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    version: string;
}

export interface SystemMonitoringSummary {
    activeBots: number;
    verifiedBots: number;
    offlineBots: number;
    averageExposure: number;
    averageDrawdown: number;
    systemState: MonitoringStatus;
    updatedAt: string;
}

export const createBotPerformanceSnapshot = (
    botId: string,
    name: string,
    market: string,
    strategy: string,
    overrides: Partial<BotPerformanceSnapshot> = {}
): BotPerformanceSnapshot => ({
    botId,
    name,
    market,
    strategy,
    status: overrides.status ?? 'STABLE',
    dataState: overrides.dataState ?? 'VERIFIED',
    signal: overrides.signal ?? 'WAIT',
    winRate: overrides.winRate ?? 0,
    profitFactor: overrides.profitFactor ?? 1,
    sharpeRatio: overrides.sharpeRatio ?? 0,
    drawdown: overrides.drawdown ?? 0,
    exposure: overrides.exposure ?? 0,
    pnl: overrides.pnl ?? 0,
    lastUpdated: overrides.lastUpdated ?? new Date().toISOString(),
    riskLevel: overrides.riskLevel ?? 'LOW',
    version: overrides.version ?? 'v1.0.0',
});

export const createSystemMonitoringSummary = (
    snapshots: BotPerformanceSnapshot[]
): SystemMonitoringSummary => {
    const total = snapshots.length;
    const verified = snapshots.filter(snapshot => snapshot.dataState === 'VERIFIED' || snapshot.dataState === 'LIVE').length;
    const offline = snapshots.filter(snapshot => snapshot.dataState === 'DISCONNECTED' || snapshot.dataState === 'UNAVAILABLE').length;
    const avgExposure = total ? snapshots.reduce((sum, bot) => sum + bot.exposure, 0) / total : 0;
    const avgDrawdown = total ? snapshots.reduce((sum, bot) => sum + bot.drawdown, 0) / total : 0;

    const systemState: MonitoringStatus =
        offline > total * 0.25 || avgDrawdown > 12 ? 'CRITICAL' : avgDrawdown > 7 || avgExposure > 18 ? 'WARNING' : 'STABLE';

    return {
        activeBots: total,
        verifiedBots: verified,
        offlineBots: offline,
        averageExposure: avgExposure,
        averageDrawdown: avgDrawdown,
        systemState,
        updatedAt: new Date().toISOString(),
    };
};
