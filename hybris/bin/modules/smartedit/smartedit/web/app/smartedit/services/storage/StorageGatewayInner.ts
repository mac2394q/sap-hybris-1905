/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from "angular";
import {
	Cloneable,
	GatewayProxied,
	IStorage,
	IStorageGateway,
	IStorageOptions
} from "smarteditcommons";

/** @internal */
@GatewayProxied("handleStorageRequest")
export class StorageGateway implements IStorageGateway {

	handleStorageRequest(storageConfiguration: IStorageOptions, method: keyof IStorage<Cloneable, Cloneable>, args: Cloneable[]): angular.IPromise<any> {
		'proxyFunction';
		return null;
	}

}
