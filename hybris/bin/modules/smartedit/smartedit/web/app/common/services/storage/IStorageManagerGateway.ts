/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IStorageManager} from "./IStorageManager";
import {IStorageOptions} from "./IStorageOptions";

import * as angular from "angular";

export interface IStorageManagerGateway extends IStorageManager {

	getStorageSanitityCheck(storageConfiguration: IStorageOptions): angular.IPromise<boolean>;

}
