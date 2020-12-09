/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe("GenericEditor permanent POST (case of preview)", function() {

    beforeEach(function() {
        require("../commonFunctions.js");
        browser.get('test/e2e/genericEditor/componentPermanentPOST/genericEditorTest.html');
    });

    it("will retrieve a different ticketId everytime one presses submit", function() {

        expect(element(by.id('ticketId')).getText()).toBe('');

        element(by.name('description')).clear().sendKeys("some description");
        browser.click(by.id('submit'));

        element(by.id('ticketId')).getText().then(function(initialValue) {

            expect(initialValue).toBeDefined();
            expect(initialValue).not.toBe('');

            element(by.name('description')).clear().sendKeys("some other description");
            browser.click(by.id('submit'));
            expect(element(by.id('ticketId')).getText()).toBeDefined();
            expect(element(by.id('ticketId')).getText()).not.toBe('');
            expect(element(by.id('ticketId')).getText()).not.toBe(initialValue);
        });

    });
});
