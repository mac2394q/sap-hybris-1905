/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {InjectionToken} from '@angular/core';
import {SeConstructor} from './types';
import {diBridgeUtils} from './DIBridgeUtils';
import {diNameUtils} from './DINameUtils';
import {TypedMap} from 'smarteditcommons/dtos/TypedMap';

export const servicesToBeDowngraded: TypedMap<SeConstructor> = {};
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeDowngradeService
 *
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to require an Angular service to be downgraded
 * @param {token=} an `InjectionToken` that identifies a service provided from Angular.
 * Will default to using the constructor itself
 */

export const SeDowngradeService = function(token?: string | InjectionToken<any>) {

	return function <T extends SeConstructor>(serviceConstructor: T) {

		diBridgeUtils.downgradeService(diNameUtils.buildServiceName(serviceConstructor), serviceConstructor, token);
		return serviceConstructor;

	};
};