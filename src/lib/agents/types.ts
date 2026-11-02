export type AgentCommand =
    | 'TRADE'
    | 'WAIT'
    | 'REDUCE'
    | 'EXIT'
    | 'PAUSE'
    | 'BLOCK'
    | 'SWITCH_STRATEGY'
    | 'EMERGENCY_MODE';

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

export interface SourceVerification {
    status: SourceStatus;
    source: string;
    confidence: number;
    timestamp?: string;
    note?: string;
}

export interface AgentContext {
    symbol: string;
    timeframe: string;
    mode: DataMode;
    sourceVerification: SourceVerification;
    price?: number;
    volume?: number;
    sentiment?: number;
    riskScore?: number;
    metadata?: Record<string, unknown>;
}

export interface AgentAction {
    command: AgentCommand;
    confidence: number;
    rationale: string;
    strategy?: string;
    mode?: DataMode;
    riskGatePassed?: boolean;
}

export interface AgentDefinition {
    id: string;
    label: string;
    role: string;
    priority: number;
    description: string;
}
