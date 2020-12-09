/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('permissionErrorInterceptorModule', ['alertServiceModule'])
    /**
     * @ngdoc service
     * @name permissionErrorInterceptorModule.service:permissionErrorInterceptor
     * @description
     * Used for HTTP error code 403. Displays the alert message for permission error.
     */

    .factory('permissionErrorInterceptor', function($q, alertService) {
        return {
            predicate: function(response) {
                return response.status === 403;
            },
            responseError: function(response) {
                if (response.data && response.data.errors) {
                    response.data.errors.filter(function(error) {
                        return error.type === 'TypePermissionError';
                    }).forEach(function(error) {
                        alertService.showDanger({
                            message: error.message,
                            timeout: 10000
                        });
                    });
                }
                return $q.reject(response);
            }
        };
    });
