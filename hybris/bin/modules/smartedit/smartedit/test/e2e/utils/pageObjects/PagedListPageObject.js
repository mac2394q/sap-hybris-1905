/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {
    var componentObject = {};

    componentObject.elements = {
        totalPageCount: function() {
            return element(by.css('.se-page-list__page-count'));
        },
        displayedPageCount: function() {
            return element.all(by.css('.se-paged-list-table tbody tr')).count();
        },
        paginationCount: function() {
            return element.all(by.css('ul.pagination > li')).count();
        },
        searchInput: function() {
            return element(by.css('.page-list-search > input'));
        },
        columnHeaderForKey: function(key) {
            return element(by.css('.se-paged-list-table thead tr:first-child .se-paged-list__header-' + key));
        },
        firstRowForKey: function(key) {
            return element(by.css('.se-paged-list-table tbody tr:first-child .se-paged-list-item-' + key));
        },
        lastRowForKey: function(key) {
            return element(by.css('.se-paged-list-table tbody tr:last-child .se-paged-list-item-' + key));
        },
        elemForKeyAndRow: function(key, row, selector) {
            return element(by.css('.se-paged-list-table tbody tr:nth-child(' + row + ') .se-paged-list-item-' + key + ' ' + selector));
        },
        catalogName: function() {
            return element(by.css('.se-page-list__catalog-name'));
        }
    };

    componentObject.actions = {
        openAndBeReady: function(pageListType, PERSPECTIVE_SERVICE_RESULT) {
            PERSPECTIVE_SERVICE_RESULT = PERSPECTIVE_SERVICE_RESULT || false;

            componentObject.pageURI = '';
            if (pageListType === 'clientPagedList') {
                componentObject.pageURI = 'test/e2e/clientPagedList/clientPagedList.html?perspectiveServiceResult=' + PERSPECTIVE_SERVICE_RESULT;
            } else if (pageListType === 'dynamicPagedList') {
                componentObject.pageURI = 'test/e2e/dynamicPagedList/dynamicPagedList.html?perspectiveServiceResult=' + PERSPECTIVE_SERVICE_RESULT;
            }

            browser.get(componentObject.pageURI);
        },
        openMoreMenuFirstElement: function() {
            return element.all(by.css('.y-dropdown-more-menu')).first().click();
        },
        searchForPage: function(query, expectedNumber) {
            componentObject.elements.searchInput().clear();
            componentObject.elements.searchInput().sendKeys(query);

            expect(componentObject.elements.totalPageCount().getText()).toBe("(" + expectedNumber.toString() + " se.pagelist.countsearchresult)");
            expect(componentObject.elements.displayedPageCount()).toBe(expectedNumber);
        },
        navigateToIndex: function(index) {
            return browser.executeScript('window.scrollTo(0,document.body.scrollHeight);').then(function() {
                browser.click(element(by.cssContainingText('.fd-pagination > ul > li a', index.toString())));
            });
        },
        clickOnColumnHeader: function(key) {
            browser.click(componentObject.elements.columnHeaderForKey(key));
        }
    };

    componentObject.assertions = {
        searchAndAssertCount: function(query, displayedResults, totalResults) {
            componentObject.elements.searchInput().clear();
            componentObject.elements.searchInput().sendKeys(query);

            expect(componentObject.elements.totalPageCount().getText()).toBe("(" + totalResults.toString() + ")");
            expect(componentObject.elements.displayedPageCount()).toBe(displayedResults);
        }
    };


    return componentObject;

})();
