export const executionGuardState = {
    enabled: true,
    maxExposurePct: 42,
    drawdownThreshold: 8.1,
    riskMode: 'semi-auto',
    alert: 'Capital guard active',
};

export const executionGuardChecklist = [
    'Net exposure within safe band',
    'Drawdown threshold under control',
    'No unstable routing state',
    'AI signal confirmation required',
];
