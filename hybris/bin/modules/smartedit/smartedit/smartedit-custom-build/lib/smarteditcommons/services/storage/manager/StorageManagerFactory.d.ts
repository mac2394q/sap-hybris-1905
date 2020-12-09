import { IStorageManager } from "../IStorageManager";
import { IStorageManagerFactory } from "../IStorageManagerFactory";
import { NamespacedStorageManager } from "./NamespacedStorageManager";
/** @internal */
export declare class StorageManagerFactory implements IStorageManagerFactory {
    private theOneAndOnlyStorageManager;
    static ERR_INVALID_NAMESPACE(namespace: string): Error;
    constructor(theOneAndOnlyStorageManager: IStorageManager);
    getStorageManager(namespace: string): NamespacedStorageManager;
    private validateNamespace;
}
