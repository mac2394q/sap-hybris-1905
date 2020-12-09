/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from "angular";
import * as lodash from 'lodash';
import {NgModule, NgZone} from '@angular/core';
import {SeDowngradeService} from 'smarteditcommons/di/SeDowngradeService';
import {SeConstructor} from 'smarteditcommons/di/types';
import {TypedMap} from '../dtos';
import {functionsUtils} from 'smarteditcommons/utils/FunctionsUtils';
import {commonNgZone} from 'smarteditcommons/commonNgZone';
import {annotationService} from 'smarteditcommons/services/annotationService';

declare global {

	/* @internal */
	interface InternalSmartedit {
		// modules loaded by extensions of smartedit
		modules: TypedMap<NgModule>;
		// modules statically loaded for smarteditloader and smarteditcontainer
		pushedModules: NgModule[];

		/*
		* place where our custom instrumentation will save arguments of all decorators in the followign format:
		* key: `{constructorName-decoratorName:definition`
		* value: the definition object
		*/
		smarteditDecoratorPayloads: TypedMap<any>;
		addDecoratorPayload: (className: string, decoratorName: string, payload: any) => void;
		getDecoratorPayload: (decorator: string, constructor: SeConstructor) => any;

		i18nMocks?: TypedMap<TypedMap<string>>;

		downgradedService: TypedMap<SeConstructor>;
	}
	interface Window {
		Zone: any;
		angular: angular.IAngularStatic;
		CKEDITOR: any;
		smarteditLodash: lodash.LoDashStatic;
		smarteditJQuery: JQueryStatic;
		__karma__: any;
		/* @internal */
		__smartedit__: InternalSmartedit;

		pushModules(...modules: any[]): void;
	}
}

/* forbiddenNameSpaces window._:false */
window.__smartedit__ = window.__smartedit__ || {} as InternalSmartedit;
lodash.merge(window.__smartedit__, {

	modules: {},
	pushedModules: [],

	smarteditDecoratorPayloads: {},

	addDecoratorPayload(decorator: string, className: string, payload: any) {
		window.__smartedit__.smarteditDecoratorPayloads[`${className}-${decorator}:definition`] = payload;
	},

	getDecoratorPayload(decorator: string, constructor: SeConstructor): any {
		return window.__smartedit__.smarteditDecoratorPayloads[`${functionsUtils.getConstructorName(annotationService.getOriginalConstructor(constructor))}-${decorator}:definition`];
	},

	downgradedService: {}
});

/**
 * @ngdoc service
 * @name functionsModule.service:pushModules
 *
 * @description
 * Add here a spread of modules containing invocations of HttpBackendService to mocks some calls to the backend
 */
window.pushModules = (...modules: NgModule[]): void => {
	window.__smartedit__.pushedModules = window.__smartedit__.pushedModules.concat(modules);
};

/**
 * @ngdoc service
 * @name functionsModule.service:WindowUtils
 *
 * @description
 * A collection of utility methods for windows.
 */
@SeDowngradeService()
export class WindowUtils {

	static SMARTEDIT_IFRAME_ID = 'ySmartEditFrame';

	constructor(private ngZone?: NgZone) {
		this.ngZone = this.ngZone || commonNgZone;
	}

	getWindow(): Window {
		return window;
	}

	/**
	 * @ngdoc method
	 * @name functionsModule.service:WindowUtils#isIframe
	 * @methodOf functionsModule.service:WindowUtils
	 * @description
	 * <b>isIframe</b> will check if the current document is in an iFrame.
	 * @returns {boolean} true if the current document is in an iFrame.
	 */
	isIframe = () => {
		return this.getWindow().top !== this.getWindow();
	}
    /**
     * @ngdoc method
     * @name functionsModule.service:WindowUtils#getTargetIFrame
     * @methodOf functionsModule.service:WindowUtils
     *
     * @description
     * Retrieves the iframe from the inner or outer app.
     *
     * @returns {Window} The content window or null if it does not exists.
     */
	getTargetIFrame = (): Window => {
		if (this.isIframe()) {
			return this.getWindow().parent;
		} else if (this.getWindow().document.getElementById(WindowUtils.SMARTEDIT_IFRAME_ID)) {
			return (this.getWindow().document.getElementById(WindowUtils.SMARTEDIT_IFRAME_ID) as HTMLIFrameElement).contentWindow;
		}
		return null;
	}

	/**
	 * @ngdoc method
	 * @name functionsModule.service:WindowUtils#runTimeoutOutsideAngular
	 * @methodOf functionsModule.service:WindowUtils
	 *
	 * @description
	 * Runs a given timeout outside Angular and attaches its callback to Angular
	 * this is usefull in order not to be blocking from an e2e stand point
	 *
	 * @param {string} callback argument less callback to execute when timeout.
	 * @param {number} timeout the delay in milliseconds until timeout
	 */
	runTimeoutOutsideAngular(callback: () => void, timeout?: number): NodeJS.Timer {

		if (!this.ngZone) {
			throw new Error("this instance of WindowUtils has not been instantiated through Angular 7 DI");

		}
		return this.ngZone.runOutsideAngular<NodeJS.Timer>(() => {
			return setTimeout(() => {
				return this.ngZone.run(callback);
			}, timeout);
		});
	}

	/**
	 * @ngdoc method
	 * @name functionsModule.service:WindowUtils#runIntervalOutsideAngular
	 * @methodOf functionsModule.service:WindowUtils
	 *
	 * @description
	 * Runs a given interval outside Angular and attaches its callback to Angular
	 * this is usefull in order not to be blocking from an e2e stand point
	 *
	 * @param {string} callback argument less callback to execute when timeout.
	 * @param {number} timeout the delay in milliseconds until timeout
	 */
	runIntervalOutsideAngular(callback: () => void, timeout?: number): NodeJS.Timer {

		if (!this.ngZone) {
			throw new Error("this instance of WindowUtils has not been instantiated through Angular 7 DI");

		}
		return this.ngZone.runOutsideAngular<NodeJS.Timer>(() => {
			return setInterval(() => {
				return this.ngZone.run(callback);
			}, timeout);
		});
	}

}

export const windowUtils = new WindowUtils();