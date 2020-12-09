/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('InnerMocks', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
    .run(function($httpBackend, languageService, I18N_RESOURCE_URI) {

        $httpBackend
            .whenGET(I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale())
            .respond({});

    });
