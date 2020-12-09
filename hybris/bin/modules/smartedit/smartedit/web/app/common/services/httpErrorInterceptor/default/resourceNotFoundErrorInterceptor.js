/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('resourceNotFoundErrorInterceptorModule', ['alertServiceModule', 'resourceLocationsModule', 'httpRequestUtilModule'])
    /**
     * @ngdoc service
     * @name resourceNotFoundErrorInterceptorModule.service:resourceNotFoundErrorInterceptor
     * @description
     * Used for HTTP error code 404 (Not Found) except for an HTML or a language resource. It will display the response.message in an alert message.
     */
    .factory('resourceNotFoundErrorInterceptor', function($q, alertService, httpRequestUtil, LANGUAGE_RESOURCE_URI) {
        return {
            predicate: function(response) {
                return response.status === 404 && !httpRequestUtil.isHTMLRequest(response) && !_isLanguageResourceRequest(response.config.url);
            },
            responseError: function(response) {
                alertService.showDanger({
                    message: response.message || 'se.unknown.request.error',
                    timeout: 10000
                });
                return $q.reject(response);
            }
        };

        function _isLanguageResourceRequest(url) {
            var languageResourceRegex = new RegExp(LANGUAGE_RESOURCE_URI.replace(/\:.*\//g, '.*/'));
            return languageResourceRegex.test(url);
        }
    });
