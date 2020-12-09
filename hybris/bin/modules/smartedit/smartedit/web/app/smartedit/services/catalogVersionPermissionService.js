/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('catalogVersionPermissionModule', [
        'smarteditServicesModule',
        'functionsModule',
        'catalogVersionPermissionServiceInterfaceModule'
    ])
    .service('catalogVersionPermissionService', function(gatewayProxy, extend, CatalogVersionPermissionServiceInterface) {

        var CatalogVersionPermissionService = function(gatewayId) {
            this.gatewayId = gatewayId;
            gatewayProxy.initForService(this);
        };

        CatalogVersionPermissionService = extend(CatalogVersionPermissionServiceInterface, CatalogVersionPermissionService);

        return new CatalogVersionPermissionService("CatalogVersionPermissionServiceId");
    });
