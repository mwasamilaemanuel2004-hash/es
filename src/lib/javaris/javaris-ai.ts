export interface JavarisCapability {
    name: string;
    summary: string;
    category: 'ORCHESTRATION' | 'STRATEGY' | 'RISK' | 'LEARNING' | 'MONITORING';
}

export interface JavarisAiProfile {
    name: string;
    project: string;
    role: string;
    capabilities: JavarisCapability[];
    status: 'READY' | 'STAGING' | 'BLOCKED';
}

export const javarisCapabilities: JavarisCapability[] = [
    { name: 'Adaptive Market Decisioning', summary: 'Switches between trend, volatility, breakout and range modes according to live conditions.', category: 'ORCHESTRATION' },
    { name: 'Super Scalping Validation', summary: 'Validates microstructure entries with liquidity, spread, volume, and latency checks.', category: 'STRATEGY' },
    { name: 'Risk-First Execution Gate', summary: 'Blocks unsafe orders until source verification and portfolio guardrails pass.', category: 'RISK' },
    { name: 'Hybrid Strategy Generation', summary: 'Combines compatible trading strategies while preserving risk constraints.', category: 'STRATEGY' },
    { name: 'Model Validation & Drift Monitoring', summary: 'Requires measurable validation before AI claims are accepted.', category: 'LEARNING' },
    { name: 'Performance & Status Monitoring', summary: 'Tracks bot health, market health, P&L and connection quality with explicit verification states.', category: 'MONITORING' },
];

export const createJavarisAi = (): JavarisAiProfile => ({
    name: 'Javaris AI',
    project: 'MWASA AI / ESMH.TRADE',
    role: 'Adaptive institutional trading intelligence layer for orchestration, strategy generation, risk governance and performance monitoring.',
    capabilities: javarisCapabilities,
    status: 'READY',
});
