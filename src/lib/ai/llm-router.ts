export type ModelTier = 'local' | 'free' | 'managed';
export type IntelligenceTask = 'market-summary' | 'signal-breakdown' | 'risk-check' | 'execution-review' | 'news-scan';

export type LlmRoute = {
    provider: string;
    model: string;
    tier: ModelTier;
    latency: 'fast' | 'balanced' | 'deep';
    notes: string;
};

export const llmRouteCatalog: Record<IntelligenceTask, LlmRoute[]> = {
    'market-summary': [
        { provider: 'Ollama', model: 'llama3.1:8b', tier: 'local', latency: 'balanced', notes: 'Fast local summarization for low-latency market snapshots' },
        { provider: 'OpenRouter', model: 'deepseek-r1', tier: 'free', latency: 'deep', notes: 'Fallback reasoning model for full narrative summaries' },
        { provider: 'OpenAI', model: 'gpt-4o-mini', tier: 'managed', latency: 'fast', notes: 'Premium fallback for critical executive summaries' },
    ],
    'signal-breakdown': [
        { provider: 'Ollama', model: 'qwen2.5:7b', tier: 'local', latency: 'balanced', notes: 'Signal decomposition and pattern reasoning' },
        { provider: 'OpenRouter', model: 'mistral-small-3.1', tier: 'free', latency: 'fast', notes: 'Lower-cost classification and momentum explanation' },
        { provider: 'OpenAI', model: 'gpt-4.1-mini', tier: 'managed', latency: 'balanced', notes: 'Structured analysis for decision support' },
    ],
    'risk-check': [
        { provider: 'Ollama', model: 'phi-3', tier: 'local', latency: 'fast', notes: 'Safety checks and risk policy validation' },
        { provider: 'OpenRouter', model: 'gemma-2-9b', tier: 'free', latency: 'fast', notes: 'Quick guardrail evaluation for capital protection' },
        { provider: 'OpenAI', model: 'gpt-4o', tier: 'managed', latency: 'deep', notes: 'Institutional-grade risk framing' },
    ],
    'execution-review': [
        { provider: 'Ollama', model: 'llama3.1:8b', tier: 'local', latency: 'fast', notes: 'Trade review and execution sanity check' },
        { provider: 'OpenRouter', model: 'deepseek-chat', tier: 'free', latency: 'balanced', notes: 'Execution narrative and anomaly detection' },
        { provider: 'OpenAI', model: 'gpt-4.1', tier: 'managed', latency: 'deep', notes: 'Detailed trade review and strategy critique' },
    ],
    'news-scan': [
        { provider: 'OpenRouter', model: 'qwen-2.5-72b', tier: 'free', latency: 'balanced', notes: 'News synthesis and event detection' },
        { provider: 'Ollama', model: 'mistral:7b', tier: 'local', latency: 'balanced', notes: 'Fast event categorization for local monitoring' },
        { provider: 'OpenAI', model: 'gpt-4o-mini', tier: 'managed', latency: 'fast', notes: 'Macro narrative and headline summarization' },
    ],
};

export const resolveModelRoute = (task: IntelligenceTask, budget: 'lean' | 'balanced' | 'premium' = 'balanced') => {
    const routes = llmRouteCatalog[task];

    if (budget === 'lean') {
        return routes.find(route => route.tier === 'local') ?? routes[0];
    }

    if (budget === 'premium') {
        return routes.find(route => route.tier === 'managed') ?? routes[routes.length - 1];
    }

    const local = routes.find(route => route.tier === 'local');
    const free = routes.find(route => route.tier === 'free');
    return local ?? free ?? routes[0];
};

export const createAiDecisionSummary = (task: IntelligenceTask) => ({
    task,
    preferredModel: resolveModelRoute(task),
    fallback: llmRouteCatalog[task].find(route => route.tier === 'free') ?? llmRouteCatalog[task][0],
    autonomy: 'Adaptive routing enabled',
});
