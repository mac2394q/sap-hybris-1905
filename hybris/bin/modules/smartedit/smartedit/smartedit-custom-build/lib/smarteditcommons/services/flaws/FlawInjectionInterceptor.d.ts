/// <reference types="angular" />
/// <reference types="angular-mocks" />
/// <reference types="angular-cookies" />
/// <reference types="angular-resource" />
/// <reference types="angular-route" />
/// <reference types="angular-sanitize" />
/// <reference types="angular-translate" />
declare type Predicate = (config: angular.IRequestConfig) => boolean;
declare type RequestHandler = (config: angular.IRequestConfig) => angular.IRequestConfig;
declare type ResponseHandler = <T>(response: angular.IHttpResponse<T>) => angular.IHttpResponse<T>;
/** @internal */
export declare class FlawInjectionInterceptor implements angular.IHttpInterceptor {
    private $log;
    private interceptorHelper;
    private static PROBABILITY;
    private flawWindow;
    private requestMutations;
    private responseMutations;
    constructor($log: angular.ILogService, interceptorHelper: any);
    registerRequestFlaw(mutation: {
        test: Predicate;
        mutate: RequestHandler;
    }): void;
    registerResponseFlaw(mutation: {
        test: Predicate;
        mutate: ResponseHandler;
    }): void;
    request(config: angular.IRequestConfig): any;
    response(response: angular.IHttpResponse<any>): import("angular").IHttpResponse<any>;
    private _isCRUDRequest;
    private _isCRUDResponse;
    private _isGET;
    private _activateWithProbability;
}
export {};
