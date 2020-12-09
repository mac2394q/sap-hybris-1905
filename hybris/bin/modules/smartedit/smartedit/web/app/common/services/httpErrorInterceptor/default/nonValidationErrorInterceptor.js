/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('nonvalidationErrorInterceptorModule', ['alertServiceModule', 'genericEditorServicesModule'])
    /**
     * @ngdoc service
     * @name nonvalidationErrorInterceptorModule.service:nonValidationErrorInterceptor
     * @description
     * Used for HTTP error code 400. It removes all errors of type 'ValidationError' and displays alert messages for non-validation errors.
     */
    .factory('nonValidationErrorInterceptor', function($q, alertService, genericEditorStackService) {
        return {
            predicate: function(response) {
                return response.status === 400;
            },
            responseError: function(response) {
                if (response.data && response.data.errors) {
                    response.data.errors.filter(function(error) {
                        var isValidationError = error.type === 'ValidationError';
                        return !isValidationError || (isValidationError && !genericEditorStackService.isAnyGenericEditorOpened());
                    }).forEach(function(error) {
                        alertService.showDanger({
                            message: error.message || 'se.unknown.request.error',
                            timeout: 10000
                        });
                    });
                }
                return $q.reject(response);
            }
        };
    });
