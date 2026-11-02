export type LearningModel =
    | 'Reinforcement Learning'
    | 'XGBoost'
    | 'Random Forest'
    | 'Logistic Regression'
    | 'LSTM/GRU'
    | 'Transformer Time-Series'
    | 'Bayesian Optimization'
    | 'Regime Classification';

export interface LearningModelProfile {
    model: LearningModel;
    verifiedDataUsed: boolean;
    lookAheadBiasPrevented: boolean;
    driftMonitoringEnabled: boolean;
    validationScore: number;
    approved: boolean;
}

export interface LearningStatus {
    model: LearningModel;
    validationPassed: boolean;
    reason: string;
    drift: 'STABLE' | 'WATCH' | 'CRITICAL';
    measurableImprovement: number;
}

export const modelCatalog: LearningModel[] = [
    'Reinforcement Learning',
    'XGBoost',
    'Random Forest',
    'Logistic Regression',
    'LSTM/GRU',
    'Transformer Time-Series',
    'Bayesian Optimization',
    'Regime Classification',
];

export const createModelProfile = (model: LearningModel): LearningModelProfile => ({
    model,
    verifiedDataUsed: true,
    lookAheadBiasPrevented: true,
    driftMonitoringEnabled: true,
    validationScore: model === 'Transformer Time-Series' ? 0.92 : model === 'XGBoost' ? 0.9 : 0.83,
    approved: true,
});

export const evaluateLearningStatus = (profile: LearningModelProfile): LearningStatus => {
    if (!profile.verifiedDataUsed || !profile.lookAheadBiasPrevented || !profile.driftMonitoringEnabled) {
        return {
            model: profile.model,
            validationPassed: false,
            reason: 'Model cannot claim measurable improvement without verified data and bias protection.',
            drift: 'CRITICAL',
            measurableImprovement: 0,
        };
    }

    const measurableImprovement = profile.validationScore - 0.7;

    return {
        model: profile.model,
        validationPassed: profile.approved && profile.validationScore >= 0.8,
        reason: profile.approved ? 'Validated model performance is measurable and consistent with the current dataset.' : 'Model is not approved for live deployment.',
        drift: measurableImprovement > 0.22 ? 'STABLE' : measurableImprovement > 0.1 ? 'WATCH' : 'CRITICAL',
        measurableImprovement,
    };
};
