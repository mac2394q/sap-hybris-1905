/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {diBridgeUtils} from 'smarteditcommons/di';
import {IStorageService} from 'smarteditcommons/services';
import {BrowserService} from 'smarteditcommons/services/browser/BrowserService';
import {moduleUtils} from 'smarteditcommons/utils';
import {SmarteditCommonsModule} from '../../../SmarteditCommonsModule';
import {ITranslationsFetchService, ITranslationsFetchServiceTOKEN} from './ITranslationsFetchService';
import {SeTranslateHttpLoader} from './SeTranslateHttpLoader';
import {I18NMAP_TOKEN, TranslationsInterceptor} from './TranslationsInterceptor';


@NgModule({
	imports: [
		// contains init of @Gatewayproxied by means of GatewayProxiedAnnotationFactory
		// TODO: ultimately GatewayProxiedAnnotationFactory must be pushed to migrated SmarteditRootModule
		SmarteditCommonsModule,
		TranslateModule.forRoot({
			isolate: false,
			loader: {
				provide: TranslateLoader,
				useClass: SeTranslateHttpLoader
			}
		}),

	],
	exports: [
		TranslateModule
	]
})
export class SeTranslationModule {

	static forChild() {
		return TranslateModule.forChild({
			isolate: false,
			loader: {
				provide: TranslateLoader,
				useClass: SeTranslateHttpLoader
			}
		});
	}

	/* @internal */
	static forRoot(TranslationsFetchServiceClass: new (...args: any[]) => ITranslationsFetchService, StorageServiceClass: new (...args: any[]) => IStorageService): ModuleWithProviders {
		return {
			ngModule: SeTranslationModule,
			providers: [
				{
					provide: I18NMAP_TOKEN,
					useValue: window.__smartedit__.i18nMocks || {}
				},
				{
					provide: ITranslationsFetchServiceTOKEN,
					useClass: TranslationsFetchServiceClass
				},
				{
					provide: HTTP_INTERCEPTORS,
					useClass: TranslationsInterceptor,
					multi: true,
				},
				moduleUtils.initialize((translate: TranslateService, storageService: IStorageService, browserService: BrowserService) => {

					// to be used in non migrated languageService for language switch
					diBridgeUtils.downgradeService("translateService", TranslateService);

					storageService.getValueFromLocalStorage('SELECTED_LANGUAGE', false).then((lang: {name: string, isoCode: string}) => {
						return lang ? lang.isoCode : browserService.getBrowserLocale();
					}, () => {
						return browserService.getBrowserLocale();
					}).then((lang: string) => {
						translate.setDefaultLang(lang);
						translate.use(lang);
					});

				}, [TranslateService, StorageServiceClass, BrowserService])
			],

		};
	}
}