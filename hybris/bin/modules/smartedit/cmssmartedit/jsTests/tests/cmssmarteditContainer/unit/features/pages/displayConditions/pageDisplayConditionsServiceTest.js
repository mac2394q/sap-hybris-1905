/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('pageDisplayConditionsService - ', function() {

    var pageDisplayConditionsService;
    var catalogService;
    var $q;
    var uriContextMocks = new unit.mockData.uriContext();
    var pageTypeMocks = unit.mockData.pageType;
    var pageDisplayConditionMockClass = unit.mockData.pageDisplayCondition;

    beforeEach(angular.mock.module('pageDisplayConditionsServiceModule'));
    beforeEach(angular.mock.module('smarteditServicesModule', function($provide) {
        catalogService = jasmine.createSpyObj('catalogService', ['getContentCatalogVersion']);
        $provide.value('catalogService', catalogService);
        catalogService.getContentCatalogVersion.and.callFake(function() {
            return $q.when({
                name: {
                    de: "Deutscher Produktkatalog Kleidung"
                },
                pageDisplayConditions: [{
                    options: [{
                        label: "page.displaycondition.primary",
                        id: "PRIMARY"
                    }],
                    typecode: "ProductPage"
                }, {
                    options: [{
                        label: "page.displaycondition.variation",
                        id: "VARIATION"
                    }],
                    typecode: "CategoryPage"
                }, {
                    options: [{
                        label: "page.displaycondition.primary",
                        id: "PRIMARY"
                    }, {
                        label: "page.displaycondition.variation",
                        id: "VARIATION"
                    }],
                    typecode: "ContentPage"
                }],
                uid: "apparel-ukContentCatalog",
                version: "Online"
            });
        });
    }));

    beforeEach(inject(function(_pageDisplayConditionsService_, _$q_) {
        pageDisplayConditionsService = _pageDisplayConditionsService_;
        $q = _$q_;
    }));

    describe('getNewPageConditions() - ', function() {

        it('Page Type with only primary option returns primary display condition', function() {
            expect(pageDisplayConditionsService.getNewPageConditions(pageTypeMocks.byTypeCode.PRODUCT_PAGE.typeCode, uriContextMocks))
                .toBeResolvedWithData([new pageDisplayConditionMockClass().PRIMARY]);
        });

        it('Page Type with only variation option returns variation display condition', function() {
            expect(pageDisplayConditionsService.getNewPageConditions(pageTypeMocks.byTypeCode.CATEGORY_PAGE.typeCode, uriContextMocks))
                .toBeResolvedWithData([new pageDisplayConditionMockClass().VARIANT]);
        });
        it('Page Type with both primary and variation options return both display conditions', function() {
            expect(pageDisplayConditionsService.getNewPageConditions(pageTypeMocks.byTypeCode.CONTENT_PAGE.typeCode, uriContextMocks))
                .toBeResolvedWithData(new pageDisplayConditionMockClass().ALL);
        });

    });

});
