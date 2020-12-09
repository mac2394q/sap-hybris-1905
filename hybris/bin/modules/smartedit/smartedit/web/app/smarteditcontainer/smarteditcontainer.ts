/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useClass:false */
/* forbiddenNameSpaces useValue:false */
import {APP_BASE_HREF} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UrlHandlingStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {StorageService, UrlService} from './services';
import {UpgradeModule} from '@angular/upgrade/static';
import {
	diBridgeUtils,
	moduleUtils,
	BootstrapPayload,
	IUrlService,
	NG_ROUTE_PREFIX,
	PriorityService,
	SeRouteService,
	SeTranslationModule,
	SmarteditCommonsModule,
	SmarteditErrorHandler,
	StringUtils
} from 'smarteditcommons';

import {SmarteditcontainerComponent} from './components/ng/SmarteditcontainerComponent';
import {InvalidRouteComponent} from './components/ng/InvalidRouteComponent';
import {CustomHandlingStrategy} from './CustomHandlingStrategy';
import {ShortcutLinkComponent} from './components/shortcutLink/ShortcutLinkComponent';
import {SitesLinkComponent} from './components/sitesLink/SitesLinkComponent';
import {TranslationsFetchService} from 'smarteditcontainer/services/http/TranslationsFetchServiceOuter';

// https://stackoverflow.com/questions/38888008/how-can-i-use-create-dynamic-template-to-compile-dynamic-component-with-angular
export const SmarteditContainerFactory = (bootstrapPayload: BootstrapPayload): any => {
	@NgModule({
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
		imports: [
			BrowserModule,
			UpgradeModule,
			HttpClientModule,
			SeTranslationModule.forRoot(TranslationsFetchService, StorageService),
			SmarteditCommonsModule,
			...bootstrapPayload.modules,


			/* legacy router is left with '/' path for landing page
			* since landing page still lives in legacy code and cannot be upgraded.
			* but no .otherwise({redirectTo: '/'}); otherwise legacy router will kick in even for ng routes
			*/
			SeRouteService.provideNgRoute([
				{
					path: NG_ROUTE_PREFIX,
					children: [
						{
							path: '',
							pathMatch: 'full',
							component: InvalidRouteComponent
						}
					]
				},
				{
					path: '',
					pathMatch: 'full',
					component: InvalidRouteComponent
				}
			], {useHash: true, initialNavigation: true})
		],
		declarations: [
			SmarteditcontainerComponent,
			InvalidRouteComponent,
			ShortcutLinkComponent,
			SitesLinkComponent
		],
		entryComponents: [
			SmarteditcontainerComponent,
			ShortcutLinkComponent,
			SitesLinkComponent
		],
		providers: [
			{
				provide: ErrorHandler,
				useClass: SmarteditErrorHandler,
			},
			moduleUtils.provideValues(bootstrapPayload.constants),
			{provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy},
			// APP_BASE_HREF = "!" to be matching legacy angular JS setup
			{provide: APP_BASE_HREF, useValue: '!'},
			diBridgeUtils.upgradeProvider('lodash'),
			diBridgeUtils.upgradeProvider('$log'),
			diBridgeUtils.upgradeProvider('$http'),
			diBridgeUtils.upgradeProvider('$q'),
			diBridgeUtils.upgradeProvider('experienceService'),
			diBridgeUtils.upgradeProvider('LANDING_PAGE_PATH'),
			diBridgeUtils.upgradeProvider('iframeManagerService'),
			PriorityService,
			StringUtils,
			SeRouteService,
			StorageService,
			{
				provide: IUrlService.TOKEN,
				useClass: UrlService
			}
		],
		bootstrap: [SmarteditcontainerComponent]
	})
	class Smarteditcontainer {}
	return Smarteditcontainer;
};