/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe("GenericEditor With Only URL Link", function() {
    beforeEach(function() {
        browser.get('test/e2e/genericEditor/componentWithOnlyUrlLink/genericEditorTest.html');
    });

    it("GIVEN only urlLink attribute is present WHEN the component is rendered then external urlLink is a textbox (shortstring)", function() {
        expect(element(by.css("[id='urlLink-shortstring']")).isPresent()).toBe(true);
    });
});
