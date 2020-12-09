export interface IBrowserService {
    getCurrentBrowser(): 'IE' | 'Chrome' | 'Firefox' | 'Edge' | 'Safari' | 'Uknown';
    isIE(): boolean;
    isFF(): boolean;
    isSafari(): boolean;
    getBrowserLocale(): string;
}
