/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {DelegateRestService} from './DelegateRestServiceInner';
import {IRestService, Page, Pageable, Payload, SeInjectable, } from 'smarteditcommons';

/** @internal */
@SeInjectable()
export class RestService<T> implements IRestService<T> {

	private metadataActivated: boolean = false;

	constructor(private delegateRestService: DelegateRestService, private uri: string, private identifier: string) {
	}

	getById(id: string): angular.IPromise<T> {
		return this.delegateRestService.delegateForSingleInstance("getById", id, this.uri, this.identifier, this.metadataActivated);
	}
	get(searchParams: Payload): angular.IPromise<T> {
		return this.delegateRestService.delegateForSingleInstance("get", searchParams, this.uri, this.identifier, this.metadataActivated);
	}
	update(payload: Payload): angular.IPromise<T> {
		return this.delegateRestService.delegateForSingleInstance("update", payload, this.uri, this.identifier, this.metadataActivated);
	}
	save(payload: Payload): angular.IPromise<T> {
		return this.delegateRestService.delegateForSingleInstance("save", payload, this.uri, this.identifier, this.metadataActivated);
	}
	query(searchParams: Payload): angular.IPromise<T[]> {
		return this.delegateRestService.delegateForArray("query", searchParams, this.uri, this.identifier, this.metadataActivated);
	}
	page(pageable: Pageable): angular.IPromise<Page<T>> {
		return this.delegateRestService.delegateForPage<T>(pageable, this.uri, this.identifier, this.metadataActivated);
	}
	remove(payload: Payload): angular.IPromise<void> {
		return this.delegateRestService.delegateForVoid("remove", payload, this.uri, this.identifier, this.metadataActivated);
	}

	activateMetadata(): void {
		// will activate response headers appending
		this.metadataActivated = true;
	}
}
