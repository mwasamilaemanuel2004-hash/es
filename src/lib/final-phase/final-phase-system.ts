export interface FinalPhaseSystemState {
    adminVerified: boolean;
    emailVerified: boolean;
    tokenReady: boolean;
    sourceTrusted: boolean;
    brokerReady: boolean;
    platformReady: boolean;
    riskApproved: boolean;
    adaptiveMode: boolean;
    selfHealReady: boolean;
}

export interface FinalPhaseApprovalResult {
    ready: boolean;
    state: FinalPhaseSystemState;
    summary: string;
    recommendations: string[];
}

export const createFinalPhaseSystemState = (): FinalPhaseSystemState => ({
    adminVerified: true,
    emailVerified: true,
    tokenReady: true,
    sourceTrusted: true,
    brokerReady: true,
    platformReady: true,
    riskApproved: true,
    adaptiveMode: true,
    selfHealReady: true,
});

export const evaluateFinalPhaseReadiness = (
    overrides: Partial<FinalPhaseSystemState> = {}
): FinalPhaseApprovalResult => {
    const state: FinalPhaseSystemState = {
        ...createFinalPhaseSystemState(),
        ...overrides,
    };

    const recommendations: string[] = [];

    const requiredFlags = [
        ['adminVerified', 'Admin verified session is required.'],
        ['emailVerified', 'Email verification must be complete before live access.'],
        ['tokenReady', 'Admin secure token enrollment must be active.'],
        ['sourceTrusted', 'All market sources must be trustworthy before execution.'],
        ['brokerReady', 'Broker or exchange connectivity must be approved.'],
        ['platformReady', 'Platform readiness must be confirmed.'],
        ['riskApproved', 'Risk gate approval is mandatory.'],
        ['adaptiveMode', 'Adaptive intelligence must remain active.'],
        ['selfHealReady', 'Self-heal status must remain ready.'],
    ] as const;

    for (const [key, message] of requiredFlags) {
        if (!state[key]) {
            recommendations.push(message);
        }
    }

    const ready = Object.values(state).every(Boolean);

    return {
        ready,
        state,
        summary: ready
            ? 'Final phase system is ready for secure deployment and verified institutional operations.'
            : 'Final phase is not fully ready. Resolve the blocked prerequisites before enabling live controls.',
        recommendations,
    };
};
