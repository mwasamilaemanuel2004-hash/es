import React from 'react';
import { connectThroughOfficialLink, officialConnectionCatalog } from '@/lib/adapters';
import './broker-connect.scss';

const brokerOrder = Object.entries(officialConnectionCatalog);

const openLink = (url: string | null) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
};

const BrokerConnect = () => {
    return (
        <div className='broker-connect'>
            <div className='broker-connect__header'>
                <div>
                    <div className='broker-connect__eyebrow'>Broker API</div>
                    <h3>Connect to official brokers</h3>
                </div>
            </div>

            <div className='broker-connect__grid'>
                {brokerOrder.map(([brokerId, broker]) => {
                    const connectResult = connectThroughOfficialLink(brokerId);

                    return (
                        <div key={brokerId} className='broker-connect__card'>
                            <div className='broker-connect__meta'>
                                <span className='broker-connect__badge'>Official</span>
                                <span className='broker-connect__status'>Ready</span>
                            </div>

                            <div className='broker-connect__title'>{broker.name}</div>
                            <div className='broker-connect__body'>
                                <p>
                                    Connect using the official {broker.name} API portal or open the developer documentation.
                                </p>
                            </div>

                            <div className='broker-connect__actions'>
                                <button
                                    type='button'
                                    className='broker-connect__button broker-connect__button--primary'
                                    onClick={() => openLink(connectResult.url)}
                                >
                                    Connect
                                </button>
                                <button
                                    type='button'
                                    className='broker-connect__button broker-connect__button--secondary'
                                    onClick={() => openLink(broker.links.find(link => link.type === 'docs')?.url ?? null)}
                                >
                                    API Docs
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BrokerConnect;
