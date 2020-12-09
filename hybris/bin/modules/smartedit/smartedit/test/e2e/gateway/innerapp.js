/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('innerapp', ['smarteditRootModule', 'ui.bootstrap'])
    .controller('defaultController', function($scope, $q, gatewayFactory, windowUtils) {

        var gateway1 = gatewayFactory.createGateway('Gateway1');
        var gateway2 = gatewayFactory.createGateway('Gateway2');

        $scope.notifyParent = function() {
            $scope.acknowledged = "";
            gateway1.publish("display2", {
                message: 'hello parent ! (from iframe)'
            }).then(function(returnValue) {
                $scope.acknowledged = "(parent acknowledged my message and sent back:" + returnValue + ")";
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.acknowledged;
                }, 2000);
            }, function() {
                $scope.acknowledged = "(parent did not acknowledge my message)";
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.acknowledged;
                }, 2000);
            });
        };

        //first listener
        gateway1.subscribe("display1", function(eventId, data) {
            var deferred = $q.defer();
            if ($scope.listener1WillSucceed) {
                $scope.message = data.message;
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.message;
                }, 2000);
                deferred.resolve("hello to you parent from first listener on gateway1");
            } else {
                $scope.message = 'failure';
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.message;
                }, 3000);
                deferred.reject();
            }
            return deferred.promise;
        });

        //second listener
        gateway1.subscribe("display1", function(eventId, data) {
            var deferred = $q.defer();
            if ($scope.listener2WillSucceed) {
                $scope.message2 = data.message;
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.message2;
                }, 2000);
                deferred.resolve("hello to you parent from second listener on gateway1");
            } else {
                $scope.message2 = 'failure';
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.message2;
                }, 3000);
                deferred.reject();
            }
            return deferred.promise;
        });

        //third listener, on second gateway
        gateway2.subscribe("display1", function(eventId, data) {
            var deferred = $q.defer();
            if ($scope.listener3WillSucceed) {
                $scope.message3 = data.message;
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.message3;
                }, 2000);
                deferred.resolve("hello to you parent from unique listener on gateway2");
            } else {
                $scope.message3 = 'failure';
                windowUtils.runTimeoutOutsideAngular(function() {
                    delete $scope.message3;
                }, 3000);
                deferred.reject();
            }
            return deferred.promise;
        });
    });
