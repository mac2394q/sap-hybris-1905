/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */

import '../../../../web/app/vendor/polyfills';
import '../../../../web/app/vendor/thirdparties';
import {Component, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {commonNgZone, diBridgeUtils, moduleUtils, GatewayFactory, LogService, SmarteditCommonsModule} from 'smarteditcommons';

@Component({selector: 'empty', template: "<div>This page doesn't exist</div>"})
export class InvalidRouteComponent {}

const customAppAttribute = "custom-app";

/*
 * Utility method to bootstrap a small hybrid app
 * made of the Angular SmarteditCommonsModule and the Angular JS
 * module found under a custom-app DOM attribute
 * it triggers automatically if such attribute is found
 */
export function legacyCustomAppBootstrap(): void {

	const providers = [
		moduleUtils.initialize((gatewayFactory: GatewayFactory) => {
			diBridgeUtils.downgradeService("translateService", TranslateService);
			gatewayFactory.initListener();
		}, [GatewayFactory])
	];

	const urlService = (window as any).__smartedit__.downgradedService.urlService;
	if (urlService) {
		providers.unshift({provide: 'urlService', useClass: urlService});
	}

	const storageService = (window as any).__smartedit__.downgradedService.storageService;
	if (storageService) {
		providers.unshift(storageService);
	}
	@NgModule({
		imports: [
			BrowserModule,
			UpgradeModule,
			SmarteditCommonsModule,
			TranslateModule.forRoot(),
			RouterModule.forRoot([
				{
					path: 'ng',
					component: InvalidRouteComponent
				}
			], {useHash: true, initialNavigation: true})
		],
		declarations: [InvalidRouteComponent],
		providers
	})
	class WrapperModule {

		constructor(private upgrade: UpgradeModule) {
		}

		ngDoBootstrap() {
			const customAppNode = document.querySelector(`[${customAppAttribute}]`);
			const appName = customAppNode.getAttribute(customAppAttribute);
			this.upgrade.bootstrap(customAppNode, [appName], {strictDi: false});
		}
	}
	window.smarteditJQuery(document).ready(() => {
		if (document.querySelector(`[${customAppAttribute}]`)) {
			platformBrowserDynamic().bootstrapModule(WrapperModule, {ngZone: commonNgZone}).catch((error: any) => {
				new LogService().error(error);
			});
		}
	});
}
legacyCustomAppBootstrap();