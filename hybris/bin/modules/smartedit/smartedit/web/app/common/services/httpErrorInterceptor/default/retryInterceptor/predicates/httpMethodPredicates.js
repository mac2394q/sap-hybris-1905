/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('httpMethodPredicatesModule', ['yLoDashModule'])
    .constant('HTTP_METHODS_UPDATE', ['PUT', 'POST', 'DELETE', 'PATCH'])
    .constant('HTTP_METHODS_READ', ['GET', 'OPTIONS', 'HEAD'])
    .service('updatePredicate', function(lodash, HTTP_METHODS_UPDATE) {
        return function(response) {
            return lodash.includes(HTTP_METHODS_UPDATE, response.config.method);
        };
    })
    .service('readPredicate', function(lodash, HTTP_METHODS_READ) {
        return function(response) {
            return lodash.includes(HTTP_METHODS_READ, response.config.method);
        };
    });
