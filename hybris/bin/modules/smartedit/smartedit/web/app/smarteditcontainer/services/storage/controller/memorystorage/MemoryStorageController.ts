/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {MemoryStorage} from "../memorystorage/MemoryStorage";

import {
	IStorage,
	IStorageController,
	IStorageOptions,
	IStoragePropertiesService
} from "smarteditcommons";

import * as angular from "angular";

/** @internal */
export class MemoryStorageController implements IStorageController {

	readonly storageType: string;

	private readonly storages: any = {};

	constructor(private readonly $q: angular.IQService, storagePropertiesService: IStoragePropertiesService) {
		this.storageType = storagePropertiesService.getProperty("STORAGE_TYPE_IN_MEMORY");

	}

	getStorage(options: IStorageOptions): angular.IPromise<IStorage<any, any>> {
		let storage = this.storages[options.storageId];
		if (!storage) {
			storage = new MemoryStorage(this.$q);
		}
		this.storages[options.storageId] = storage;
		return this.$q.when(storage);
	}

	deleteStorage(storageId: string): angular.IPromise<boolean> {
		delete this.storages[storageId];
		return this.$q.when(true);
	}

	getStorageIds(): angular.IPromise<string[]> {
		return this.$q.when(Object.keys(this.storages));
	}


}