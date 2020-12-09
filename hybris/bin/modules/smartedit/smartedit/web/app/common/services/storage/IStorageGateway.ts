/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IStorage} from "./IStorage";
import {IStorageOptions} from "./IStorageOptions";

import {Cloneable} from "smarteditcommons/dtos";

import * as angular from "angular";

export interface IStorageGateway {

	handleStorageRequest(storageConfiguration: IStorageOptions, method: keyof IStorage<Cloneable, Cloneable>, args: Cloneable[]): angular.IPromise<any>;

}