/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('e2ePermissionsMocks', ['ngMockE2E'])
    .run(
        function($httpBackend) {
            $httpBackend.whenGET(/permissionswebservices\/v1\/permissions\/principals/).respond({
                "id": "global",
                "permissions": [{
                    "key": "smartedit.configurationcenter.read",
                    "value": "true"
                }]
            });
        });
