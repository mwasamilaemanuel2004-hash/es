export type AgentDecision =
    | 'TRADE'
    | 'WAIT'
    | 'REDUCE'
    | 'EXIT'
    | 'PAUSE'
    | 'BLOCK'
    | 'SWITCH_STRATEGY'
    | 'EMERGENCY_MODE';

export interface AgentContext {
    id: string;
    name: string;
    market: string;
    symbol: string;
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
    confidence: number;
    riskScore: number;
    sourceStatus: string;
}

export interface AgentDecisionResult {
    agentId: string;
    decision: AgentDecision;
    confidence: number;
    rationale: string;
    riskGatePassed: boolean;
}

export interface AgentDefinition {
    id: string;
    name: string;
    specialty: string;
    priority: number;
}

export const agentDefinitions: AgentDefinition[] = [
    { id: 'market-research', name: 'Market Research Agent', specialty: 'market context', priority: 1 },
    { id: 'strategy-generator', name: 'Strategy Generator', specialty: 'signal selection', priority: 2 },
    { id: 'quant-analyst', name: 'Quant Analyst', specialty: 'statistical validation', priority: 3 },
    { id: 'risk-manager', name: 'Risk Manager', specialty: 'risk guardrails', priority: 4 },
    { id: 'execution-agent', name: 'Execution Agent', specialty: 'execution routing', priority: 5 },
    { id: 'buddy-ai', name: 'Buddy AI', specialty: 'assistant orchestration', priority: 6 },
];

export const evaluateAgentDecision = (agent: AgentDefinition, context: AgentContext): AgentDecisionResult => {
    const invalidSource = ['UNKNOWN', 'UNVERIFIED', 'STALE', 'DISCONNECTED', 'UNAVAILABLE'].includes(context.sourceStatus);
    const highRisk = context.riskScore >= 80;
    const lowConfidence = context.confidence < 0.55;

    if (invalidSource) {
        return {
            agentId: agent.id,
            decision: 'BLOCK',
            confidence: 0.96,
            rationale: 'Source is invalid or untrusted; the agent blocks execution.',
            riskGatePassed: false,
        };
    }

    if (highRisk) {
        return {
            agentId: agent.id,
            decision: 'PAUSE',
            confidence: 0.92,
            rationale: 'Risk score exceeds the safe operating band.',
            riskGatePassed: false,
        };
    }

    if (lowConfidence) {
        return {
            agentId: agent.id,
            decision: 'WAIT',
            confidence: 0.55,
            rationale: 'Confidence is not high enough for reliable execution.',
            riskGatePassed: false,
        };
    }

    return {
        agentId: agent.id,
        decision: agent.id === 'risk-manager' ? 'REDUCE' : 'TRADE',
        confidence: Math.min(0.96, context.confidence + 0.1),
        rationale: `Agent ${agent.name} approves the setup after checking market context and controls.`,
        riskGatePassed: true,
    };
};
