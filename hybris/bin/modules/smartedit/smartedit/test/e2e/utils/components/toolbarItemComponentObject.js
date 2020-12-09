/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function() {

    var componentObject = {
        selectors: {
            getToolbarItemByNameSelector: function(name) {
                return by.cssContainingText(".yTemplateToolbar__action-template span", name);
            }
        },
        assertions: {
            hasToolbarItemByName: function(name) {
                return browser.waitToBeDisplayed(componentObject.selectors.getToolbarItemByNameSelector(name));
            }
        }
    };

    return componentObject;
}();
