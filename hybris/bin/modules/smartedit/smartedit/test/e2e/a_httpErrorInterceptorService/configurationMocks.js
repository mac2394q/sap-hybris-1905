/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('OuterMocksModule', [
        'ngMockE2E',
        'resourceLocationsModule',
        'smarteditServicesModule'
    ])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .value('CONFIGURATION_MOCK', [{
        "value": "[\"*\"]",
        "key": "whiteListedStorefronts"
    }, {
        'value': '{"smartEditContainerLocation":"/test/e2e/utils/commonMockedModules/goToCustomView.js"}',
        'key': 'applications.goToCustomView'
    }, {
        'value': '{"smartEditContainerLocation":"/test/e2e/a_httpErrorInterceptorService/customViewController.js"}',
        'key': 'applications.customViewModule'
    }, {
        'value': '{"smartEditContainerLocation":"/test/e2e/a_httpErrorInterceptorService/backendMocks.js"}',
        'key': 'applications.httpErrorInterceptorMocksModule'
    }]);

try {
    angular.module('smarteditloader').requires.push('OuterMocksModule');
    angular.module('smarteditcontainer').requires.push('OuterMocksModule');
} catch (exception) {
    console.error('OuterMocksModule - Failed to add OuterMocksModule as a dependency', exception);
}
