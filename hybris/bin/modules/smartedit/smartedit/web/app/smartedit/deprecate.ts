/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

/**
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditServicesModule
 *
 * IMPORANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1811
 */
/* forbiddenNameSpaces angular.module:false */
const deprecatedSince1811 = () => {
	angular.module('permissionServiceModule', ['smarteditServicesModule']);
};

export function deprecatedSince1905() {
	angular.module('alertServiceModule', ['smarteditServicesModule']);
	angular.module('decoratorServiceModule', ['smarteditServicesModule']);
}

export const deprecate = () => {
	deprecatedSince1811();
	deprecatedSince1905();
};