/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {promiseHelper} from 'testhelpers';
import {FetchEnumDataHandler, IRestService} from 'smarteditcommons';

describe('fetchEnumDataHandler', () => {

	let $q;

	let fetchEnumDataHandler: FetchEnumDataHandler;
	let enumRestService: jasmine.SpyObj<IRestService<any>>;
	let restServiceFactory: jasmine.SpyObj<IRestService<any>>;

	const field = {
		cmsStructureEnumType: 'de.mypackage.Orientation'
	} as any;

	const data = [{
		code: 'code1',
		label: 'Vertical'
	}, {
		code: 'code2',
		label: 'Horizontal'
	}];

	beforeEach(() => {
		$q = promiseHelper.$q();

		enumRestService = jasmine.createSpyObj<IRestService<any>>('enumRestService', ['get']);
		enumRestService.get.and.returnValue($q.when({
			enums: data
		}));

		restServiceFactory = jasmine.createSpyObj<IRestService<any>>('restServiceFactory', ['get']);
		restServiceFactory.get.and.returnValue(enumRestService);

		const isBank = (value: any) => {
			return !value;
		};

		fetchEnumDataHandler = new FetchEnumDataHandler(
			$q,
			restServiceFactory,
			isBank,
			'ENUM_RESOURCE_URI'
		);

		FetchEnumDataHandler.resetForTests();
	});

	it('GIVEN enum REST call succeeds WHEN I findByMask with no mask, promise resolves to the full list', () => {

		// WHEN
		const promise = fetchEnumDataHandler.findByMask(field);

		// THEN
		expect(promise).toBeResolvedWithData(data);
	});

	it('GIVEN enum REST call succeeds WHEN I findByMask with a mask, promise resolves to the relevant filtered list', () => {

		// WHEN
		const promise = fetchEnumDataHandler.findByMask(field, 'zo');

		// THEN
		expect(promise).toBeResolvedWithData([{
			code: 'code2',
			label: 'Horizontal'
		}]);
	});

	it('GIVEN a first search, second uses cache', () => {

		// WHEN
		fetchEnumDataHandler.findByMask(field, 'zo');
		expect(enumRestService.get.calls.count()).toBe(1);

		fetchEnumDataHandler.findByMask(field, 'zon');

		expect(enumRestService.get.calls.count()).toBe(1);

	});

});
