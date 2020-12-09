/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('backendMocks', ['ngMockE2E', 'functionsModule', 'resourceLocationsModule', 'smarteditServicesModule'])
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
    .run(function($httpBackend, filterFilter, parseQuery, I18N_RESOURCE_URI, languageService) {
        $httpBackend.when('GET', I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale()).respond({
            "test.title": "TEST TITLE",
            "test.description": "TEST DESCRIPTION"
        });

        var map = [{
            "value": "[\"*\"]",
            "key": "whiteListedStorefronts"
        }, {
            "value": "\"thepreviewTicketURI\"",
            "key": "previewTicketURI"
        }, {
            "value": "\"/cmswebservices/v1/i18n/languages\"",
            "key": "i18nAPIRoot"
        }];
        $httpBackend.whenGET(/configuration/).respond(function() {
            return [200, map];
        });

    });

angular.module('yMessageApp').requires.push('backendMocks');
