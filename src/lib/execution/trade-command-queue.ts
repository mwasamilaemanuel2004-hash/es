export const tradeCommandQueue = [
    'watchlist-load',
    'market-regime-check',
    'provider-readiness-check',
    'risk-guard-check',
    'execution-approval-check',
    'order-ticket-ready',
    'signal-emit',
];

export const queueHealthMap = tradeCommandQueue.reduce<Record<string, string>>((acc, queueItem) => {
    acc[queueItem] = 'ready';
    return acc;
}, {});

export const tradeQueueSummary = {
    active: tradeCommandQueue.length,
    status: 'stable',
    note: 'Execution queue is ready for safe incremental handoff.',
};
