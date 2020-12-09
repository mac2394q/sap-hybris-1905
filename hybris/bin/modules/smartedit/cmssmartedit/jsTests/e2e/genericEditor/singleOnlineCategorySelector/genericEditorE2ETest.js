/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('Single Online Category Selector', function() {
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

        it('WHEN there is only one product catalog THEN Product Catalog selector is not present AND Product catalog name is displayed AND Category field is populated', function() {
            component.assertions.productCatalogLabelHasText('Apparel Product Catalog');
            component.assertions.categoryIsPopulated();
        });
    });

    describe('Component with more than one catalog', function() {
        beforeEach(function() {
            browser.bootstrap(__dirname).then(function() {
                setReturnOneCatalog(false);
            });
        });

        it('WHEN there are more than one product catalog THEN Product Catalog AND Category fields are visible AND Product Catalog is not selected AND Category is not populated',
            function() {
                component.assertions.productCatalogSelectorIsPresent();
                component.assertions.productCatalogIsNotSelected();
                component.assertions.categoryIsPresent();
                component.assertions.categoryIsNotPopulated();
            });

        it('WHEN there are more than one product catalog WHEN Product Catalog is selected THEN Category field is populated',
            function() {
                component.actions.selectProductCatalog().then(function() {
                    component.assertions.categoryIsPopulated();
                });
            });

    });

});
