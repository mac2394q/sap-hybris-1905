/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module("i18nMockModule", ["ngMockE2E", "resourceLocationsModule", "smarteditServicesModule"])
    .run(function($httpBackend, I18N_RESOURCE_URI, languageService) {

        $httpBackend.whenGET(I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale()).respond(function() {

            return [200, window.__smartedit__.i18nMocks[languageService.getBrowserLocale()]];
        });
    });

try {
    angular.module("smarteditloader").requires.push("i18nMockModule");
} catch (ex) {}
try {
    angular.module("smarteditcontainer").requires.push("i18nMockModule");
} catch (ex) {}
