export type BrokerId =
    | 'deriv'
    | 'binance'
    | 'okx'
    | 'bybit'
    | 'coinbase'
    | 'exness'
    | 'mt5'
    | 'oanda'
    | 'fxcm'
    | 'dse'
    | 'global-indices';

export type BrokerApiType = 'REST' | 'WEBSOCKET' | 'HYBRID';
export type BrokerMarket = 'crypto' | 'forex' | 'metals' | 'commodities' | 'stocks' | 'indices' | 'synthetics';
export type BrokerStatus =
    | 'LIVE'
    | 'PAPER'
    | 'BACKTEST'
    | 'UNKNOWN'
    | 'UNVERIFIED'
    | 'STALE'
    | 'DISCONNECTED'
    | 'UNAVAILABLE';

export interface BrokerQuote {
    symbol: string;
    bid: number;
    ask: number;
    last: number;
    timestamp: string;
    source: string;
    status: BrokerStatus;
}

export interface BrokerOrderRequest {
    symbol: string;
    side: 'BUY' | 'SELL';
    quantity: number;
    price?: number;
    stopLoss?: number;
    takeProfit?: number[];
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
    strategy?: string;
    sourceStatus?: BrokerStatus;
}

export interface BrokerOrderResult {
    orderId: string;
    symbol: string;
    side: 'BUY' | 'SELL';
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FILLED' | 'CANCELLED';
    approved: boolean;
    broker: BrokerId;
    reason: string;
    sourceStatus: BrokerStatus;
}

export interface BrokerAdapter {
    readonly id: BrokerId;
    readonly name: string;
    readonly markets: BrokerMarket[];
    readonly status: BrokerStatus;
    readonly apiType: BrokerApiType;
    readonly supportsExecution: boolean;
    readonly supportsDataFeed: boolean;

    connect(): Promise<boolean>;
    fetchQuote(symbol: string): Promise<BrokerQuote | null>;
    placeOrder(request: BrokerOrderRequest): Promise<BrokerOrderResult>;
    healthCheck(): Promise<BrokerStatus>;
}

export interface BrokerAdapterMetadata {
    id: BrokerId;
    name: string;
    markets: BrokerMarket[];
    status: BrokerStatus;
    apiType: BrokerApiType;
    supportsExecution: boolean;
    supportsDataFeed: boolean;
    notes?: string;
}

export const brokerStatusPriority: Record<BrokerStatus, number> = {
    LIVE: 5,
    PAPER: 4,
    BACKTEST: 3,
    UNKNOWN: 2,
    UNVERIFIED: 1,
    STALE: 1,
    DISCONNECTED: 0,
    UNAVAILABLE: 0,
};

export const isExecutionAllowedForBroker = (status: BrokerStatus) =>
    ['LIVE', 'PAPER', 'BACKTEST'].includes(status);

export const resolveBrokerStatus = (status: BrokerStatus): BrokerStatus => status;
