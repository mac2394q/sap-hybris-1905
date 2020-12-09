/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module("itemPrinterModule", [])
    .component('itemPrinter', {
        transclude: false,
        replace: false,
        template: '<div class="se-item-printer" ng-include="printer.templateUrl"></div>',
        require: {
            ySelect: '^ySelect'
        },
        controller: ['$scope', function($scope) {
            $scope.selected = true;
            this.$onChanges = function() {
                /* needs to bind it scope and not controller in order for the templates required by API
                 * to be agnostic of whether they are invoked within ui-select-coices or ui-select-match of ui-select
                 */
                $scope.item = this.model;
                $scope.ySelect = this.ySelect;
            };
        }],
        controllerAs: 'printer',
        bindings: {
            templateUrl: "<",
            model: "<"
        }
    });
