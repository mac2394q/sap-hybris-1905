/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe("catalog details service", function() {

    // Service Under Test
    var catalogDetailsService;
    var defaultItem = {
        include: 'homePageLinkWrapperTemplate.html'
    };

    // Set-up Service Under Test
    beforeEach(function() {
        angular.mock.module('functionsModule');
        angular.mock.module('catalogDetailsModule');
        inject(function(_catalogDetailsService_) {
            catalogDetailsService = _catalogDetailsService_;
        });
    });

    it('Should have an empty lists in the begining(left and right sides) ', function() {
        expect(catalogDetailsService.getItems().left).toEqual([defaultItem]);
        expect(catalogDetailsService.getItems().right).toEqual([]);
    });

    it('Should add items to the list at the left side', function() {
        var theItems = ['a', 'b', 'c'];
        catalogDetailsService.addItems(theItems);
        expect(catalogDetailsService.getItems().left).toEqual([defaultItem, 'a', 'b', 'c']);
    });

    it('Should add items to the list at the right side', function() {
        var theItems = ['a', 'b', 'c'];
        catalogDetailsService.addItems(theItems, 'right');
        expect(catalogDetailsService.getItems().right).toEqual(['a', 'b', 'c']);
    });

    it('Should add items to the list by sequences at the left(default) side', function() {
        catalogDetailsService.addItems(['a', 'b']);
        catalogDetailsService.addItems(['c', 'd']);
        catalogDetailsService.addItems(['e', 'f']);

        expect(catalogDetailsService.getItems().left).toEqual([defaultItem, 'a', 'b', 'c', 'd', 'e', 'f']);
    });

});
