/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from "lodash";
import {promiseHelper} from 'testhelpers';
import {annotationService, pageChangeEvictionTag, pageEvictionTag, rarelyChangingContent, Cached, GatewayProxied, IExperience, IExperienceService, IPageInfoService, IUriContext, IUrlService} from 'smarteditcommons';
import {CmsApprovalStatus, CMSPageTypes, ICMSPage} from 'cmscommons';
import {PageService} from 'cmssmarteditcontainer/services/pages';


describe('Page Service ->', () => {

	const $q = promiseHelper.$q();

	const PAGE_UID = "SOME PAGE ID";
	const PAGE_UUID = "SOME PAGE UUID";
	const PAGE_TYPE = CMSPageTypes.CategoryPage;
	const URI_CONTEXT: IUriContext = {
		siteUID: 'mySite',
		catalogId: 'myCatalog',
		catalogVersion: 'myCatalogVersion'
	};

	const pagesRestService = jasmine.createSpyObj<any>('pagesRestService', ['get', 'getById', 'update']);
	const pagesFallbacksRestService = jasmine.createSpyObj<any>('pagesFallbackRestService', ['getFallbacksForPageId', 'getFallbacksForPageIdAndContext']);
	const pagesVariationsRestService = jasmine.createSpyObj<any>('pagesVariationsRestService', ['getVariationsForPrimaryPageId']);
	const cmsitemsRestService = jasmine.createSpyObj<any>('cmsitemsRestService', ['get', 'getById', 'getByIdAndVersion', 'update']);
	const experienceService = jasmine.createSpyObj<IExperienceService>('experienceService', ['getCurrentExperience']);
	const pageInfoService = jasmine.createSpyObj<IPageInfoService>('pageInfoService', ['getPageUUID']);
	const urlService = jasmine.createSpyObj<IUrlService>('urlService', ['buildUriContext']);
	const copy = jasmine.createSpy('copy');

	let page: ICMSPage;
	let pageService: PageService;
	let $routeParams: ng.route.IRouteParamsService;

	beforeEach(() => {
		$routeParams = {
			siteId: 'someSiteId',
			catalogId: 'someCatalogId',
			catalogVersion: 'someCatalogVersion'
		};

		copy.and.callFake((originalValue: any) => originalValue);
		urlService.buildUriContext.and.callFake((contextSiteId: string, contextCatalogId: string, contextCatalogVersion: string) => {
			return {
				contextSiteId,
				contextCatalogId,
				contextCatalogVersion
			};
		});

		page = {
			name: "some page name",
			uid: PAGE_UID,
			uuid: PAGE_UUID,
			title: {en: "some title"},
			typeCode: CMSPageTypes.ContentPage,
			defaultPage: true,
			homepage: false,
			catalogVersion: null,
			restrictions: [],
			approvalStatus: CmsApprovalStatus.CHECK,
			pageStatus: null,
			displayStatus: null,
			masterTemplate: null,
			creationtime: null,
			modifiedtime: null,
		};

		pageService = new PageService(
			pagesRestService,
			pagesFallbacksRestService,
			pagesVariationsRestService,
			pageInfoService,
			cmsitemsRestService,
			experienceService,
			lo,
			$q,
			$routeParams,
			urlService,
			copy);
	});

	describe('initialization', () => {
		it('WHEN initialized THEN it must be GatewayProxied', () => {
			expect(annotationService.getClassAnnotation(PageService, GatewayProxied)).toEqual([]);
		});
	});

	describe('getPageById', () => {
		it('WHEN getPageById is called THEN it will retrieve the page matching that uid', () => {
			// GIVEN 
			pagesRestService.getById.and.returnValue($q.when(page));

			// WHEN
			const promise = pageService.getPageById(PAGE_UID);

			// THEN
			expect(promise).toBeResolvedWithData(page);
		});
	});

	describe('getPageByUuid', () => {
		it('WHEN initialized THEN it is annotated with pageEvictionTag', () => {
			// GIVEN 
			const decoratorObj = annotationService.getMethodAnnotation(PageService, 'getPageByUuid', Cached);

			// WHEN/THEN
			expect(decoratorObj).toEqual(jasmine.objectContaining([{
				actions: [rarelyChangingContent],
				tags: [pageEvictionTag]
			}]));
		});

		it('WHEN getPageByUuid is called THEN it will retrieve the page matching that uuid', () => {
			// GIVEN 
			cmsitemsRestService.getById.and.returnValue($q.when(page));

			// WHEN
			const promise = pageService.getPageByUuid(PAGE_UUID);

			// THEN
			expect(promise).toBeResolvedWithData(page);
		});
	});

	describe('getCurrentPageInfo', () => {

		it('WHEN initialized THEN it is annotated with pageEvictionTag AND pageChangeEvictionTag', () => {
			// GIVEN
			const decoratorObj = annotationService.getMethodAnnotation(PageService, 'getCurrentPageInfo', Cached);

			// WHEN/THEN
			expect(decoratorObj).toEqual(jasmine.objectContaining([{
				actions: [rarelyChangingContent],
				tags: [pageEvictionTag, pageChangeEvictionTag]
			}]));
		});

		it('WHEN getCurrentPageInfo is called THEN it will return the page information of the current page loaded in the storefront', () => {
			// GIVEN
			pageInfoService.getPageUUID.and.returnValue($q.when(PAGE_UUID));
			cmsitemsRestService.getById.and.returnValue($q.when(page));

			// WHEN 
			const promise = pageService.getCurrentPageInfo();

			// THEN
			expect(cmsitemsRestService.getById).toHaveBeenCalledWith(PAGE_UUID);
			expect(promise).toBeResolvedWithData(page);
		});
	});

	describe('getPrimaryPagesForPageType', () => {

		const DEFAULT_PAYLOAD = {
			typeCode: PAGE_TYPE,
			itemSearchParams: "defaultPage:true,pageStatus:ACTIVE",
			currentPage: 0,
			pageSize: 1000,
		};

		beforeEach(() => {
			cmsitemsRestService.get.and.returnValue($q.when({
				response: [page]
			}));
		});

		it('GIVEN no existing parameters WHEN getPrimaryPagesForPageType is called THEN it calls the CMS Items API with the right parameters', () => {
			// WHEN 
			pageService.getPrimaryPagesForPageType(PAGE_TYPE, null);

			// THEN  
			expect(cmsitemsRestService.get).toHaveBeenCalledWith(DEFAULT_PAYLOAD);
		});

		it('GIVEN an existing parameters object WHEN getPrimaryPagesForPageType is called THEN it calls the CMS Items API with the right parameters ', () => {
			// GIVEN 
			const expectedPayload = lo.assign({}, URI_CONTEXT, DEFAULT_PAYLOAD);

			// WHEN 
			pageService.getPrimaryPagesForPageType(PAGE_TYPE, URI_CONTEXT);

			// THEN 
			expect(cmsitemsRestService.get).toHaveBeenCalledWith(expectedPayload);
		});

		it('WHEN getPrimaryPagesForPageType is called THEN it returns the list of primary pages for the given page type', () => {
			// WHEN 
			const promise = pageService.getPrimaryPagesForPageType(PAGE_TYPE, URI_CONTEXT);

			// THEN 
			expect(promise).toBeResolvedWithData([page]);
		});
	});

	describe('getCurrentPageInfoByVersion', () => {
		it('WHEN getCurrentPageInfoByVersion is called it returns the information of the version of the current page loaded in the storefront', () => {
			// GIVEN 
			const versionId = 'some version Id';
			cmsitemsRestService.getByIdAndVersion.and.returnValue($q.when(page));
			pageInfoService.getPageUUID.and.returnValue($q.when(PAGE_UUID));

			// WHEN 
			const promise = pageService.getCurrentPageInfoByVersion(versionId);

			// THEN 
			expect(promise).toBeResolvedWithData(page);
			expect(cmsitemsRestService.getByIdAndVersion).toHaveBeenCalledWith(PAGE_UUID, versionId);
		});
	});

	describe('isPagePrimary', () => {
		const MOCK_FALLBACK_PAGE_IDS = ['some primary page id'];

		it('GIVEN no fallbacks exist for the current page WHEN isPagePrimary is called THEN it should return true', () => {
			// GIVEN 
			pagesFallbacksRestService.getFallbacksForPageId.and.returnValue($q.when([]));

			// WHEN 
			const promise = pageService.isPagePrimary(PAGE_UID);

			// THEN 
			expect(promise).toBeResolvedWithData(true);
			expect(pagesFallbacksRestService.getFallbacksForPageId).toHaveBeenCalledWith(PAGE_UID);
		});

		it('GIVEN there are fallbacks for the current page WHEN isPagePrimary is called THEN it should return false', () => {
			// GIVEN 
			pagesFallbacksRestService.getFallbacksForPageId.and.returnValue($q.when(MOCK_FALLBACK_PAGE_IDS));

			// WHEN 
			const promise = pageService.isPagePrimary(PAGE_UID);

			// THEN 
			expect(promise).toBeResolvedWithData(false);
			expect(pagesFallbacksRestService.getFallbacksForPageId).toHaveBeenCalledWith(PAGE_UID);
		});

		it('GIVEN no fallbacks exist for the current page WHEN isPagePrimaryWithContext is called THEN it should return true', () => {
			// GIVEN 
			pagesFallbacksRestService.getFallbacksForPageIdAndContext.and.returnValue($q.when([]));

			// WHEN 
			const promise = pageService.isPagePrimaryWithContext(PAGE_UID, URI_CONTEXT);

			// THEN 
			expect(promise).toBeResolvedWithData(true);
			expect(pagesFallbacksRestService.getFallbacksForPageIdAndContext).toHaveBeenCalledWith(PAGE_UID, URI_CONTEXT);
		});

		it('GIVEN there are fallbacks for the current page WHEN isPagePrimaryWithContext is called THEN it should return false', () => {
			// GIVEN 
			pagesFallbacksRestService.getFallbacksForPageIdAndContext.and.returnValue($q.when(MOCK_FALLBACK_PAGE_IDS));

			// WHEN 
			const promise = pageService.isPagePrimaryWithContext(PAGE_UID, URI_CONTEXT);

			// THEN 
			expect(promise).toBeResolvedWithData(false);
			expect(pagesFallbacksRestService.getFallbacksForPageIdAndContext).toHaveBeenCalledWith(PAGE_UID, URI_CONTEXT);
		});
	});

	describe('getPrimaryPage', () => {

		const PRIMARY_PAGE_UID = "some primary page uid";

		it('GIVEN uid corresponds to primary page WHEN getPrimaryPage is called THEN it should not return an empty promise', () => {
			// GIVEN 
			pagesFallbacksRestService.getFallbacksForPageId.and.returnValue($q.when([]));

			// WHEN 
			const promise = pageService.getPrimaryPage(PAGE_UID);

			// THEN 
			expect(promise).toBeResolvedWithData(undefined);
		});

		it('GIVEN uid corresponds to page variation WHEN getPrimaryPage is called THEN it returns the primary page', () => {
			// GIVEN 
			pagesFallbacksRestService.getFallbacksForPageId.and.returnValue($q.when([PRIMARY_PAGE_UID]));
			pagesRestService.getById.and.returnValue(page);

			// WHEN 
			const promise = pageService.getPrimaryPage(PAGE_UID);

			// THEN 
			expect(promise).toBeResolvedWithData(page);
			expect(pagesRestService.getById).toHaveBeenCalledWith(PRIMARY_PAGE_UID);
		});
	});

	describe('getVariationPages', () => {

		const VARIATION_PAGE_ID = "some variation page ID";

		it('GIVEN there are no variations for primary page WHEN getVariationPages is called THEN it returns a promise with an empty list', () => {
			// GIVEN 
			pagesVariationsRestService.getVariationsForPrimaryPageId.and.returnValue($q.when([]));

			// WHEN 
			const promise = pageService.getVariationPages(PAGE_UID);

			// THEN 
			expect(promise).toBeResolvedWithData([]);
		});

		it('GIVEN there are variations for primary page WHEN getVariationPages is called THEN it returns a promise with the list of variations', () => {
			// GIVEN 
			pagesVariationsRestService.getVariationsForPrimaryPageId.and.returnValue($q.when([VARIATION_PAGE_ID]));
			pagesRestService.get.and.returnValue($q.when([page]));

			// WHEN 
			const promise = pageService.getVariationPages(PAGE_UID);

			// THEN 
			expect(promise).toBeResolvedWithData([page]);
			expect(pagesRestService.get).toHaveBeenCalledWith({
				uids: [VARIATION_PAGE_ID]
			});
		});
	});

	describe('updatePageById', () => {

		it('WHEN updatePageById is called THEN it updates the page with the provided information', () => {
			// GIVEN 
			const newPageName = "Some new page name";
			const newPageInfo = lo.assign({}, page, {
				pageName: newPageName,
			});

			pagesRestService.getById.and.returnValue($q.when(page));
			pagesRestService.update.and.returnValue($q.when(newPageInfo));

			// WHEN 
			const promise = pageService.updatePageById(PAGE_UID, newPageInfo);

			// THEN 
			expect(promise).toBeResolvedWithData(newPageInfo);
			expect(pagesRestService.update).toHaveBeenCalledWith(PAGE_UID, newPageInfo);
		});

	});

	describe('forcePageApprovalStatus', () => {

		const NEW_APPROVAL_STATUS = CmsApprovalStatus.APPROVED;

		it('WHEN forcePageApprovalStatus is called THEN it retrieves the current page info AND updates it with the new status', function() {
			// GIVEN 
			const expectedUpdatePayload = lo.assign({}, page, {
				approvalStatus: NEW_APPROVAL_STATUS,
				identifier: PAGE_UUID
			});

			const expectedPageInfo = lo.assign({}, page, {
				approvalStatus: NEW_APPROVAL_STATUS
			});

			pageInfoService.getPageUUID.and.returnValue($q.when(PAGE_UUID));
			cmsitemsRestService.getById.and.returnValue($q.when(page));
			cmsitemsRestService.update.and.returnValue($q.when(expectedPageInfo));

			// WHEN 
			const promise = pageService.forcePageApprovalStatus(NEW_APPROVAL_STATUS);

			// THEN
			expect(promise).toBeResolvedWithData(expectedPageInfo);
			expect(cmsitemsRestService.update).toHaveBeenCalledWith(expectedUpdatePayload);
		});
	});

	describe('isPageApproved', () => {

		beforeEach(() => {
			cmsitemsRestService.getById.and.returnValue($q.when(page));
		});

		it('GIVEN the uuid of an unapproved page WHEN isPageApproved is called THEN it returns false', () => {
			// GIVEN
			cmsitemsRestService.getById.calls.reset();

			// WHEN 
			const promise = pageService.isPageApproved(PAGE_UUID);

			// THEN
			expect(promise).toBeResolvedWithData(false);
			expect(cmsitemsRestService.getById).toHaveBeenCalledWith(PAGE_UUID);
		});

		it('GIVEN the uuid of an approved page WHEN isPageApproved is called THEN it returns true', () => {
			// GIVEN
			cmsitemsRestService.getById.calls.reset();
			page.approvalStatus = CmsApprovalStatus.APPROVED;

			// WHEN 
			const promise = pageService.isPageApproved(PAGE_UUID);

			// THEN
			expect(promise).toBeResolvedWithData(true);
			expect(cmsitemsRestService.getById).toHaveBeenCalledWith(PAGE_UUID);
		});

		it('GIVEN an unapproved page WHEN isPageApproved is called THEN it returns false', () => {
			// GIVEN
			cmsitemsRestService.getById.calls.reset();

			// WHEN 
			const promise = pageService.isPageApproved(page);

			// THEN
			expect(promise).toBeResolvedWithData(false);
			expect(cmsitemsRestService.getById).not.toHaveBeenCalledWith(PAGE_UUID);
		});

		it('GIVEN an approved page WHEN isPageApproved is called THEN it returns true', () => {
			// GIVEN
			cmsitemsRestService.getById.calls.reset();
			page.approvalStatus = CmsApprovalStatus.APPROVED;

			// WHEN 
			const promise = pageService.isPageApproved(page);

			// THEN
			expect(promise).toBeResolvedWithData(true);
			expect(cmsitemsRestService.getById).not.toHaveBeenCalledWith(PAGE_UUID);
		});
	});

	describe('buildUriContextForCurrentPage', () => {

		it('GIVEN $routeParams has been set WHEN buildUriContextForCurrentPage is called THEN it returns the page context', () => {
			// GIVEN
			experienceService.getCurrentExperience.calls.reset();

			// WHEN 
			const promise = pageService.buildUriContextForCurrentPage();

			// THEN 
			expect(experienceService.getCurrentExperience).not.toHaveBeenCalled();
			expect(promise).toBeResolvedWithData({
				contextSiteId: $routeParams.siteId,
				contextCatalogId: $routeParams.catalogId,
				contextCatalogVersion: $routeParams.catalogVersion
			});
		});

		it('GIVEN $routeParams has not been set WHEN buildUriContextForCurrentPage is called THEN it returns the page context from the current experience', () => {
			// GIVEN 
			const experience: IExperience = {
				siteDescriptor: null,
				catalogDescriptor: null,
				productCatalogVersions: null,
				time: null,
				pageContext: {
					siteId: $routeParams.siteId,
					catalogName: null,
					catalogId: $routeParams.catalogId,
					catalogVersion: $routeParams.catalogVersion,
					catalogVersionUuid: null,
					active: true
				}
			};

			const emptyRouteParams = {
				siteId: null,
				catalogId: null,
				catalogVersion: null
			} as any;

			const service = new PageService(
				pagesRestService,
				pagesFallbacksRestService,
				pagesVariationsRestService,
				pageInfoService,
				cmsitemsRestService,
				experienceService,
				lo,
				$q,
				emptyRouteParams,
				urlService,
				copy);

			experienceService.getCurrentExperience.and.returnValue($q.when(experience));

			// WHEN 
			const promise = service.buildUriContextForCurrentPage();

			// THEN 
			expect(experienceService.getCurrentExperience).toHaveBeenCalled();
			expect(promise).toBeResolvedWithData({
				contextSiteId: $routeParams.siteId,
				contextCatalogId: $routeParams.catalogId,
				contextCatalogVersion: $routeParams.catalogVersion
			});
		});
	});
});