/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
var storefront = require('./Storefront.js');
var perspectives = require('./Perspectives.js');

module.exports = {
    getDottedSlotBorderForNonEmptySlot: function() {
        return perspectives.elements.deprecated_getElementInOverlay(storefront.constants.TOP_HEADER_SLOT_ID)
            .element(by.css('.decorator-basic-slot-border'));
    },
    getDottedSlotBorderForEmptySlot: function() {
        return perspectives.elements.deprecated_getElementInOverlay(storefront.constants.OTHER_SLOT_ID)
            .element(by.css('.decorator-basic-slot-border'));
    }
};
