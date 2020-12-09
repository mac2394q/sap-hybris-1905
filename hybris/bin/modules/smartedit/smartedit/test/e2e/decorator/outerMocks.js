/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('OuterMocksModule', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
    .value('CONFIGURATION_MOCK', [{
        "value": "\"thepreviewTicketURI\"",
        "key": "previewTicketURI"
    }, {
        "value": "\"somepath\"",
        "key": "i18nAPIRoot"
    }, {
        "value": "{\"smartEditLocation\":\"/test/e2e/utils/commonMockedModules/OthersMock.js\"}",
        "key": "applications.OthersMockModule"
    }, {
        "value": "{\"smartEditLocation\":\"/test/e2e/utils/decorators/DummyDecorators.js\"}",
        "key": "applications.DummyDecoratorsModule"
    }, {
        "value": "[\"*\"]",
        "key": "whiteListedStorefronts"
    }]);

try {
    angular.module('smarteditloader').requires.push('OuterMocksModule');
    angular.module('smarteditcontainer').requires.push('OuterMocksModule');
} catch (ex) {}
