/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';
import {annotationService, functionsUtils, GatewayProxied, IPreviewData, IPreviewService, IRestServiceFactory} from 'smarteditcommons';
import {PreviewService} from 'smarteditcontainer/services';
import {promiseHelper, IExtensiblePromise, PromiseType} from 'testhelpers';

describe('previewService', () => {

	const mockSaveResult = {
		ticketId: "xyz",
		catalogVersions: [
			{
				catalog: "catalog",
				catalogVersion: "catalogVersion"
			}
		],
		language: "language",
		resourcePath: "abc",
		pageId: "pageId"
	};
	const mockUpdateResult = {
		ticketId: "xyz",
		catalogVersions: [
			{
				catalog: "catalog",
				catalogVersion: "catalogVersion"
			}
		],
		language: "language",
		resourcePath: "abc",
	};
	const mockUpdatedUrl = 'someUpdatedUrl';
	const mockResourcePath = 'mockResourcePath';
	const mockPreviewUri = 'bla';
	const storefrontUrl = "/storefront";
	const previewData: IPreviewData = {
		catalogVersions: [
			{
				catalog: "catalog",
				catalogVersion: "catalogVersion"
			}
		],
		language: "language",
		resourcePath: "resourcePath",
		pageId: "pageId"
	};

	const configuration = {
		domain: "https://somedomain:999/",
		previewTicketURI: "somePreviewURI"
	};

	// ======= Injected mocks =======
	let $log: jasmine.SpyObj<angular.ILogService>;
	let loadConfigManagerService: jasmine.SpyObj<any>;
	let restServiceFactory: jasmine.SpyObj<IRestServiceFactory>;
	let mockUrlUtils: jasmine.SpyObj<any>;
	const getAbsoluteURL: () => string = () => mockResourcePath;
	const PREVIEW_RESOURCE_URI: string = mockPreviewUri;
	const $q: angular.IQService = promiseHelper.$q();

	// ======= Common mocks =======
	let rsf: jasmine.SpyObj<any>;
	let createPreviewSpy: jasmine.Spy;

	// Service being tested
	let previewService: IPreviewService;

	// === SETUP ===
	beforeEach(() => {
		$log = jasmine.createSpyObj('$log', ['debug', 'error']);
		loadConfigManagerService = jasmine.createSpyObj('loadConfigManagerService', ['loadAsObject']);
		restServiceFactory = jasmine.createSpyObj('restServiceFactory', ['get']);

		rsf = jasmine.createSpyObj('rsf', ['save', 'update']);
		restServiceFactory.get.and.returnValue(rsf);

		const savePromise: angular.IPromise<IPreviewData> = promiseHelper.buildPromise('save', PromiseType.RESOLVES, mockSaveResult);
		rsf.save.and.returnValue(savePromise);

		const updatePromise: angular.IPromise<IPreviewData> = promiseHelper.buildPromise('update', PromiseType.RESOLVES, mockUpdateResult);
		rsf.update.and.returnValue(updatePromise);

		mockUrlUtils = jasmine.createSpyObj('mockUrlUtils', ['updateUrlParameter']);
		mockUrlUtils.updateUrlParameter.and.callFake(() => mockUpdatedUrl);

		spyOn(functionsUtils, 'isUnitTestMode').and.returnValue(false);

		const configurationPromise = promiseHelper.buildPromise('config', PromiseType.RESOLVES, configuration);
		loadConfigManagerService.loadAsObject.and.callFake(() => configurationPromise);



		previewService = new PreviewService(
			$log,
			$q,
			loadConfigManagerService,
			PREVIEW_RESOURCE_URI,
			restServiceFactory,
			lo,
			getAbsoluteURL,
			lo.cloneDeep,
			mockUrlUtils
		);

		createPreviewSpy = spyOn(previewService, 'createPreview').and.callThrough();
	});

	describe('initialization', () => {
		it('invokes the gateway proxy', () => {
			expect(annotationService.getClassAnnotation(PreviewService, GatewayProxied)).toEqual([]);
		});

		describe('prepares restServices', () => {
			it('cannot load configuration', () => {
				(previewService as any).previewRestService = undefined;
				(previewService as any).previewByticketRestService = undefined;
				const failurePromise: angular.IPromise<string> = promiseHelper.buildPromise('alpha', PromiseType.REJECTS, 'error reason');
				loadConfigManagerService.loadAsObject.and.callFake(() => failurePromise);

				const promise = (previewService as any)._prepareRestService() as IExtensiblePromise<string>;

				expect(promise.value).toBe((failurePromise as IExtensiblePromise<string>).value);
			});
		});
	});

	describe('createPreview & updateUrlWithNewPreviewTicketId', () => {

		it('handling rejected promises while post operation to preview failed', () => {
			const restServicePromise: angular.IPromise<any> = promiseHelper.buildPromise('restService', PromiseType.REJECTS, 'error reason');
			rsf.save.and.returnValue(restServicePromise);

			const promise = previewService.createPreview(previewData) as IExtensiblePromise<IPreviewData>;

			expect(promise.value).toBe((restServicePromise as IExtensiblePromise<any>).value);
		});

		it('validatePreviewDataAttributes fails when require attributes are missing', () => {
			const invalidPreviewData = lo.cloneDeep(previewData);
			delete invalidPreviewData.catalogVersions;
			expect(() => previewService.createPreview(invalidPreviewData)).toThrowError('ValidatePreviewDataAttributes - catalogVersions is empty');
			expect(rsf.save.calls.count()).toBe(0);
		});

		it('proper preview data is requested and proper response returned', () => {

			const promise = previewService.createPreview(previewData) as IExtensiblePromise<IPreviewData>;

			expect(rsf.save).toHaveBeenCalledWith(previewData);
			expect(promise.value).toEqual(mockSaveResult);
		});

		it('sets previewRestService, while calling createPreview, if it is not set when initializing', () => {
			// GIVEN
			(previewService as any).previewRestService = undefined;
			restServiceFactory.get.calls.reset();
			loadConfigManagerService.loadAsObject.calls.reset();

			// WHEN
			previewService.createPreview(previewData);

			// THEN
			expect(loadConfigManagerService.loadAsObject).toHaveBeenCalled();
			expect(restServiceFactory.get.calls.count()).toBe(2);
			expect(restServiceFactory.get).toHaveBeenCalledWith(configuration.previewTicketURI);
			expect(restServiceFactory.get).toHaveBeenCalledWith(configuration.previewTicketURI, 'ticketId');
		});

		describe('updateUrlWithNewPreviewTicketId', () => {
			it('properly updates url', () => {
				const promise = previewService.updateUrlWithNewPreviewTicketId(storefrontUrl, previewData) as IExtensiblePromise<string>;

				expect(createPreviewSpy).toHaveBeenCalledWith(previewData);
				expect(mockUrlUtils.updateUrlParameter).toHaveBeenCalledWith(storefrontUrl, 'cmsTicketId', mockSaveResult.ticketId);
				expect(promise.value).toBe(mockUpdatedUrl);
			});
		});
	});

	describe('updatePreview', () => {
		it('validatePreviewDataAttributes fails when require attributes are missing', () => {
			const invalidPreviewData = lo.cloneDeep(previewData);
			expect(() => previewService.updatePreview(invalidPreviewData)).toThrowError('ValidatePreviewDataAttributes - ticketId is empty');
			expect(rsf.update.calls.count()).toBe(0);
		});

		it('handling rejected promises while put operation to preview failed', () => {
			const restServicePromise: angular.IPromise<any> = promiseHelper.buildPromise('restService', PromiseType.REJECTS, 'error reason');
			rsf.update.and.returnValue(restServicePromise);
			const data = lo.cloneDeep(previewData);
			data.ticketId = 'xyz';

			const promise = previewService.updatePreview(data) as IExtensiblePromise<IPreviewData>;

			expect(promise.value).toBe((restServicePromise as IExtensiblePromise<any>).value);
		});

		it('proper preview data is updated and proper response returned', () => {
			const data = lo.cloneDeep(previewData);
			data.ticketId = 'xyz';
			delete data.pageId;

			const promise = previewService.updatePreview(data) as IExtensiblePromise<IPreviewData>;

			expect(rsf.update).toHaveBeenCalledWith(data);
			expect(promise.value).toBe(mockUpdateResult);
		});

		it('sets previewByticketRestService, while calling updatePreview, if it is not set when initializing', () => {
			// GIVEN
			const data = lo.cloneDeep(previewData);
			data.ticketId = 'xyz';
			(previewService as any).previewByticketRestService = undefined;
			restServiceFactory.get.calls.reset();
			loadConfigManagerService.loadAsObject.calls.reset();

			// WHEN
			previewService.updatePreview(data);

			// THEN
			expect(loadConfigManagerService.loadAsObject).toHaveBeenCalled();
			expect(restServiceFactory.get.calls.count()).toBe(2);
			expect(restServiceFactory.get).toHaveBeenCalledWith(configuration.previewTicketURI);
			expect(restServiceFactory.get).toHaveBeenCalledWith(configuration.previewTicketURI, 'ticketId');
		});
	});
});

