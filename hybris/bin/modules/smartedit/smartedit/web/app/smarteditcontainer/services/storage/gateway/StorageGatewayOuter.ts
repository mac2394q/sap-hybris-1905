/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
	Cloneable,
	GatewayProxied,
	IStorage,
	IStorageGateway,
	IStorageManager,
	IStorageOptions,
	SeInjectable
} from "smarteditcommons";

import * as angular from "angular";

/** @internal */
@GatewayProxied()
@SeInjectable()
export class StorageGateway implements IStorageGateway {

	constructor(private $q: angular.IQService, private storageManager: IStorageManager) {
	}

	handleStorageRequest(storageConfiguration: IStorageOptions, method: keyof IStorage<Cloneable, Cloneable>, args: Cloneable[]): angular.IPromise<any> {
		const def = this.$q.defer();
		this.storageManager.getStorage(storageConfiguration).then(
			(storage: any) => def.resolve(storage[method](...args)),
			(reason: any) => def.reject(reason));
		return def.promise;
	}

}


