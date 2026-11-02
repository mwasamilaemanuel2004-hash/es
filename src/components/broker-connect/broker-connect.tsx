import React from 'react';
import { connectThroughOfficialLink, officialConnectionCatalog } from '@/lib/adapters';
import './broker-connect.scss';

const brokerOrder = Object.entries(officialConnectionCatalog);

const openLink = (url: string | null) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
};

const BrokerConnect = () => (
    <section className='broker-connect' aria-labelledby='broker-connect-title'>
        <div className='broker-connect__header'>
            <div>
                <div className='broker-connect__eyebrow'>Broker directory</div>
                <h3 id='broker-connect-title'>Official broker portals</h3>
                <p className='broker-connect__notice'>These buttons open provider websites. They do not authenticate an API or connect a trading account inside this app.</p>
            </div>
        </div>

        <div className='broker-connect__grid'>
            {brokerOrder.map(([brokerId, broker]) => {
                const connectResult = connectThroughOfficialLink(brokerId);
                const docsUrl = broker.links.find(link => link.type === 'docs')?.url ?? null;

                return (
                    <article key={brokerId} className='broker-connect__card'>
                        <div className='broker-connect__meta'>
                            <span className='broker-connect__badge'>Official portal</span>
                            <span className='broker-connect__status'>Not connected</span>
                        </div>
                        <h4 className='broker-connect__title'>{broker.name}</h4>
                        <p className='broker-connect__description'>Open {broker.name}’s official site or developer documentation.</p>
                        <div className='broker-connect__actions'>
                            <button
                                type='button'
                                className='broker-connect__button broker-connect__button--primary'
                                onClick={() => openLink(connectResult.url)}
                                disabled={!connectResult.url}
                            >
                                Open portal
                            </button>
                            <button
                                type='button'
                                className='broker-connect__button broker-connect__button--secondary'
                                onClick={() => openLink(docsUrl)}
                                disabled={!docsUrl}
                            >
                                API docs
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    </section>
);

export default BrokerConnect;
