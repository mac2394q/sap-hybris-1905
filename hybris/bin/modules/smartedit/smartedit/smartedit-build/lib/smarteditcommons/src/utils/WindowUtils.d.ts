/// <reference types="angular-mocks" />
/// <reference types="node" />
import * as angular from "angular";
import * as lodash from 'lodash';
import { NgZone } from '@angular/core';
declare global {
    interface Window {
        Zone: any;
        angular: angular.IAngularStatic;
        CKEDITOR: any;
        smarteditLodash: lodash.LoDashStatic;
        smarteditJQuery: JQueryStatic;
        __karma__: any;
    }
}
/**
 * @ngdoc service
 * @name functionsModule.service:WindowUtils
 *
 * @description
 * A collection of utility methods for windows.
 */
export declare class WindowUtils {
    private ngZone?;
    static SMARTEDIT_IFRAME_ID: string;
    constructor(ngZone?: NgZone);
    getWindow(): Window;
    /**
     * @ngdoc method
     * @name functionsModule.service:WindowUtils#isIframe
     * @methodOf functionsModule.service:WindowUtils
     * @description
     * <b>isIframe</b> will check if the current document is in an iFrame.
     * @returns {boolean} true if the current document is in an iFrame.
     */
    isIframe: () => boolean;
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
    getTargetIFrame: () => Window;
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
    runTimeoutOutsideAngular(callback: () => void, timeout?: number): NodeJS.Timer;
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
    runIntervalOutsideAngular(callback: () => void, timeout?: number): NodeJS.Timer;
}
export declare const windowUtils: WindowUtils;
