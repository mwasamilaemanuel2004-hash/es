export type ExecutionSide = 'buy' | 'sell';
export type AssetClass = 'crypto' | 'forex' | 'metals' | 'commodities' | 'stocks' | 'indices';

export type MarketQuote = {
    symbol: string;
    provider: 'deriv' | 'binance' | 'mt5' | 'broker';
    assetClass: AssetClass;
    bid: number;
    ask: number;
    last: number;
    changePct: number;
    volume: number;
    timestamp: number;
};

export type OrderRequest = {
    symbol: string;
    side: ExecutionSide;
    quantity: number;
    provider: 'deriv' | 'binance' | 'mt5' | 'broker';
    strategyId?: string;
    riskLimit?: number;
};

export type ExecutionDecision = {
    accepted: boolean;
    reason: string;
    recommendedSide: ExecutionSide;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
};

export interface ExchangeAdapter {
    provider: 'deriv' | 'binance' | 'mt5' | 'broker';
    isReady: () => boolean;
    getQuote: (symbol: string) => Promise<MarketQuote | null>;
    placeOrder: (request: OrderRequest) => Promise<{ ok: boolean; orderId?: string; message?: string }>;
}

export const createQuote = (
    symbol: string,
    provider: MarketQuote['provider'],
    assetClass: AssetClass,
    last: number,
    changePct: number,
    volume: number
): MarketQuote => ({
    symbol,
    provider,
    assetClass,
    bid: last * 0.999,
    ask: last * 1.001,
    last,
    changePct,
    volume,
    timestamp: Date.now(),
});

export const validateOrder = (request: OrderRequest): ExecutionDecision => {
    const baseRisk = request.riskLimit ?? 1.2;
    const bias = request.side === 'buy' ? 1 : -1;

    if (request.quantity <= 0) {
        return { accepted: false, reason: 'Invalid quantity', recommendedSide: request.side, confidence: 0, riskLevel: 'high' };
    }

    if (baseRisk > 2.5) {
        return {
            accepted: false,
            reason: 'Capital guard blocked this order due to excessive risk exposure',
            recommendedSide: request.side,
            confidence: 0.28,
            riskLevel: 'high',
        };
    }

    return {
        accepted: true,
        reason: 'Risk checks passed; execution is permitted within configured portfolio limits',
        recommendedSide: request.side,
        confidence: 0.76 + Math.min(baseRisk / 8, 0.18),
        riskLevel: bias > 0 ? 'medium' : 'low',
    };
};

export const brokers: Record<ExchangeAdapter['provider'], string> = {
    deriv: 'Deriv WebSocket API',
    binance: 'Binance REST / WS',
    mt5: 'MT5 bridge adapter',
    broker: 'Broker execution gateway',
};
