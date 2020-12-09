/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('AuthorizationMockModule', ['ngMockE2E', 'resourceLocationsModule', 'functionsModule'])
    .constant('ADMIN_AUTH_TOKEN', {
        access_token: 'admin-access-token',
        token_type: 'bearer'
    })
    .constant('CMSMANAGER_AUTH_TOKEN', {
        access_token: 'cmsmanager-access-token',
        token_type: 'bearer'
    })
    .run(function($httpBackend, resourceLocationToRegex, parseQuery, DEFAULT_AUTHENTICATION_ENTRY_POINT, ADMIN_AUTH_TOKEN, CMSMANAGER_AUTH_TOKEN) {

        $httpBackend.whenPOST(resourceLocationToRegex(DEFAULT_AUTHENTICATION_ENTRY_POINT)).respond(function(method, url, data) {
            data = parseQuery(data);
            if (data.client_id === 'smartedit' && data.client_secret === undefined && data.grant_type === 'password' && data.username === 'admin' && data.password === '1234') {
                return [200, ADMIN_AUTH_TOKEN];
            } else if (data.client_id === 'smartedit' && data.client_secret === undefined && data.grant_type === 'password' && data.username === 'cmsmanager' && data.password === '1234') {
                return [200, CMSMANAGER_AUTH_TOKEN];
            } else {
                return [401];
            }
        });

    });

try {
    angular.module('smarteditloader').requires.push('AuthorizationMockModule');
    angular.module('smarteditcontainer').requires.push('AuthorizationMockModule');
} catch (ex) {}
