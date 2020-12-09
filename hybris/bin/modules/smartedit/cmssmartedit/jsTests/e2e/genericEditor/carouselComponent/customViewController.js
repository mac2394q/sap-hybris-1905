/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular.module('customViewModule', ['cmsSmarteditServicesModule', 'backendMocksUtilsModule'])
    .constant('PATH_TO_CUSTOM_VIEW', 'genericEditor/carouselComponent/customView.html')
    .controller('customViewController', function(editorModalService, backendMocksUtils) {

        var carouselComponent = null;

        var saveOrUpdateComponent = function(method, url, data, headers) {
            var payload = JSON.parse(data);
            payload.uid = 'carouselComponent_1';
            carouselComponent = payload;
            carouselComponent.onlyOneRestrictionMustApply = false;
            carouselComponent.restrictions = [];

            return [201];
        };

        backendMocksUtils.getBackendMock('componentPUTMock').respond(saveOrUpdateComponent);
        backendMocksUtils.getBackendMock('componentPOSTMock').respond(saveOrUpdateComponent);


        var componentGETMock = backendMocksUtils.getBackendMock('componentGETMock');
        componentGETMock.respond(function(method, url, data, headers) {
            var uid = /items\/(.*)/.exec(url)[1];

            if (uid !== carouselComponent.uid) {
                return [400];
            } else {
                return [200, carouselComponent];
            }
        });

        // Information about the component in the generic editor. 
        this.componentConfiguration = {
            componentType: "ProductCarouselComponent",
            componentId: null
        };

        this.openEditor = function() {
            var componentId = (carouselComponent) ? carouselComponent.uid : null;
            var componentAttributes = {
                smarteditComponentType: this.componentConfiguration.componentType,
                smarteditComponentUuid: componentId,
                catalogVersionUuid: 'somecatalogId/someCatalogVersion'
            };
            editorModalService.open(componentAttributes);
        };
    });

try {
    angular.module('smarteditcontainer').requires.push('customViewModule');
} catch (e) {}
