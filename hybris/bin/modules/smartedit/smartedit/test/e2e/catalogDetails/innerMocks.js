/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('InnerMocks', ['ngMockE2E', 'resourceLocationsModule'])
    .run(function($httpBackend, languageService, I18N_RESOURCE_URI) {
        $httpBackend
            .whenGET(new RegExp(I18N_RESOURCE_URI))
            .respond({});
    });
