/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('e2eBackendMocks', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
    .run(function($httpBackend, languageService, I18N_RESOURCE_URI) {

        var map = [{
            "value": "\"thepreviewTicketURI\"",
            "key": "previewTicketURI"
        }, {
            "value": "{\"smartEditLocation\":\"/test/e2e/slotContextualMenu/innerMocksForSlotContextualMenu.js\"}",
            "key": "applications.BackendMockModule"
        }, {
            "value": "{\"smartEditLocation\":\"/test/e2e/slotContextualMenu/generated_innerSlotDecorators.js\"}",
            "key": "applications.innerSlotDecorators"
        }, {
            "value": "\"somepath\"",
            "key": "i18nAPIRoot"
        }, {
            "value": "[\"*\"]",
            "key": "whiteListedStorefronts"
        }];

        $httpBackend.whenGET(/configuration/).respond(
            function() {
                return [200, map];
            });

        $httpBackend.whenGET(/cmswebservices\/v1\/sites\/.*\/languages/).respond({
            languages: [{
                nativeName: 'English',
                isocode: 'en',
                name: 'English',
                required: true
            }]
        });
        $httpBackend
            .whenGET(I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale())
            .respond({});

    });
angular.module('smarteditloader').requires.push('e2eBackendMocks');
angular.module('smarteditcontainer').requires.push('e2eBackendMocks');
