/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {

    var componentObject = {};
    var configurations;
    if (typeof require !== 'undefined') {
        configurations = require('../components/Configurations.js');
    }

    componentObject.elements = {
        getUserAccountButton: function() {
            return element(by.css('[data-item-key="headerToolbar.userAccountTemplate"] button'));
        },
        getLogoutButton: function() {
            return element(by.css('a.se-sign-out__link'));
        },
        getLanguageSelector: function(css) {
            return element(by.css(css));
        }
    };

    componentObject.actions = {
        clickOnLogout: function() {
            return browser.click(componentObject.elements.getUserAccountButton()).then(function() {
                browser.wait(protractor.ExpectedConditions.elementToBeClickable(componentObject.elements.getLogoutButton()), 5000, "Timed out waiting for logout button");
                return browser.click(componentObject.elements.getLogoutButton());
            });
        }
    };

    componentObject.assertions = {
        assertConfigurationCenterIsAbsent: function() {
            browser.waitForAbsence(configurations.getConfigurationCenterButton());
        },
        assertLanguageSelectorIsPresent: function(css) {
            browser.waitForPresence(componentObject.elements.getLanguageSelector(css));
        },
        waitForUrlToMatch: function() {
            browser.waitForUrlToMatch(/^(?!.*storefront)/);
        },
        localizedFieldIsTranslated: function(by, expectedText) {
            browser.waitUntil(function() {
                return element(by).getText().then(function(actualText) {
                    return actualText === expectedText;
                });
            });
        }
    };

    return componentObject;

}();
