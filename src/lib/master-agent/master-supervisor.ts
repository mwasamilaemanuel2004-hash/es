export type SupervisorAccessLevel = 1 | 2 | 3;
export type SupervisorAction =
    | 'CHAT'
    | 'ANALYZE'
    | 'RESEARCH'
    | 'PLAN'
    | 'DELEGATE'
    | 'OPTIMIZE'
    | 'UPGRADE'
    | 'BLOCK'
    | 'EMERGENCY';

export interface MasterSupervisorContext {
    tokenLevel: SupervisorAccessLevel;
    verified: boolean;
    adminConfirmed: boolean;
    sessionTrusted: boolean;
    riskApproved: boolean;
    emailVerified: boolean;
    sourceStatus: string;
    riskScore: number;
    market: string;
    mode: 'LIVE' | 'PAPER' | 'BACKTEST';
}

export interface MasterSupervisorDecision {
    allowed: boolean;
    action: SupervisorAction;
    confidence: number;
    reason: string;
    delegatedAgents: string[];
    requiresAdminApproval: boolean;
}

export const canUseMasterSupervisor = (context: MasterSupervisorContext): boolean => {
    return (
        context.tokenLevel >= 3 &&
        context.verified &&
        context.emailVerified &&
        context.adminConfirmed &&
        context.sessionTrusted &&
        context.riskApproved &&
        context.sourceStatus !== 'UNKNOWN' &&
        context.sourceStatus !== 'UNVERIFIED' &&
        context.sourceStatus !== 'DISCONNECTED' &&
        context.sourceStatus !== 'UNAVAILABLE' &&
        context.riskScore < 80
    );
};

export const createMasterSupervisorDecision = (
    context: MasterSupervisorContext
): MasterSupervisorDecision => {
    if (!context.verified || !context.emailVerified) {
        return {
            allowed: false,
            action: 'BLOCK',
            confidence: 0.99,
            reason: 'Master Supervisor requires verified identity and verified email before access is granted.',
            delegatedAgents: ['security-agent', 'admin-gateway'],
            requiresAdminApproval: true,
        };
    }

    if (context.tokenLevel < 3) {
        return {
            allowed: false,
            action: 'BLOCK',
            confidence: 0.98,
            reason: 'Higher-rank supervisor access is restricted to Level 3 only.',
            delegatedAgents: ['access-control-agent'],
            requiresAdminApproval: true,
        };
    }

    if (!context.adminConfirmed || !context.sessionTrusted) {
        return {
            allowed: false,
            action: 'BLOCK',
            confidence: 0.97,
            reason: 'The session is not trusted and cannot unlock High Rank Supervisor privileges.',
            delegatedAgents: ['security-agent', 'session-agent'],
            requiresAdminApproval: true,
        };
    }

    if (context.riskScore >= 80) {
        return {
            allowed: false,
            action: 'EMERGENCY',
            confidence: 0.99,
            reason: 'Risk score is above the supervisor safety threshold; emergency mode is enforced.',
            delegatedAgents: ['risk-agent', 'security-agent', 'execution-agent'],
            requiresAdminApproval: true,
        };
    }

    return {
        allowed: true,
        action: 'ANALYZE',
        confidence: 0.94,
        reason: 'High-rank Supervisor is active and authorized for orchestrated analysis, strategy review, and safe upgrades.',
        delegatedAgents: [
            'market-research-agent',
            'strategy-agent',
            'risk-agent',
            'security-agent',
            'buddy-ai',
            'llm-reasoning-agent',
            'memory-lam-agent',
            'quant-agent',
            'monitoring-agent',
        ],
        requiresAdminApproval: false,
    };
};

export const supervisorCapabilities = [
    'Chat with admin/user',
    'Analyze challenges and opportunities',
    'Route work through specialized agents',
    'Review and optimize strategies',
    'Use memory, LAM and LLM reasoning loops',
    'Propose safe upgrades with approval gates',
    'Detect security risk and throttling events',
    'Escalate to emergency mode when needed',
];
