/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {

    var pageObject = {};

    pageObject.constants = {};

    pageObject.elements = {};

    pageObject.actions = {
        openAndBeReady: function() {
            browser.get('test/e2e/catalogDetails/catalogDetailsTest.html');
            browser.waitForContainerToBeReady();
        }
    };

    pageObject.assertions = {};

    pageObject.utils = {};

    return pageObject;
})();
