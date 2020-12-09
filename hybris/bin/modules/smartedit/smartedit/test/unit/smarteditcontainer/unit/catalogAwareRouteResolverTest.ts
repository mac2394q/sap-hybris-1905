/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import {IExperience, ISharedDataService, SystemEventService} from "smarteditcommons";
import {CatalogAwareRouteResolverFunctions, ExperienceService} from "smarteditcontainer/services";
import {promiseHelper} from "testhelpers";

describe('CatalogAwareRouteResolverFunctions', () => {
	const EVENTS = {
		EXPERIENCE_UPDATE: 'experience_update_fake_event'
	};
	const LANDING_PAGE_PATH = '/aSDsadAS';

	let experienceService: jasmine.SpyObj<ExperienceService>;
	let $route: angular.route.IRouteService;
	let sharedDataService: jasmine.SpyObj<ISharedDataService>;
	let catalogVersionPermissionService: jasmine.SpyObj<any>;
	let $location: jasmine.SpyObj<angular.ILocationService>;
	let $q: angular.IQService;
	let $log: jasmine.SpyObj<angular.ILogService>;
	let systemEventService: jasmine.SpyObj<SystemEventService>;
	let nextExperience: IExperience;

	let executeStorefrontResolve: () => angular.IPromise<any>;
	let executeExperienceFromPathResolve: () => angular.IPromise<any>;

	beforeEach(() => {
		experienceService = jasmine.createSpyObj<ExperienceService>('experienceService', ['getCurrentExperience', 'buildAndSetExperience', 'hasCatalogVersionChanged']);

		$q = promiseHelper.$q();

		$log = jasmine.createSpyObj<angular.ILogService>('$log', ['info']);

		$route = jasmine.createSpyObj<angular.route.IRouteService>('$route', ['reload']);
		$route.current = {
			params: {
				key1: 'value1'
			},
			locals: {}
		} as angular.route.ICurrentRoute;

		sharedDataService = jasmine.createSpyObj<ISharedDataService>('sharedDataService', ['get', 'set']);

		catalogVersionPermissionService = jasmine.createSpyObj<any>('catalogVersionPermissionService', ['hasReadPermissionOnCurrent']);

		$location = jasmine.createSpyObj<angular.ILocationService>('$location', ['url']);

		systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', ['publishAsync']);

		nextExperience = {
			pageId: 'somePageId'
		} as IExperience;

		executeStorefrontResolve = () => {
			return CatalogAwareRouteResolverFunctions.storefrontResolve($q, $log, $location, experienceService, sharedDataService, systemEventService, EVENTS, LANDING_PAGE_PATH, catalogVersionPermissionService);
		};

		executeExperienceFromPathResolve = () => {
			return CatalogAwareRouteResolverFunctions.experienceFromPathResolve($route, $q, $log, $location, experienceService, sharedDataService, systemEventService, EVENTS, LANDING_PAGE_PATH, catalogVersionPermissionService);
		};
	});

	describe('storefrontResolve', () => {

		it('GIVEN there is no current experience THEN we are redirected to landing page', () => {
			// GIVEN
			experienceService.getCurrentExperience.and.returnValue($q.when(null));

			// WHEN
			const promise = executeStorefrontResolve();

			// THEN
			expect(promise).toBeRejected();
			expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
			expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			expect(sharedDataService.set).not.toHaveBeenCalled();
		});

		describe('catalogVersion has changed', () => {
			beforeEach(() => {
				experienceService.getCurrentExperience.and.returnValue($q.when(nextExperience));
				experienceService.hasCatalogVersionChanged.and.returnValue($q.when(true));
			});

			afterEach(() => {
				expect(sharedDataService.set).toHaveBeenCalledWith('experience', nextExperience);
			});

			it('GIVEN has read access to cataloVersion exists THEN experience update event is sent', () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(true));

				// WHEN
				const promise = executeStorefrontResolve();

				// THEN
				expect(promise).toBeResolved();
				expect($location.url).not.toHaveBeenCalled();
				expect(systemEventService.publishAsync).toHaveBeenCalledWith(EVENTS.EXPERIENCE_UPDATE);
			});

			it("GIVEN no read access to cataloVersion exists THEN redirected to landing page and experience update event not sent", () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(false));

				// WHEN
				const promise = executeStorefrontResolve();

				// THEN
				expect(promise).toBeRejected();
				expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
				expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			});
		});

		describe('catalogVersion has not changed', () => {
			beforeEach(() => {
				experienceService.getCurrentExperience.and.returnValue($q.when(nextExperience));
				experienceService.hasCatalogVersionChanged.and.returnValue($q.when(false));
			});

			it("GIVEN has read access to cataloVersion exists THEN experience update event is not sent", () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(true));

				// WHEN
				const promise = executeStorefrontResolve();

				// THEN
				expect(promise).toBeResolved();
				expect($location.url).not.toHaveBeenCalled();
				expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			});

			it('GIVEN no read access to cataloVersion exists THEN redirected to landing page and experience update event not sent', () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(false));

				// WHEN
				const promise = executeStorefrontResolve();

				// THEN
				expect(promise).toBeRejected();
				expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
				expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			});
		});

	});

	describe('experienceFromPathResolve', () => {

		it('GIVEN no experience coud be built THEN we are redirected to landing page', () => {
			// GIVEN
			experienceService.buildAndSetExperience.and.returnValue($q.when(null));

			// WHEN
			const promise = executeExperienceFromPathResolve();

			// THEN
			expect(promise).toBeRejected();
			expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
			expect(systemEventService.publishAsync).not.toHaveBeenCalled();
		});

		describe('catalogVersion has changed', () => {
			beforeEach(() => {
				experienceService.buildAndSetExperience.and.returnValue($q.when(nextExperience));
				experienceService.hasCatalogVersionChanged.and.returnValue($q.when(true));
			});

			it('GIVEN has read access to cataloVersion exists THEN experience update event is sent', () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(true));

				// WHEN
				const promise = executeExperienceFromPathResolve();

				// THEN
				expect(promise).toBeResolved();
				expect($location.url).not.toHaveBeenCalled();
				expect(systemEventService.publishAsync).toHaveBeenCalledWith(EVENTS.EXPERIENCE_UPDATE);
			});

			it('GIVEN no read access to cataloVersion exists THEN redirected to landing page and experience update event not sent', () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(false));

				// WHEN
				const promise = executeExperienceFromPathResolve();

				// THEN
				expect(promise).toBeRejected();
				expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
				expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			});
		});

		describe('catalogVersion has not changed', () => {
			beforeEach(() => {
				experienceService.buildAndSetExperience.and.returnValue($q.when(nextExperience));
				experienceService.hasCatalogVersionChanged.and.returnValue($q.when(false));
			});

			it("GIVEN has read access to cataloVersion exists THEN experience update event is not sent", () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(true));

				// WHEN
				const promise = executeExperienceFromPathResolve();

				// THEN
				expect(promise).toBeResolved();
				expect($location.url).not.toHaveBeenCalled();
				expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			});

			it('GIVEN no read access to cataloVersion exists THEN redirected to landing page and experience update event not sent', () => {
				// GIVEN
				catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue($q.when(false));

				// WHEN
				const promise = executeExperienceFromPathResolve();

				// THEN
				expect(promise).toBeRejected();
				expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
				expect(systemEventService.publishAsync).not.toHaveBeenCalled();
			});
		});

	});
});
