export type MarketBotInventoryEntry = {
    market: string;
    bots: string[];
    active: number;
    paper: number;
    hold: number;
    disabled: number;
};

import { botRegistry } from './bot-registry';

export const getMarketBotInventory = (): MarketBotInventoryEntry[] => {
    const markets = Array.from(new Set(botRegistry.map(bot => bot.market)));

    return markets.map(market => {
        const filtered = botRegistry.filter(bot => bot.market === market);
        return {
            market,
            bots: filtered.map(bot => bot.name),
            active: filtered.filter(bot => bot.status === 'ACTIVE').length,
            paper: filtered.filter(bot => bot.status === 'PAPER').length,
            hold: filtered.filter(bot => bot.status === 'HOLD').length,
            disabled: filtered.filter(bot => bot.status === 'DISABLED').length,
        };
    });
};

export const getMarketBotInventorySummary = () => getMarketBotInventory();
