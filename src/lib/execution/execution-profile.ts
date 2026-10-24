export type ExecutionMode = 'manual' | 'semi-auto' | 'auto';

export interface ExecutionProfile {
    mode: ExecutionMode;
    riskBand: 'low' | 'medium' | 'high';
    defaultOrderSize: number;
    maxExposurePct: number;
    guardEnabled: boolean;
}

export const executionProfile: ExecutionProfile = {
    mode: 'semi-auto',
    riskBand: 'medium',
    defaultOrderSize: 0.42,
    maxExposurePct: 42,
    guardEnabled: true,
};

export const executionProfileSummary = {
    modeLabel: 'Semi-auto execution',
    riskCaption: 'Exposure within configured safe limits',
    guardLabel: 'Capital guard active',
};
