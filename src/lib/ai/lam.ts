export interface LAMMemoryEntry {
    id: string;
    agentId: string;
    summary: string;
    content: string;
    timestamp: string;
    score: number;
}

export class LatentAgentMemory {
    private readonly entries: LAMMemoryEntry[] = [];

    store(agentId: string, summary: string, content: string, score: number): LAMMemoryEntry {
        const entry: LAMMemoryEntry = {
            id: `lam-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            agentId,
            summary,
            content,
            timestamp: new Date().toISOString(),
            score,
        };
        this.entries.push(entry);
        return entry;
    }

    recall(filter?: { agentId?: string; minScore?: number }): LAMMemoryEntry[] {
        return this.entries.filter(entry => {
            if (filter?.agentId && entry.agentId !== filter.agentId) return false;
            if (filter?.minScore != null && entry.score < filter.minScore) return false;
            return true;
        });
    }

    summarize(): string {
        if (this.entries.length === 0) return 'No latent agent memory recorded.';
        return this.entries
            .slice(-5)
            .map(entry => `${entry.agentId}: ${entry.summary} (${entry.score})`)
            .join(' | ');
    }
}

export const lamMemory = new LatentAgentMemory();
