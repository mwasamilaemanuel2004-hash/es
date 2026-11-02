import type { AgentDefinition } from './types';

export const agentCatalog: AgentDefinition[] = [
    {
        id: 'market-research',
        label: 'Market Research Agent',
        role: 'Market intelligence and contextual research',
        priority: 1,
        description: 'Monitors macro, sentiment, liquidity and multi-asset environment to identify trading pressure.',
    },
    {
        id: 'strategy-generator',
        label: 'Strategy Generator',
        role: 'Strategy ideation and portfolio alignment',
        priority: 2,
        description: 'Generates and scores trade ideas using strict trend, structure and regime filters.',
    },
    {
        id: 'quant-analyst',
        label: 'Quant Analyst',
        role: 'Signal validation and model scoring',
        priority: 3,
        description: 'Validates indicators, models and historical consistency before a trade is considered.',
    },
    {
        id: 'risk-manager',
        label: 'Risk Manager',
        role: 'Exposure and drawdown governance',
        priority: 4,
        description: 'Enforces sizing, leverage, correlation, drawdown and emergency halts.',
    },
    {
        id: 'execution-agent',
        label: 'Execution Agent',
        role: 'Order routing and trade execution',
        priority: 5,
        description: 'Validates execution conditions and routes to approved venues after risk gates pass.',
    },
    {
        id: 'portfolio-manager',
        label: 'Portfolio Manager',
        role: 'Allocation and risk-budget review',
        priority: 6,
        description: 'Balances diversification, sector exposure and aggregate portfolio risk.',
    },
    {
        id: 'market-scanner',
        label: 'Market Scanner',
        role: 'Opportunity identification',
        priority: 7,
        description: 'Scans 50-1,000 markets for setups and cross-asset signals.',
    },
    {
        id: 'performance-monitor',
        label: 'Performance Monitor',
        role: 'Live P&L and system health',
        priority: 8,
        description: 'Tracks realized and unrealized performance, latency and execution quality.',
    },
    {
        id: 'news-intelligence',
        label: 'News Intelligence',
        role: 'Sentiment and catalyst analysis',
        priority: 9,
        description: 'Reads event flow, sentiment and macro catalysts affecting market structure.',
    },
    {
        id: 'adaptive-risk-advisor',
        label: 'Adaptive Risk Advisor',
        role: 'Dynamic guardrail adjustment',
        priority: 10,
        description: 'Adjusts risk posture dynamically based on regime shifts and volatility conditions.',
    },
    {
        id: 'buddy-ai',
        label: 'Buddy AI',
        role: 'Trading assistant',
        priority: 11,
        description: 'Provides user-facing decision summaries and explanations in plain language.',
    },
    {
        id: 'discover-agent',
        label: 'DISCOVER AGENT',
        role: 'Opportunity discovery and workflow monitoring',
        priority: 12,
        description: 'Searches for setups, monitors orchestration state and surfaces hidden opportunities.',
    },
];

export const agentRoles = agentCatalog.reduce<Record<string, AgentDefinition>>((acc, agent) => {
    acc[agent.id] = agent;
    return acc;
}, {});
