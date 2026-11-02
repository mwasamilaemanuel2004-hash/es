export type PlatformType = 'desktop' | 'website' | 'android' | 'ios';

export interface AppPlatformProfile {
    platform: PlatformType;
    name: string;
    supportsSelfUpgrade: boolean;
    supportsOfflineMode: boolean;
    supportsDesktopDownload: boolean;
    supportsWebAccess: boolean;
    supportsAdminConsole: boolean;
}

export const platformCatalog: AppPlatformProfile[] = [
    {
        platform: 'desktop',
        name: 'Desktop App',
        supportsSelfUpgrade: true,
        supportsOfflineMode: true,
        supportsDesktopDownload: true,
        supportsWebAccess: true,
        supportsAdminConsole: true,
    },
    {
        platform: 'website',
        name: 'Web Platform',
        supportsSelfUpgrade: true,
        supportsOfflineMode: false,
        supportsDesktopDownload: false,
        supportsWebAccess: true,
        supportsAdminConsole: true,
    },
    {
        platform: 'android',
        name: 'Android App',
        supportsSelfUpgrade: true,
        supportsOfflineMode: true,
        supportsDesktopDownload: false,
        supportsWebAccess: true,
        supportsAdminConsole: true,
    },
    {
        platform: 'ios',
        name: 'iOS App',
        supportsSelfUpgrade: true,
        supportsOfflineMode: true,
        supportsDesktopDownload: false,
        supportsWebAccess: true,
        supportsAdminConsole: true,
    },
];

export const getPlatformProfile = (platform: PlatformType) =>
    platformCatalog.find(item => item.platform === platform) ?? platformCatalog[0];

export const createExternalNavigationTarget = (label: string, url: string) => ({
    label,
    url,
    allowed: true,
    openedAt: new Date().toISOString(),
});
