/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('pageRestrictionsCriteriaService', function() {

    var pageRestrictionsCriteriaService;

    beforeEach(angular.mock.module('pageRestrictionsCriteriaModule'));

    beforeEach(inject(function(_pageRestrictionsCriteriaService_) {
        pageRestrictionsCriteriaService = _pageRestrictionsCriteriaService_;
    }));

    // ------------------------------------------------------------------------------------------

    it('should return all criteria options', function() {
        expect(pageRestrictionsCriteriaService.getRestrictionCriteriaOptions().length).toBe(2);
        expect(pageRestrictionsCriteriaService.getRestrictionCriteriaOptions()[0].value).toBe(false);
        expect(pageRestrictionsCriteriaService.getRestrictionCriteriaOptions()[1].value).toBe(true);
    });

    it('should get the "All" restriction criteria from a given page object', function() {
        var fakePage = {
            onlyOneRestrictionMustApply: false
        };
        expect(pageRestrictionsCriteriaService.getRestrictionCriteriaOptionFromPage(fakePage))
            .toBe(pageRestrictionsCriteriaService.getRestrictionCriteriaOptions()[0]);
    });

    it('should get the "Any" restriction criteria from a given page object', function() {
        var fakePage = {
            onlyOneRestrictionMustApply: true
        };
        expect(pageRestrictionsCriteriaService.getRestrictionCriteriaOptionFromPage(fakePage))
            .toBe(pageRestrictionsCriteriaService.getRestrictionCriteriaOptions()[1]);
    });

});
