import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import './dashboard.scss';

type MarketRow = {
    symbol: string;
    market: string;
    price: string;
    change: string;
    volume: string;
    trend: 'Bullish' | 'Neutral' | 'Bearish';
    signal: string;
};

const watchlist: MarketRow[] = [
    { symbol: 'BTC/USD', market: 'Crypto', price: '$68,420', change: '+3.84%', volume: '$28.4B', trend: 'Bullish', signal: 'Breakout' },
    { symbol: 'ETH/USD', market: 'Crypto', price: '$3,480', change: '+2.56%', volume: '$12.8B', trend: 'Bullish', signal: 'Momentum' },
    { symbol: 'EUR/USD', market: 'Forex', price: '1.0842', change: '+0.21%', volume: '$2.1T', trend: 'Bullish', signal: 'Trend' },
    { symbol: 'XAU/USD', market: 'Metals', price: '$2,410', change: '+1.14%', volume: '$9.3B', trend: 'Bullish', signal: 'Safe haven' },
    { symbol: 'WTI', market: 'Commodities', price: '$79.80', change: '-0.72%', volume: '$4.1B', trend: 'Bearish', signal: 'Supply' },
    { symbol: 'NASDAQ', market: 'Index', price: '18,920', change: '+1.96%', volume: '$4.8B', trend: 'Bullish', signal: 'Risk on' },
    { symbol: 'AAPL', market: 'Stock', price: '$214.36', change: '+1.08%', volume: '$2.7B', trend: 'Bullish', signal: 'Earnings' },
];

const allocationBreakdown = [
    { name: 'Crypto', value: 32, color: '#54d7d0' },
    { name: 'Forex', value: 24, color: '#7aa2ff' },
    { name: 'Metals', value: 18, color: '#f4c95d' },
    { name: 'Indices', value: 16, color: '#ff9f6e' },
    { name: 'Stocks', value: 10, color: '#c084fc' },
];

const signalFeed = [
    { title: 'Trend alignment', status: 'Strong', note: 'BTC and ETH remain above short-term VWAP', accent: 'positive' },
    { title: 'Macro regime', status: 'Risk-on', note: 'Equities and crypto are expanding together', accent: 'positive' },
    { title: 'Volatility pulse', status: 'Elevated', note: 'Gold and EUR are absorbing rate repricing', accent: 'warning' },
    { title: 'Capital guard', status: 'Protect', note: 'Reduce exposure if DXY rebounds above 105.2', accent: 'neutral' },
];

const riskPanels = [
    { label: 'Net exposure', value: '42%', tone: 'good' },
    { label: 'Drawdown guard', value: '8.1%', tone: 'warning' },
    { label: 'Sharpe proxy', value: '1.74', tone: 'good' },
    { label: 'Liquidity buffer', value: '$180K', tone: 'neutral' },
];

const panelMetrics = [
    { label: 'Portfolio value', value: '$1.42M', change: '+4.8%' },
    { label: 'Open P/L', value: '$117.2K', change: '+2.3%' },
    { label: 'Win rate', value: '68.4%', change: '+5.1%' },
    { label: 'Risk score', value: 'Moderate', change: '-1.2%' },
];

const Dashboard = observer(() => {
    const store = useStore();
    const accountId = store?.client?.loginid || 'DEMO';

    return (
        <div className='jarvis-dashboard'>
            <header className='jarvis-dashboard__header'>
                <div>
                    <p className='eyebrow'>Trading command center</p>
                    <h1>Jarvis Market Ops</h1>
                </div>

                <div className='jarvis-dashboard__header-actions'>
                    <div className='market-pill market-pill--online'>
                        <span className='dot' />
                        Live market feed
                    </div>
                    <div className='market-pill'>
                        {accountId}
                    </div>
                </div>
            </header>

            <section className='jarvis-dashboard__metrics'>
                {panelMetrics.map(metric => (
                    <article className='metric-card' key={metric.label}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                        <em>{metric.change}</em>
                    </article>
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
                        {allocationBreakdown.map(asset => (
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

