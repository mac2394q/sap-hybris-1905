/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';
import * as lo from 'lodash';
import {annotationService, authorizationEvictionTag, rarelyChangingContent, Cached, IRestService, ISite, OperationContextRegistered} from 'smarteditcommons';
import {RestServiceFactory, SiteService} from 'smarteditcontainer/services';
import {promiseHelper, IExtensiblePromise, PromiseType} from 'testhelpers';

describe('siteService', () => {

	let siteService: SiteService;
	const restServiceFactory: jasmine.SpyObj<RestServiceFactory> = jasmine.createSpyObj<RestServiceFactory>('restServiceFactory', ['get']);
	const siteRestService: jasmine.SpyObj<IRestService<any>> = jasmine.createSpyObj<IRestService<any>>('siteRestService', ['get']);
	const sitesForCatalogsRestService: jasmine.SpyObj<IRestService<any>> = jasmine.createSpyObj<IRestService<any>>('sitesForCatalogsRestService', ['save']);

	const SITES_RESOURCE_URI: string = 'some uri';

	const sitesDTO = {
		sites: [{
			contentCatalogs: ['electronicsContentCatalog', 'electronics-euContentCatalog', 'electronics-ukContentCatalog'],
			name: {
				en: 'Electronics Site'
			},
			previewUrl: '/yacceleratorstorefront?site=electronics-uk',
			uid: 'electronics-uk'
		}]
	};

	const sitesDTOByCatalogs = {
		sites: [{
			contentCatalogs: ['electronicsContentCatalog'],
			name: {
				en: 'Electronics Site'
			},
			previewUrl: '/yacceleratorstorefront?site=electronics',
			uid: 'electronics'
		}, {
			contentCatalogs: ['electronicsContentCatalog', 'electronics-euContentCatalog', 'electronics-ukContentCatalog'],
			name: {
				en: 'Electronics Site'
			},
			previewUrl: '/yacceleratorstorefront?site=electronics-uk',
			uid: 'electronics-uk'
		}, {
			contentCatalogs: ['electronicsContentCatalog', 'electronics-euContentCatalog'],
			name: {
				en: 'Electronics Site'
			},
			previewUrl: '/yacceleratorstorefront?site=electronics-eu',
			uid: 'electronics-eu'
		}]
	};

	const sitesDTOPromise = promiseHelper.buildPromise<any>('sitesDTOPromise', PromiseType.RESOLVES, sitesDTO) as IExtensiblePromise<ISite[]>;
	const sitesDTOByCatalogsPromise = promiseHelper.buildPromise<any>('sitesDTOByCatalogsPromise', PromiseType.RESOLVES, sitesDTOByCatalogs) as IExtensiblePromise<ISite[]>;

	beforeEach(() => {
		siteRestService.get.calls.reset();
		sitesForCatalogsRestService.save.calls.reset();



		siteRestService.get.and.callFake((arg: any) => {
			if (lo.isEmpty(arg)) {
				return sitesDTOPromise;
			}
			throw new Error("unexpected argument for siteRestService.get method: " + arg);
		});
		sitesForCatalogsRestService.save.and.callFake((arg: any) => {
			if (arg && arg.catalogIds && lo.isEqual(arg.catalogIds, ['electronicsContentCatalog', 'electronics-euContentCatalog', 'electronics-ukContentCatalog'])) {
				return sitesDTOByCatalogsPromise;
			}
			throw new Error("unexpected argument for sitesForCatalogsRestService.save method: " + arg);
		});

		restServiceFactory.get.and.callFake((uri: string, identifier: string) => {
			if (uri.indexOf('sites/catalogs') !== -1) {
				return sitesForCatalogsRestService;
			}
			return siteRestService;
		});

		siteService = new SiteService(restServiceFactory, SITES_RESOURCE_URI);
	});

	it('is initialized', () => {
		expect(restServiceFactory.get).toHaveBeenCalledWith(SITES_RESOURCE_URI);

		const decoratorObj = annotationService.getClassAnnotation(SiteService, OperationContextRegistered as (args?: any) => ClassDecorator);
		expect(decoratorObj).toEqual(['SITES_RESOURCE_URI', 'CMS']);
	});

	it('is calling getAccessibleSites method', () => {
		const promise = siteService.getAccessibleSites() as IExtensiblePromise<ISite[]>;
		expect(promise.value).toEqual(sitesDTO.sites);
		expect(siteRestService.get).toHaveBeenCalledWith({});
	});

	it('is calling getSites method', () => {
		const promise = siteService.getSites() as IExtensiblePromise<ISite[]>;
		expect(promise.value).toEqual(sitesDTOByCatalogs.sites);
		expect(siteRestService.get).toHaveBeenCalledWith({});
		expect(sitesForCatalogsRestService.save).toHaveBeenCalledWith({catalogIds: ['electronicsContentCatalog', 'electronics-euContentCatalog', 'electronics-ukContentCatalog']});
		expect(siteRestService.get.calls.count()).toEqual(1);
		expect(sitesForCatalogsRestService.save.calls.count()).toEqual(1);
	});

	it('checks Cached annotation on getSites() method ', () => {
		const decoratorObj = annotationService.getMethodAnnotation(SiteService, 'getSites', Cached);
		expect(decoratorObj).toEqual(jasmine.objectContaining([{
			actions: [rarelyChangingContent],
			tags: [authorizationEvictionTag]
		}]));
	});

	it('is calling getSiteById method', () => {
		const uid = 'electronics';
		siteRestService.get.calls.reset();
		const promise = siteService.getSiteById(uid) as IExtensiblePromise<ISite>;
		expect(promise.value).toEqual(sitesDTOByCatalogs.sites.find((site) => site.uid === uid));
		expect(siteRestService.get).toHaveBeenCalled();
		expect(siteRestService.get.calls.count()).toEqual(1);
		expect(sitesForCatalogsRestService.save.calls.count()).toEqual(1);
	});
});
