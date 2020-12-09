/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('yAnnouncement', function() {
    var pageObject = require('./yAnnouncementPageObject.js');
    var yAnnouncementComponentObject = require('../utils/components/yAnnouncement.js');

    beforeEach(function(done) {
        pageObject.actions.navigateToTestPage().then(function() {
            browser.ignoreSynchronization = true;
            done();
        });
    });

    it('WHEN a non-closeable announcement is displayed THEN it does not have a close button', function() {
        pageObject.actions.displayNonCloseableAnnouncement();

        yAnnouncementComponentObject.assertions.assertCloseButtonIsNotPresent(0);
        yAnnouncementComponentObject.assertions.assertAnnouncementHasTextByIndex(0, pageObject.constants.NON_CLOSEABLE_ANNOUNCEMENT_CONTENT);
    });

    it('WHEN a closeable announcement is displayed THEN it has a close button', function() {
        pageObject.actions.displaySimpleAnnouncement();

        yAnnouncementComponentObject.assertions.assertCloseButtonIsPresent(0);
    });

    it('WHEN multiple announcements are published THEN all are displayed', function() {
        pageObject.actions.displayNonCloseableAnnouncement();
        pageObject.actions.displaySimpleAnnouncement();

        yAnnouncementComponentObject.assertions.assertTotalNumberOfAnnouncements(2);
    });

    it('WHEN an announcement is displayed THEN it should disappear after a specified timeout', function() {
        pageObject.actions.displaySimpleAnnouncement();

        yAnnouncementComponentObject.assertions.assertAnnouncementIsNotDisplayed(0);
    });

    it('WHEN a simple announcement is displayed THEN it prints appropriate data from the message attribute', function() {
        pageObject.actions.displaySimpleAnnouncement();

        yAnnouncementComponentObject.assertions.assertAnnouncementHasTextByIndex(0, pageObject.constants.SIMPLE_ANNOUNCEMENT_CONTENT);
    });

    it('WHEN a template based announcement is displayed THEN it prints appropriate data from the template', function() {
        pageObject.actions.displayTemplateBasedAnnouncement();

        yAnnouncementComponentObject.assertions.assertAnnouncementHasTextByIndex(0, pageObject.constants.TEMPLATED_BASED_ANNOUNCEMENT_CONTENT);
    });

    it('WHEN a templateUrl announcement is displayed THEN it prints appropriate data from the content in the templateUrl', function() {
        pageObject.actions.displayTemplateUrlBasedAnnouncement();

        yAnnouncementComponentObject.assertions.assertAnnouncementHasTextByIndex(0, pageObject.constants.TEMPLATED_URL_BASED_ANNOUNCEMENT_CONTENT);
    });

    it('WHEN a custom controller announcement is displayed THEN it prints appropriate data from the controller defined by the template/templateUrl', function() {
        pageObject.actions.displayCustomCtrlBasedAnnouncement();

        yAnnouncementComponentObject.assertions.assertAnnouncementHasTextByIndex(0, pageObject.constants.CUSTOM_CTRL_BASED_ANNOUNCEMENT_CONTENT);
    });


});
