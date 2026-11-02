import { agentCatalog } from './agent-registry';
import type { AgentAction, AgentContext, AgentDefinition, DataMode, SourceStatus } from './types';

export const createMotherBrain = () => {
    const agents: AgentDefinition[] = [...agentCatalog].sort((a, b) => a.priority - b.priority);

    const evaluateSource = (context: AgentContext): boolean => {
        const allowedStatuses: SourceStatus[] = ['LIVE', 'PAPER', 'BACKTEST'];
        if (!context.sourceVerification) return false;
        return allowedStatuses.includes(context.sourceVerification.status as SourceStatus) || context.sourceVerification.status === 'UNKNOWN';
    };

    const processMarketCycle = (context: AgentContext): AgentAction => {
        const sourceValid = evaluateSource(context);

        if (!sourceValid) {
            return {
                command: 'WAIT',
                confidence: 0.15,
                rationale: 'Source is not verified for execution. Holding position until data status is confirmed.',
                mode: context.mode,
                riskGatePassed: false,
            };
        }

        const riskScore = context.riskScore ?? 0;
        const sentiment = context.sentiment ?? 0;
        const price = context.price ?? 0;

        if (context.mode === 'BACKTEST') {
            return {
                command: 'WAIT',
                confidence: 0.64,
                rationale: 'Backtest context is active; generate strategy score before live execution approval.',
                mode: 'BACKTEST',
                riskGatePassed: riskScore < 75,
            };
        }

        const shouldReduce = riskScore > 72 || sentiment < -0.5;
        const shouldExit = riskScore > 85 || price <= 0;

        if (shouldExit) {
            return {
                command: 'EXIT',
                confidence: 0.92,
                rationale: 'Risk thresholds and market conditions exceed safety gates. Exit is recommended.',
                mode: context.mode,
                riskGatePassed: false,
            };
        }

        if (shouldReduce) {
            return {
                command: 'REDUCE',
                confidence: 0.8,
                rationale: 'Volatility and risk concentration have increased. Reduce exposure while preserving strategic direction.',
                mode: context.mode,
                riskGatePassed: true,
            };
        }

        if (sentiment > 0.5 && riskScore < 70) {
            return {
                command: 'TRADE',
                confidence: 0.84,
                rationale: 'Intelligence, sentiment, and risk posture align for a controlled long exposure.',
                strategy: 'MAXALGO_MOMENTUM',
                mode: context.mode,
                riskGatePassed: true,
            };
        }

        return {
            command: 'WAIT',
            confidence: 0.69,
            rationale: 'Market structure and risk posture are not aligned for execution yet. Continue monitoring.',
            mode: context.mode,
            riskGatePassed: riskScore < 70,
        };
    };

    const approveExecution = (context: AgentContext): boolean => {
        const sourceStatus = context.sourceVerification?.status;
        const riskScore = context.riskScore ?? 0;

        if (sourceStatus === 'UNVERIFIED' || sourceStatus === 'STALE' || sourceStatus === 'DISCONNECTED' || sourceStatus === 'UNAVAILABLE') {
            return false;
        }

        if (riskScore > 80) {
            return false;
        }

        return true;
    };

    return {
        agents,
        processMarketCycle,
        approveExecution,
        getAgentCatalog: () => agents,
    };
};

export const motherBrain = createMotherBrain();
export { agentCatalog };
