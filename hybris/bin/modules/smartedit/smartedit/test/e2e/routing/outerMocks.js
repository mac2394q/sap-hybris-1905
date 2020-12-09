/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
(function() {
    angular
        .module('e2eBackendMocks', ['ngMockE2E', 'resourceLocationsModule', 'smarteditServicesModule'])
        .constant('SMARTEDIT_ROOT', 'web/webroot')
        .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
        .constant('STOREFRONT_URI', 'http://127.0.0.1:9000/test/e2e/routing/smarteditiframe.html')
        .run(function($httpBackend, languageService, $location, I18N_RESOURCE_URI) {
            var map = [{
                "value": "\"thepreviewTicketURI\"",
                "key": "previewTicketURI"
            }, {
                "value": "{\"smartEditLocation\":\"/test/e2e/routing/generated_innerDecorators.js\"}",
                "key": "applications.CMSApp"
            }, {
                "value": "{\"smartEditContainerLocation\":\"/test/e2e/routing/generated_outerapp.js\"}",
                "key": "applications.outerapp"
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

            $httpBackend.whenGET(I18N_RESOURCE_URI + "/" + languageService.getBrowserLocale()).respond({});


            var allSites = [{
                previewUrl: '/test/e2e/routing/smarteditiframe.html',
                name: {
                    en: "Electronics"
                },
                redirectUrl: 'redirecturlElectronics',
                uid: 'electronics',
                contentCatalogs: ['electronicsContentCatalog']
            }, {
                previewUrl: '/test/e2e/routing/smarteditiframe.html',
                name: {
                    en: "Apparels"
                },
                redirectUrl: 'redirecturlApparels',
                uid: 'apparel-uk',
                contentCatalogs: ['apparel-ukContentCatalog']
            }];

            $httpBackend.whenGET(/cmswebservices\/sites$/).respond({
                sites: allSites
            });

            $httpBackend.whenGET(/generated\_/).passThrough();
        });

    angular.module('smarteditloader').requires.push('e2eBackendMocks');
    angular.module('smarteditcontainer').requires.push('e2eBackendMocks');
})();
