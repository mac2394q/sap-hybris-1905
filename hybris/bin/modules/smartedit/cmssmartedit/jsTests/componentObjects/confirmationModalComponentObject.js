/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var componentObject = {};

    componentObject.elements = {
        getConfirmationModalOkButton: function() {
            return by.id('confirmOk');
        },
        getConfirmationModalCancelButton: function() {
            return by.id('confirmCancel');
        }
    };

    componentObject.assertions = {
        cancelButtonIsNotDisplayed: function() {
            expect(element(componentObject.elements.getConfirmationModalCancelButton())).toBeAbsent();
        }
    };

    componentObject.actions = {
        confirmConfirmationModal: function() {
            browser.click(componentObject.elements.getConfirmationModalOkButton());
        },
        dismissConfirmationModal: function() {
            browser.click(componentObject.elements.getConfirmationModalCancelButton());
        }
    };

    return componentObject;
})();
