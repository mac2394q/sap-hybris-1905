/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {GatewayProxied, Page, Pageable, Payload, SeInjectable} from 'smarteditcommons';
/*
 * internal service to proxy calls from inner RESTService to the outer restServiceFactory and the 'real' IRestService
 */

/** @internal */
@GatewayProxied()
@SeInjectable()
export class DelegateRestService {

	delegateForVoid(methodName: string, params: string | Payload, uri: string, identifier: string, metadataActivated: boolean): angular.IPromise<void> {
		'proxyFunction';
		return null;
	}

	delegateForSingleInstance<T>(methodName: string, params: string | Payload, uri: string, identifier: string, metadataActivated: boolean): angular.IPromise<T> {
		'proxyFunction';
		return null;
	}

	delegateForArray<T>(methodName: string, params: string | Payload, uri: string, identifier: string, metadataActivated: boolean): angular.IPromise<T[]> {
		'proxyFunction';
		return null;
	}

	delegateForPage<T>(pageable: Pageable, uri: string, identifier: string, metadataActivated: boolean): angular.IPromise<Page<T>> {
		'proxyFunction';
		return null;
	}

}
