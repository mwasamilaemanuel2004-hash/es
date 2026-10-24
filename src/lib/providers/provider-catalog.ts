export type ProviderName = 'deriv' | 'binance' | 'mt5' | 'broker';

export interface ProviderConfig {
    name: ProviderName;
    label: string;
    status: 'online' | 'maintenance' | 'offline';
    latencyMs: number;
    enabled: boolean;
}

export const providerCatalog: Record<ProviderName, ProviderConfig> = {
    deriv: { name: 'deriv', label: 'Deriv', status: 'online', latencyMs: 92, enabled: true },
    binance: { name: 'binance', label: 'Binance', status: 'online', latencyMs: 138, enabled: true },
    mt5: { name: 'mt5', label: 'MT5 / MetaTrader', status: 'maintenance', latencyMs: 210, enabled: true },
    broker: { name: 'broker', label: 'Broker / FX Gateway', status: 'offline', latencyMs: 320, enabled: false },
};

export const providerSummary = Object.values(providerCatalog).map(provider => ({
    ...provider,
    state: provider.status === 'online' ? 'Ready' : provider.status === 'maintenance' ? 'Degraded' : 'Offline',
}));
