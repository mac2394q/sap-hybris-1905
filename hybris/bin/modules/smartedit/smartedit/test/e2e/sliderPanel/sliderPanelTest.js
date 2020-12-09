/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe("Slider Panel", function() {

    var componentObjects = require("../utils/components/sliderPanelComponentObjects"),
        pageObjects = require("./sliderPanelTestPageObjects.js");

    beforeEach(function() {
        browser.get("test/e2e/sliderPanel/sliderPanelTest.html");
    });

    describe("Default Rendering:", function() {

        it("GIVEN the page contains a 'modal' slider panel " +
            "WHEN the page gets loaded or when the modal is displayed " +
            "THEN the slider panel is hidden by default",
            function() {

                componentObjects.assertions.assertForNonPresenceOfModalSliderPanel();

                pageObjects.actions.showModal().then(function() {
                    var sliderPanel = componentObjects.elements.getModalSliderPanel();
                    expect(browser.isAbsent(sliderPanel)).toBe(true);
                });

            }
        );

    });

    describe("Slider panel get properly displayed", function() {

        beforeEach(function(done) {
            pageObjects.actions.showSliderPanel();
            done();
        });

        it("GIVEN the page contains a 'modal' slider panel " +
            "Then the slider panel is displayed after clicking on the toggle button",
            function() {
                componentObjects.assertions.assertModalSliderIsPresent();
            });

        it("GIVEN the page contains a 'modal' slider panel " +
            "WHEN the modal and slider panel get displayed " +
            "THEN the save button is rendered as disabled by default",
            function() {
                browser.waitForVisibility(componentObjects.elements.getModalSliderPanelTitle());
                componentObjects.assertions.saveButtonIsDisabledByDefaultInModalSlider();
            }
        );

    });

    describe("Overlaying content is not visible but can be scrolled", function() {

        beforeEach(function() {
            pageObjects.actions.showSliderPanel();
        });

        it("GIVEN the page contains a 'modal' slider panel " +
            "WHEN the slider panel is displayed" +
            "THEN any overlaying content is not visible",
            function() {
                browser.testThatOverflowingContentIsHidden(componentObjects.elements.getModalSliderPanelBody());
            }
        );

    });

    describe("Save is enabled when content is defined as 'isDirty'", function() {

        beforeEach(function() {
            pageObjects.actions.showSliderPanel();
            browser.waitForVisibility(componentObjects.elements.getModalSliderPanel()).then(function() {
                pageObjects.actions.clickOnIsDirtySwitch();
            });
        });

        it("GIVEN the page contains a 'modal' slider panel " +
            "WHEN the slider panel is displayed in dirty mode " +
            "THEN the save button gets enabled and slider panel is hidden on click",
            function() {
                browser.waitForVisibility(componentObjects.elements.getModalSliderPanel());
                componentObjects.assertions.assertModalSliderSaveBtnIsDisplayed();
                componentObjects.assertions.assertModalSliderSaveBtnIsEnabled();

                componentObjects.actions.clickOnModalSliderPanelSaveButton();
                browser.waitForAbsence(componentObjects.elements.getModalSliderPanel());
            }
        );
    });

    describe("Slider panel is hidden on cancel", function() {

        beforeEach(function() {
            pageObjects.actions.showSliderPanel();
        });

        it("GIVEN the page contains a 'modal' slider panel " +
            "WHEN the slider panel is displayed in dirty mode " +
            "THEN the save button gets enabled",
            function() {
                expect(componentObjects.elements.getModalSliderPanel().isDisplayed()).toBe(true);
                componentObjects.actions.clickOnModalSliderPanelCancelButton();
                browser.waitForAbsence(componentObjects.elements.getModalSliderPanel());
            }
        );

    });

    describe("Slider panel shows confirmation on dismiss (callback is called)", function() {

        beforeEach(function() {
            pageObjects.actions.showSliderPanel();
        });

        it("GIVEN the page contains a 'modal' slider panel " +
            "WHEN the dismiss icon is clicked on slider panel " +
            "THEN a confirmation window opens",
            function() {
                browser.waitForVisibility(componentObjects.elements.getModalSliderPanel());
                componentObjects.actions.clickOnModalSliderPanelDismissButton();
                componentObjects.assertions.checkIfConfirmationModalIsPresent();
            }
        );

    });

});
