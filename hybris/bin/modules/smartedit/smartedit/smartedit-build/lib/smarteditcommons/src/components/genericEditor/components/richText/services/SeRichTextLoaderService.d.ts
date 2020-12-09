/// <reference types="angular" />
/// <reference types="angular-mocks" />
export declare class SeRichTextLoaderService {
    private $q;
    private $interval;
    private loadDeferred;
    constructor($q: angular.IQService, $interval: angular.IIntervalService);
    load(): angular.IPromise<{}>;
}
