/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('innerapp', ['ui.bootstrap', 'toolbarModule'])
    .run(function(gatewayFactory) {
        gatewayFactory.initListener();
    })
    .controller('defaultController', function($scope, $q, toolbarServiceFactory) {
        var toolbarService = toolbarServiceFactory.getToolbarService('toolbar');
        $scope.sendActions = function() {
            toolbarService.addItems([{
                key: 'toolbar.action.action3',
                type: 'ACTION',
                nameI18nKey: 'toolbar.action.action3',
                callback: function() {
                    $scope.message = 'Action 3 called';
                },
                icons: ['icon3.png']
            }, {
                key: 'toolbar.action.action4',
                type: 'ACTION',
                nameI18nKey: 'toolbar.action.action4',
                callback: function() {
                    $scope.message = 'Action 4 called';
                },
                icons: ['icon4.png']
            }]);
        };

        $scope.removeAction = function() {
            toolbarService.removeItemByKey('toolbar.action.action4');
        };
    });
