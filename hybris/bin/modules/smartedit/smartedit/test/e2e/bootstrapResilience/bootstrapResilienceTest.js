/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('E2E Test for bootstrap resilience', function() {
    var perspectives;

    var toolbarItem = require("../utils/components/toolbarItemComponentObject.js");

    beforeEach(function() {
        browser.get('test/e2e/bootstrapResilience/bootstrapResilienceTest.html');
        browser.waitForWholeAppToBeReady();

        perspectives = require("../utils/components/Perspectives.js");
        perspectives.actions.selectPerspective(perspectives.constants.DEFAULT_PERSPECTIVES.ALL);
        browser.waitForWholeAppToBeReady();
        browser.waitForAngularEnabled(true);
    });

    it('GIVEN a SmartEdit container module is not reachable (404) WHEN I load SmartEdit THEN the SmartEdit container still loads successfully', function() {
        expect(element(by.css('[data-item-key="headerToolbar.userAccountTemplate"] button')).isPresent()).toBe(true);
        expect(element(by.css('[data-item-key="headerToolbar.userAccountTemplate"] button')).isDisplayed()).toBe(true);
    });

    it('GIVEN a SmartEdit module is not reachable (404) WHEN I load SmartEdit THEN the SmartEdit application still loads successfully', function() {
        browser.switchToIFrame();
    });

    it('GIVEN an application overrides dummyCmsDecorators module (inner), decorator is effectively overriden', function() {
        browser.switchToIFrame();
        expect(perspectives.elements.deprecated_getElementInOverlay('component1', 'componentType1').getText()).toContain('_Text_from_overriden_dummy_decorator');
        browser.waitToBeDisplayed(".redBackground");
    });

    it('GIVEN an application overrides dummyToolbar module (outer), toolbar item is effectively overriden', function() {
        toolbarItem.assertions.hasToolbarItemByName("OVVERIDEN_DUMMYTOOLBAR");
    });

});
