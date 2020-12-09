/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {ConfigurationObject} from 'smarteditcontainer/services/bootstrap/Configuration';
import {Module} from 'smarteditcontainer/services/bootstrap/ConfigurationModules';
import {BootstrapService, SharedDataService} from 'smarteditcontainer/services';
import {promiseHelper, PromiseType} from 'testhelpers';
import * as lo from 'lodash';
import {ModuleUtils} from 'smarteditcommons';
import {BootstrapPayload} from "../../../../web/app/common/dtos";

describe('bootstrapService', () => {

	let bootstrapService: BootstrapService;
	let configurationExtractorService: any;
	let sharedDataService: SharedDataService;
	let injectJS: any;
	let $log: jasmine.SpyObj<angular.ILogService>;
	let $http: jasmine.SpyObj<angular.IHttpService>;
	let $q: jasmine.SpyObj<angular.IQService>;
	let smarteditBootstrapGateway: jasmine.SpyObj<any>;
	let moduleUtils: jasmine.SpyObj<ModuleUtils>;
	let successPromise: angular.IPromise<void>;
	let failurePromise: angular.IPromise<void>;
	let legacyContainerModuleMock: jasmine.SpyObj<angular.IModule>;

	const configurations = {
		'smarteditroot': 'smarteditroot1',
		'domain': 'domain1',
		'whiteListedStorefronts': ['a', 'b'],
		'authentication.credentials': {
			key2: 'value2'
		}
	} as ConfigurationObject;

	beforeEach(() => {

		$q = promiseHelper.$q();

		moduleUtils = jasmine.createSpyObj<ModuleUtils>("moduleUtils", ["addModuleToAngularJSApp", "getNgModule", "injectApplications"]);
		moduleUtils.addModuleToAngularJSApp.and.returnValue(null);
		moduleUtils.getNgModule.and.callFake((appName: string) => {
			if (appName === 'AppA') {
				return 'AppAModule';
			}
			return null;
		});
		moduleUtils.injectApplications.and.returnValue($q.when<BootstrapPayload>({
			modules: ['AppAModule']
		}));

		successPromise = promiseHelper.buildPromise("success");
		failurePromise = promiseHelper.buildPromise("failure", PromiseType.REJECTS);

		$log = jasmine.createSpyObj('$log', ['debug', 'error']);

		const successUriList = ['SELocationForAppZ', 'SELocationForAppX', 'SEForAppA', 'SEForAppB', 'SEForAppC', 'SEForAppD', 'SEContainerLocationForAppA', 'SEContainerLocationForAppA', 'SEContainerLocationForAppB', 'SEContainerLocationForAppC', 'SEContainerLocationForAppD'];
		const failureUriList = ['SELocationForAppY'];
		$http = jasmine.createSpyObj('$http', ['get']);
		$http.get.and.callFake((uri: string) => {
			if (lo.includes(successUriList, uri)) {
				return successPromise;
			} else if (lo.includes(failureUriList, uri)) {
				return failurePromise;
			} else {
				throw new Error(`unexpected call to $http.get: ${uri}`);
			}
		});

		sharedDataService = jasmine.createSpyObj('sharedDataService', ['set', 'get']);

		configurationExtractorService = jasmine.createSpyObj('configurationExtractorService', ['extractSEContainerModules', 'extractSEModules', 'orderApplications']);

		configurationExtractorService.orderApplications.and.callFake((apps: Module[]) => {
			apps.reverse();
			return apps;
		});

		configurationExtractorService.extractSEContainerModules.and.returnValue({
			applications: [{name: 'AppA', location: 'SEContainerLocationForAppA'}, {name: 'AppB', location: 'SEContainerLocationForAppB'}, {name: 'AppC', location: 'SEContainerLocationForAppC'}, {name: 'AppY', location: 'SELocationForAppY'}],
			authenticationMap: {
				key1: 'value1'
			}
		});

		configurationExtractorService.extractSEModules.and.returnValue({
			applications: [{name: 'AppX', location: 'SELocationForAppX'}, {name: 'AppY', location: 'SELocationForAppY'}, {name: 'AppZ', location: 'SELocationForAppZ'}],
			authenticationMap: {
				key1: 'value1'
			}
		});

		injectJS = jasmine.createSpyObj('injectJS', ['execute']);
		injectJS.execute.and.callFake((arg: {srcs: string[], callback: () => void}) => {
			arg.callback();
		});
		smarteditBootstrapGateway = jasmine.createSpyObj('smarteditBootstrapGateway', ['publish']);

		bootstrapService = new BootstrapService(
			lo,
			configurationExtractorService,
			sharedDataService,
			$log,
			$http,
			$q,
			smarteditBootstrapGateway,
			moduleUtils
		);

		legacyContainerModuleMock = jasmine.createSpyObj<angular.IModule>("legacyContainerModuleMock", ["constant"]);
		legacyContainerModuleMock.constant.and.returnValue(legacyContainerModuleMock);
		spyOn(bootstrapService as any, '_getLegacyContainerModule').and.returnValue(legacyContainerModuleMock);

	});

	afterEach(() => {
		expect(configurationExtractorService.orderApplications).toHaveBeenCalled();
	});

	it('calling bootstrapContainerModules will invoke extractSEContainerModules and inject the javascript sources,' +
		' push the modules to smarteditcontainer module and re-bootstrap smarteditcontainer', async () => {

			const bootstrapPayload = await bootstrapService.bootstrapContainerModules(configurations);

			expect(bootstrapPayload.modules).toEqual(['AppAModule']);

			expect(moduleUtils.injectApplications).toHaveBeenCalledWith('smarteditcontainer', [
				{name: 'AppC', location: 'SEContainerLocationForAppC'},
				{name: 'AppB', location: 'SEContainerLocationForAppB'},
				{name: 'AppA', location: 'SEContainerLocationForAppA'},
			], {
					domain: configurations.domain,
					smarteditroot: configurations.smarteditroot,
					whiteListedStorefronts: configurations.whiteListedStorefronts
				});

			expect(sharedDataService.set).toHaveBeenCalledWith('authenticationMap', {
				key1: 'value1'
			});
			expect(sharedDataService.set).toHaveBeenCalledWith('credentialsMap', {
				key2: 'value2'
			});

		});

	it('outer applications will be sorted by means of extends keyword and applications extending unknown apps will be ignored', async () => {

		configurationExtractorService.extractSEContainerModules.and.returnValue({
			applications: [
				{name: 'AppB', location: 'SEContainerLocationForAppB'},
				{name: 'AppA', location: 'SEContainerLocationForAppA'},
			]
		});

		const bootstrapPayload = await bootstrapService.bootstrapContainerModules(configurations);

		expect(bootstrapPayload.modules).toEqual(['AppAModule']);

		expect(moduleUtils.injectApplications).toHaveBeenCalledWith('smarteditcontainer', [
			{name: 'AppA', location: 'SEContainerLocationForAppA'},
			{name: 'AppB', location: 'SEContainerLocationForAppB'}
		], {
				domain: configurations.domain,
				smarteditroot: configurations.smarteditroot,
				whiteListedStorefronts: configurations.whiteListedStorefronts
			});
	});

	it('calling bootstrapSEApp will invoke extractSEModules and inject the javascript sources by means of postMessage and if the module fails to load it will not be injected as module AppY fails because of URL not found', () => {

		bootstrapService.bootstrapSEApp(configurations);

		expect(configurationExtractorService.extractSEModules).toHaveBeenCalledWith(configurations);

		expect(sharedDataService.set).toHaveBeenCalledWith('authenticationMap', {
			key1: 'value1'
		});
		expect(sharedDataService.set).toHaveBeenCalledWith('credentialsMap', {
			key2: 'value2'
		});

		expect(smarteditBootstrapGateway.publish).toHaveBeenCalledWith("bundle", {
			resources: {
				properties: {
					domain: 'domain1',
					smarteditroot: 'smarteditroot1',
					applications: ['AppZ', 'AppX'],
					whiteListedStorefronts: ['a', 'b']
				},
				js: [
					{src: 'smarteditroot1/static-resources/thirdparties/blockumd/blockumd.js'},
					{src: 'smarteditroot1/static-resources/dist/smartedit/js/prelibraries.js'},
					{src: 'smarteditroot1/static-resources/dist/smarteditcommons/js/vendor_chunk.js'},
					{src: 'smarteditroot1/static-resources/thirdparties/ckeditor/ckeditor.js'},
					{src: 'smarteditroot1/static-resources/dist/smarteditcommons/js/smarteditcommons.js'},
					{src: 'smarteditroot1/static-resources/dist/smartedit/js/smartedit.js'},
					{src: 'SELocationForAppZ'},
					{src: 'SELocationForAppX'},
					{src: 'smarteditroot1/static-resources/dist/smartedit/js/smarteditbootstrap.js'}]
			}
		});

		expect($log.error).toHaveBeenCalledWith("Failed to load application 'AppY' from location SELocationForAppY; SmartEdit functionality may be compromised.");

	});

	it('inner applications will be sorted by means of extends keyword and applications extending unknown apps will be ignored', () => {

		configurationExtractorService.extractSEModules.and.returnValue({
			applications: [
				{name: 'AppB', location: 'SEForAppB'},
				{name: 'AppA', location: 'SEForAppA'},
			]
		});

		bootstrapService.bootstrapSEApp(configurations);

		expect(smarteditBootstrapGateway.publish.calls.argsFor(0)[1].resources.js).toEqual(
			[
				{src: 'smarteditroot1/static-resources/thirdparties/blockumd/blockumd.js'},
				{src: 'smarteditroot1/static-resources/dist/smartedit/js/prelibraries.js'},
				{src: 'smarteditroot1/static-resources/dist/smarteditcommons/js/vendor_chunk.js'},
				{src: 'smarteditroot1/static-resources/thirdparties/ckeditor/ckeditor.js'},
				{src: 'smarteditroot1/static-resources/dist/smarteditcommons/js/smarteditcommons.js'},
				{src: 'smarteditroot1/static-resources/dist/smartedit/js/smartedit.js'},
				{src: 'SEForAppA'},
				{src: 'SEForAppB'},
				{src: 'smarteditroot1/static-resources/dist/smartedit/js/smarteditbootstrap.js'}]
		);

	});

});
