/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('inViewElementObserver -', function() {
    var page = require("../utils/components/Page.js");
    var storefront = require("./../utils/components/Storefront.js");
    var inViewElementObserver = require('./inViewElementObserverPageObject.js');
    var sfBuilder = require('../../../smartedit-build/test/e2e/componentObjects/sfBuilderComponentObject');

    var SLOT_ID = 'headerLinksSlot';
    var INITIAL_ELEMENTS_COUNT = 3;

    beforeEach(function() {
        page.actions.getAndWaitForWholeApp('test/e2e/inViewElementObserver/index.html');

        browser.switchToIFrame();
    });

    it('WHEN initializing (no scroll), only 3 eligible elements are in view', function() {

        inViewElementObserver.assertions.inSync(INITIAL_ELEMENTS_COUNT);
    });

    it('WHEN an out of view component is removed from the DOM, it is removed from the queue but not from the visible elements', function() {

        sfBuilder.actions.removeComponent(SLOT_ID);

        inViewElementObserver.assertions.inSync(INITIAL_ELEMENTS_COUNT);
    });

    it('WHEN an out of view component is addded to the DOM, it is add to the queue but not to the visible elements', function() {

        sfBuilder.actions.addComponent("blabla");

        inViewElementObserver.assertions.inSync(INITIAL_ELEMENTS_COUNT);
    });

    it('WHEN a component is added in view and removed in view, it is added to /removed from the queue and added to /removed from the visible elements', function() {

        inViewElementObserver.assertions.inSync(INITIAL_ELEMENTS_COUNT);

        inViewElementObserver.actions.addComponentAsFirst();

        inViewElementObserver.assertions.inSync(4);

        inViewElementObserver.actions.removeFirstComponent();

        inViewElementObserver.assertions.inSync(INITIAL_ELEMENTS_COUNT);

    });

    it('WHEN scrolling down and back up, the number of visible components adjusts and then resets', function() {

        storefront.actions.moveToComponent("headerLinksSlot", "ContentSlot");

        inViewElementObserver.assertions.inSync(7);

        storefront.actions.moveToComponent("topHeaderSlot", "ContentSlot");

        inViewElementObserver.assertions.inSync(3);
    });
});
