/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useClass:false */
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {
	diBridgeUtils,
	moduleUtils,
	BootstrapPayload,
	IUrlService,
	SeTranslationModule,
	SmarteditCommonsModule,
	SmarteditErrorHandler
} from 'smarteditcommons';
import {SmarteditElementComponent} from './services/sakExecutor/SmarteditElementComponent';
import {SmarteditComponent} from './components/SmarteditComponent';
import {TranslationsFetchService} from './services/TranslationsFetchServiceInner';
import {DecoratorService, LegacyDecoratorToCustomElementConverter, StorageService, UrlService} from 'smartedit/services';
import {SakExecutorService} from 'smartedit/services/sakExecutor/SakExecutorService';

export const SmarteditFactory = (payload: BootstrapPayload): any => {
	@NgModule({
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
		imports: [
			BrowserModule,
			UpgradeModule,
			SmarteditCommonsModule,
			SeTranslationModule.forRoot(TranslationsFetchService, StorageService),
			...payload.modules,

			/* TODO: create a function and dynamic add of extensions NgModule(s) */
		],
		declarations: [
			SmarteditComponent,
			SmarteditElementComponent
		],
		entryComponents: [
			SmarteditComponent,
			SmarteditElementComponent
		],
		providers: [
			{
				provide: ErrorHandler,
				useClass: SmarteditErrorHandler,
			},
			LegacyDecoratorToCustomElementConverter,
			{
				provide: DecoratorService.TOKEN,
				useClass: DecoratorService
			},
			,
			SakExecutorService,
			StorageService,
			{
				provide: IUrlService.TOKEN,
				useClass: UrlService
			},
			moduleUtils.provideValues(payload.constants),
			// temporary upgrades
			diBridgeUtils.upgradeProvider('EVENT_PERSPECTIVE_CHANGED'),
			diBridgeUtils.upgradeProvider('EVENT_PERSPECTIVE_REFRESHED'),
			diBridgeUtils.upgradeProvider('EVENT_SMARTEDIT_COMPONENT_UPDATED'),
			diBridgeUtils.upgradeProvider('SMARTEDIT_DRAG_AND_DROP_EVENTS'),
			diBridgeUtils.upgradeProvider('polyfillService')
		],
		bootstrap: [SmarteditComponent]
	})
	class Smartedit {}
	return Smartedit;
};
/* forbiddenNameSpaces window._:false */
window.__smartedit__.SmarteditFactory = SmarteditFactory;
