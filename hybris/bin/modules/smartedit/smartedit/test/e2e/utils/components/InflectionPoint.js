/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var inflectionPointObject = {

        actions: {
            openInflectionPointMenu: function() {
                return browser.click(inflectionPointObject.elements.getInflectionPointMenuOpenButton());
            }
        },

        assertions: {
            inflectionPointSelectorIsNotPresent: function() {
                browser.waitForAbsence(inflectionPointObject.elements.getInflectionPointSelector(), "Expect inflection point button not to be displayed.");
            }
        },

        constants: {},

        elements: {
            getInflectionPointSelector: function() {
                return element(by.tagName('inflection-point-selector'));
            },
            getInflectionPointMenuOpenButton: function() {
                return element(by.css('inflection-point-selector button'));
            },
            getInflectionPointMenu: function() {
                return element(by.css("inflection-point-selector .fd-menu__list"));
            }
        },

    };

    return inflectionPointObject;

})();
