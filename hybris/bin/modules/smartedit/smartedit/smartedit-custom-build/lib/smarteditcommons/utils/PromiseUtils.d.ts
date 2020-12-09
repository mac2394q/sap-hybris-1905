import { LogService } from '../services/LogService';
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
export declare class PromiseUtils {
    static logService: LogService;
    private WAIT_TIMEOUT;
    private FAILURE_TIMEOUT;
    toPromise<T>(method: (...args: any[]) => T, context?: any): (...innerArgs: any[]) => Promise<T>;
    promise<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    defer<T>(): Deferred<T>;
    sleep(ms: number): Promise<{}>;
    handlePromiseRejections: <T>(promise: Promise<T>) => Promise<T>;
    isAjaxError(error: any): any;
    waitOnCondition(condition: () => boolean, callback: () => any, errorMessage: string, elapsedTime?: number): void;
    resolveToCallbackWhenCondition<T>(condition: () => boolean, callback: () => T, errorMessage?: string): Promise<T>;
    private defaultFailureCallback;
}
export declare const promiseUtils: PromiseUtils;
