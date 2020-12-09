/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('BackendMockModule', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .run(function($httpBackend, languageService, I18N_RESOURCE_URI, I18N_LANGUAGES_RESOURCE_URI) {

        $httpBackend.whenGET(I18N_LANGUAGES_RESOURCE_URI).respond({
            languages: [{
                "isoCode": "en",
                "name": "English"
            }, {
                "isoCode": "fr",
                "name": "French"
            }]
        });

        $httpBackend.whenGET(/ctxTemplate.html/).respond('<dummy></dummy');

        $httpBackend.whenGET(/^\w+.*/).passThrough();
    });
