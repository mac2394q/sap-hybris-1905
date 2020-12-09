/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {

    var componentObject = {};

    componentObject.elements = {
        getSitesLink: function() {
            return element(by.css('sites-link a'));
        }
    };

    componentObject.actions = {
        openSitesPage: function() {
            browser.click(componentObject.elements.getSitesLink());
            browser.waitForContainerToBeReady();
        }
    };

    componentObject.assertions = {
        waitForUrlToMatch: function() {
            browser.waitForUrlToMatch(/^(?!.*storefront)/);
        }
    };

    return componentObject;

}();
