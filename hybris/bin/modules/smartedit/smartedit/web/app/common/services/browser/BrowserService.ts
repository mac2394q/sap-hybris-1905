/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeDowngradeService} from 'smarteditcommons/di';

/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */

const SUPPORTED_BROWSERS = {
	IE: 'IE',
	CHROME: 'Chrome',
	FIREFOX: 'Firefox',
	EDGE: 'Edge',
	SAFARI: 'Safari',
	UNKNOWN: 'Uknown'
};
@SeDowngradeService()
export class BrowserService {

	getCurrentBrowser() {
		/* forbiddenNameSpaces window as any:false */
		const anyWindow = window as any;
		let browser = SUPPORTED_BROWSERS.UNKNOWN;
		if (typeof anyWindow.InstallTrigger !== 'undefined') {
			browser = SUPPORTED_BROWSERS.FIREFOX;
		} else if ( /*@cc_on!@*/ false || !!(document as any).documentMode) {
			browser = SUPPORTED_BROWSERS.IE;
		} else if (!!anyWindow.StyleMedia) {
			browser = SUPPORTED_BROWSERS.EDGE;
		} else if (!!anyWindow.chrome && !!anyWindow.chrome.webstore) {
			browser = SUPPORTED_BROWSERS.CHROME;
		} else if (this._isSafari()) {
			browser = SUPPORTED_BROWSERS.SAFARI;
		}

		return browser;
	}

	/*
		It is always better to detect a browser via features. Unfortunately, it's becoming really hard to identify 
		Safari, since newer versions do not match the previous ones. Thus, we have to rely on User Agent as the last
		option. 
	*/
	_isSafari = () => {
		// return this.getCurrentBrowser() === SUPPORTED_BROWSERS.SAFARI;
		const userAgent = window.navigator.userAgent;
		const vendor = window.navigator.vendor;

		const testFeature = /constructor/i.test((function HTMLElementConstructor() {
			//
		}).toString());
		const testUserAgent = vendor && vendor.indexOf('Apple') > -1 && userAgent && !userAgent.match('CriOS');

		return testFeature || testUserAgent;
	}

	isIE = () => {
		return this.getCurrentBrowser() === SUPPORTED_BROWSERS.IE;
	}

	isFF = () => {
		return this.getCurrentBrowser() === SUPPORTED_BROWSERS.FIREFOX;
	}

	isSafari = () => {
		return this.getCurrentBrowser() === SUPPORTED_BROWSERS.SAFARI;
	}

	getBrowserLocale() {
		const locale = window.navigator.language.split("-");
		return locale.length === 1 ? locale[0] : (locale[0] + "_" + locale[1].toUpperCase());
	}
}
