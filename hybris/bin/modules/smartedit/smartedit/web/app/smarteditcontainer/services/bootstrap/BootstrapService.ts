/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from "lodash";
import {BootstrapPayload, GatewayFactory, ISharedDataService, ModuleUtils, SeInjectable, TypedMap} from 'smarteditcommons';
import {ConfigurationModules, Module} from 'smarteditcontainer/services/bootstrap/ConfigurationModules';
import {ConfigurationObject} from 'smarteditcontainer/services/bootstrap/Configuration';
import {SmarteditBundle} from 'smarteditcontainer/services/bootstrap/SmarteditBundle';
import {ConfigurationExtractorService} from 'smarteditcontainer/services';

@SeInjectable()
export class BootstrapService {

	constructor(
		private lodash: lo.LoDashStatic,
		private configurationExtractorService: ConfigurationExtractorService,
		private sharedDataService: ISharedDataService,
		private $log: angular.ILogService,
		private $http: angular.IHttpService,
		private $q: angular.IQService,
		private smarteditBootstrapGateway: any,
		private moduleUtils: ModuleUtils
	) {}

	bootstrapContainerModules(configurations: ConfigurationObject): angular.IPromise<BootstrapPayload> {
		const seContainerModules: ConfigurationModules = this.configurationExtractorService.extractSEContainerModules(configurations);
		const orderedApplications = this.configurationExtractorService.orderApplications(seContainerModules.applications);

		this.$log.debug("outerAppLocations are:", orderedApplications);

		this.sharedDataService.set('authenticationMap', seContainerModules.authenticationMap);
		this.sharedDataService.set('credentialsMap', configurations['authentication.credentials']);

		const constants = this._getConstants(configurations);

		Object.keys(constants).forEach((key) => {
			this._getLegacyContainerModule().constant(key, constants[key]);
		});

		return this._getValidApplications(orderedApplications).then((validApplications: Module[]) => {
			return this.$q.when(this.moduleUtils.injectApplications('smarteditcontainer', validApplications, constants));
		});
	}
	/**
	 * Retrieve SmartEdit inner application configuration and dispatch 'bundle' event with list of resources.
	 * @param configurations 
	 */
	bootstrapSEApp(configurations: ConfigurationObject): angular.IPromise<void> {
		const seModules: ConfigurationModules = this.configurationExtractorService.extractSEModules(configurations);
		const orderedApplications = this.configurationExtractorService.orderApplications(seModules.applications);

		this.sharedDataService.set('authenticationMap', seModules.authenticationMap);
		this.sharedDataService.set('credentialsMap', configurations['authentication.credentials']);

		const resources = {
			properties: this._getConstants(configurations),
			js: [
				{src: configurations.smarteditroot + '/static-resources/thirdparties/blockumd/blockumd.js'},
				{src: configurations.smarteditroot + '/static-resources/dist/smartedit/js/prelibraries.js'},
				{src: configurations.smarteditroot + '/static-resources/dist/smarteditcommons/js/vendor_chunk.js'},
				{src: configurations.smarteditroot + '/static-resources/thirdparties/ckeditor/ckeditor.js'},
				{src: configurations.smarteditroot + '/static-resources/dist/smarteditcommons/js/smarteditcommons.js'},
				{src: configurations.smarteditroot + '/static-resources/dist/smartedit/js/smartedit.js'}
			]
		} as SmarteditBundle;

		return this._getValidApplications(orderedApplications).then((validApplications: Module[]) => {
			resources.js = resources.js.concat(validApplications.map((app) => {
				const source = {src: app.location};
				return source;
			}));
			resources.js.push({src: configurations.smarteditroot + '/static-resources/dist/smartedit/js/smarteditbootstrap.js'});
			resources.properties.applications = validApplications.map((app) => app.name);

			this.smarteditBootstrapGateway.publish("bundle", {resources});
		});

	}

	private _getLegacyContainerModule() {
		/* forbiddenNameSpaces angular.module:false */
		return angular.module('smarteditcontainer');
	}

	private _getConstants(configurations: ConfigurationObject): TypedMap<string> {
		return {
			domain: configurations.domain as string,
			smarteditroot: configurations.smarteditroot as string,
			[GatewayFactory.WHITE_LISTED_STOREFRONTS_CONFIGURATION_KEY]: configurations[GatewayFactory.WHITE_LISTED_STOREFRONTS_CONFIGURATION_KEY] as string
		};

	}
	/**
	 * Applications are considered valid if they can be retrieved over the wire
	 */
	private _getValidApplications(applications: Module[]): angular.IPromise<Module[]> {
		return this.$q.all(applications.map((application) => {
			const deferred = this.$q.defer();
			this.$http.get(application.location).then(() => {
				deferred.resolve(application);
			}, (e) => {
				this.$log.error(`Failed to load application '${application.name}' from location ${application.location}; SmartEdit functionality may be compromised.`);
				deferred.resolve();
			});
			return deferred.promise;
		})).then((validApplications: any) => {
			return this.lodash.merge(this.lodash.compact(validApplications));
		});
	}

}
