import { IStorage } from "../IStorage";
import { IStorageController } from "../IStorageController";
import { IStorageManager } from "../IStorageManager";
import { IStorageOptions } from "../IStorageOptions";
import * as angular from "angular";
/** @internal */
export declare class NamespacedStorageManager implements IStorageManager {
    private readonly storageManager;
    private namespace;
    constructor(storageManager: IStorageManager, namespace: string);
    getStorage(storageConfiguration: IStorageOptions): angular.IPromise<IStorage<any, any>>;
    deleteStorage(storageId: string, force?: boolean): angular.IPromise<boolean>;
    deleteExpiredStorages(force?: boolean): angular.IPromise<boolean>;
    hasStorage(storageId: string): boolean;
    registerStorageController(controller: IStorageController): void;
    getNamespaceStorageId(storageId: string): string;
    getStorageManager(): IStorageManager;
}
