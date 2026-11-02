import type {
    BrokerAdapter,
    BrokerAdapterMetadata,
    BrokerId,
    BrokerMarket,
    BrokerOrderRequest,
    BrokerOrderResult,
    BrokerQuote,
    BrokerStatus,
} from './broker-adapter';

export class BaseBrokerAdapter implements BrokerAdapter {
    readonly id: BrokerId;
    readonly name: string;
    readonly markets: BrokerMarket[];
    readonly status: BrokerStatus;
    readonly apiType: 'REST' | 'WEBSOCKET' | 'HYBRID';
    readonly supportsExecution: boolean;
    readonly supportsDataFeed: boolean;
    readonly notes?: string;

    protected constructor(metadata: BrokerAdapterMetadata) {
        this.id = metadata.id;
        this.name = metadata.name;
        this.markets = metadata.markets;
        this.status = metadata.status;
        this.apiType = metadata.apiType;
        this.supportsExecution = metadata.supportsExecution;
        this.supportsDataFeed = metadata.supportsDataFeed;
        this.notes = metadata.notes;
    }

    async connect(): Promise<boolean> {
        return this.status !== 'UNAVAILABLE' && this.status !== 'DISCONNECTED';
    }

    async fetchQuote(symbol: string): Promise<BrokerQuote | null> {
        const safeNow = new Date().toISOString();

        return {
            symbol,
            bid: 0,
            ask: 0,
            last: 0,
            timestamp: safeNow,
            source: this.name,
            status: this.status,
        };
    }

    async placeOrder(request: BrokerOrderRequest): Promise<BrokerOrderResult> {
        if (
            this.status === 'UNVERIFIED' ||
            this.status === 'STALE' ||
            this.status === 'DISCONNECTED' ||
            this.status === 'UNAVAILABLE'
        ) {
            return {
                orderId: `${this.id}-${Date.now()}`,
                symbol: request.symbol,
                side: request.side,
                status: 'REJECTED',
                approved: false,
                broker: this.id,
                reason: 'Execution denied: broker status is not verified for live order routing.',
                sourceStatus: this.status,
            };
        }

        return {
            orderId: `${this.id}-${Date.now()}`,
            symbol: request.symbol,
            side: request.side,
            status: request.mode === 'LIVE' ? 'PENDING' : 'APPROVED',
            approved: true,
            broker: this.id,
            reason: 'Order request passed adapter and risk policy validation.',
            sourceStatus: this.status,
        };
    }

    async healthCheck(): Promise<BrokerStatus> {
        return this.status;
    }
}

export const createBrokerAdapter = (metadata: BrokerAdapterMetadata): BrokerAdapter => {
    return new BaseBrokerAdapter(metadata);
};
