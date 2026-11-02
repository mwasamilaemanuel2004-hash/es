export interface MemoryItem {
    id: string;
    kind: 'observation' | 'insight' | 'strategy' | 'risk' | 'token';
    summary: string;
    content: string;
    createdAt: string;
    source: string;
}

export interface ReasoningTrace {
    input: string;
    conclusion: string;
    confidence: number;
    steps: string[];
    timestamp: string;
}

export class JavarisMemory {
    private readonly items: MemoryItem[] = [];

    add(item: Omit<MemoryItem, 'id' | 'createdAt'>): MemoryItem {
        const record: MemoryItem = {
            id: `memory-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            createdAt: new Date().toISOString(),
            ...item,
        };
        this.items.push(record);
        return record;
    }

    search(kind?: MemoryItem['kind']): MemoryItem[] {
        if (!kind) return [...this.items];
        return this.items.filter(item => item.kind === kind);
    }

    summarize(): string {
        if (this.items.length === 0) return 'No memory recorded yet.';
        return this.items
            .slice(-5)
            .map(item => `${item.kind}: ${item.summary}`)
            .join(' | ');
    }
}

export class ReasoningEngine {
    private readonly memory: JavarisMemory;

    constructor(memory: JavarisMemory) {
        this.memory = memory;
    }

    reason(input: string): ReasoningTrace {
        const lowered = input.toLowerCase();
        let conclusion = 'No direct action is justified yet';
        let confidence = 0.55;
        const steps: string[] = [];

        if (lowered.includes('risk') || lowered.includes('drawdown')) {
            conclusion = 'Risk conditions must be reduced before executing more trading activity.';
            confidence = 0.92;
            steps.push('Assess current drawdown and exposure.', 'Check source verification status.', 'Reduce size or pause execution.');
        } else if (lowered.includes('strategy') || lowered.includes('adapt')) {
            conclusion = 'Strategy adaptation is recommended based on regime detection and signal quality.';
            confidence = 0.88;
            steps.push('Inspect recent market regime shifts.', 'Compare strategy performance.', 'Deploy alternate validated strategy if needed.');
        } else if (lowered.includes('broker') || lowered.includes('connect')) {
            conclusion = 'Official broker connection must be verified before execution.';
            confidence = 0.9;
            steps.push('Confirm broker source status.', 'Verify docs and credentials.', 'Only route approved markets.');
        } else {
            conclusion = 'Observation is neutral; continue monitoring and collect more verified evidence.';
            confidence = 0.66;
            steps.push('Gather additional evidence.', 'Assess source health.', 'Review active strategy performance.');
        }

        const trace: ReasoningTrace = {
            input,
            conclusion,
            confidence,
            steps,
            timestamp: new Date().toISOString(),
        };

        this.memory.add({
            kind: 'insight',
            summary: conclusion,
            content: JSON.stringify(trace),
            source: 'ReasoningEngine',
        });

        return trace;
    }
}

export class JavarisVault {
    private readonly memory = new JavarisMemory();
    private readonly reasoning = new ReasoningEngine(this.memory);

    recordInsight(summary: string, content: string, source: string) {
        return this.memory.add({
            kind: 'insight',
            summary,
            content,
            source,
        });
    }

    recordStrategy(summary: string, content: string) {
        return this.memory.add({
            kind: 'strategy',
            summary,
            content,
            source: 'StrategyBuilder',
        });
    }

    recordRisk(summary: string, content: string) {
        return this.memory.add({
            kind: 'risk',
            summary,
            content,
            source: 'RiskEngine',
        });
    }

    reason(input: string): ReasoningTrace {
        return this.reasoning.reason(input);
    }

    summary(): string {
        return this.memory.summarize();
    }
}

export const javarisVault = new JavarisVault();
