/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('customMediaMocksModule', ['backendMocksUtilsModule'])
    .run(function(backendMocksUtils) {

        backendMocksUtils.getBackendMock('componentTypesPermissionsGET').respond({
            "permissionsList": [{
                "id": "MediaContainer",
                "permissions": [{
                    "key": "read",
                    "value": "true"
                }, {
                    "key": "change",
                    "value": "true"
                }, {
                    "key": "create",
                    "value": "true"
                }, {
                    "key": "remove",
                    "value": "true"
                }]
            }, {
                "id": "MediaFormat",
                "permissions": [{
                    "key": "read",
                    "value": "true"
                }, {
                    "key": "change",
                    "value": "true"
                }, {
                    "key": "create",
                    "value": "true"
                }, {
                    "key": "remove",
                    "value": "true"
                }]
            }]
        });
    });
try {
    angular.module('smarteditloader').requires.push('customMediaMocksModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('customMediaMocksModule');
} catch (e) {}
