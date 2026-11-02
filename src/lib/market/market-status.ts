export type DataMode = 'LIVE' | 'PAPER' | 'BACKTEST';
export type SourceStatus =
    | 'LIVE'
    | 'PAPER'
    | 'BACKTEST'
    | 'UNKNOWN'
    | 'UNVERIFIED'
    | 'STALE'
    | 'DISCONNECTED'
    | 'UNAVAILABLE';

export interface SourceState {
    status: SourceStatus;
    source: string;
    mode: DataMode;
    sourceUpdatedAt?: string;
    note?: string;
    confidence: number;
}

export const createSourceState = (
    source: string,
    status: SourceStatus,
    mode: DataMode,
    overrides: Partial<SourceState> = {}
): SourceState => ({
    status,
    source,
    mode,
    confidence: overrides.confidence ?? 0.5,
    sourceUpdatedAt: overrides.sourceUpdatedAt ?? new Date().toISOString(),
    note: overrides.note ?? 'Status created by validation layer.',
});

export const isSourceTrustworthy = (sourceState?: SourceState | null): boolean => {
    if (!sourceState) return false;
    return !['UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(sourceState.status);
};

export const requiresVerification = (sourceState?: SourceState | null): boolean => {
    if (!sourceState) return true;
    return ['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(sourceState.status);
};

export const markSourceAsUnavailable = (source: string, mode: DataMode, note?: string): SourceState =>
    createSourceState(source, 'UNAVAILABLE', mode, {
        confidence: 0,
        note: note ?? 'Unavailable source. Data must be explicitly verified before execution.',
    });

export const statusLabels: Record<SourceStatus, string> = {
    LIVE: 'LIVE',
    PAPER: 'PAPER',
    BACKTEST: 'BACKTEST',
    UNKNOWN: 'UNKNOWN',
    UNVERIFIED: 'UNVERIFIED',
    STALE: 'STALE',
    DISCONNECTED: 'DISCONNECTED',
    UNAVAILABLE: 'UNAVAILABLE',
};
