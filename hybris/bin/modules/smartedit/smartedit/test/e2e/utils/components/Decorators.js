/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var storefront = require('./Storefront.js');

    var DecoratorsObject = {

        actions: {},

        assertions: {},

        constants: {},

        elements: {

            renderDecorator: function(componentId) {
                return storefront.elements.getComponentInOverlayById(componentId).element(by.id(componentId + '-render-button-inner'));
            },
            renderSlotDecorator: function(componentId) {
                return storefront.elements.getComponentInOverlayById(componentId).element(by.id(componentId + '-render-slot-button-inner'));
            },
            dirtyContentDecorator: function(componentId) {
                return storefront.elements.getComponentInOverlayById(componentId).element(by.id(componentId + '-dirty-content-button'));
            }

        }

    };

    return DecoratorsObject;

})();
