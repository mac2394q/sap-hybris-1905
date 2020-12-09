/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var componentObject = {};

    componentObject.constants = {
        MODAL_ID: 'y-modal-dialog'
    };

    componentObject.elements = {
        getModalDialog: function() {
            return browser.switchToParent().then(function() {
                browser.waitUntilModalAppears();
                return element(by.id(componentObject.constants.MODAL_ID));
            });
        },
        getModalDialogTitle: function() {
            return browser.switchToParent().then(function() {
                browser.waitUntilModalAppears();
                return element(by.css(".se-modal__header-title")).getText();
            });
        },
        getModalDialogDescription: function() {
            return browser.switchToParent().then(function() {
                browser.waitUntilModalAppears();
                return element(by.css("div[id='" + componentObject.constants.MODAL_ID + "'] div[id='confirmationModalDescription']")).getText();
            });
        },
        modalDialogCancel: function() {
            return browser.switchToParent().then(function() {
                browser.waitUntilModalAppears();
                return element(by.css("div[id='" + componentObject.constants.MODAL_ID + "'] button[id='confirmCancel']"));
            });
        },
        modalDialogOk: function() {
            return browser.switchToParent().then(function() {
                browser.waitUntilModalAppears();
                return element(by.css("div[id='" + componentObject.constants.MODAL_ID + "'] button[id='confirmOk']"));
            });
        },
    };

    componentObject.actions = {
        modalDialogClickCancel: function() {
            return browser.switchToParent().then(function() {
                browser.waitUntilModalAppears();
                return browser.click(by.css("div[id='" + componentObject.constants.MODAL_ID + "'] button[id='confirmCancel']")).then(function() {
                    return browser.waitForAbsence(by.id(componentObject.constants.MODAL_ID), 'could not close modal window');
                });
            });
        },
        modalDialogClickOk: function() {
            return browser.switchToParent().then(function() {
                componentObject.elements.modalDialogOk().then(function(okButton) {
                    return browser.click(okButton).then(function() {
                        return browser.waitForAbsence(by.id(componentObject.constants.MODAL_ID), 'could not close modal window');
                    });
                });
            });
        }
    };

    componentObject.assertions = {
        modalDialogIsDisplayed: function() {
            componentObject.elements.getModalDialog().then(function(modalDialog) {
                expect(modalDialog.isDisplayed()).toBe(true, 'Expected modal dialog to be displayed');
            });
        }
    };

    return componentObject;
})();
