/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var pageObjects = {

        elements: {

            getOpenModalButton: function() {
                return browser.findElement("#button_openModal", true);
            },

            getShowSliderPanelButton: function() {
                return browser.findElement("#button_showSliderPanel", true);
            },

            getIsDirtySwitch: function() {
                return browser.findElement("label[for='isDirtySwitch']");
            }

        },

        actions: {

            clickOnIsDirtySwitch: function() {
                browser.waitForVisibility(pageObjects.elements.getIsDirtySwitch());
                return pageObjects.elements.getIsDirtySwitch().click();
            },

            showModal: function() {
                return pageObjects.elements.getOpenModalButton().click();
            },

            showSliderPanel: function() {
                return pageObjects.actions.showModal().then(function() {
                    return pageObjects.elements.getShowSliderPanelButton().click();
                });

            }

        }
    };

    return pageObjects;

})();
