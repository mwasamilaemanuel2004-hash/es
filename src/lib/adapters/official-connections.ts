export type OfficialLinkType = 'docs' | 'connect' | 'api' | 'sandbox';

export interface OfficialLink {
    label: string;
    url: string;
    type: OfficialLinkType;
}

export const officialConnectionCatalog: Record<string, { name: string; links: OfficialLink[] }> = {
    deriv: {
        name: 'Deriv',
        links: [
            { label: 'Deriv API Docs', url: 'https://developers.deriv.com/', type: 'docs' },
            { label: 'Deriv Client Portal', url: 'https://www.deriv.com/', type: 'connect' },
            { label: 'Deriv API Portal', url: 'https://app.deriv.com/', type: 'api' },
        ],
    },
    binance: {
        name: 'Binance',
        links: [
            { label: 'Binance Official', url: 'https://www.binance.com/en', type: 'connect' },
            { label: 'Binance API Docs', url: 'https://developers.binance.com/', type: 'docs' },
            { label: 'Binance API Keys', url: 'https://www.binance.com/en/my/settings/api-management', type: 'api' },
        ],
    },
    okx: {
        name: 'OKX',
        links: [
            { label: 'OKX Official', url: 'https://www.okx.com/', type: 'connect' },
            { label: 'OKX API Docs', url: 'https://www.okx.com/docs-v5/', type: 'docs' },
            { label: 'OKX API Keys', url: 'https://www.okx.com/account/my-api', type: 'api' },
        ],
    },
    bybit: {
        name: 'Bybit',
        links: [
            { label: 'Bybit Official', url: 'https://www.bybit.com/', type: 'connect' },
            { label: 'Bybit API Docs', url: 'https://bybit-exchange.github.io/docs/docs/v5/intro', type: 'docs' },
            { label: 'Bybit API Keys', url: 'https://www.bybit.com/user/settings/api-management', type: 'api' },
        ],
    },
    coinbase: {
        name: 'Coinbase',
        links: [
            { label: 'Coinbase Official', url: 'https://www.coinbase.com/', type: 'connect' },
            { label: 'Coinbase API Docs', url: 'https://docs.cdp.coinbase.com/', type: 'docs' },
            { label: 'Coinbase Developer Portal', url: 'https://portal.cdp.coinbase.com/', type: 'api' },
        ],
    },
    exness: {
        name: 'Exness',
        links: [
            { label: 'Exness Official', url: 'https://www.exness.com/', type: 'connect' },
            { label: 'Exness Help Center', url: 'https://www.exness.com/support/', type: 'docs' },
            { label: 'Exness Client Area', url: 'https://one.exness.com/', type: 'api' },
        ],
    },
    mt5: {
        name: 'MetaTrader 5',
        links: [
            { label: 'MetaTrader 5 Official', url: 'https://www.metatrader5.com/', type: 'connect' },
            { label: 'MT5 Docs', url: 'https://www.metatrader5.com/en/metaeditor/help', type: 'docs' },
            { label: 'MT5 Broker Access', url: 'https://www.metatrader5.com/en/brokers', type: 'api' },
        ],
    },
    oanda: {
        name: 'OANDA',
        links: [
            { label: 'OANDA Official', url: 'https://www.oanda.com/', type: 'connect' },
            { label: 'OANDA API Docs', url: 'https://developer.oanda.com/', type: 'docs' },
            { label: 'OANDA Client Portal', url: 'https://www.oanda.com/account/', type: 'api' },
        ],
    },
    fxcm: {
        name: 'FXCM',
        links: [
            { label: 'FXCM Official', url: 'https://www.fxcm.com/', type: 'connect' },
            { label: 'FXCM Trading API', url: 'https://www.fxcm.com/markets/forex-trading/', type: 'docs' },
            { label: 'FXCM Client Area', url: 'https://www.fxcm.com/client-area/', type: 'api' },
        ],
    },
    dse: {
        name: 'DSE',
        links: [
            { label: 'DSE Official', url: 'https://www.dsebd.org/', type: 'connect' },
            { label: 'DSE Market Data', url: 'https://www.dsebd.org/latest_share_price_scroll_l.php', type: 'docs' },
            { label: 'DSE Trading Access', url: 'https://www.dsebd.org/trading_info.php', type: 'api' },
        ],
    },
    'global-indices': {
        name: 'Global Indices',
        links: [
            { label: 'Global Market Indices', url: 'https://www.investing.com/indices/', type: 'connect' },
            { label: 'Index Market Data Docs', url: 'https://www.investing.com/indices/', type: 'docs' },
            { label: 'Market Access', url: 'https://www.investing.com/', type: 'api' },
        ],
    },
};

export const getOfficialConnectionLinks = (brokerId: string) => officialConnectionCatalog[brokerId] ?? null;

export const getOfficialConnectLink = (brokerId: string) => {
    const entry = getOfficialConnectionLinks(brokerId);
    if (!entry) return null;
    return entry.links.find(link => link.type === 'connect') ?? entry.links[0] ?? null;
};

export const getOfficialDocsLink = (brokerId: string) => {
    const entry = getOfficialConnectionLinks(brokerId);
    if (!entry) return null;
    return entry.links.find(link => link.type === 'docs') ?? entry.links[0] ?? null;
};

export const connectThroughOfficialLink = (brokerId: string) => {
    const link = getOfficialConnectLink(brokerId);
    if (!link) {
        return {
            brokerId,
            connected: false,
            url: null,
            reason: 'No official connect link is available for this broker or exchange.',
        };
    }

    return {
        brokerId,
        connected: true,
        url: link.url,
        reason: `Official ${link.label} link prepared for broker connection.`,
    };
};
