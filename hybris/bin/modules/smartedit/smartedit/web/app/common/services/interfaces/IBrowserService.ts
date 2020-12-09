/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface IBrowserService {
	getCurrentBrowser(): 'IE' | 'Chrome' | 'Firefox' | 'Edge' | 'Safari' | 'Uknown';
	isIE(): boolean;
	isFF(): boolean;
	isSafari(): boolean;
	getBrowserLocale(): string;
}
