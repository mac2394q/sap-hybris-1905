/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('httpRequestUtilModule', [])
    .service('httpRequestUtil', function() {
        this.isHTMLRequest = function(response) {
            return response.config.method === 'GET' && response.headers('Content-type').indexOf('text/html') >= 0;
        };
    });
