/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('httpErrorPredicatesModule', ['yLoDashModule', 'functionsModule'])
    .constant('SERVER_ERROR_PREDICATE_HTTP_STATUSES', [500, 502, 503, 504])
    .constant('CLIENT_ERROR_PREDICATE_HTTP_STATUSES', [429])
    .constant('TIMEOUT_ERROR_PREDICATE_HTTP_STATUSES', [408])
    .service('serverErrorPredicate', function(lodash, SERVER_ERROR_PREDICATE_HTTP_STATUSES) {
        return function(response) {
            return lodash.includes(SERVER_ERROR_PREDICATE_HTTP_STATUSES, response.status);
        };
    })
    .service('clientErrorPredicate', function(lodash, CLIENT_ERROR_PREDICATE_HTTP_STATUSES) {
        return function(response) {
            return lodash.includes(CLIENT_ERROR_PREDICATE_HTTP_STATUSES, response.status);
        };
    })
    .service('timeoutErrorPredicate', function(lodash, TIMEOUT_ERROR_PREDICATE_HTTP_STATUSES) {
        return function(response) {
            return lodash.includes(TIMEOUT_ERROR_PREDICATE_HTTP_STATUSES, response.status);
        };
    })
    .service('retriableErrorPredicate', function(isAnyTruthy, serverErrorPredicate, clientErrorPredicate, timeoutErrorPredicate) {
        return function(response) {
            return isAnyTruthy(serverErrorPredicate, clientErrorPredicate, timeoutErrorPredicate)(response);
        };
    })
    .service('noInternetConnectionErrorPredicate', function() {
        return function(response) {
            return response.status === 0;
        };
    });
