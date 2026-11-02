export interface MOEExpert {
    id: string;
    specialty: string;
    weight: number;
}

export interface MOEContext {
    volatility: number;
    trend: number;
    liquidity: number;
    momentum: number;
    spread: number;
    regime: 'TREND' | 'RANGE' | 'VOLATILITY' | 'BREAKOUT' | 'NEWS';
}

export class MixtureOfExperts {
    private readonly experts: MOEExpert[];

    constructor(experts: MOEExpert[]) {
        this.experts = experts;
    }

    route(context: MOEContext): MOEExpert {
        let best = this.experts[0];
        let bestScore = -Infinity;

        for (const expert of this.experts) {
            let score = expert.weight;
            if (expert.specialty.includes('trend') && context.trend > 0.5) score += 1.5;
            if (expert.specialty.includes('volatility') && context.volatility > 0.7) score += 1.7;
            if (expert.specialty.includes('liquidity') && context.liquidity > 0.6) score += 1.4;
            if (expert.specialty.includes('momentum') && context.momentum > 0.6) score += 1.5;
            if (expert.specialty.includes('news') && context.regime === 'NEWS') score += 1.8;
            if (expert.specialty.includes('range') && context.regime === 'RANGE') score += 1.6;

            if (score > bestScore) {
                best = expert;
                bestScore = score;
            }
        }

        return best;
    }
}

export const moeExperts: MOEExpert[] = [
    { id: 'trend-expert', specialty: 'trend detection', weight: 1.2 },
    { id: 'volatility-expert', specialty: 'volatility adaptation', weight: 1.3 },
    { id: 'liquidity-expert', specialty: 'liquidity sweep detection', weight: 1.4 },
    { id: 'momentum-expert', specialty: 'momentum acceleration', weight: 1.5 },
    { id: 'news-expert', specialty: 'news regime analysis', weight: 1.2 },
    { id: 'range-expert', specialty: 'range management', weight: 1.1 },
];

export const createMixtureOfExperts = () => new MixtureOfExperts(moeExperts);
