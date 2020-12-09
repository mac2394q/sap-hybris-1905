/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var ID_PREFIX = 'system-alert-';

    var locators = {
        allAlerts: function() {
            return by.xpath("//*[contains(@id, '" + ID_PREFIX + "')]");
        },

        alertByIndex: function(index) {
            return by.css("#" + ID_PREFIX + index);
        },

        alertMessageByIndex: function(index) {
            return by.css("#" + ID_PREFIX + index + " > div");
        },

        closeButtonByIndex: function(index) {
            return by.css("#" + ID_PREFIX + index + " > .close");
        },

        linkInAlertByIndex: function(index) {
            return element(by.css("#" + ID_PREFIX + index + " a"));
        }

    };

    var systemAlerts = {
        locators: locators
    };


    // ================ ACTIONS =================

    systemAlerts.actions = {
        closeAlertByIndex: function(index) {
            browser.waitForPresence(element(locators.closeButtonByIndex(index)));
            return browser.click(locators.closeButtonByIndex(index));
        },

        flush: function() {
            element.all(locators.allAlerts()).count().then(function(count) {
                for (var i = 0; i < count; i++) {
                    systemAlerts.actions.closeAlertByIndex(0);
                }
                systemAlerts.assertions.assertNoAlertsDisplayed();
            });
        },

        clickOnLinkInAlertByIndex: function(index) {
            browser.waitForPresence(locators.linkInAlertByIndex(index)).then(function() {
                browser.click(locators.linkInAlertByIndex(index));
            });
        }

    };


    // =============== ASSERTIONS ===============

    systemAlerts.assertions = {

        assertAlertIsOfTypeByIndex: function(index, type) {
            browser.waitForPresence(locators.alertByIndex(index), "failed to find alert by index: " + index);
            expect(locators.alertByIndex(index)).toContainClass("fd-alert--" + type);
        },

        assertAlertCloseabilityByIndex: function(index, closeable) {
            if (closeable) {
                browser.waitToBeDisplayed(locators.closeButtonByIndex(index));
            } else {
                browser.waitForAbsence(locators.closeButtonByIndex(index));
            }
        },

        assertAlertTextByIndex: function(index, expectedText) {
            browser.waitForPresence(locators.alertMessageByIndex(index), "failed to find alert message by index: " + index);
            expect(element(locators.alertMessageByIndex(index)).getText()).toContain(expectedText);
        },

        assertAlertMessageLinkByIndex: function(index, expectedText) {
            browser.waitForPresence(
                locators.linkInAlertByIndex(index),
                'failed to find alert message link by index: ' + index
            );
            expect(locators.linkInAlertByIndex(index).getText()).toContain(expectedText);
        },

        assertNoAlertsDisplayed: function() {
            browser.waitForAbsence(locators.alertByIndex(0));
        },

        assertTotalNumberOfAlerts: function(numExpectedAlerts) {
            browser.waitUntil(function() {
                return element.all(locators.allAlerts()).count().then(function(count) {
                    return count === numExpectedAlerts;
                });
            }, "was expecting to see " + numExpectedAlerts + " alerts");
        }

    };

    return systemAlerts;

}());
