/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TestModeService} from './TestModeService';
import {SeInjectable} from 'smarteditcommons/di';

/* @internal */
@SeInjectable()
export class PolyfillService {

	constructor(
		private browserService: any,
		private testModeService: TestModeService
	) {}

	isEligibleForEconomyMode(): boolean {
		return this.browserService.isIE() || this.testModeService.isE2EMode();
	}

	isEligibleForExtendedView(): boolean {
		return (this.browserService.isIE() || this.browserService.isFF()) || this.testModeService.isE2EMode();
	}

	isEligibleForThrottledScrolling(): boolean {
		return this.browserService.isIE();
	}

}