/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name seMediaServiceModule
 * @description
 * The media service module provides a service to create an image file for a catalog through AJAX calls. This module
 * uses a dedicated transformed $resource that posts a multipart form data in the request.
 */
angular.module('seMediaServiceModule', ['resourceLocationsModule', 'ngResource'])

    /**
     * @ngdoc service
     * @name seMediaServiceModule.seMediaService
     * @description
     * This service provides functionality to upload images and to fetch images by code for a specific catalog-catalog version combination.
     */
    .factory('seMediaService', function($resource, MEDIA_RESOURCE_URI) {


        var resource = $resource(MEDIA_RESOURCE_URI, {}, {
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': undefined,
                    enctype: 'multipart/form-data',
                    'x-requested-with': 'Angular'
                },
                transformRequest: function(data) {
                    var formData = new FormData();
                    angular.forEach(data, function(value, key) {
                        formData.append(key, value);
                    });
                    return formData;
                }
            }
        });

        /**
         * @ngdoc method
         * @name seMediaServiceModule.seMediaService.uploadMedia
         * @methodOf seMediaServiceModule.seMediaService
         *
         * @description
         * Uploads the media to the catalog.
         *
         * @param {Object} media The media to be uploaded
         * @param {String} media.code A unique code identifier for the media
         * @param {String} media.description A description of the media
         * @param {String} media.altText An alternate text to be shown for the media
         * @param {File} media.file The {@link https://developer.mozilla.org/en/docs/Web/API/File File} object to be
         * uploaded.
         *
         * @returns {Promise} If request is successful, it returns a promise that resolves with the media POJO. If the
         * request fails, it resolves with errors from the backend.
         */
        var uploadMedia = function(media) {
            return resource.save(media).$promise;
        };

        return {
            uploadMedia: uploadMedia,
        };
    });
