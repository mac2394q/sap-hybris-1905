/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
var path = require('path');

module.exports = (function() {

    var pageObject = {};

    pageObject.constants = {};
    pageObject.elements = {};

    pageObject.actions = {
        bootstrap: function(testName, done) {
            var pathToTest = path.join('smarteditcontainerJSTests/e2e/genericEditor', testName, 'genericEditorTest.html');
            browser.get(pathToTest);
            done();
        }
    };


    return pageObject;
})();
