/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('contextualMenuItemModule', [
        'yPopupOverlayModule',
        'smarteditServicesModule'
    ])

    .controller('contextualMenuItemController', function($element) {
        var modes = ['small', 'compact'];
        this._validateInput = function() {
            if (typeof this.mode !== 'string' || modes.indexOf(this.mode) === -1) {
                throw "Error initializing contextualMenuItem - unknown mode";
            }
        };

        this.$onInit = function() {

            this.classes = 'cmsx-ctx__icon-more--small ' + this.itemConfig.displayClass;

            this._validateInput();

            if (this.itemConfig.action && this.itemConfig.action.callbacks) {
                var compAttrs = this.componentAttributes;
                var slotAttrs = this.slotAttributes;
                angular.forEach(this.itemConfig.action.callbacks, function(value, key) {
                    $element.on(key, value.bind(undefined, {
                        componentType: compAttrs.smarteditComponentType,
                        componentId: compAttrs.smarteditComponentId,
                        componentUuid: compAttrs.smarteditComponentUuid,
                        containerType: compAttrs.smarteditContainerType,
                        containerId: compAttrs.smarteditContainerId,
                        componentAttributes: compAttrs,
                        slotId: slotAttrs.smarteditSlotId,
                        slotUuid: slotAttrs.smarteditSlotUuid
                    }));
                });
            }
        };

        this.$onDestroy = function() {
            $element.off();
        };
    })

    .component('contextualMenuItem', {
        controller: 'contextualMenuItemController',
        templateUrl: 'contextualMenuItemComponentTemplate.html',
        bindings: {
            mode: '@',
            index: '<',
            componentAttributes: '<',
            slotAttributes: '<',
            itemConfig: '<'
        }
    });
