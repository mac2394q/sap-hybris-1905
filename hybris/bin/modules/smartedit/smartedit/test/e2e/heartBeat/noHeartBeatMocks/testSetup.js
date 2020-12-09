/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint undef:false */
angular.module('e2eBackendMocks', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
    .constant('HEART_BEAT_TIMEOUT_THRESHOLD_MS', 10000)
    .constant('STOREFRONT_URI', 'http://127.0.0.1:9000/test/e2e/heartBeat/noHeartBeatMocks/storefront.html')
    .value('CONFIGURATION_MOCK', [{
        "value": "\"/thepreviewTicketURI\"",
        "key": "previewTicketURI"
    }, {
        "value": "{\"/authEntryPoint1\":{\"client_id\":\"client_id_1\",\"client_secret\":\"client_secret_1\"},\"/authEntryPoint2\":{\"client_id\":\"client_id_2\",\"client_secret\":\"client_secret_2\"}}",
        "key": "authentication.credentials"
    }, {
        "value": "{\"smartEditLocation\":\"/test/e2e/logout/mocksforAuthentication.js\"}",
        "key": "applications.e2eBackendMocks"
    }, {
        "value": "{ \"api2\":\"/authEntryPoint2\"}",
        "key": "authenticationMap"
    }, {
        "value": "[\"*\"]",
        "key": "whiteListedStorefronts"
    }]);
try {
    angular.module('smarteditloader').requires.push('e2eBackendMocks');
} catch (e) {} //not longer there when smarteditcontainer is bootstrapped
try {
    angular.module('smarteditcontainer').requires.push('e2eBackendMocks');
} catch (e) {} //not there yet when smarteditloader is bootstrapped or in smartedit
