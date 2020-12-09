/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';
import {Cloneable, GatewayProxied, ISharedDataService, SeInjectable, TypedMap} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
@SeInjectable()
export class SharedDataService extends ISharedDataService {

	private storage: TypedMap<Cloneable> = {};

	constructor(
		private $q: angular.IQService,
		private lodash: lo.LoDashStatic
	) {
		super();
	}

	get(key: string): angular.IPromise<Cloneable> {
		return this.$q.when(this.storage[key]);
	}

	set(key: string, value: Cloneable): angular.IPromise<void> {
		this.storage[key] = value;
		return this.$q.when();
	}

	update(key: string, modifyingCallback: (oldValue: any) => any): angular.IPromise<void> {
		return this.get(key).then((oldValue: any) => {
			return this.$q.when(modifyingCallback(oldValue)).then((newValue: any) => {
				return this.set(key, newValue);
			});
		});
	}

	remove(key: string): angular.IPromise<Cloneable> {
		const value = this.storage[key];
		delete this.storage[key];
		return this.$q.when(value);
	}

	containsKey(key: string): angular.IPromise<boolean> {
		return this.$q.when(this.lodash.has(this.storage, key));
	}
}

