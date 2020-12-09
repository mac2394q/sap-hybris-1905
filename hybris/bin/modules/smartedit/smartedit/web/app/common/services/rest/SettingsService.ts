/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IRestServiceFactory} from "./IRestServiceFactory";
import {OperationContextRegistered} from '../httpErrorInterceptor/default/retryInterceptor/operationContextAnnotation';
import {IRestService} from './IRestService';
import {TypedMap} from 'smarteditcommons/dtos';
import {rarelyChangingContent, Cached} from '../cache';
import {SeInjectable} from '../../di';

export const SETTINGS_URI = '/smartedit/settings';

/*
 * Meant to be a non-protected API
 */
@OperationContextRegistered(SETTINGS_URI, 'TOOLING')
@SeInjectable()
export class SettingsService {
	private restService: IRestService<TypedMap<string | boolean>>;

	constructor(restServicefactory: IRestServiceFactory) {
		this.restService = restServicefactory.get<TypedMap<string | boolean>>(SETTINGS_URI);
	}

	@Cached({actions: [rarelyChangingContent]})
	load(): angular.IPromise<TypedMap<string | boolean>> {
		return this.restService.get({});
	}

	get(key: string): angular.IPromise<string> {
		return this.load().then((map) => map[key] as string);
	}

	getBoolean(key: string): angular.IPromise<boolean> {
		return this.load().then((map) => map[key] === true || map[key] === 'true');
	}
}
