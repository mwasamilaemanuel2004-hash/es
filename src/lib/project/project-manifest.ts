export const MWASA_PROJECT_NAME = 'MWASA AI / ESMH.TRADE';
export const MWASA_PROJECT_REPO = 'mwasamilaemanuel2004-hash/es';
export const MWASA_PROJECT_URL = 'https://github.com/mwasamilaemanuel2004-hash/es';

export interface ProjectManifest {
    name: string;
    repo: string;
    url: string;
    mission: string;
    architecture: string[];
}

export const projectManifest: ProjectManifest = {
    name: MWASA_PROJECT_NAME,
    repo: MWASA_PROJECT_REPO,
    url: MWASA_PROJECT_URL,
    mission: 'Adaptive institutional AI multi-market trading system with risk-first execution and autonomous trading intelligence.',
    architecture: [
        'Mother Brain orchestration',
        'Adaptive Dynamic Intelligence',
        '48 specialized trading bots',
        'Super Scalping engine',
        'Strategy Builder',
        'Risk and execution guardrails',
        'Real-time market validation',
    ],
};
