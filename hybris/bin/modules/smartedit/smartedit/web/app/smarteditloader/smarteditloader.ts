/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useClass:false */
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpClientModule} from '@angular/common/http';
import {commonNgZone, moduleUtils, nodeUtils, BootstrapPayload, SeTranslationModule, SmarteditCommonsModule, SmarteditErrorHandler, SETTINGS_URI, SMARTEDITLOADER_COMPONENT_NAME, TypedMap} from 'smarteditcommons';
import {SmarteditloaderComponent} from './SmarteditloaderComponent';
import {StorageService} from 'smarteditcontainer/services/StorageServiceOuter';
import {TranslationsFetchService} from 'smarteditcontainer/services/http/TranslationsFetchServiceOuter';
import {Module} from "../smarteditcontainer/services/bootstrap/ConfigurationModules";

export const SmarteditLoaderFactory = (modules: any[], constants: TypedMap<string>): any => {
	@NgModule({
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
		imports: [
			BrowserModule,
			HttpClientModule,
			UpgradeModule,
			SmarteditCommonsModule,
			...modules,
			SeTranslationModule.forRoot(TranslationsFetchService, StorageService),
		],
		providers: [
			moduleUtils.provideValues(constants),
			{
				provide: ErrorHandler,
				useClass: SmarteditErrorHandler,
			},
			StorageService,
			moduleUtils.initialize(() => {
				//
			})
		],
		declarations: [SmarteditloaderComponent],
		entryComponents: [SmarteditloaderComponent],
		bootstrap: [SmarteditloaderComponent]
	})
	class Smarteditloader {}
	return Smarteditloader;
};

function bootstrapExtensions() {
	fetch(SETTINGS_URI)
		.then((res) => res.json())
		.then((response: TypedMap<any>) => {
			const extensionsList = response.bootstrapOuterExtensions;
			if (extensionsList && extensionsList.length) {
				const applications: Module[] = extensionsList.map((bootstrapExtension: TypedMap<string>) => {
					return {
						location: bootstrapExtension[Object.keys(bootstrapExtension)[0]],
						name: Object.keys(bootstrapExtension)[0]
					};
				});
				moduleUtils.injectApplications('smarteditloader', applications).then((bootstrapPayload: BootstrapPayload) => {
					bootstrapSmarteditLoader(bootstrapPayload.modules, bootstrapPayload.constants);
				});
			} else {
				bootstrapSmarteditLoader([...window.__smartedit__.pushedModules]);
			}
		})
		.catch(() => {
			bootstrapSmarteditLoader([...window.__smartedit__.pushedModules]);
		});
}

function bootstrapSmarteditLoader(modules: any[], constants?: TypedMap<string>) {
	platformBrowserDynamic()
		.bootstrapModule(SmarteditLoaderFactory([...modules], constants), {ngZone: commonNgZone})
		.catch((err) => console.log(err));
}

window.smarteditJQuery(document).ready(() => {
	if (!nodeUtils.hasLegacyAngularJSBootsrap()) {
		if (!document.querySelector(SMARTEDITLOADER_COMPONENT_NAME)) {
			document.body.appendChild(document.createElement(SMARTEDITLOADER_COMPONENT_NAME));
		}
		bootstrapExtensions();
	}
});
