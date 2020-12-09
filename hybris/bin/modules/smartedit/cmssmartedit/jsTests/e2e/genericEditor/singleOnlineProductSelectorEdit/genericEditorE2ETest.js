/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('Single Online Product Selector Edit', function() {
    var component = e2e.componentObjects.singleProductCatalogAwareSelector;

    beforeEach(function() {
        require("../commonFunctions.js");
    });

    /**
     * One product catalog by default in e2e tests
     */
    afterEach(function() {
        setReturnOneCatalog(true);
    });

    describe('Component with one catalog', function() {
        beforeEach(function() {
            browser.bootstrap(__dirname).then(function() {
                setReturnOneCatalog(true);
            });
        });

        it('WHEN there is only one product catalog THEN Product Catalog selector is not present AND Product catalog name is displayed AND Product field is populated with selected product', function() {
            component.assertions.productCatalogLabelHasText('Apparel Product Catalog');
            component.assertions.productHasSelectedItem('Asterisk SS youth black M');
        });
    });

    describe('Component with more than one catalog', function() {
        beforeEach(function() {
            browser.bootstrap(__dirname).then(function() {
                setReturnOneCatalog(false);
            });
        });

        it('WHEN there are more than one product catalog THEN Product Catalog name is displayed AND Product field is visible AND Product Catalog is not selected AND Product field is populated with selected product',
            function() {
                component.assertions.productCatalogHasSelectedItem('');
                component.assertions.productIsPresent();
                component.assertions.productHasSelectedItem('Asterisk SS youth black M');
            });

    });

});
