/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var perspectiveSelectorObject = require('../components/Perspectives.js');
    var yNotificationPanelObject = require('../components/yNotificationPanelComponentObject');

    var HotKeysObject = {};

    HotKeysObject.constants = {
        HOTKEY_NOTIFICATION_ID: 'HOTKEY_NOTIFICATION_ID'
    };

    HotKeysObject.actions = {
        pressHotKeyModeSwitch: function() {
            return browser.actions()
                .sendKeys(protractor.Key.ESCAPE)
                .perform();
        }
    };

    HotKeysObject.assertions = {
        assertHotkeyTooltipIconPresent: function(isPresent) {
            expect(perspectiveSelectorObject.elements.getTooltipIcon().isPresent())
                .toBe(isPresent);
        },

        assertHotkeyNotificationPresence: function() {
            yNotificationPanelObject.assertions.assertNotificationPresenceById(HotKeysObject.constants.HOTKEY_NOTIFICATION_ID);
        },
        assertHotkeyNotificationAbsence: function() {
            yNotificationPanelObject.assertions.assertNotificationAbsenceById(HotKeysObject.constants.HOTKEY_NOTIFICATION_ID);
        }
    };

    HotKeysObject.elements = {};

    return HotKeysObject;

})();
