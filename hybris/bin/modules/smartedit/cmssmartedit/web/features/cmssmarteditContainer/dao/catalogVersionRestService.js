/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name catalogVersionRestServiceModule
 * @description
 * # The catalogVersionRestServiceModule
 *
 * The catalogVersionRestServiceModule provides REST services for the CMS catalog version endpoint
 *
 */
angular.module('catalogVersionRestServiceModule', ['resourceLocationsModule'])

    /**
     * @ngdoc service
     * @name catalogVersionRestServiceModule.service:catalogVersionRestService
     *
     * @description
     * The catalogVersionRestService provides core REST functionality for the CMS catalog version endpoint
     */
    .factory('catalogVersionRestService', function(restServiceFactory, CONTEXT_SITE_ID, CONTEXT_CATALOG, CONTEXT_CATALOG_VERSION) {

        var URI = '/cmswebservices/v1/sites/:' + CONTEXT_SITE_ID + '/catalogs/:' + CONTEXT_CATALOG + '/versions/:' + CONTEXT_CATALOG_VERSION;

        return {

            /**
             * @ngdoc method
             * @name catalogVersionRestServiceModule.service:catalogVersionRestService#getCloneableTargets
             * @methodOf catalogVersionRestServiceModule.service:catalogVersionRestService
             *
             * @description
             * Fetches all cloneable target catalog versions for a given site+catalog+catalogversion
             *
             * @param {Object} uriContext A {@link resourceLocationsModule.object:UriContext UriContext}
             *
             * @returns {Object} A JSON object with a single field 'versions' containing a list of catalog versions, or an empty list.
             */
            getCloneableTargets: function(uriContext) {
                var rest = restServiceFactory.get(URI + '/targets?mode=cloneableTo');
                return rest.get(uriContext);
            }
        };

    });
