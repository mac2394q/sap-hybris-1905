import { IStorageManager } from "./IStorageManager";
import { IStorageOptions } from "./IStorageOptions";
import * as angular from "angular";
export interface IStorageManagerGateway extends IStorageManager {
    getStorageSanitityCheck(storageConfiguration: IStorageOptions): angular.IPromise<boolean>;
}
