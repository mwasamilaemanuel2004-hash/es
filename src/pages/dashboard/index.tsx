import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { marketShell, tradingSystemBlueprint } from '@/lib/market/system-blueprint';
import { providerCommandCards } from '@/lib/providers/provider-command-cards';
import { providerSummary } from '@/lib/providers/provider-catalog';
import { systemHealthStatus } from '@/lib/providers/system-health';
import './dashboard.scss';

const Dashboard = observer(() => {
    const store = useStore();
    const accountId = store?.client?.loginid || 'DEMO';
    const { watchlist, signalFeed, portfolioMetrics, allocation, riskPanels } = marketShell;

    return (
        <div className='jarvis-dashboard'>
            <header className='jarvis-dashboard__header'>
                <div>
                    <p className='eyebrow'>Trading command center</p>
                    <h1>{tradingSystemBlueprint.phase}</h1>
                </div>

                <div className='jarvis-dashboard__header-actions'>
                    <div className='market-pill market-pill--online'>
                        <span className='dot' />
                        Live market feed
                    </div>
                    <div className='market-pill'>{accountId}</div>
                </div>
            </header>

            <section className='jarvis-dashboard__metrics'>
                {portfolioMetrics.map(metric => (
                    <article className='metric-card' key={metric.label}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                        <em>{metric.change}</em>
                    </article>
                ))}
            </section>

            <section className='system-health-bar'>
                <div>
                    <p className='eyebrow'>System status</p>
                    <strong>{systemHealthStatus.overall}</strong>
                </div>
                <span>{systemHealthStatus.message}</span>
            </section>

            <section className='provider-row'>
                {providerCommandCards.map(card => (
                    <article key={card.title} className={`provider-card provider-card--${card.tint}`}>
                        <span className='provider-card__tag'>{card.tag}</span>
                        <strong>{card.title}</strong>
                        <em>{card.value}</em>
                    </article>
                ))}
            </section>

            <section className='provider-list'>
                {providerSummary.map(provider => (
                    <div key={provider.name} className={`provider-status provider-status--${provider.status}`}>
                        <span className='provider-status__name'>{provider.label}</span>
                        <span className='provider-status__state'>{provider.state}</span>
                        <span className='provider-status__latency'>{provider.latencyMs} ms</span>
                    </div>
                ))}
            </section>

            <section className='jarvis-dashboard__content'>
                <div className='jarvis-panel jarvis-panel--wide'>
                    <div className='panel-header'>
                        <div>
                            <p className='eyebrow'>Multi-market</p>
                            <h2>Watchlist</h2>
                        </div>
                        <button type='button'>All assets</button>
                    </div>

                    <div className='table-wrap'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Asset</th>
                                    <th>Market</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                    <th>Volume</th>
                                    <th>Trend</th>
                                    <th>Signal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {watchlist.map(item => (
                                    <tr key={item.symbol}>
                                        <td className='asset-cell'>
                                            <span className='asset-code'>{item.symbol}</span>
                                        </td>
                                        <td>{item.market}</td>
                                        <td>{item.price}</td>
                                        <td className={item.change.startsWith('-') ? 'change negative' : 'change positive'}>
                                            {item.change}
                                        </td>
                                        <td>{item.volume}</td>
                                        <td>
                                            <span className={`trend-badge trend-badge--${item.trend.toLowerCase()}`}>
                                                {item.trend}
                                            </span>
                                        </td>
                                        <td>{item.signal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <aside className='jarvis-panel jarvis-panel--sidebar'>
                    <div className='panel-header'>
                        <div>
                            <p className='eyebrow'>Asset mix</p>
                            <h2>Allocation</h2>
                        </div>
                    </div>

                    <div className='allocation-list'>
                        {allocation.map(asset => (
                            <div className='allocation-row' key={asset.name}>
                                <div className='allocation-meta'>
                                    <span className='allocation-dot' style={{ background: asset.color }} />
                                    <span>{asset.name}</span>
                                </div>
                                <div className='allocation-progress'>
                                    <span style={{ width: `${asset.value}%`, background: asset.color }} />
                                </div>
                                <strong>{asset.value}%</strong>
                            </div>
                        ))}
                    </div>
                </aside>

                <div className='jarvis-panel'>
                    <div className='panel-header'>
                        <div>
                            <p className='eyebrow'>Agent intelligence</p>
                            <h2>Signal engine</h2>
                        </div>
                    </div>

                    <div className='signal-list'>
                        {signalFeed.map(signal => (
                            <div className={`signal-item signal-item--${signal.accent}`} key={signal.title}>
                                <div className='signal-item__title-row'>
                                    <strong>{signal.title}</strong>
                                    <span>{signal.status}</span>
                                </div>
                                <p>{signal.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='jarvis-panel'>
                    <div className='panel-header'>
                        <div>
                            <p className='eyebrow'>Execution</p>
                            <h2>Order ticket</h2>
                        </div>
                    </div>

                    <div className='order-ticket'>
                        <div className='order-grid'>
                            <div>
                                <label>Pair</label>
                                <div className='field-box'>BTC/USD</div>
                            </div>
                            <div>
                                <label>Side</label>
                                <div className='field-box'>Long</div>
                            </div>
                            <div>
                                <label>Size</label>
                                <div className='field-box'>0.42 BTC</div>
                            </div>
                            <div>
                                <label>Risk</label>
                                <div className='field-box'>1.2%</div>
                            </div>
                        </div>

                        <div className='order-actions'>
                            <button type='button' className='primary'>Buy</button>
                            <button type='button' className='secondary'>Sell</button>
                        </div>
                    </div>
                </div>

                <div className='jarvis-panel'>
                    <div className='panel-header'>
                        <div>
                            <p className='eyebrow'>Adaptive system</p>
                            <h2>Jarvis command</h2>
                        </div>
                    </div>

                    <div className='assistant-log'>
                        <div className='assistant-entry'>
                            <span className='assistant-badge'>Jarvis</span>
                            <p>Macro regime remains favorable for crypto and high-beta equities.</p>
                        </div>
                        <div className='assistant-entry'>
                            <span className='assistant-badge assistant-badge--alt'>Hermes</span>
                            <p>Liquidity is improving across FX and commodity corridors.</p>
                        </div>
                        <div className='assistant-entry'>
                            <span className='assistant-badge assistant-badge--soft'>Risk</span>
                            <p>Exposure remains controlled; guardrails are active across all accounts.</p>
                        </div>
                    </div>
                </div>

                <div className='jarvis-panel'>
                    <div className='panel-header'>
                        <div>
                            <p className='eyebrow'>Risk monitor</p>
                            <h2>Capital guard</h2>
                        </div>
                    </div>

                    <div className='risk-grid'>
                        {riskPanels.map(item => (
                            <div key={item.label} className={`risk-card risk-card--${item.tone}`}>
                                <span>{item.label}</span>
                                <strong>{item.value}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
});

export default Dashboard;
