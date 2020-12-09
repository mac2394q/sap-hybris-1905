/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('seMediaSelectorModule', ['seMediaAdvancedPropertiesModule', 'seMediaPrinterModule', 'mediaServiceModule'])
    .controller('seMediaSelectorController', function(mediaService) {

        this.mediaTemplate = 'seMediaPrinterWrapperTemplate.html';

        this.fetchStrategy = {
            fetchEntity: function(uuid) {
                return mediaService.getMedia(uuid);
            },
            fetchPage: function(mask, pageSize, currentPage) {
                return mediaService.getPage(mask, pageSize, currentPage);
            }
        };

    })
    .component('seMediaSelector', {
        templateUrl: 'seMediaSelectorTemplate.html',
        require: {
            geField: '^^genericEditorField'
        },
        bindings: {
            field: '<',
            model: '<',
            editor: '<',
            qualifier: '<'
        },
        controller: 'seMediaSelectorController',
        controllerAs: 'ctrl'
    });
