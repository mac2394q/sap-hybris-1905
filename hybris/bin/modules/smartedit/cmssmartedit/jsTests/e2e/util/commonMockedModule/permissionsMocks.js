/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular
    .module('permissionsMocks', ['ngMockE2E'])
    .run(
        function($httpBackend, backendMocksUtils) {
            $httpBackend.whenGET(/permissionswebservices\/v1\/permissions\/principals\/.+\/global.*/).respond(function() {
                return [200, {
                    "id": "global",
                    "permissions": [{
                        "key": "smartedit.configurationcenter.read",
                        "value": "true"
                    }]
                }];
            });

            $httpBackend.whenGET(/permissionswebservices\/v1\/permissions\/principals\/.+\/catalogs\?catalogId=.*&catalogVersion=Staged/).respond(function() {
                var defaultSyncPermissions = {
                    "canSynchronize": true,
                    "targetCatalogVersion": "Online"
                };
                var syncPermissions = JSON.parse(sessionStorage.getItem("syncPermissions")) || defaultSyncPermissions;

                return [200, {
                    "permissionsList": [{
                        "catalogId": "some.catalog.id",
                        "catalogVersion": "Staged",
                        "permissions": [{
                            "key": "read",
                            "value": "true"
                        }, {
                            "key": "write",
                            "value": "true"
                        }],
                        "syncPermissions": [syncPermissions]
                    }]
                }];
            });

            $httpBackend.whenGET(/permissionswebservices\/v1\/permissions\/principals\/.+\/catalogs\?catalogId=.*&catalogVersion=Online/).respond(function() {
                return [200, {
                    "permissionsList": [{
                        "catalogId": "some.catalog.id",
                        "catalogVersion": "Online",
                        "permissions": [{
                            "key": "read",
                            "value": "true"
                        }, {
                            "key": "write",
                            "value": "true"
                        }],
                        "syncPermissions": [{}]
                    }]
                }];
            });

            var attributesPermissionsGET = $httpBackend.whenGET(/permissionswebservices\/v1\/permissions\/principals\/(.*)\/attributes\?attributes=(.*)&permissionNames=change,read/).respond(function() {
                return [200, {
                    "permissionsList": []
                }];
            });

            backendMocksUtils.storeBackendMock('attributesPermissionsGET', attributesPermissionsGET);
        });
try {
    angular.module('smarteditloader').requires.push('permissionsMocks');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('permissionsMocks');
} catch (e) {}
