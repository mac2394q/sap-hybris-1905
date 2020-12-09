/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('OthersMockModule', ['ngMockE2E'])
    .run(function($httpBackend) {
        // Pass through all other requests
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    });

try {
    angular.module('smarteditloader').requires.push('OthersMockModule');
    angular.module('smarteditcontainer').requires.push('OthersMockModule');
} catch (ex) {}
