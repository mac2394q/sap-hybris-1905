/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = {

    // Elements
    removeButtonElement: function() {
        return element(by.cssContainingText('.se-navigation--button', 'Remove'));
    },

    // Actions
    prepareApp: function(done, navigationNodeEditable) {
        browser.executeScript('window.sessionStorage.setItem("navigationNodeEditable", arguments[0])', navigationNodeEditable);
        this.waitForGenericEditorToShow().then(function() {
            done();
        });
    },
    waitForGenericEditorToShow: function() {
        return browser.waitForPresence(by.css("form[name=componentForm]"), "generic editor was not loaded");
    },
    pressRemove: function() {
        return browser.click(this.removeButtonElement());
    },
    pickNode: function(nodeLabel) {
        var nodeSelectorPath = by.xpath("//div/span[.='" + nodeLabel + "']/ancestor::div[2]");
        browser.waitForPresence(nodeSelectorPath);
        return browser.actions().mouseMove(element(nodeSelectorPath)).perform().then(function() {
            return browser.click(by.xpath("//div/span[.='" + nodeLabel + "']/ancestor::div[2]/div[5]/a"));
        });
    },
    isRemoveButtonEnabled: function() {
        return element(by.cssContainingText('se-navigation-node-selector button', 'Remove')).isEnabled();
    },

    // Assertions
    assertOnBreadCrumb: function(namesArray) {
        var breadcrumb = by.css('se-breadcrumb div > div > div.se-breadcrumb__info');
        browser.waitForPresence(breadcrumb);
        return element.all(breadcrumb).then(function(crumbs) {
            return protractor.promise.all(crumbs.map(function(e) {
                return e.element(by.css('.se-breadcrumb__info--level')).getText().then(function(nodeLevel) {
                    return e.element(by.css('.se-breadcrumb__info--name')).getText().then(function(nodeName) {
                        return [nodeLevel, nodeName];
                    });
                });
            })).then(function(names) {
                return expect(names).toEqual(namesArray);
            });
        });
    },
    assertRemoveButtonIsEnabled: function() {
        expect(this.isRemoveButtonEnabled()).toBe(true);
    },
    assertRemoveButtonIsDisabled: function() {
        expect(this.isRemoveButtonEnabled()).toBe(false);
    },
};
