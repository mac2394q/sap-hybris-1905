/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var yMoreTextObject = {
        elements: {
            getYMoreTextById: function(component_id) {
                return element(by.css('#' + component_id));
            },
            getButton: function(component_id) {
                var el = this.getYMoreTextById(component_id);
                return el.element(by.css('#' + yMoreTextObject.consts.BUTTON_ID));
            },
            getComponentText: function(component_id) {
                var el = this.getYMoreTextById(component_id);
                return el.element(by.css('#' + yMoreTextObject.consts.TEXT_PAYLOAD_ID)).getText();
            },
            getButtonTitle: function(component_id) {
                return yMoreTextObject.elements.getButton(component_id).getText();
            }
        },
        actions: {
            openAndBeReady: function() {
                return browser.get('test/e2e/yMoreText/index.html');
            },
            clickOnButton: function(component_id) {
                return browser.click(yMoreTextObject.elements.getButton(component_id));
            }
        },
        assertions: {
            assertComponentContainsText: function(component_id, text) {
                return browser.waitForSelectorToContainText(yMoreTextObject.elements.getComponentText(component_id), text);
            },
            assertButtonContainsTitle: function(component_id, title) {
                return browser.waitForSelectorToContainText(yMoreTextObject.elements.getButtonTitle(component_id), title);
            },
            assertButtonIsAbsent: function(component_id) {
                return browser.isAbsent(yMoreTextObject.elements.getButton(component_id));
            }
        },
        consts: {
            BUTTON_ID: 'y-more-text-toggle',
            TEXT_PAYLOAD_ID: 'y-more-text-payload',
        }
    };

    return yMoreTextObject;
})();
