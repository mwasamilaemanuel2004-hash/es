export type ProviderName = 'deriv' | 'binance' | 'mt5' | 'broker';

export interface ProviderStatus {
    name: ProviderName;
    label: string;
    status: 'online' | 'maintenance' | 'offline';
    latencyMs: number;
    enabled: boolean;
    readiness: 'ready' | 'degraded' | 'disabled';
}

export const providerStatusList: ProviderStatus[] = [
    { name: 'deriv', label: 'Deriv', status: 'online', latencyMs: 92, enabled: true, readiness: 'ready' },
    { name: 'binance', label: 'Binance', status: 'online', latencyMs: 138, enabled: true, readiness: 'ready' },
    { name: 'mt5', label: 'MT5', status: 'maintenance', latencyMs: 210, enabled: true, readiness: 'degraded' },
    { name: 'broker', label: 'Broker', status: 'offline', latencyMs: 320, enabled: false, readiness: 'disabled' },
];

export const providerStatusSummary = {
    ready: providerStatusList.filter(item => item.readiness === 'ready').length,
    degraded: providerStatusList.filter(item => item.readiness === 'degraded').length,
    disabled: providerStatusList.filter(item => item.readiness === 'disabled').length,
};
