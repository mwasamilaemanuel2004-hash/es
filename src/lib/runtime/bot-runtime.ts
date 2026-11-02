import { botRegistry, type BotDefinition, type MarketGroup } from '../bots';

export type RuntimeMode = 'LIVE' | 'PAPER' | 'BACKTEST';
export type RuntimeHealth = 'HEALTHY' | 'WARN' | 'CRITICAL' | 'OFFLINE';

export interface RuntimeConfig {
    market: MarketGroup;
    mode: RuntimeMode;
    source: string;
    enabled: boolean;
    riskLimit: number;
    maxExposure: number;
}

export interface RuntimeState {
    market: MarketGroup;
    mode: RuntimeMode;
    status: 'READY' | 'RUNNING' | 'PAUSED' | 'BLOCKED';
    health: RuntimeHealth;
    activeBots: string[];
    lastUpdated: string;
}

export class BotRuntime {
    public readonly bot: BotDefinition;
    public readonly config: RuntimeConfig;
    public state: RuntimeState;

    constructor(bot: BotDefinition, config: RuntimeConfig) {
        this.bot = bot;
        this.config = config;
        this.state = {
            market: bot.market,
            mode: config.mode,
            status: config.enabled ? 'READY' : 'PAUSED',
            health: 'HEALTHY',
            activeBots: [bot.id],
            lastUpdated: new Date().toISOString(),
        };
    }

    start() {
        if (!this.config.enabled) {
            this.state.status = 'PAUSED';
            this.state.health = 'WARN';
            return this.state;
        }

        this.state.status = 'RUNNING';
        this.state.health = 'HEALTHY';
        this.state.lastUpdated = new Date().toISOString();
        return this.state;
    }

    suspend(reason: string) {
        this.state.status = 'PAUSED';
        this.state.health = 'WARN';
        this.state.lastUpdated = `${new Date().toISOString()} :: ${reason}`;
        return this.state;
    }

    block(reason: string) {
        this.state.status = 'BLOCKED';
        this.state.health = 'CRITICAL';
        this.state.lastUpdated = `${new Date().toISOString()} :: ${reason}`;
        return this.state;
    }
}

export class MarketRuntimeManager {
    private readonly runtimes = new Map<string, BotRuntime>();

    registerRuntime(bot: BotDefinition, config: RuntimeConfig): BotRuntime {
        const runtime = new BotRuntime(bot, config);
        this.runtimes.set(bot.id, runtime);
        return runtime;
    }

    getRuntime(botId: string): BotRuntime | undefined {
        return this.runtimes.get(botId);
    }

    startMarket(market: MarketGroup) {
        const marketBots = botRegistry.filter(bot => bot.market === market);

        return marketBots.map(bot => {
            const runtime = this.runtimes.get(bot.id) ?? this.registerRuntime(bot, {
                market: bot.market,
                mode: 'PAPER',
                source: `${bot.market.toLowerCase()}-runtime`,
                enabled: bot.status === 'ACTIVE',
                riskLimit: 70,
                maxExposure: 1,
            });

            return runtime.start();
        });
    }

    getAllStatuses() {
        return Array.from(this.runtimes.values()).map(runtime => runtime.state);
    }
}

export const createRuntimeManager = () => new MarketRuntimeManager();
