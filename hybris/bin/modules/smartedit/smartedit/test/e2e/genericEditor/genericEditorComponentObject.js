/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
var dropdownObject = require("./componentWithDropdown/dropdownObject.js");

module.exports = (function() {

    var componentObject = {};

    componentObject.actions = {

        openAndBeReady: function(editorType) {
            if (editorType === 'withDropdown') {
                dropdownObject.actions.openAndBeReady();
            }
        }

    };

    return componentObject;

})();
