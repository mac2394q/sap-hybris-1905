/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {DIBridgeModule, SeModule} from 'smarteditcommons/di';
import {OperationContextService} from './httpErrorInterceptor/default/retryInterceptor/OperationContextService';
import {OperationContextAnnotationFactory} from './httpErrorInterceptor/default/retryInterceptor/operationContextAnnotation';
import {SeConstantsModule} from './SeConstantsModule';

/**
 * @name smarteditRootModule
 *
 * @description
 * Module acts as a root module of smartedit commons module.
 */
@SeModule({
	imports: [
		DIBridgeModule,
		'resourceLocationsModule',
		'functionsModule',
		'yjqueryModule',
		'yLoDashModule',
		SeConstantsModule
	],
	providers: [
		OperationContextService,
		OperationContextAnnotationFactory
	],
	initialize: (operationContextAnnotationFactory: any) => {
		'ngInject';
	}
})
/** @internal */
export class SmarteditRootModule {}
