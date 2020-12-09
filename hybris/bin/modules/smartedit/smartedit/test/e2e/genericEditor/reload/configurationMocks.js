/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('OuterMocksModule', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .value('CONFIGURATION_MOCK', [{
        "value": "\"thepreviewTicketURI\"",
        "key": "previewTicketURI"
    }, {
        "value": "\"somepath\"",
        "key": "i18nAPIRoot"
    }, {
        "value": "{\"smartEditContainerLocation\":\"/test/e2e/utils/commonMockedModules/goToCustomView.js\"}",
        "key": "applications.goToCustomView"
    }, {
        "value": "{\"smartEditContainerLocation\":\"/test/e2e/utils/commonMockedModules/setApparelStagedUKExperience.js\"}",
        "key": "applications.setApparelStagedUKExperience"
    }, {
        "value": "{\"smartEditContainerLocation\":\"/test/e2e/genericEditor/reload/customViewController.js\"}",
        "key": "applications.customViewModule"
    }, {
        "value": "{\"smartEditContainerLocation\":\"/test/e2e/genericEditor/reload/customReloadButton/customReloadButton.js\"}",
        "key": "applications.customReloadButtonModule"
    }]);

try {
    angular.module('smarteditloader').requires.push('OuterMocksModule');
    angular.module('smarteditcontainer').requires.push('OuterMocksModule');
} catch (ex) {}
