/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {FunctionsModule, GenericEditorModule, SeModule, TranslationServiceModule} from 'smarteditcommons';

/**
 * @ngdoc overview
 * @name administration
 *
 * @description
 * # The administration module
 *
 * The administration module provides services to display and manage configurations
 * that point to web service and the value property contains the URI of the web service or data.
 *
 */
/** @internal */
@SeModule({
	imports: [
		FunctionsModule,
		TranslationServiceModule,
		'ngResource',
		'loadConfigModule',
		'modalServiceModule',
		'confirmationModalServiceModule',
		GenericEditorModule,
		'seProductCatalogVersionsSelectorModule'
	],
	initialize: (editorFieldMappingService: any) => {
		'ngInject';

		editorFieldMappingService.addFieldMapping('ProductCatalogVersionsSelector', null, null, {
			template: 'productCatalogVersionsSelectorWrapperTemplate.html'
		});
	}
})
export class AdministrationModule {}