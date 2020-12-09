/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('exponentialRetryStrategyModule', ['exponentialRetrylModule'])
    .factory('exponentialRetryStrategy', function(exponentialRetry) {
        var Strategy = function() {
            this.firstFastRetry = true;
        };
        Strategy.prototype.canRetry = function() {
            return exponentialRetry.canRetry(this.attemptCount);
        };
        Strategy.prototype.calculateNextDelay = function() {
            return exponentialRetry.calculateNextDelay(this.attemptCount);
        };
        return Strategy;
    });
