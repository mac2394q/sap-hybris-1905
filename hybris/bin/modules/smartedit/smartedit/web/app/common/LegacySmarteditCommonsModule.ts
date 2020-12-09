/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {deprecate} from "./services/deprecate";
import './services/forcedImport';

import {
	LanguageDropdownSelectorComponent,
	LanguageSelectorComponent,
	YEventMessageComponent,
	YInfiniteScrollingComponent,
	YMoreTextComponent
} from 'smarteditcommons/components';
import {CompileHtmlDirective} from 'smarteditcommons/directives';
import {TranslationServiceModule} from 'smarteditcommons/modules/translations/translationServiceModule';
import {FunctionsModule} from 'smarteditcommons/utils/functionsModule';
import {SeModule} from 'smarteditcommons/di';

import {
	AuthorizationService,
	ConfigModule,
	LanguageService,
	LanguageServiceGateway
} from 'smarteditcommons/services';
import {SmarteditRootModule} from 'smarteditcommons/services/SmarteditRootModule';
import {FlawInjectionInterceptorModule} from 'smarteditcommons/services/flaws/flawInjectionInterceptorModule';
import {CommonsRestServiceModule} from 'smarteditcommons/services/rest/CommonsRestServiceModule';

deprecate();

/**
 * @ngdoc overview
 * @name smarteditCommonsModule
 *
 * @description
 * Module containing all the services shared within the smartedit commons.
 */
@SeModule({
	imports: [
		SmarteditRootModule,
		CommonsRestServiceModule,
		FunctionsModule,
		FlawInjectionInterceptorModule,
		'infinite-scroll',
		'resourceLocationsModule',
		'seConstantsModule',
		'yjqueryModule',
		'yLoDashModule',
		TranslationServiceModule,
		ConfigModule,
		'ui.select',
		'ngSanitize'
	],
	providers: [
		AuthorizationService,
		LanguageServiceGateway,
		LanguageService
	],
	declarations: [
		CompileHtmlDirective,
		YInfiniteScrollingComponent,
		YEventMessageComponent,
		YMoreTextComponent,
		LanguageDropdownSelectorComponent,
		LanguageSelectorComponent
	]
})
export class LegacySmarteditCommonsModule {}