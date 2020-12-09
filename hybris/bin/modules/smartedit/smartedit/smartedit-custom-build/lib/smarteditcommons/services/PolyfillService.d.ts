import { TestModeService } from './TestModeService';
export declare class PolyfillService {
    private browserService;
    private testModeService;
    constructor(browserService: any, testModeService: TestModeService);
    isEligibleForEconomyMode(): boolean;
    isEligibleForExtendedView(): boolean;
    isEligibleForThrottledScrolling(): boolean;
}
