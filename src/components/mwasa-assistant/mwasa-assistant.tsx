import React, { useMemo, useState } from 'react';
import { createMasterSupervisorDecision, supervisorCapabilities, type MasterSupervisorContext } from '@/lib/master-agent/master-supervisor';
import './mwasa-assistant.scss';

const defaultContext: MasterSupervisorContext = {
    tokenLevel: 3,
    verified: true,
    adminConfirmed: true,
    sessionTrusted: true,
    riskApproved: true,
    emailVerified: true,
    sourceStatus: 'LIVE',
    riskScore: 32,
    market: 'MULTI-MARKET',
    mode: 'PAPER',
};

export type AssistantMessage = {
    role: 'assistant' | 'user';
    text: string;
};

const MwasaAssistant = () => {
    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState<AssistantMessage[]>([
        {
            role: 'assistant',
            text: 'MWASA Norma Assistant is online. I can guide strategy review, security checks, and supervisory upgrades.',
        },
    ]);
    const [draft, setDraft] = useState('');

    const supervisorDecision = useMemo(() => createMasterSupervisorDecision(defaultContext), []);

    const handleSend = () => {
        if (!draft.trim()) return;

        const userText = draft.trim();
        const reply =
            userText.toLowerCase().includes('upgrade') || userText.toLowerCase().includes('new strategy')
                ? 'I am routing the request to the Strategy Builder, Risk Control, and Security supervisors for a safe staged evaluation.'
                : userText.toLowerCase().includes('security') || userText.toLowerCase().includes('hack')
                  ? 'Threat detection is active. I am checking the access layer, token integrity, and session trust before proceeding.'
                  : userText.toLowerCase().includes('chat') || userText.toLowerCase().includes('hello')
                    ? 'I am ready. I can review opportunities, refine strategies, and support secure admin workflows.'
                    : 'I am coordinating the relevant supervisor agents and will return a structured recommendation with the safest next step.';

        setMessages(prev => [
            ...prev,
            { role: 'user', text: userText },
            { role: 'assistant', text: reply },
        ]);
        setDraft('');
    };

    return (
        <div className='mwasa-assistant'>
            <button
                type='button'
                className='mwasa-assistant__toggle'
                onClick={() => setOpen(prev => !prev)}
                aria-label='Toggle assistant panel'
            >
                <span className='mwasa-assistant__hexagon'>
                    <span>MWASA</span>
                </span>
            </button>

            {open && (
                <div className='mwasa-assistant__panel'>
                    <div className='mwasa-assistant__header'>
                        <div>
                            <div className='mwasa-assistant__eyebrow'>High Rank Supervisor</div>
                            <h3>MWASA Norma Assistant</h3>
                        </div>
                        <span
                            className={`mwasa-assistant__status ${supervisorDecision.allowed ? 'is-live' : 'is-blocked'}`}
                        >
                            {supervisorDecision.allowed ? 'Active' : 'Restricted'}
                        </span>
                    </div>

                    <div className='mwasa-assistant__summary'>
                        <div>
                            <strong>Access</strong>
                            <span>Level {defaultContext.tokenLevel}</span>
                        </div>
                        <div>
                            <strong>Risk</strong>
                            <span>{defaultContext.riskScore}/100</span>
                        </div>
                        <div>
                            <strong>Mode</strong>
                            <span>{defaultContext.mode}</span>
                        </div>
                    </div>

                    <div className='mwasa-assistant__capabilities'>
                        {supervisorCapabilities.map(item => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>

                    <div className='mwasa-assistant__messages'>
                        {messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`mwasa-assistant__message mwasa-assistant__message--${message.role}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>

                    <div className='mwasa-assistant__composer'>
                        <input
                            value={draft}
                            onChange={event => setDraft(event.target.value)}
                            onKeyDown={event => {
                                if (event.key === 'Enter') handleSend();
                            }}
                            placeholder='Ask MWASA or request a new strategic upgrade...'
                            aria-label='Ask the assistant'
                        />
                        <button type='button' onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MwasaAssistant;
