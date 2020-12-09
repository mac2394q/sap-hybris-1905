/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name pageRestrictionsModule
 * @requires pageRestrictionsCriteriaModule
 * @requires pageRestrictionsServiceModule
 * @requires restrictionTypesServiceModule
 * @description
 * This module defines the {@link pageRestrictionsModule.factory:pageRestrictionsFacade pageRestrictionsFacade} facade module for page restrictions.
 */
angular.module('pageRestrictionsModule', [
        'pageRestrictionsCriteriaModule',
        'pageRestrictionsServiceModule',
        'restrictionTypesServiceModule'
    ])

    /**
     * @ngdoc service
     * @name pageRestrictionsModule.factory:pageRestrictionsFacade
     * @requires pageRestrictionsCriteriaService
     * @requires pageRestrictionsService
     * @requires restrictionTypesService
     * @description
     * A facade that exposes only the business logic necessary for features that need to work with page restrictions.
     */
    .factory('pageRestrictionsFacade', function(
        pageRestrictionsCriteriaService,
        pageRestrictionsService,
        restrictionTypesService
    ) {

        return {

            // pageRestrictionsCriteriaService
            getRestrictionCriteriaOptions: pageRestrictionsCriteriaService.getRestrictionCriteriaOptions,
            getRestrictionCriteriaOptionFromPage: pageRestrictionsCriteriaService.getRestrictionCriteriaOptionFromPage,

            // restrictionTypesService
            getRestrictionTypesByPageType: restrictionTypesService.getRestrictionTypesByPageType,

            // pageRestrictionsService
            isRestrictionTypeSupported: pageRestrictionsService.isRestrictionTypeSupported,

            //new API's
            getRestrictionsByPageUUID: pageRestrictionsService.getRestrictionsByPageUUID

        };

    });
