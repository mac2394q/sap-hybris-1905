/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('Slot Contextual Menu Decorator', function() {

    var page = require('../utils/components/Page.js');
    var perspectives = require("../utils/components/Perspectives.js");
    var storefront = require('../utils/components/Storefront.js');

    beforeEach(function() {
        page.actions.getAndWaitForWholeApp('test/e2e/slotContextualMenu/slotContextualMenuTest.html');
        perspectives.actions.selectPerspective(perspectives.constants.DEFAULT_PERSPECTIVES.ALL);
    });

    it('WHEN I hover over a content slot THEN the ID of the slot appears in the slot contextual menu decorator', function() {
        expect(slotNamePanels().count()).toBe(0);

        hoverOverSlot(storefront.constants.BOTTOM_HEADER_SLOT_ID);
        expect(slotNamePanels().count()).toBe(1);
        expect(slotNamePanel().getText()).toContain(storefront.constants.BOTTOM_HEADER_SLOT_ID);

        hoverOverSlot(storefront.constants.FOOTER_SLOT_ID);
        expect(slotNamePanels().count()).toBe(1);
        expect(slotNamePanel().getText()).toContain(storefront.constants.FOOTER_SLOT_ID);
    });

    it('WHEN I hover over a content slot THEN the slot contextual menu items appear in the slot contextual menu decorator', function() {
        hoverOverSlot(storefront.constants.BOTTOM_HEADER_SLOT_ID);
        browser.click(by.css('.smartEditComponentX[data-smartedit-component-id="' + storefront.constants.BOTTOM_HEADER_SLOT_ID + '"]'));
        expect(contextualMenuItemForSlot('slot.context.menu.title.dummy1', storefront.constants.BOTTOM_HEADER_SLOT_ID).isPresent()).toBe(true);
    });

    it('WHEN I click one of the slot contextual menu items THEN I expect the callback to be triggered', function() {
        hoverOverSlot(storefront.constants.BOTTOM_HEADER_SLOT_ID);
        browser.click(by.css('.smartEditComponentX[data-smartedit-component-id="' + storefront.constants.BOTTOM_HEADER_SLOT_ID + '"]'));
        expect(contextualMenuItemForSlot('slot.context.menu.title.dummy1', storefront.constants.BOTTOM_HEADER_SLOT_ID).isPresent()).toBe(true);
        expect(contextualMenuItemForSlot('slot.context.menu.title.dummy2', storefront.constants.BOTTOM_HEADER_SLOT_ID).isPresent()).toBe(true);
        browser.click(contextualMenuItemForSlot('slot.context.menu.title.dummy1', storefront.constants.BOTTOM_HEADER_SLOT_ID));
        expect(contextualMenuItemForSlot('slot.context.menu.title.dummy1', storefront.constants.BOTTOM_HEADER_SLOT_ID).isPresent()).toBe(true);
        expect(contextualMenuItemForSlot('slot.context.menu.title.dummy2', storefront.constants.BOTTOM_HEADER_SLOT_ID).isPresent()).toBe(true);
    });

    // Actions
    function hoverOverSlot(slotId) {
        return storefront.actions.moveToComponent(slotId, 'ContentSlot');
    }

    // Elements
    function slotNamePanels() {
        return element.all(by.css('.se-decorative-panel-area .se-decorative-panel__title'));
    }

    function slotNamePanel() {
        return element(by.css('.se-decorative-panel-area .se-decorative-panel__title'));
    }

    function contextualMenuItemForSlot(key, slotID) {
        return element(by.id(key + '-' + slotID + '-ContentSlot'));
    }

});
