/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
var InflectionPoint = require('./inflectionPointObject.js');

describe(
    'end-to-end Test for inflection point module',
    function() {
        var page;
        beforeEach(function() {

            page = new InflectionPoint();
            browser.waitForWholeAppToBeReady();

        });

        it(
            "Upon loading SmartEdit, inflection-point-selector should be displayed and select the first option. On selection width of the iframe should be changed",
            function() {
                browser.click(page.inflectionMenu);
                browser.click(page.firstInflectionDevice);
                expect(page.iframeWidth).toBe(page.firstDeviceWidth);

            });


    });
