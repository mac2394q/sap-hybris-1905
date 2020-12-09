/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('seMediaPreviewModule', [])
    .constant('seMediaPreviewConstants', {
        CONTENT_URL: 'seMediaPreviewContentTemplate.html',
        I18N_KEYS: {
            PREVIEW: 'media.preview'
        }
    })
    .controller('seMediaPreviewController', function(seMediaPreviewConstants) {
        this.i18nKeys = seMediaPreviewConstants.I18N_KEYS;
        this.contentUrl = seMediaPreviewConstants.CONTENT_URL;
    })
    .directive('seMediaPreview', function() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                imageUrl: '<'
            },
            controller: 'seMediaPreviewController',
            controllerAs: 'ctrl',
            templateUrl: 'seMediaPreviewTemplate.html'
        };
    });
