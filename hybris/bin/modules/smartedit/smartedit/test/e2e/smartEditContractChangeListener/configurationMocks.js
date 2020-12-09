/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('OuterMocksModule', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])

    .constant('SMARTEDIT_ROOT', 'web/webroot')

    .value('CONFIGURATION_MOCK', [{
        "value": "\"thepreviewTicketURI\"",
        "key": "previewTicketURI"
    }, {
        "value": "{\"smartEditLocation\":\"/test/e2e/smartEditContractChangeListener/innerMocksforContextualMenu.js\"}",
        "key": "applications.BackendMockModule"
    }, {
        "value": "{\"smartEditLocation\":\"/smartedit-build/test/e2e/smartedit/clickThroughOverlay.js\"}",
        "key": "applications.clickThroughOverlayModule"
    }, {
        "value": "{\"smartEditLocation\":\"/test/e2e/smartEditContractChangeListener/generated_innerSECCLDecorators.js\"}",
        "key": "applications.innerSECCLDecorators"
    }, {
        "value": "\"somepath\"",
        "key": "i18nAPIRoot"
    }, {
        "value": "[\"*\"]",
        "key": "whiteListedStorefronts"
    }]);

try {
    angular.module('smarteditloader').requires.push('OuterMocksModule');
    angular.module('smarteditcontainer').requires.push('OuterMocksModule');
} catch (ex) {}
