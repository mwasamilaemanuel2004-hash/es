export type BrokerMarket =
    | 'crypto'
    | 'forex'
    | 'metals'
    | 'commodities'
    | 'stocks'
    | 'indices'
    | 'synthetics';

export type BrokerStatus =
    | 'LIVE'
    | 'PAPER'
    | 'BACKTEST'
    | 'UNKNOWN'
    | 'UNVERIFIED'
    | 'STALE'
    | 'DISCONNECTED'
    | 'UNAVAILABLE';

export interface BrokerDefinition {
    id: string;
    name: string;
    markets: BrokerMarket[];
    status: BrokerStatus;
    apiType: 'REST' | 'WEBSOCKET' | 'HYBRID';
    supportsExecution: boolean;
    supportsDataFeed: boolean;
    notes?: string;
}

export const brokerCatalog: Record<string, BrokerDefinition> = {
    deriv: {
        id: 'deriv',
        name: 'Deriv',
        markets: ['synthetics', 'indices', 'forex'],
        status: 'LIVE',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Synthetic indices and derived markets.',
    },
    binance: {
        id: 'binance',
        name: 'Binance',
        markets: ['crypto'],
        status: 'LIVE',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Spot and futures market data and execution.',
    },
    okx: {
        id: 'okx',
        name: 'OKX',
        markets: ['crypto'],
        status: 'UNKNOWN',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Requires verified credential and account scope.',
    },
    bybit: {
        id: 'bybit',
        name: 'Bybit',
        markets: ['crypto'],
        status: 'UNKNOWN',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
    },
    coinbase: {
        id: 'coinbase',
        name: 'Coinbase',
        markets: ['crypto'],
        status: 'UNVERIFIED',
        apiType: 'REST',
        supportsExecution: false,
        supportsDataFeed: true,
    },
    exness: {
        id: 'exness',
        name: 'Exness',
        markets: ['forex', 'metals'],
        status: 'UNVERIFIED',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
    },
    mt5: {
        id: 'mt5',
        name: 'MetaTrader 5',
        markets: ['forex', 'metals', 'commodities', 'indices'],
        status: 'LIVE',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Execution bridge for diversified trading accounts.',
    },
    oanda: {
        id: 'oanda',
        name: 'OANDA',
        markets: ['forex', 'metals'],
        status: 'UNKNOWN',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
    },
    fxcm: {
        id: 'fxcm',
        name: 'FXCM',
        markets: ['forex', 'metals'],
        status: 'UNKNOWN',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
    },
    dse: {
        id: 'dse',
        name: 'DSE',
        markets: ['stocks'],
        status: 'UNVERIFIED',
        apiType: 'REST',
        supportsExecution: false,
        supportsDataFeed: true,
    },
    globalIndices: {
        id: 'global-indices',
        name: 'Global Indices',
        markets: ['indices'],
        status: 'UNVERIFIED',
        apiType: 'REST',
        supportsExecution: false,
        supportsDataFeed: true,
    },
};

export const supportedMarketClasses: BrokerMarket[] = [
    'crypto',
    'forex',
    'metals',
    'commodities',
    'stocks',
    'indices',
    'synthetics',
];

export const getBrokerCapabilities = (brokerId: string) => brokerCatalog[brokerId];

export const getMarketCoverage = (market: BrokerMarket) =>
    Object.values(brokerCatalog).filter(broker => broker.markets.includes(market));

export const getVerifiedBrokers = () =>
    Object.values(brokerCatalog).filter(broker => broker.status === 'LIVE' || broker.status === 'PAPER');

export const getExecutionReadyBrokers = () =>
    Object.values(brokerCatalog).filter(broker => broker.supportsExecution && broker.status === 'LIVE');
