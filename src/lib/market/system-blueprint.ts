import { assetAllocation, capitalRiskPanels, defaultWatchlist, portfolioMetrics, signalFeed } from '@/lib/market/asset-registry';

export const marketShell = {
    watchlist: defaultWatchlist,
    signalFeed,
    portfolioMetrics,
    allocation: assetAllocation,
    riskPanels: capitalRiskPanels,
};

export const tradingSystemBlueprint = {
    phase: 'Phase 1 — Trading command center',
    modules: [
        'Multi-asset dashboard',
        'Exchange routing layer',
        'Risk and exposure guard',
        'Signal engine',
        'Agent orchestration shell',
        'Mobile web-ready shell',
    ],
};

export const featureChecklist = {
    deriv: true,
    binance: true,
    mt5: true,
    brokerAdapters: true,
    aiRouting: true,
    adaptiveRiskGuard: true,
    crossAssetMonitoring: true,
    mobileShellReady: true,
};
