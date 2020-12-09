/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('linearRetryStrategyModule', ['linearRetrylModule'])
    .factory('linearRetryStrategy', function(linearRetry) {
        var Strategy = function() {
            this.firstFastRetry = true;
        };
        Strategy.prototype.canRetry = function() {
            return linearRetry.canRetry(this.attemptCount);
        };
        Strategy.prototype.calculateNextDelay = function() {
            return linearRetry.calculateNextDelay(this.attemptCount);
        };
        return Strategy;
    });
