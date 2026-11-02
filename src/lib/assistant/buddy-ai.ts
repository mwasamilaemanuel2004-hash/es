export type ChatRole = 'user' | 'assistant' | 'system';

export interface BuddyChatMessage {
    role: ChatRole;
    content: string;
    timestamp: string;
}

export interface BuddyAiDecision {
    action: 'TRADE' | 'WAIT' | 'REDUCE' | 'EXIT' | 'PAUSE' | 'BLOCK' | 'SWITCH_STRATEGY' | 'EMERGENCY_MODE';
    confidence: number;
    explanation: string;
    nextStep: string;
}

export interface BuddyAiContext {
    market: string;
    symbol: string;
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
    sourceStatus: string;
    riskScore: number;
    strategy: string;
    userGoal?: string;
}

export interface BuddyAiSession {
    id: string;
    ownerEmail: string;
    messages: BuddyChatMessage[];
    lastAction?: BuddyAiDecision;
    ready: boolean;
    updatedAt: string;
}

export class BuddyAi {
    private memory: BuddyChatMessage[] = [];

    addMessage(role: ChatRole, content: string): BuddyChatMessage {
        const message = {
            role,
            content,
            timestamp: new Date().toISOString(),
        };
        this.memory.push(message);
        return message;
    }

    interpretRequest(message: string): BuddyAiDecision {
        const lower = message.toLowerCase();
        if (lower.includes('exit') || lower.includes('close')) {
            return {
                action: 'EXIT',
                confidence: 0.9,
                explanation: 'The assistant detected a risk-driven exit request.',
                nextStep: 'Review exposure and finalize exit route.',
            };
        }
        if (lower.includes('pause') || lower.includes('hold')) {
            return {
                action: 'PAUSE',
                confidence: 0.84,
                explanation: 'The assistant favors a pause to reduce current trading risk.',
                nextStep: 'Hold the position and wait for risk review.',
            };
        }
        if (lower.includes('reduce') || lower.includes('cut')) {
            return {
                action: 'REDUCE',
                confidence: 0.8,
                explanation: 'The assistant recommends reducing exposure to safe values.',
                nextStep: 'Lower size and continue monitoring the setup.',
            };
        }
        if (lower.includes('switch') || lower.includes('change strategy')) {
            return {
                action: 'SWITCH_STRATEGY',
                confidence: 0.75,
                explanation: 'A strategy change is recommended due to regime mismatch.',
                nextStep: 'Evaluate alternate validated strategy variants before re-entering.',
            };
        }
        if (lower.includes('emergency') || lower.includes('kill switch')) {
            return {
                action: 'EMERGENCY_MODE',
                confidence: 0.98,
                explanation: 'Emergency mode is the safest response under critical conditions.',
                nextStep: 'Pause all live trading and escalate to risk review.',
            };
        }

        return {
            action: 'WAIT',
            confidence: 0.7,
            explanation: 'The assistant recommends waiting and gathering more verified data before acting.',
            nextStep: 'Continue monitoring source health and regime quality.',
        };
    }

    analyzeContext(context: BuddyAiContext): BuddyAiDecision {
        if (context.sourceStatus !== 'LIVE' && context.sourceStatus !== 'PAPER') {
            return {
                action: 'WAIT',
                confidence: 0.66,
                explanation: 'Source not verified; the assistant will wait for a trusted connection before acting.',
                nextStep: 'Verify market source and broker health before continuing.',
            };
        }

        if (context.riskScore >= 80) {
            return {
                action: 'PAUSE',
                confidence: 0.96,
                explanation: 'Risk posture is elevated; the assistant pauses decisioning.',
                nextStep: 'Check drawdown, exposure and correlation limits before re-entering.',
            };
        }

        return {
            action: 'TRADE',
            confidence: 0.82,
            explanation: `Adaptive strategy path for ${context.market}/${context.symbol} is consistent with the current regime.`,
            nextStep: 'Proceed with risk-approved execution and continue monitoring live performance.',
        };
    }

    createSession(ownerEmail: string): BuddyAiSession {
        return {
            id: `buddy-${Date.now()}`,
            ownerEmail,
            messages: [],
            ready: true,
            updatedAt: new Date().toISOString(),
        };
    }
}

export const buddyAi = new BuddyAi();
