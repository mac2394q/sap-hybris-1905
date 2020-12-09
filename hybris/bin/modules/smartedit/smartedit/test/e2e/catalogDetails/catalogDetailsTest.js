/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('Landing page', function() {

    var landingPage, catalogDetailsPage;

    beforeEach(function() {
        landingPage = require('../utils/pageObjects/LandingPagePageObject.js');
        catalogDetailsPage = require('../utils/pageObjects/CatalogDetailsPageObject.js');

        catalogDetailsPage.actions.openAndBeReady();
    });

    it('GIVEN I am on the landing page WHEN the page is fully loaded THEN I expect to see the injected tempplate via the bridge', function() {
        // GIVEN
        var template1Name = "Hello";
        var template2Name = "World";

        // THEN
        landingPage.assertions.catalogVersionContainsItem(landingPage.constants.ELECTRONICS_CATALOG, landingPage.constants.STAGED_CATALOG_VERSION, template1Name);
        landingPage.assertions.catalogVersionContainsItem(landingPage.constants.ELECTRONICS_CATALOG, landingPage.constants.STAGED_CATALOG_VERSION, template2Name);

        landingPage.assertions.catalogVersionContainsItem(landingPage.constants.ELECTRONICS_CATALOG, landingPage.constants.ACTIVE_CATALOG_VERSION, template1Name);
        landingPage.assertions.catalogVersionContainsItem(landingPage.constants.ELECTRONICS_CATALOG, landingPage.constants.ACTIVE_CATALOG_VERSION, template2Name);
    });

});
