import { maxAlgoStrategy, type StrategySignal } from './maxalgo';

export type StrategyId = 'MAXALGO_MOMENTUM';

export interface StrategyDefinition {
    id: StrategyId;
    label: string;
    description: string;
    enabled: boolean;
    score: number;
    filter?: string[];
}

export const strategyRegistry: StrategyDefinition[] = [
    {
        id: 'MAXALGO_MOMENTUM',
        label: 'MaxAlgo Momentum',
        description: 'Momentum direction, RSI trend, chop filter, volume bubble, EMA 200 side and liquidity sweep.',
        enabled: true,
        score: 86,
        filter: ['ASIA', 'LONDON', 'NEW_YORK'],
    },
];

export const evaluateStrategy = (input: Parameters<typeof maxAlgoStrategy>[0]): StrategySignal =>
    maxAlgoStrategy(input);

export const getEnabledStrategies = () => strategyRegistry.filter(strategy => strategy.enabled);
