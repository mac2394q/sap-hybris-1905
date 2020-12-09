/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe("GenericEditor With Only External", function() {
    beforeEach(function(done) {
        browser.get('test/e2e/genericEditor/componentWithOnlyExternal/genericEditorTest.html');
        browser.waitForPresence("generic-editor").then(function() {
            done();
        });
    });

    it("GIVEN only external attribute is present WHEN the component is rendered then external attribute is a checkbox", function() {
        expect(element(by.css("[id='external-checkbox']")).isPresent()).toBe(true);
    });
});
