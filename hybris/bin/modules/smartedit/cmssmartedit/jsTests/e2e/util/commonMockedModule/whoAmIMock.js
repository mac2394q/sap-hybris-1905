/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('WhoAmIMockModule', ['ngMockE2E', 'resourceLocationsModule', 'functionsModule'])
    .constant('ADMIN_AUTH_TOKEN', {
        access_token: 'admin-access-token',
        token_type: 'bearer'
    })
    .constant('CMSMANAGER_AUTH_TOKEN', {
        access_token: 'cmsmanager-access-token',
        token_type: 'bearer'
    })
    .constant('ADMIN_WHOAMI_DATA', {
        displayName: "Administrator",
        uid: "admin"
    })
    .constant('CMSMANAGER_WHOAMI_DATA', {
        displayName: "CMS Manager",
        uid: "cmsmanager"
    })
    .run(function($httpBackend, ADMIN_AUTH_TOKEN, CMSMANAGER_AUTH_TOKEN, ADMIN_WHOAMI_DATA, CMSMANAGER_WHOAMI_DATA) {

        $httpBackend.whenGET(/authorizationserver\/oauth\/whoami/).respond(function(method, url, data, headers) {
            return [200, (headers.Authorization === "bearer " + ADMIN_AUTH_TOKEN.access_token) ? ADMIN_WHOAMI_DATA : CMSMANAGER_WHOAMI_DATA];
        });

        $httpBackend.whenGET(/cmswebservices\/v1\/users\/*/).respond(function(method, url) {
            var userUid = url.substring(url.lastIndexOf("/") + 1);

            return [200, {
                uid: userUid,
                readableLanguages: ["en", "it", "fr", "pl", 'hi', "de"],
                writeableLanguages: ["en", "it", "fr", "pl", 'hi', "de"]
            }];
        });

    });

try {
    angular.module('smarteditloader').requires.push('WhoAmIMockModule');
    angular.module('smarteditcontainer').requires.push('WhoAmIMockModule');
} catch (ex) {}
