import { ICacheItem, ICacheTiming } from "./interfaces";
import { Deferred, PromiseUtils } from 'smarteditcommons/utils/PromiseUtils';
import { LogService } from 'smarteditcommons/services/LogService';
import { WindowUtils } from 'smarteditcommons/utils/WindowUtils';
/** @internal */
export interface ICacheItemRegistry {
    item: ICacheItem<any>;
    cacheTiming: ICacheTiming;
    completed: boolean;
    processing: boolean;
    defer: Deferred<any>;
    refresh<T>(): Promise<T>;
}
/** @internal */
export declare class CacheEngine {
    private windowUtils;
    private promiseUtils;
    private logService;
    static readonly BACKGROUND_REFRESH_INTERVAL: number;
    private cachedItemsRegistry;
    constructor(windowUtils: WindowUtils, promiseUtils: PromiseUtils, logService: LogService);
    addItem(item: ICacheItem<any>, cacheTiming: ICacheTiming, refresh: <T>() => Promise<T>): void;
    getItemById(id: string): ICacheItem<any>;
    handle<T>(item: ICacheItem<any>): Promise<T>;
    evict(...tags: string[]): void;
    protected startBackgroundMonitoringJob(): void;
    protected refreshCache<T>(obj: ICacheItemRegistry): Promise<T | void>;
    private hasExpired;
    private needRefresh;
    private getItemIndex;
}
