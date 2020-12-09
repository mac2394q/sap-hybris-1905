/// <reference types="angular-mocks" />
import * as angular from 'angular';
export interface DiscardablePromise<T> {
    promise: angular.IPromise<T> | Promise<T>;
    successCallback: (...args: any[]) => any;
    failureCallback: (...args: any[]) => any;
    discardableHolder?: {
        successCallback: (...args: any[]) => any;
        failureCallback: (...args: any[]) => any;
    };
}
/**
 * @ngdoc service
 * @name functionsModule.service:DiscardablePromiseUtils
 * @description
 * helper to handle competing promises
 */
export declare class DiscardablePromiseUtils {
    private $log;
    private _map;
    constructor($log: angular.ILogService);
    /**
     * @ngdoc method
     * @methodOf DiscardablePromiseUtils
     * @name functionsModule.service:DiscardablePromiseUtils#apply
     * @methodOf functionsModule.service:DiscardablePromiseUtils
     * @description
     * selects a new promise as candidate for invoking a given callback
     * each invocation of this method for a given key discards the previously selected promise
     * @param {string} key the string key identifying the discardable promise
     * @param {Promise} promise the discardable promise instance once a new candidate is called with this method
     * @param {Function} successCallback the success callback to ultimately apply on the last promise not discarded
     * @param {Function=} failureCallback the failure callback to ultimately apply on the last promise not discarded. Optional.
     */
    apply<T>(key: string, promise: angular.IPromise<T> | Promise<T>, successCallback: (arg: T) => any, failureCallback?: (arg: Error) => any): void;
}
