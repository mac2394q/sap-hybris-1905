/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeComponentConstructor} from './types';
import {diBridgeUtils} from './DIBridgeUtils';
import {functionsUtils} from '../utils/FunctionsUtils';

/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeDowngradeComponent
 *
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to require an Angular component to be downgraded
 */

export const SeDowngradeComponent = function() {

	return function <T extends SeComponentConstructor>(componentConstructor: T) {

		/* forbiddenNameSpaces window._:false */
		const definition = window.__smartedit__.getDecoratorPayload("Component", componentConstructor);

		if (!definition) {
			const componentName = functionsUtils.getConstructorName(componentConstructor);
			throw new Error(`@SeDowngradeComponent ${componentName} should only be used on a @Component decorated class`);
		}

		diBridgeUtils.downgradeComponent(definition, componentConstructor);

		return componentConstructor;

	};
};
