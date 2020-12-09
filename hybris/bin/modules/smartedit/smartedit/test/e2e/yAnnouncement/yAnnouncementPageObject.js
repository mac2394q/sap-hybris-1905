/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {
    var yAnnouncementPageObject = {};

    yAnnouncementPageObject.constants = {
        NON_CLOSEABLE_ANNOUNCEMENT_CONTENT: 'This is a non closeable announcement',
        SIMPLE_ANNOUNCEMENT_CONTENT: 'This is a simple announcement',
        TEMPLATED_BASED_ANNOUNCEMENT_CONTENT: 'This is a template based announcement',
        TEMPLATED_URL_BASED_ANNOUNCEMENT_CONTENT: 'This is an announcement coming from a template url and static data',
        CUSTOM_CTRL_BASED_ANNOUNCEMENT_CONTENT: 'This is the data coming from a custom controller'
    };

    yAnnouncementPageObject.elements = {
        nonCloseableAnnouncementButton: function() {
            return element(by.id('test-announcement-non-closeable-button'));
        },
        simpleAnnouncementButton: function() {
            return element(by.id('test-announcement-simple-button'));
        },
        templateBasedAnnouncementButton: function() {
            return element(by.id('test-announcement-template-button'));
        },
        templateUrlBasedAnnouncementButton: function() {
            return element(by.id('test-announcement-templateurl-button'));
        },
        customCtrlBasedAnnouncementButton: function() {
            return element(by.id('test-announcement-templateurl-customctrl-button'));
        }
    };

    yAnnouncementPageObject.actions = {
        navigateToTestPage: function() {
            return browser.get('test/e2e/yAnnouncement/index.html').then(function() {
                return browser.waitForAngularEnabled(false);
            });
        },
        displayNonCloseableAnnouncement: function() {
            return browser.click(yAnnouncementPageObject.elements.nonCloseableAnnouncementButton());
        },
        displaySimpleAnnouncement: function() {
            return browser.click(yAnnouncementPageObject.elements.simpleAnnouncementButton());
        },
        displayTemplateBasedAnnouncement: function() {
            return browser.click(yAnnouncementPageObject.elements.templateBasedAnnouncementButton());
        },
        displayTemplateUrlBasedAnnouncement: function() {
            return browser.click(yAnnouncementPageObject.elements.templateUrlBasedAnnouncementButton());
        },
        displayCustomCtrlBasedAnnouncement: function() {
            return browser.click(yAnnouncementPageObject.elements.customCtrlBasedAnnouncementButton());
        }
    };

    yAnnouncementPageObject.assertions = {};

    return yAnnouncementPageObject;
})();
