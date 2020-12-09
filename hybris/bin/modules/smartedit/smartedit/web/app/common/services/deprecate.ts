/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';

/**
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditCommonsModule
 * 
 * IMPORTANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1808
 */
/* @internal */
const deprecatedSince1808 = () => {
	angular.module('eventServiceModule', ['legacySmarteditCommonsModule']);
	angular.module('crossFrameEventServiceModule', ['legacySmarteditCommonsModule']);
	angular.module('languageServiceModule', ['legacySmarteditCommonsModule']);
	angular.module('catalogServiceModule', ['legacySmarteditCommonsModule']);
	angular.module('gatewayFactoryModule', ['smarteditRootModule']);
	angular.module('gatewayProxyModule', ['smarteditRootModule']);
	angular.module('operationContextServiceModule', ['smarteditRootModule']);
	angular.module('compileHtmlModule', ['legacySmarteditCommonsModule']);
	angular.module('yMoreTextModule', ['legacySmarteditCommonsModule']);
};

/*
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditCommonsModule
 *
 * IMPORTANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1811
 */
/* @internal */
export function deprecatedSince1811() {
	angular.module('permissionServiceInterfaceModule', ['legacySmarteditCommonsModule']);
	angular.module('FetchDataHandlerInterfaceModule', ['genericEditorServicesModule']);
	angular.module('fetchEnumDataHandlerModule', ['genericEditorServicesModule']);
	angular.module('dateFormatterModule', ['dateTimePickerModule']);
	angular.module('DropdownPopulatorInterface', ['dropdownPopulatorModule']);
	angular.module('optionsDropdownPopulatorModule', ['dropdownPopulatorModule']);
	angular.module('uriDropdownPopulatorModule', ['dropdownPopulatorModule']);
	angular.module('editorFieldMappingServiceModule', ['genericEditorServicesModule']);
	angular.module('genericEditorStackServiceModule', ['genericEditorServicesModule']);
	angular.module('genericEditorTabServiceModule', ['genericEditorServicesModule']);
	angular.module('seValidationMessageParserModule', ['genericEditorServicesModule']);
	angular.module('seGenericEditorFieldMessagesModule', ['genericEditorModule']);
	angular.module('genericEditorTabModule', ['genericEditorModule']);
	angular.module('genericEditorFieldModule', ['genericEditorModule']);
	angular.module('authorizationModule', ['legacySmarteditCommonsModule']);
}

export function deprecatedSince1905() {
	angular.module('smarteditCommonsModule', ['legacySmarteditCommonsModule']);
	angular.module('browserServiceModule', ['legacySmarteditCommonsModule']);
}


export const deprecate = () => {
	deprecatedSince1808();
	deprecatedSince1811();
	deprecatedSince1905();
};
