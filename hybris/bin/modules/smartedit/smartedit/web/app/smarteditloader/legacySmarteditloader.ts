/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {doImport} from './forcedImports';
doImport();

import * as angular from 'angular';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BootstrapService, SmarteditServicesModule} from 'smarteditcontainer/services';
import {commonNgZone, BootstrapPayload, Cloneable, SeModule, SETTINGS_URI, SMARTEDITCONTAINER_COMPONENT_NAME, SMARTEDITLOADER_COMPONENT_NAME, TypedMap} from 'smarteditcommons';
import {ConfigurationObject} from 'smarteditcontainer/services/bootstrap/Configuration';
import {SmarteditContainerFactory} from 'smarteditcontainer/smarteditcontainer';

@SeModule({
	imports: [
		SmarteditServicesModule,
		'templateCacheDecoratorModule',
		'loadConfigModule',
		'coretemplates',
		'translationServiceModule',
		'httpAuthInterceptorModule',
		'systemAlertsModule',
		'httpErrorInterceptorServiceModule',
		'unauthorizedErrorInterceptorModule',
		'resourceNotFoundErrorInterceptorModule',
		'retryInterceptorModule'
	],
	config: ($logProvider: angular.ILogProvider) => {
		'ngInject';
		$logProvider.debugEnabled(false);
	},
	providers: [
		BootstrapService
	],
	initialize: (
		loadConfigManagerService: any,
		bootstrapService: BootstrapService,
		httpErrorInterceptorService: any,
		unauthorizedErrorInterceptor: any,
		resourceNotFoundErrorInterceptor: any,
		retryInterceptor: any
	) => {
		'ngInject';
		httpErrorInterceptorService.addInterceptor(retryInterceptor);
		httpErrorInterceptorService.addInterceptor(unauthorizedErrorInterceptor);
		httpErrorInterceptorService.addInterceptor(resourceNotFoundErrorInterceptor);

		loadConfigManagerService.loadAsObject().then((configurations: ConfigurationObject) => {
			fetch(SETTINGS_URI).then((res) => res.json()).then((response: TypedMap<Cloneable>) => {
				const extensionsList: any = response.bootstrapOuterExtensions;
				if (extensionsList && extensionsList.length) {
					extensionsList.forEach((bootstrapExtension: TypedMap<string>) => {
						const extensionName = Object.keys(bootstrapExtension)[0];
						configurations[`applications.${extensionName}`] = {
							smartEditContainerLocation: bootstrapExtension[Object.keys(bootstrapExtension)[0]]
						};
					});
				}
				bootstrapSmarteditLoader(configurations);
			}).catch(() => {
				bootstrapSmarteditLoader(configurations);
			});
		});

		function bootstrapSmarteditLoader(configurations: ConfigurationObject) {
			bootstrapService.bootstrapContainerModules(configurations).then((bootstrapPayload: BootstrapPayload) => {
				const smarteditloaderNode = document.querySelector(SMARTEDITLOADER_COMPONENT_NAME);
				smarteditloaderNode.parentNode.insertBefore(document.createElement(SMARTEDITCONTAINER_COMPONENT_NAME), smarteditloaderNode);

				platformBrowserDynamic().bootstrapModule(SmarteditContainerFactory(bootstrapPayload), {ngZone: commonNgZone}).then((ref: any) => {
					//
				}).catch((err) => console.log(err));
			});
		}
	}
})
export class Smarteditloader {}