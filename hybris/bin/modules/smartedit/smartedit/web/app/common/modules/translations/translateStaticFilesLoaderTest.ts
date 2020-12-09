/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';
import * as lo from "lodash";
import * as angular from 'angular';
import {$translateStaticFilesLoader, IRestService, IRestServiceFactory, TranslationOptions, TypedMap} from 'smarteditcommons';
import {promiseHelper, IExtensiblePromise, PromiseType} from 'testhelpers';

describe('Translate Static File Test - ', () => {

	const prefix1: string = 'prefix1';
	const suffix1: string = 'suffix1';
	const prefix2: string = 'prefix2';
	const suffix2: string = 'suffix2';
	const url: string = '/my/url/';

	let loader: (options: TranslationOptions) => IExtensiblePromise<TypedMap<string>>;
	let restServiceFactory: jasmine.SpyObj<IRestServiceFactory>;
	let restService1: jasmine.SpyObj<IRestService<TypedMap<string>>>;
	let restService2: jasmine.SpyObj<IRestService<TypedMap<string>>>;
	let $q: jasmine.SpyObj<angular.IQService>;

	const map1 = {
		key1: "value1",
		key2: "value2"
	} as TypedMap<string>;

	const map2 = {
		key1: "value11",
		key3: "value3"
	} as TypedMap<string>;

	const promise1 = promiseHelper.buildPromise<TypedMap<string>>('promise1', PromiseType.RESOLVES, map1);
	const promise2 = promiseHelper.buildPromise<TypedMap<string>>('promise2', PromiseType.RESOLVES, map2);

	beforeEach(() => {

		$q = promiseHelper.$q();

		restServiceFactory = jasmine.createSpyObj<IRestServiceFactory>('restServiceFactory', ['get']);

		restService1 = jasmine.createSpyObj<IRestService<TypedMap<string>>>('restService1', ['get']);
		restService2 = jasmine.createSpyObj<IRestService<TypedMap<string>>>('restService2', ['get']);

		restService1.get.and.returnValue(promise1);
		restService2.get.and.returnValue(promise2);

		restServiceFactory.get.and.callFake((arg: string) => {
			if (arg === prefix1 + url + suffix1) {
				return restService1;
			} else if (arg === prefix2 + url + suffix2) {
				return restService2;
			}
			throw new Error("unexpected url for translation retrieval: " + url);
		});

		loader = $translateStaticFilesLoader($q, lo, restServiceFactory);

	});

	it('throws exception if prefix not provided', () => {

		const options = {
			key: url,
			suffix: suffix1
		} as TranslationOptions;

		expect(function() {
			loader(options);
		}).toThrowError("Couldn't load translation static files, no files and prefix or suffix specified!");

	});

	it('throws exception if suffix not provided', () => {

		const options = {
			prefix: prefix1,
			key: url
		} as TranslationOptions;

		expect(function() {
			loader(options);
		}).toThrowError("Couldn't load translation static files, no files and prefix or suffix specified!");

	});

	it('will use key property of options as url for loading', () => {

		const options = {
			prefix: prefix1,
			key: url,
			suffix: suffix1
		} as TranslationOptions;

		loader(options);

		expect(restServiceFactory.get).toHaveBeenCalledWith(prefix1 + url + suffix1);
	});

	it('when one set of prefix/suffix, returns the corresponding map', () => {

		const options = {
			prefix: prefix1,
			key: url,
			suffix: suffix1
		} as TranslationOptions;

		const promise = loader(options);

		expect(promise.value).toEqual(map1);

		expect(restServiceFactory.get).toHaveBeenCalledWith(prefix1 + url + suffix1);
	});

	it('when several set of prefix/suffix, returns an aggregation of maps', () => {

		const options = {
			files: [{prefix: prefix1, suffix: suffix1}, {prefix: prefix2, suffix: suffix2}],
			key: url
		} as TranslationOptions;

		const promise = loader(options);

		expect(promise.value).toEqual(lo.merge(map1, map2));

		expect(restServiceFactory.get).toHaveBeenCalledWith(prefix1 + url + suffix1);

		expect(restServiceFactory.get).toHaveBeenCalledWith(prefix2 + url + suffix2);
	});

});
