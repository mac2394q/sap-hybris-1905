/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import {SharedDataService} from 'smarteditcontainer/services';
import {promiseHelper, IExtensiblePromise} from 'testhelpers';
import {annotationService, GatewayProxied} from 'smarteditcommons';

describe('test sharedDataService', function() {

	let sharedDataService: SharedDataService;
	const $q = promiseHelper.$q();

	beforeEach(() => {

		sharedDataService = new SharedDataService($q, lo);
	});

	it('shared data service should validate get and set method', function() {
		sharedDataService.set('catalogVersion', '1.4');
		(expect(sharedDataService.get('catalogVersion')) as any).toBeResolvedWithData('1.4');
	});

	it('shared data service should override the value for a given key', function() {
		sharedDataService.set('catalogVersion', '1.4');
		sharedDataService.set('catalogVersion', '1.6');
		(expect(sharedDataService.get('catalogVersion')) as any).toBeResolvedWithData('1.6');
	});


	it('shared data service should check the object saved for a given key', function() {
		const obj = {
			catalog: 'apparel-ukContentCatalog',
			catalogVersion: '1.4'
		};

		sharedDataService.set('obj', obj);
		(expect(sharedDataService.get('obj')) as any).toBeResolvedWithData(obj);
	});


	it('shared data service should set the value to null for a given key', function() {
		sharedDataService.set('catalogVersion', '1.4');
		sharedDataService.set('catalogVersion', null);
		(expect(sharedDataService.get('catalogVersion')) as any).toBeResolvedWithData(null);
	});

	it('checks GatewayProxied', function() {
		expect(annotationService.getClassAnnotation(SharedDataService, GatewayProxied)).toEqual([]);
	});

	it('shared data service should remove the entry for the given key', function() {
		sharedDataService.set('catalogVersion', '1.4');

		const promise1 = sharedDataService.containsKey('catalogVersion') as IExtensiblePromise<boolean>;
		expect(promise1.value).toBe(true);

		sharedDataService.remove('catalogVersion');

		const promise2 = sharedDataService.containsKey('catalogVersion') as IExtensiblePromise<boolean>;
		expect(promise2.value).toBe(false);
	});

	it('shared data service should return false if the given key does not exist', function() {
		const promise = sharedDataService.containsKey('unknown') as IExtensiblePromise<boolean>;
		expect(promise.value).toBe(false);
	});
});
