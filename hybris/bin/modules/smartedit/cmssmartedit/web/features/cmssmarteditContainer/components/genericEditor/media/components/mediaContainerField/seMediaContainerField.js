/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('seMediaContainerFieldModule', [
        'seMediaUploadFormModule',
        'seMediaFormatModule',
        'seErrorsListModule',
        'seFileValidationServiceModule',
        'cmsSmarteditServicesModule'
    ])
    .controller('seMediaContainerFieldController', function($log, seFileValidationService, typePermissionsRestService) {
        this.$onInit = function() {
            this.image = {};
            this.fileErrors = [];
            typePermissionsRestService.hasAllPermissionsForTypes(this.field.containedTypes).then(function(permissionsResult) {
                this.hasReadPermissionOnMediaRelatedTypes = this.field.containedTypes.every(function(type) {
                    return permissionsResult[type].read;
                });
            }.bind(this), function(error) {
                $log.warn('Failed to retrieve type permissions', error);
                this.hasReadPermissionOnMediaRelatedTypes = false;
            }.bind(this));
        };

        this.fileSelected = function(files, format) {
            var previousFormat = this.image.format;
            this.resetImage();

            if (files.length === 1) {
                seFileValidationService.validate(files[0], this.fileErrors).then(function() {
                    this.image = {
                        file: files[0],
                        format: format || previousFormat
                    };
                }.bind(this));
            }
        };

        this.resetImage = function() {
            this.fileErrors = [];
            this.image = {};
        };

        this.imageUploaded = function(uuid) {
            if (this.model && this.model[this.qualifier]) {
                this.model[this.qualifier][this.image.format] = uuid;
            } else {
                this.model[this.qualifier] = {};
                this.model[this.qualifier][this.image.format] = uuid;
            }

            this.resetImage();
        };

        this.imageDeleted = function(format) {
            delete this.model[this.qualifier][format];
        };

        this.isFormatUnderEdit = function(format) {
            return format === this.image.format;
        };
    })
    .directive('seMediaContainerField', function() {
        return {
            templateUrl: 'seMediaContainerFieldTemplate.html',
            restrict: 'E',
            controller: 'seMediaContainerFieldController',
            controllerAs: 'ctrl',
            scope: {},
            bindToController: {
                field: '<',
                model: '<',
                editor: '<',
                qualifier: '<'
            }
        };
    });
