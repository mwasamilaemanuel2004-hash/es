export interface TokenVaultEntry {
    key: string;
    value: string;
    createdAt: string;
    expiresAt: string;
    used: boolean;
    notes?: string;
}

export interface AnimatedTokenPrompt {
    visible: boolean;
    title: string;
    subtitle: string;
    token: string;
    animation: 'pulse' | 'scan' | 'fade';
}

export class TokenVault {
    private readonly tokens = new Map<string, TokenVaultEntry>();

    createToken(key: string, value: string, notes?: string): TokenVaultEntry {
        const now = Date.now();
        const expiresAt = new Date(now + 1000 * 60 * 60 * 24).toISOString();
        const entry: TokenVaultEntry = {
            key,
            value,
            createdAt: new Date(now).toISOString(),
            expiresAt,
            used: false,
            notes,
        };
        this.tokens.set(key, entry);
        return entry;
    }

    verifyToken(key: string, value: string): boolean {
        const entry = this.tokens.get(key);
        if (!entry) return false;
        if (entry.used) return false;
        if (new Date(entry.expiresAt).getTime() < Date.now()) return false;
        const valid = entry.value === value;
        if (valid) {
            entry.used = true;
        }
        return valid;
    }

    listActiveTokens(): TokenVaultEntry[] {
        return [...this.tokens.values()].filter(entry => !entry.used && new Date(entry.expiresAt).getTime() > Date.now());
    }

    getAnimatedPrompt(key: string, value: string): AnimatedTokenPrompt {
        return {
            visible: true,
            title: 'Admin secure token entry',
            subtitle: 'Enter the secure token to unlock privileged session controls.',
            token: value,
            animation: 'scan',
        };
    }
}

export const tokenVault = new TokenVault();
