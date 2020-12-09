/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('Integration of toolbar directives into the framework', function() {

    beforeEach(function() {
        browser.get('test/e2e/toolbars/frameworkIntegration/frameworkIntegrationTest.html');
    });

    /*seems to break with new double bootstrapping of smarteditcontainer*/
    describe('availability of SmartEdit title toolbar and experience selector toolbar', function() {

        it('SmartEdit title toolbar and experience selector toolbar exists and are correctly bootstrapped', function() {
            browser.waitForVisibility(by.css("div.se-toolbar--shell"));
            browser.waitForVisibility(by.css("div.se-toolbar--experience"));
            browser.waitForVisibility(by.css("div.se-toolbar--perspective"));
        });
    });
});
