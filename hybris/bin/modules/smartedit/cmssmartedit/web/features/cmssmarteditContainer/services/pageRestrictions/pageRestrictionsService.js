/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name pageRestrictionsServiceModule
 * @requires pageRestrictionsRestServiceModule
 * @requires restrictionsServiceModule
 * @requires restrictionTypesServiceModule
 * @requires yLoDashModule
 * @description
 * This module defines the {@link pageRestrictionsServiceModule.service:pageRestrictionsService pageRestrictionsService} service used to consolidate business logic for SAP Hybris platform CMS restrictions for pages.
 */
angular.module('pageRestrictionsServiceModule', [
        'pageRestrictionsRestServiceModule',
        'restrictionsServiceModule',
        'restrictionTypesServiceModule',
        'yLoDashModule',
        'cmsSmarteditServicesModule'
    ])

    /**
     * @ngdoc service
     * @name pageRestrictionsServiceModule.service:pageRestrictionsService
     * @requires $q
     * @requires yLoDashModule
     * @requires pageRestrictionsRestService
     * @requires restrictionsService
     * @requires typeStructureRestService
     * @description
     * Service that concerns business logic tasks related to CMS restrictions for CMS pages.
     */
    .service('pageRestrictionsService', function(
        $q,
        lodash,
        pageRestrictionsRestService,
        restrictionsService,
        cmsitemsRestService
    ) {

        /**
         * @ngdoc method
         * @name pageRestrictionsServiceModule.service:pageRestrictionsService#getPageRestrictionsCountMapForCatalogVersion
         * @methodOf pageRestrictionsServiceModule.service:pageRestrictionsService
         * @param {String} siteUID The site Id.
         * @param {String} catalogUID The catalog Id.
         * @param {String} catalogVersionUID The catalog version.
         * @returns {Object} A map of all pageId as keys, and the number of restrictions applied to that page as the values.
         */
        this.getPageRestrictionsCountMapForCatalogVersion = function getPageRestrictionsCountMapForCatalogVersion(siteUID, catalogUID, catalogVersionUID) {
            return pageRestrictionsRestService.getPagesRestrictionsForCatalogVersion(siteUID, catalogUID, catalogVersionUID).then(function(relations) {
                return lodash.countBy(relations.pageRestrictionList, 'pageId');
            });
        };

        /**
         * @ngdoc method
         * @name pageRestrictionsServiceModule.service:pageRestrictionsService#getPageRestrictionsCountForPageUID
         * @methodOf pageRestrictionsServiceModule.service:pageRestrictionsService
         * @param {String} pageUID The page Id.
         * @returns {Number} The number of restrictions applied to the page with the give page UID.
         */
        this.getPageRestrictionsCountForPageUID = function getPageRestrictionsCountForPageUID(pageUID) {
            return pageRestrictionsRestService.getPagesRestrictionsForPageId(pageUID).then(function(response) {
                return response.pageRestrictionList.length;
            });
        };

        /**
         * @ngdoc method
         * @name pageRestrictionsServiceModule.service:pageRestrictionsService#isRestrictionTypeSupported
         * @methodOf pageRestrictionsServiceModule.service:pageRestrictionsService
         * @param {String} restrictionTypeCode Code for the restriction type.
         * @returns {Boolean} True if smartedit supports editing or creating restrictions of this type.
         */
        this.isRestrictionTypeSupported = function isRestrictionTypeSupported(restrictionTypeCode) {
            return this.getSupportedRestrictionTypeCodes().then(function(supportedTypes) {
                return supportedTypes.indexOf(restrictionTypeCode) >= 0;
            });
        };


        /**
         * @ngdoc method
         * @name pageRestrictionsServiceModule.service:pageRestrictionsService#getRestrictionsByPageUID
         * @methodOf pageRestrictionsServiceModule.service:pageRestrictionsService
         * @param {String} pageUuid The uuid of the page for which to fetch the restrictions.
         * @returns {Array} An array of all restrictions applied to the page with the given page ID
         */
        this.getRestrictionsByPageUUID = function(pageUuid) {
            return cmsitemsRestService.getById(pageUuid).then(function(pageData) {
                return cmsitemsRestService.getByIds(pageData.restrictions);
            });
        };


    });
