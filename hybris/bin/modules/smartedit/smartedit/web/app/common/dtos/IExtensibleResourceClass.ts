/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

/** @internal */
export interface IExtensibleResourceClass<T> extends angular.resource.IResourceClass<T> {

	[index: string]: angular.resource.IResourceMethod<T> | angular.resource.IResourceArrayMethod<T>;

}