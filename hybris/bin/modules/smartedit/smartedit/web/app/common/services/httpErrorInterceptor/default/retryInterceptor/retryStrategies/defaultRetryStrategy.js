/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('defaultRetryStrategyModule', ['simpleRetrylModule'])
    .factory('defaultRetryStrategy', function(simpleRetry) {
        var Strategy = function() {
            this.firstFastRetry = true;
        };
        Strategy.prototype.canRetry = function() {
            return simpleRetry.canRetry(this.attemptCount);
        };
        Strategy.prototype.calculateNextDelay = function() {
            return simpleRetry.calculateNextDelay();
        };
        return Strategy;
    });
