/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('E2E Test for auto-loading of preview and auto-bootstrap of smartEdit ', function() {
    var perspectives = require("../utils/components/Perspectives.js");
    var storefront = require("./../utils/components/Storefront.js");

    beforeEach(function() {
        browser.get('test/e2e/autoBootstrap/autoBootstrapTest.html');
        browser.waitForWholeAppToBeReady();
    });

    it("GIVEN that default page is loaded, I click on the link to the second page THEN I see that text decorator is wrapped around my component", function() {
        browser.switchToIFrame();
        storefront.actions.deepLink();

        perspectives.actions.selectPerspective(perspectives.constants.DEFAULT_PERSPECTIVES.ALL).then(function() {
            storefront.assertions.assertComponentInOverlayPresent(
                storefront.constants.COMPONENT_2_ID, storefront.constants.COMPONENT_2_TYPE, false);
            storefront.assertions.assertDecoratorShowsOnComponent(storefront.constants.COMPONENT_2_ID, storefront.constants.COMPONENT_1_TYPE, 'textDisplay');
        });
    });
});
