/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var componentObject = {

        constants: {
            ANNOUNCEMENT_ID_PREFIX: 'y-announcement-'
        },

        elements: {
            getAnnouncements: function() {
                return element.all(by.css('y-announcement-board y-announcement'));
            },
            getAnnouncementByIndex: function(index) {
                return element(by.css("#" + componentObject.constants.ANNOUNCEMENT_ID_PREFIX + index));
            },
            getCloseButton: function(index) {
                return componentObject.elements.getAnnouncementByIndex(index).element(by.css('.sap-icon--decline'));
            }
        },

        assertions: {
            assertTotalNumberOfAnnouncements: function(count) {
                expect(componentObject.elements.getAnnouncements().count()).toBe(count);
            },
            assertCloseButtonIsNotPresent: function(index) {
                expect(componentObject.elements.getCloseButton(index)).toBeAbsent();
            },
            assertCloseButtonIsPresent: function(index) {
                browser.waitToBeDisplayed(componentObject.elements.getCloseButton(index),
                    'could not assert that the announcement is displayed');
            },
            assertAnnouncementHasTextByIndex: function(index, expectedText) {
                browser.waitForPresence(componentObject.elements.getAnnouncementByIndex(index), "failed to find announcement message by index: " + index);
                expect(componentObject.elements.getAnnouncementByIndex(index).getText()).toContain(expectedText);
            },
            assertAnnouncementIsNotDisplayed: function(index) {
                browser.waitForAbsence(componentObject.elements.getAnnouncementByIndex(index));
            }
        }

    };

    return componentObject;
})();
