/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function selectComponentObjectFactory() {

    /**
     * Represents a standard html select with options inside
     * Will work with ng-options
     */
    function Select(selectLocator) {

        var locator = selectLocator;

        function getElement() {
            return element(locator);
        }

        // =============== ACTIONS ===============

        this.actions = {
            selectOptionByText: function(text) {
                return browser.click(getElement().element(by.cssContainingText('option', text)));
            }
        };
    }

    return {

        /**
         * To protect again stale elements, no element will even be stored.
         * Each time the elements is needed it will be recreated from the locator.
         *
         * @returns Select A new Instance of Select component object
         */
        byLocator: function(locator) {
            return new Select(locator);
        },

        /**
         * To protect again stale elements, no element will even be stored.
         * Each time the elements is needed it will be recreated from the locator.
         *
         * @returns Select A new Instance of Select component object
         */
        byElement: function(element) {
            return new Select(element.locator);
        }

    };

}();
