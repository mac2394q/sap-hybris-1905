/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {AbstractWebStorageController} from "./AbstractWebStorageController";

import {IStorageOptions} from "smarteditcommons";

import * as angular from "angular";

/** @internal */
export class WebStorageBridge {

	constructor(private controller: AbstractWebStorageController, private configuration: IStorageOptions) {
	}

	saveStorageData(data: any): angular.IPromise<boolean> {
		return this.controller.saveStorageData(this.configuration.storageId, data);
	}

	getStorageData(): angular.IPromise<any> {
		return this.controller.getStorageData(this.configuration.storageId);
	}

}