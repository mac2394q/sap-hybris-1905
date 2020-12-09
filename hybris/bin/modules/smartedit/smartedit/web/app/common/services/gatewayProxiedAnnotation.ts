/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {annotationService} from './annotationService';
import {GatewayProxy} from './gateway';
import {diNameUtils} from 'smarteditcommons/di';

const GatewayProxiedName = 'GatewayProxied';

export const GatewayProxied = annotationService.getClassAnnotationFactory(GatewayProxiedName) as (...args: string[]) => ClassDecorator;

export function GatewayProxiedAnnotationFactory(gatewayProxy: GatewayProxy) {
	'ngInject';
	return annotationService.setClassAnnotationFactory(GatewayProxiedName, function(factoryArguments?: string[]) {

		return function(instance: any, originalConstructor: (...x: any[]) => any, invocationArguments: any[]) {

			originalConstructor.call(instance, ...invocationArguments);

			instance.gatewayId = diNameUtils.buildServiceName(originalConstructor);

			gatewayProxy.initForService(instance, factoryArguments.length > 0 ? factoryArguments : null);

		};
	});
}
