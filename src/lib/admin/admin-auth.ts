export const ADMIN_EMAIL = 'estradingmachine@gmail.com';
export const ADMIN_PASSWORD = 'eSmwas@2004';
export const ADMIN_ROLE = 'admin';

export type AdminStatus =
    | 'EMAIL_UNVERIFIED'
    | 'EMAIL_VERIFIED'
    | 'MFA_REQUIRED'
    | 'SESSION_ACTIVE'
    | 'SESSION_EXPIRED'
    | 'ACCOUNT_LOCKED'
    | 'ACCESS_BLOCKED';

export interface AdminSession {
    email: string;
    role: 'admin';
    status: AdminStatus;
    verified: boolean;
    mfaVerified: boolean;
    token: string;
    sessionStartedAt: string;
    expiresAt: string;
}

export interface AdminCredentials {
    email: string;
    password: string;
}

export const createAdminToken = (email: string): string => {
    const raw = `${email}:${Date.now()}:mwasa-admin`;
    return `mwasa-${Buffer.from(raw).toString('base64url')}`;
};

export const verifyAdminCredentials = (credentials: AdminCredentials): boolean => {
    return (
        credentials.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
        credentials.password === ADMIN_PASSWORD
    );
};

export const createAdminSession = (email: string, verified = true): AdminSession => {
    const now = Date.now();
    const sessionLengthMs = 1000 * 60 * 60 * 8;

    return {
        email,
        role: ADMIN_ROLE,
        status: verified ? 'EMAIL_VERIFIED' : 'EMAIL_UNVERIFIED',
        verified,
        mfaVerified: false,
        token: createAdminToken(email),
        sessionStartedAt: new Date(now).toISOString(),
        expiresAt: new Date(now + sessionLengthMs).toISOString(),
    };
};

export const verifyAdminSession = (session: Partial<AdminSession>): boolean => {
    if (!session.email || !session.token) return false;
    if (!session.verified) return false;
    if (session.status === 'ACCOUNT_LOCKED' || session.status === 'ACCESS_BLOCKED') return false;
    return session.expiresAt ? new Date(session.expiresAt).getTime() > Date.now() : true;
};

export const createAdminEmailVerificationState = (email: string) => ({
    email,
    verified: false,
    token: createAdminToken(email),
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    requiresAnimation: true,
    status: 'PENDING' as const,
});

export const confirmAdminEmailVerification = (email: string, token: string) => {
    const generated = createAdminToken(email);
    return generated === token;
};
