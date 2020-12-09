/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */

angular.module('componentTypeModule', ['cmsSmarteditServicesModule'])
    .controller('componentTypeController', function() {

        this.$onInit = function() {};

    })
    .component('componentType', {
        templateUrl: 'componentTypeTemplate.html',
        controller: 'componentTypeController',
        bindings: {
            typeInfo: '<'
        }
    });
