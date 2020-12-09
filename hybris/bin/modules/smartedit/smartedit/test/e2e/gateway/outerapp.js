/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('outerapp', ['smarteditRootModule', 'templateCacheDecoratorModule', 'ui.bootstrap'])
    .constant('SMARTEDIT_ROOT', 'web/webroot')
    .constant('SMARTEDIT_RESOURCE_URI_REGEXP', /^(.*)\/test\/e2e/)
    .controller('defaultController', function($scope, $q, gatewayFactory, systemEventService, windowUtils) {

        var gateway1 = gatewayFactory.createGateway('Gateway1');
        var gateway2 = gatewayFactory.createGateway('Gateway2');

        $scope.notifyIframeOnGateway1 = function() {
            this.notifyIframe(gateway1);
        };

        $scope.notifyIframeOnGateway2 = function() {
            this.notifyIframe(gateway2);
        };

        $scope.notifyIframe = function(gateway) {
            gateway.publish("display1", {
                message: 'hello Iframe ! (from parent)'
            }).then(function(returnValue) {
                $scope.acknowledged = "(iframe acknowledged my message and sent back:" + returnValue + ")";
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.acknowledged;
                }, 3000);
            }, function() {
                $scope.acknowledged = "(iframe did not acknowledge my message)";
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.acknowledged;
                }, 3000);
            });
        };

        gateway1.subscribe("display2", function(eventId, data) {
            var deferred = $q.defer();
            $scope.message = data.message;
            windowUtils.runTimeoutOutsideAngular(function() {
                delete $scope.message;
            }, 3000);
            deferred.resolve("hello to you iframe");
            return deferred.promise;
        });

    });
