/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var componentObjects = {

        elements: {

            getModalSliderPanel: function() {
                return element(by.css("#y-modal-dialog .se-slider-panel-container"));
            },

            getModalSliderPanelSaveButton: function() {
                return element(by.css("#y-modal-dialog y-slider-panel .se-slider-panel__footer-btn--save"));
            },

            getModalSliderPanelCancelButton: function() {
                return element(by.css("#y-modal-dialog y-slider-panel .se-slider-panel__footer-btn--cancel"));
            },

            getModalSliderPanelDismissButton: function() {
                return element(by.css("#y-modal-dialog y-slider-panel .se-slider-panel__close-btn"));
            },

            getModalSliderPanelBody: function() {
                return element(by.css("#y-modal-dialog y-slider-panel .se-slider-panel__body"));
            },

            getModalSliderPanelTitle: function() {
                return element(by.css("#y-modal-dialog y-slider-panel .se-slider-panel__header span:first-child"));
            }

        },

        actions: {

            checkPresenceOfModalSliderPanel: function() {
                return element(by.css("#y-modal-dialog y-slider-panel"));
            },

            clickOnModalSliderPanelCancelButton: function() {
                return componentObjects.elements.getModalSliderPanelCancelButton().click();
            },

            clickOnModalSliderPanelSaveButton: function() {
                return componentObjects.elements.getModalSliderPanelSaveButton().click();
            },

            clickOnModalSliderPanelDismissButton: function() {
                return browser.click(componentObjects.elements.getModalSliderPanelDismissButton());
            },

        },

        assertions: {

            checkIfConfirmationModalIsPresent: function() {
                expect(element(by.id('confirmationModalDescription')).isPresent()).toBe(true);
            },

            assertForNonPresenceOfModalSliderPanel: function() {
                componentObjects.util.waitForNonPresenceOfModalSliderPanel();
                browser.waitForAbsence(element(by.css("#y-modal-dialog y-slider-panel")));
            },

            assertModalSliderIsPresent: function() {
                expect(componentObjects.elements.getModalSliderPanel().isDisplayed()).toBe(true);
            },

            saveButtonIsDisabledByDefaultInModalSlider: function() {
                browser.waitForVisibility('.se-slider-panel-container');
                expect(componentObjects.elements.getModalSliderPanelTitle().getText()).toContain("Slider Panel Title");
                componentObjects.assertions.assertGetModalSliderPanelCancelButtonIsDisplayed();
                componentObjects.assertions.assertGetModalSliderPanelCancelButtonIsEnabled();
                componentObjects.assertions.assertModalSliderSaveBtnIsDisplayed();
                componentObjects.assertions.assertModalSliderSaveBtnIsEnabled(false);
            },

            assertGetModalSliderPanelCancelButtonIsEnabled: function(isEnabled) {
                if (isEnabled === undefined) {
                    isEnabled = true;
                }
                browser.waitUntil(function() {
                    return componentObjects.elements.getModalSliderPanelCancelButton().isEnabled().then(function(enabled) {
                        return enabled === isEnabled;
                    });
                }, 'Expected modal slider cancel button enablement to be: ' + isEnabled);
            },

            assertGetModalSliderPanelCancelButtonIsDisplayed: function(isDisplayed) {
                if (isDisplayed === undefined) {
                    isDisplayed = true;
                }
                browser.waitUntil(function() {
                    return componentObjects.elements.getModalSliderPanelCancelButton().isDisplayed().then(function(shown) {
                        return shown === isDisplayed;
                    });
                }, 'Expected modal slider cancel button displayed to be ' + isDisplayed);
            },

            assertModalSliderSaveBtnIsEnabled: function(isEnabled) {
                if (isEnabled === undefined) {
                    isEnabled = true;
                }
                browser.waitUntil(function() {
                    return componentObjects.elements.getModalSliderPanelSaveButton().isEnabled().then(function(enabled) {
                        return enabled === isEnabled;
                    });
                }, 'Expected modal slider save button enablement to be: ' + isEnabled);
            },

            assertModalSliderSaveBtnIsDisplayed: function(isDisplayed) {
                if (isDisplayed === undefined) {
                    isDisplayed = true;
                }
                browser.waitUntil(function() {
                    return componentObjects.elements.getModalSliderPanelSaveButton().isDisplayed().then(function(shown) {
                        return shown === isDisplayed;
                    });
                }, 'Expected modal slider save button displayed to be ' + isDisplayed);
            },
        },

        util: {

            waitForNonPresenceOfModalSliderPanel: function() {
                return browser.waitForAbsence("#y-modal-dialog y-slider-panel");
            }
        }

    };

    return componentObjects;

})();
