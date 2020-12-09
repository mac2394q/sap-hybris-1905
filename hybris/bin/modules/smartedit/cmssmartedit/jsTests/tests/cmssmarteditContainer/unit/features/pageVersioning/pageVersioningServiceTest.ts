/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';

import {IRestService, IRestServiceFactory, Page} from 'smarteditcommons';
import {IPageVersion, PageVersioningService, PageVersionSearchPayload} from 'cmssmarteditcontainer/services/pageVersioning/PageVersioningService';

import {promiseHelper, PromiseType} from 'testhelpers';

describe('test PageVersioningService', () => {

	// ---------------------------------------------------------------------------
	// Constants
	// ---------------------------------------------------------------------------
	const PAGE_CONTEXT_SITE_ID = 'somePage';

	// ---------------------------------------------------------------------------
	// Variables
	// ---------------------------------------------------------------------------
	let restServiceFactory: jasmine.SpyObj<IRestServiceFactory>;
	let pageVersionsService: jasmine.SpyObj<IRestService<Page<IPageVersion>>>;
	let payload1: PageVersionSearchPayload;

	const pageVersion1: IPageVersion = null;
	const promise1 = promiseHelper.buildPromise<IPageVersion>('promise1', PromiseType.RESOLVES, pageVersion1);

	let pageVersioningService: PageVersioningService;

	// ---------------------------------------------------------------------------
	// SetUp
	// ---------------------------------------------------------------------------    
	beforeEach(() => {
		payload1 = {
			pageUuid: 'somePageUuid',
			currentPage: 123
		};

		restServiceFactory = jasmine.createSpyObj<IRestServiceFactory>('restServiceFactory', ['get']);
		pageVersionsService = jasmine.createSpyObj<IRestService<Page<IPageVersion>>>('pageVersionsService', ['get']);

		restServiceFactory.get.and.returnValue(pageVersionsService);
		pageVersionsService.get.and.returnValue(promise1);

		pageVersioningService = new PageVersioningService(restServiceFactory, PAGE_CONTEXT_SITE_ID);
	});

	// ---------------------------------------------------------------------------
	// Tests
	// ---------------------------------------------------------------------------    
	it('WHEN the service starts THEN it prepares the restService with the appropriate URL', () => {
		// THEN
		expect(restServiceFactory.get).toHaveBeenCalledWith(
			`/cmswebservices/v1/sites/${PAGE_CONTEXT_SITE_ID}/cmsitems/:pageUuid/versions`
		);
	});

	it('WHEN findPageVersions is called THEN it calls the service with the right parameters', () => {
		// WHEN 
		const result = pageVersioningService.findPageVersions(payload1);

		// THEN
		expect(pageVersionsService.get).toHaveBeenCalledWith(payload1);
		expect(result).toBe(promise1);
	});
});