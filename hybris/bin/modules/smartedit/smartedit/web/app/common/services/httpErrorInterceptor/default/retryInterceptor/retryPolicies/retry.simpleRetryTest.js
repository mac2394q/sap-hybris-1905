/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('simple retry policy service', function() {
    var simpleRetry;

    beforeEach(angular.mock.module('simpleRetrylModule'));

    beforeEach(inject(function(_simpleRetry_) {
        simpleRetry = _simpleRetry_;
    }));

    it('the calculateNextDelay should return a proper delay based on the given arguments', function() {
        //retryInterval, minBackoff
        // 2000+
        var delay = simpleRetry.calculateNextDelay(2000, 50);
        expect(delay < 3050 && delay > 2050).toBeTruthy();

    });

    it('the calculateNextDelay should work given no argument', function() {
        //retryInterval, minBackoff
        // 500+
        var delay = simpleRetry.calculateNextDelay();
        expect(delay < 1500 && delay >= 500).toBeTruthy();

    });

    it('the canRetry should return false the attemptCount is larger than the max', function() {

        //attemptCount, maxAttempt
        var delay = simpleRetry.canRetry(3, 2);
        expect(delay).toBeFalsy();

    });

    it('the canRetry should return false the attemptCount is larger than the max', function() {

        //attemptCount, maxAttempt
        var delay = simpleRetry.canRetry(6);
        expect(delay).toBeFalsy();

    });
});
