/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint undef:false */
describe("GenericEditor localized components", function() {

    beforeEach(function() {
        require("../commonFunctions.js");
        browser.get('test/e2e/genericEditor/localizedComponents/genericEditorTest.html');
    });

    it("will display content tabs for en and de only", function() {
        expect(getLocalizedTabElement('en', 'content').isPresent()).toBeTruthy();
        expect(getLocalizedTabElement('de', 'content').isPresent()).toBeTruthy();

        expect(browser.waitForAbsence(getLocalizedTabElement('pl', 'content'))).toBeTruthy();
        expect(browser.waitForAbsence(getLocalizedTabElement('it', 'content'))).toBeTruthy();
        expect(browser.waitForAbsence(getLocalizedTabElement('hi', 'content'))).toBeTruthy();
    });
});
