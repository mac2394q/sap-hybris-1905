/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var componentObject = {};

    componentObject.constants = {
        MODAL_ID: 'y-modal-dialog'
    };

    componentObject.elements = {
        getSuccessAlert: function() {
            return browser.findElement(by.css('.fd-alert--success'));
        },
        getModalDialog: function() {
            return browser.switchToParent().then(function() {
                return element(by.id(componentObject.constants.MODAL_ID));
            });
        },
        getModalDialogTitle: function() {
            return browser.switchToParent().then(function() {
                return element(by.css('se-modal__header-title')).getText();
            });
        },
        getCancelButton: function() {
            return element(by.css("div[id='" + componentObject.constants.MODAL_ID + "'] button[id='cancel']"));
        },
        getSaveButton: function() {
            return element(by.css("div[id='" + componentObject.constants.MODAL_ID + "'] button[id='save']"));
        },
        getAttributeValueByName: function(attributeName) {
            return browser.switchToParent().then(function() {
                return element(by.name(attributeName)).getAttribute('value');
            });
        }
    };

    componentObject.actions = {
        modalDialogClickCancel: function() {
            return browser.switchToParent().then(function() {
                return browser.click(componentObject.elements.getCancelButton()).then(function() {
                    return browser.waitForAbsence(by.id(componentObject.constants.MODAL_ID), 'could not close modal window');
                });
            });
        },
        modalDialogClickSave: function() {
            return browser.switchToParent().then(function() {
                return browser.click(componentObject.elements.getSaveButton()).then(function() {
                    return browser.waitForAbsence(by.id(componentObject.constants.MODAL_ID), 'could not close modal window');
                });
            });
        }
    };

    componentObject.assertions = {
        assertModalIsNotPresent: function() {
            browser.switchToParent().then(function() {
                browser.waitUntil(EC.stalenessOf(element(by.id(componentObject.constants.MODAL_ID))), 'Expected modal to not be present');
                browser.waitForAbsence(element(by.id(componentObject.constants.MODAL_ID)));
            });
        },
        assertModalIsPresent: function() {
            browser.switchToParent().then(function() {
                browser.waitUntil(EC.presenceOf(element(by.id(componentObject.constants.MODAL_ID))), 'Expected modal to be present');
                expect(element(by.id(componentObject.constants.MODAL_ID)).isPresent()).toBe(true);
            });
        },
        assertSuccessAlertIsDisplayed: function() {
            browser.waitUntil(function() {
                return componentObject.elements.getSuccessAlert().isDisplayed();
            }, 'expected success alert to be displayed');
        }
    };

    return componentObject;
})();
