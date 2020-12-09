/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name pageRestrictionsRestServiceModule
 * @requires smarteditServicesModule
 * @description
 * This module defines the {@link pageRestrictionsRestServiceModule.service:pageRestrictionsRestService pageRestrictionsRestService} REST service for page restrictions API.
 */
angular.module('pageRestrictionsRestServiceModule', [])

    /**
     * @ngdoc service
     * @name pageRestrictionsRestServiceModule.service:pageRestrictionsRestService
     * @requires CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI
     * @requires PAGES_RESTRICTIONS_RESOURCE_URI
     * @requires restServiceFactory
     * @description 
     * Service that handles REST requests for the pagesRestrictions CMS API endpoint.
     */
    .service('pageRestrictionsRestService', function(
        CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI,
        PAGES_RESTRICTIONS_RESOURCE_URI,
        restServiceFactory
    ) {

        var contextualPageRestrictionsRestService = restServiceFactory.get(CONTEXTUAL_PAGES_RESTRICTIONS_RESOURCE_URI);
        var pageRestrictionsRestService = restServiceFactory.get(PAGES_RESTRICTIONS_RESOURCE_URI);

        /**
         * @ngdoc method
         * @name  pageRestrictionsRestServiceModule.service:pageRestrictionsRestService#getPagesRestrictionsForPageId
         * @methodOf pageRestrictionsRestServiceModule.service:pageRestrictionsRestService
         * @param {String} pageId The unique page identifier for which to fetch pages-restrictions relation.
         * @return {Array} An array of pageRestrictions for the given page.
         */
        this.getPagesRestrictionsForPageId = function(pageId) {
            return contextualPageRestrictionsRestService.get({
                pageId: pageId
            });
        };

        /**
         * @ngdoc method
         * @name pageRestrictionsRestServiceModule.service:pageRestrictionsRestService#getPagesRestrictionsForCatalogVersion
         * @methodOf pageRestrictionsRestServiceModule.service:pageRestrictionsRestService
         * @param {String} siteUID The unique identifier for site.
         * @param {String} catalogUID The unique identifier for catalog.
         * @param {String} catalogVersionUID The unique identifier for catalog version.
         * @return {Array} An array of all pageRestrictions for the given catalog.
         */
        this.getPagesRestrictionsForCatalogVersion = function(siteUID, catalogUID, catalogVersionUID) {
            return pageRestrictionsRestService.get({
                siteUID: siteUID,
                catalogId: catalogUID,
                catalogVersion: catalogVersionUID
            });
        };
    });
