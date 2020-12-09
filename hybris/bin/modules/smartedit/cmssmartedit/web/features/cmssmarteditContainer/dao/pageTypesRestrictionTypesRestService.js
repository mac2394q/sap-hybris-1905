/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name pageTypesRestrictionTypesRestServiceModule
 * @requires smarteditServicesModule
 * @description
 * This module defines the {@link pageRestrictionsRestServiceModule.service:pageRestrictionsRestService pageRestrictionsRestService} REST service for pageTypes restrictionTypes API.
 */
angular.module('pageTypesRestrictionTypesRestServiceModule', [])


    /**
     * @ngdoc service
     * @name pageTypesRestrictionTypesRestServiceModule.service:pageTypesRestrictionTypesRestService
     * @requires languageService
     * @requires PAGE_TYPES_RESTRICTION_TYPES_URI
     * @requires restServiceFactory
     * @description
     * Service that handles REST requests for the pageTypes restrictionTypes CMS API endpoint.
     */
    .service('pageTypesRestrictionTypesRestService', function(
        languageService,
        PAGE_TYPES_RESTRICTION_TYPES_URI,
        restServiceFactory
    ) {

        var rest = restServiceFactory.get(PAGE_TYPES_RESTRICTION_TYPES_URI);

        /**
         * @ngdoc method
         * @name pageTypesRestrictionTypesRestServiceModule.service:pageTypesRestrictionTypesRestService#getPageTypesRestrictionTypes
         * @methodOf pageTypesRestrictionTypesRestServiceModule.service:pageTypesRestrictionTypesRestService
         * 
         * @return {Array} An array of all pageType-restrictionType in the system.
         */
        this.getPageTypesRestrictionTypes = function() {
            return rest.get().then(function(pageTypesRestrictionTypesArray) {
                return pageTypesRestrictionTypesArray;
            });
        };

    });
