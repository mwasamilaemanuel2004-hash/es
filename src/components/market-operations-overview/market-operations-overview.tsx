import React, { useMemo, useState } from 'react';
import { botRegistry, getMarketBotInventory, type MarketGroup } from '@/lib/bots';
import './market-operations-overview.scss';

const marketLabels: Record<MarketGroup, string> = {
    DERIV: 'Deriv',
    FOREX: 'Forex',
    CRYPTO: 'Crypto',
    METALS: 'Metals',
    COMMODITIES: 'Commodities',
    INDICES: 'Indices',
    STOCKS: 'Stocks',
};

const MarketOperationsOverview = () => {
    const [selectedMarket, setSelectedMarket] = useState<MarketGroup | 'ALL'>('ALL');
    const inventory = useMemo(() => getMarketBotInventory(), []);
    const markets = inventory as ReturnType<typeof getMarketBotInventory>;
    const filteredMarkets = selectedMarket === 'ALL' ? markets : markets.filter(item => item.market === selectedMarket);
    const activeCount = botRegistry.filter(bot => bot.status === 'ACTIVE').length;
    const paperCount = botRegistry.filter(bot => bot.status === 'PAPER').length;
    const holdCount = botRegistry.filter(bot => bot.status === 'HOLD').length;

    return (
        <section className='market-operations' aria-labelledby='market-operations-title'>
            <header className='market-operations__header'>
                <div>
                    <p className='market-operations__eyebrow'>Trading workspace</p>
                    <h2 id='market-operations-title'>Market operations</h2>
                    <p className='market-operations__intro'>A clear view of registered strategy coverage and system readiness.</p>
                </div>
                <span className='market-operations__mode'>Registry overview</span>
            </header>

            <div className='market-operations__metrics' aria-label='Bot registry summary'>
                <article className='market-operations__metric'>
                    <span className='market-operations__metric-label'>Registered strategies</span>
                    <strong>{botRegistry.length}</strong>
                    <span className='market-operations__metric-note'>Catalog entries; not running bots</span>
                </article>
                <article className='market-operations__metric'>
                    <span className='market-operations__metric-label'>Marked active</span>
                    <strong>{activeCount}</strong>
                    <span className='market-operations__metric-note'>Registry status only</span>
                </article>
                <article className='market-operations__metric'>
                    <span className='market-operations__metric-label'>Paper / hold</span>
                    <strong>{paperCount} / {holdCount}</strong>
                    <span className='market-operations__metric-note'>Requires runtime validation</span>
                </article>
            </div>

            <div className='market-operations__section-heading'>
                <div>
                    <h3>Coverage by market</h3>
                    <p>Select a market to focus the inventory.</p>
                </div>
                <div className='market-operations__filters' role='group' aria-label='Filter market inventory'>
                    <button type='button' aria-pressed={selectedMarket === 'ALL'} onClick={() => setSelectedMarket('ALL')}>All</button>
                    {markets.map(item => {
                        const market = item.market as MarketGroup;
                        return (
                            <button
                                key={market}
                                type='button'
                                aria-pressed={selectedMarket === market}
                                onClick={() => setSelectedMarket(market)}
                            >
                                {marketLabels[market] ?? market}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className='market-operations__grid'>
                {filteredMarkets.map(item => (
                    <article className='market-operations__market-card' key={item.market}>
                        <div className='market-operations__market-topline'>
                            <h4>{marketLabels[item.market as MarketGroup] ?? item.market}</h4>
                            <span>{item.bots.length} catalog entries</span>
                        </div>
                        <div className='market-operations__status-list'>
                            <span><i className='is-active' />Active label <b>{item.active}</b></span>
                            <span><i className='is-paper' />Paper label <b>{item.paper}</b></span>
                            <span><i className='is-hold' />Hold label <b>{item.hold}</b></span>
                        </div>
                        <p className='market-operations__disclaimer'>Status labels describe the registry, not broker connectivity or live execution.</p>
                    </article>
                ))}
            </div>

            <footer className='market-operations__readiness'>
                <div className='market-operations__readiness-indicator' aria-hidden='true' />
                <div>
                    <strong>Live execution is not verified by this page</strong>
                    <p>Use a broker’s authorized integration and validate credentials, market data, risk limits, and paper trading before enabling live orders.</p>
                </div>
            </footer>
        </section>
    );
};

export default MarketOperationsOverview;
