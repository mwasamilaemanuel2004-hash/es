import { BaseBrokerAdapter, createBrokerAdapter } from './broker-adapter';
import type { BrokerAdapter, BrokerAdapterMetadata, BrokerId, BrokerMarket, BrokerStatus } from './broker-adapter';

export const brokerMetadata: Record<BrokerId, BrokerAdapterMetadata> = {
    deriv: {
        id: 'deriv',
        name: 'Deriv',
        markets: ['synthetics', 'indices', 'forex'],
        status: 'LIVE',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Synthetic indices and derived products supported.',
    },
    binance: {
        id: 'binance',
        name: 'Binance',
        markets: ['crypto'],
        status: 'LIVE',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Crypto execution and market data adapter.',
    },
    okx: {
        id: 'okx',
        name: 'OKX',
        markets: ['crypto'],
        status: 'UNKNOWN',
        apiType: 'HYBRID',
        supportsExecution: true,
        supportsDataFeed: true,
        notes: 'Awaiting verification and credentials.',
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
    'global-indices': {
        id: 'global-indices',
        name: 'Global Indices',
        markets: ['indices'],
        status: 'UNVERIFIED',
        apiType: 'REST',
        supportsExecution: false,
        supportsDataFeed: true,
    },
};

export const brokerAdapters: Record<string, BrokerAdapter> = Object.fromEntries(
    Object.values(brokerMetadata).map(metadata => [metadata.id, createBrokerAdapter(metadata)])
) as Record<string, BrokerAdapter>;

export const getBrokerAdapter = (brokerId: BrokerId): BrokerAdapter | undefined => brokerAdapters[brokerId];

export const getLiveBrokers = () =>
    Object.values(brokerAdapters).filter(adapter => adapter.status === 'LIVE' || adapter.status === 'PAPER');

export const getExecutionReadyBrokers = () =>
    Object.values(brokerAdapters).filter(
        adapter => adapter.supportsExecution && (adapter.status === 'LIVE' || adapter.status === 'PAPER')
    );

export const getMarketCoverage = (market: BrokerMarket) =>
    Object.values(brokerAdapters).filter(adapter => adapter.markets.includes(market));

export const createBrokerGateway = () => ({
    adapters: brokerAdapters,
    getAdapter: getBrokerAdapter,
    getLiveBrokers,
    getExecutionReadyBrokers,
    getMarketCoverage,
});
