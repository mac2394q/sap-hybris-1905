/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from "smarteditcommons/di";

@SeInjectable()
export class SeRichTextLoaderService {

	private loadDeferred: angular.IDeferred<{}>;

	constructor(
		private $q: angular.IQService,
		private $interval: angular.IIntervalService
	) {
		this.loadDeferred = this.$q.defer();

		const checkLoadedInterval = this.$interval(() => {
			if (CKEDITOR.status === 'loaded') {
				this.loadDeferred.resolve();
				$interval.cancel(checkLoadedInterval);
			}
		}, 100);
	}

	load(): angular.IPromise<{}> {
		const deferred = this.$q.defer();
		this.loadDeferred.promise.then(function() {
			deferred.resolve();
		});
		return deferred.promise;
	}

}
