/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lodash from 'lodash';
import {Injectable} from '@angular/core';
import {LogService} from '../services/LogService';

export interface Deferred<T> {

	promise: Promise<T>;
	resolve: (value: T) => void;
	reject: (value?: any) => void;
}
/**
 * @ngdoc service
 * @name functionsModule.service:PromiseUtils
 *
 * @description
 * utility service around ES6 Promises.
 */
@Injectable()
export class PromiseUtils {

	static logService = new LogService();

	private WAIT_TIMEOUT = 4;
	private FAILURE_TIMEOUT = 2000;

	toPromise<T>(method: (...args: any[]) => T, context?: any): (...innerArgs: any[]) => Promise<T> {
		return function() {
			try {
				return Promise.resolve(method.apply(context, arguments));
			} catch (e) {
				PromiseUtils.logService.error('execution of a method that was turned into a promise failed');
				PromiseUtils.logService.error(e);
				return Promise.reject(e);
			}
		};
	}

	promise<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T> {
		return this.handlePromiseRejections(new Promise(executor));
	}

	defer<T>(): Deferred<T> {

		let pResolve: (value?: T | PromiseLike<T>) => void;
		let pReject: (reason?: any) => void;

		const deferred: Deferred<T> = {

			promise: this.promise((_resolve: (value?: T | PromiseLike<T>) => void, _reject: (reason?: any) => void) => {
				pResolve = _resolve;
				pReject = _reject;
			}),

			resolve(value: T) {
				pResolve(value);
			},

			reject(reason: any) {
				pReject(reason);
			},

		};

		return deferred;
	}

	async sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	handlePromiseRejections = <T>(promise: Promise<T>): Promise<T> => {

		const oldThen = promise.then;
		const defaultFailureCallback = this.defaultFailureCallback;

		promise.then = function(successCallback: any, _failureCallback: any) {
			const failureCallback = _failureCallback ? _failureCallback : defaultFailureCallback;
			return oldThen.call(this, successCallback, failureCallback);
		};
		return promise;
	}

	isAjaxError(error: any) {
		return error.hasOwnProperty("headers");
	}

	waitOnCondition(condition: () => boolean, callback: () => any, errorMessage: string, elapsedTime: number = 0) {
		//
		setTimeout(() => {
			if (condition()) {
				callback();
			} else if (elapsedTime < this.FAILURE_TIMEOUT) {
				this.waitOnCondition(condition, callback, errorMessage, elapsedTime + this.WAIT_TIMEOUT);
			} else {
				throw new Error(`PromiseUtils: ${errorMessage}`);
			}
		}, this.WAIT_TIMEOUT);
	}

	async resolveToCallbackWhenCondition<T>(condition: () => boolean, callback: () => T, errorMessage?: string): Promise<T> {
		//
		return new Promise<T>((resolve) => {
			this.waitOnCondition(condition, () => resolve(callback()), errorMessage ? errorMessage : "condition for promise resolution was never met");
		});
	}

	private defaultFailureCallback = (error: any) => {
		if (undefined !== error && null !== error && "canceled" !== error) {
			if (lodash.isPlainObject(error)) {
				if (!this.isAjaxError(error)) {
					PromiseUtils.logService.error(`exception caught in promise: ${JSON.stringify(error)}`);
				}
			} else if (!lodash.isBoolean(error)) {
				PromiseUtils.logService.error(error);
			}
		}
		PromiseUtils.logService.error(error);
		return Promise.reject(error);
	}

}

export const promiseUtils = new PromiseUtils();
