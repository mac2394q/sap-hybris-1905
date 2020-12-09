/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';
import {IRestServiceFactory} from 'smarteditcommons/services/rest/IRestServiceFactory';
import {TypedMap} from 'smarteditcommons/dtos/TypedMap';
import {TranslationFile} from './TranslationFile';
import {TranslationOptions} from './TranslationOptions';

export function $translateStaticFilesLoader($q: angular.IQService, lodash: lo.LoDashStatic, restServiceFactory: IRestServiceFactory) {
	'ngInject';
	return initializer.bind(undefined, $q, lodash, restServiceFactory);
}

/*
 * this custom implementations of $translateStaticFilesLoader needed by 'pascalprecht.translate' package leverages
 * our restServiceFactory as opposed to $http in order to proxy the i18n loading to the container.
 * This is required for our cross-origin compliancy
 */
function initializer($q: angular.IQService, lodash: lo.LoDashStatic, restServiceFactory: IRestServiceFactory, options: TranslationOptions): angular.IPromise<TypedMap<string>> {

	if (!options || (!angular.isArray(options.files) && (!angular.isString(options.prefix) || !angular.isString(options.suffix)))) {
		throw new Error("Couldn't load translation static files, no files and prefix or suffix specified!");
	}

	options.files = options.files || [new TranslationFile(options.prefix, options.suffix)];

	const load = function(file: TranslationFile): angular.IPromise<TypedMap<string>> {

		if (!file || (!angular.isString(file.prefix) || !angular.isString(file.suffix))) {
			throw new Error("Couldn't load translation static files, no files and prefix or suffix specified!");
		}

		let fileUrl = [
			file.prefix,
			options.key,
			file.suffix
		].join('');

		if (angular.isObject(options.fileMap) && options.fileMap[fileUrl]) {
			fileUrl = options.fileMap[fileUrl];
		}

		return restServiceFactory.get<TypedMap<string>>(fileUrl).get(options.$http);
	};

	const promises: angular.IPromise<TypedMap<string>>[] = options.files.map((file: TranslationFile) => {
		return load(new TranslationFile(file.prefix, file.suffix, options.key));
	});

	return $q.all(promises).then((data: TypedMap<string>[]) => {
		const mergedData = {} as TypedMap<string>;

		data.forEach((datum: TypedMap<string>) => {
			delete datum.$resolved;
			delete datum.$promise;
			lodash.merge(mergedData, datum);
		});
		return mergedData;
	});
}