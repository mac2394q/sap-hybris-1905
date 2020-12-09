/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'jasmine';
import {browser} from 'protractor';

describe('DOM Observer -', () => {
	let perspectives;
	const storefront = require("./../utils/components/Storefront.js");
	const smartEditContractChangeListener = require('./smartEditContractChangeListenerPageObject.js');
	const sfBuilder = require('../../../smartedit-build/test/e2e/componentObjects/sfBuilderComponentObject');

	const SLOT_ID = 'slotWrapper';
	const SLOT_TYPE = 'ContentSlot';
	const RESIZE_SLOT_ADDED_ID = 'resizeSlotDomListenerTest';
	const RESIZE_SLOT_ID = 'topHeaderSlot';
	const NEW_COMPONENT_ID = 'asyncComponent';
	const NEW_COMPONENT_TYPE = 'componentType1';
	const RESIZE_COMPONENT_ALIAS = 'resizeComponentDomListenerTest';
	const SIMPLE_DIV_ELEMENT_ID = "simpleDivElement";

	beforeEach(() => {
		browser.get('test/e2e/smartEditContractChangeListener/index.html');
		browser.waitForWholeAppToBeReady();

		perspectives = require("../utils/components/Perspectives.js");
		perspectives.actions.selectPerspective(perspectives.constants.DEFAULT_PERSPECTIVES.ALL);
		browser.waitForWholeAppToBeReady();
	});

	afterEach(() => {
		smartEditContractChangeListener.assertions.overlayAndStoreFrontAreSynced();
	});

	it('WHEN a new component is added and removed THEN the overlay is updated and both slot and component are decorated', () => {

		browser.switchToIFrame();
		storefront.assertions.assertDecoratorShowsOnComponent(SLOT_ID, SLOT_TYPE, "deco3");

		sfBuilder.actions.addComponent(NEW_COMPONENT_ID, SLOT_ID);
		storefront.assertions.assertComponentInOverlayPresent(NEW_COMPONENT_ID, NEW_COMPONENT_TYPE, true);
		storefront.assertions.assertDecoratorShowsOnComponent(NEW_COMPONENT_ID, NEW_COMPONENT_TYPE, ["deco1", "deco2", "deco3"]);

		sfBuilder.actions.removeComponent(NEW_COMPONENT_ID, SLOT_ID);
		storefront.assertions.assertComponentInOverlayPresent(NEW_COMPONENT_ID, NEW_COMPONENT_TYPE, false);
		storefront.assertions.assertDecoratorShowsOnComponent(SLOT_ID, SLOT_TYPE, "deco3");
		storefront.assertions.assertDecoratorDoesntShowOnComponent(NEW_COMPONENT_ID, NEW_COMPONENT_TYPE, ["deco1", "deco2", "deco3"]);

	});

	it('WHEN a component is added and resized THEN both slot and component in overlay are resized and repositioned', () => {
		browser.switchToIFrame();

		sfBuilder.actions.addComponent(RESIZE_COMPONENT_ALIAS, RESIZE_SLOT_ID);
		smartEditContractChangeListener.actions.enlargeComponent();

		const slotInStoreFront = storefront.elements.getComponentById(RESIZE_SLOT_ID);
		const slotInOverlay = storefront.elements.getComponentInOverlayById(RESIZE_SLOT_ID, SLOT_TYPE);

		smartEditContractChangeListener.assertions.elementsHaveSameDimensions(slotInStoreFront, slotInOverlay);
		smartEditContractChangeListener.assertions.elementsHaveSamePosition(slotInStoreFront, slotInOverlay);

		const newComponentInStoreFront = storefront.elements.getComponentById(RESIZE_COMPONENT_ALIAS);
		const newComponentInOverlay = storefront.elements.getComponentInOverlayById(RESIZE_COMPONENT_ALIAS, NEW_COMPONENT_TYPE);

		smartEditContractChangeListener.assertions.elementsHaveSameDimensions(newComponentInStoreFront, newComponentInOverlay);
		smartEditContractChangeListener.assertions.elementsHaveSamePosition(newComponentInStoreFront, newComponentInOverlay);

	});

	it('WHEN a slot with a component is added THEN both slot and component in overlay are resized and repositioned', () => {

		// otherSlot
		sfBuilder.actions.addComponent(RESIZE_SLOT_ADDED_ID);
		sfBuilder.actions.addComponent(RESIZE_COMPONENT_ALIAS, RESIZE_SLOT_ADDED_ID);
		smartEditContractChangeListener.actions.enlargeComponent();

		const slotInStoreFront = storefront.elements.getComponentById(RESIZE_SLOT_ADDED_ID);
		storefront.actions.moveToComponent(RESIZE_SLOT_ADDED_ID, SLOT_TYPE);
		const slotInOverlay = storefront.elements.getComponentInOverlayById(RESIZE_SLOT_ADDED_ID, SLOT_TYPE);

		smartEditContractChangeListener.assertions.elementsHaveSameDimensions(slotInStoreFront, slotInOverlay);
		smartEditContractChangeListener.assertions.elementsHaveSamePosition(slotInStoreFront, slotInOverlay);

		const newComponentInStoreFront = storefront.elements.getComponentById(RESIZE_COMPONENT_ALIAS);
		const newComponentInOverlay = storefront.elements.getComponentInOverlayById(RESIZE_COMPONENT_ALIAS, NEW_COMPONENT_TYPE);

		smartEditContractChangeListener.assertions.elementsHaveSameDimensions(newComponentInStoreFront, newComponentInOverlay);
		smartEditContractChangeListener.assertions.elementsHaveSamePosition(newComponentInStoreFront, newComponentInOverlay);

	});

	it('WHEN a slot with component is removed, the overlay counterparts are removed and no decorator shows', () => {

		sfBuilder.actions.addComponent(RESIZE_SLOT_ADDED_ID);
		sfBuilder.actions.addComponent(RESIZE_COMPONENT_ALIAS, RESIZE_SLOT_ADDED_ID);

		storefront.actions.moveToComponent(RESIZE_SLOT_ADDED_ID, SLOT_TYPE);

		smartEditContractChangeListener.assertions.overlayAndStoreFrontAreSynced();

		sfBuilder.actions.removeComponent(RESIZE_SLOT_ADDED_ID);

		browser.switchToIFrame();

		storefront.assertions.assertComponentInOverlayPresent(RESIZE_COMPONENT_ALIAS, NEW_COMPONENT_TYPE, false);
		storefront.assertions.assertDecoratorDoesntShowOnComponent(RESIZE_COMPONENT_ALIAS, NEW_COMPONENT_TYPE, ["deco1", "deco2", "deco3"]);

		storefront.assertions.assertComponentInOverlayPresent(RESIZE_SLOT_ADDED_ID, SLOT_TYPE, false);
		storefront.assertions.assertDecoratorDoesntShowOnComponent(RESIZE_SLOT_ADDED_ID, SLOT_TYPE, "deco3");
	});

	it('WHEN a component mutates to another type, a new decorator is applied and the former removed', () => {

		sfBuilder.actions.addComponent(NEW_COMPONENT_ID, SLOT_ID);
		smartEditContractChangeListener.actions.toggleComponentType();

		browser.switchToIFrame();

		storefront.assertions.assertDecoratorDoesntShowOnComponent(NEW_COMPONENT_ID, NEW_COMPONENT_TYPE, ["deco1", "deco2", "deco3"]);
		storefront.assertions.assertDecoratorDoesntShowOnComponent(NEW_COMPONENT_ID, NEW_COMPONENT_TYPE, "deco2");
	});

	it('WHEN deep-linking to another page THEN the DOM Observer notifies of the change', () => {
		browser.switchToIFrame();

		smartEditContractChangeListener.assertions.pageHasChanged("paged changed to homepage");

		smartEditContractChangeListener.actions.changePage();

		browser.switchToIFrame();

		smartEditContractChangeListener.assertions.pageHasChanged("paged changed to demo_storefront_page_id");
		storefront.assertions.assertDecoratorShowsOnComponent('staticDummyComponent', NEW_COMPONENT_TYPE, "deco4");
	});

	it('WHEN re-rendering a component THEN the component is still visible in the overlay', () => {
		sfBuilder.actions.rerenderComponent('component4', 'bottomHeaderSlot');
		storefront.assertions.assertComponentInOverlayPresent('component4', 'componentType4', true);
	});

	it("GIVEN an simple div WHEN it is converted to component THEN it should be rendered", () => {
		// GIVEN		
		smartEditContractChangeListener.actions.createSimpleDivElement();
		browser.switchToIFrame();
		storefront.assertions.assertDecoratorDoesntShowOnComponent(SIMPLE_DIV_ELEMENT_ID, NEW_COMPONENT_TYPE, "deco1");

		// WHEN
		smartEditContractChangeListener.actions.convertSimpleDivToComponent();
		browser.switchToIFrame();

		// THEN		
		storefront.assertions.assertDecoratorShowsOnComponent(SIMPLE_DIV_ELEMENT_ID, NEW_COMPONENT_TYPE, "deco1");
	});

	it("GIVEN component visible in overlay WHEN it is converted to simple div THEN it should be removed from overlay", () => {
		// GIVEN
		smartEditContractChangeListener.actions.createSimpleDivElement();
		smartEditContractChangeListener.actions.convertSimpleDivToComponent();
		storefront.assertions.assertComponentInOverlayPresent(SIMPLE_DIV_ELEMENT_ID, NEW_COMPONENT_TYPE, true);

		// WHEN
		smartEditContractChangeListener.actions.convertComponentToSimpleDiv();
		browser.switchToIFrame();

		// THEN
		storefront.assertions.assertComponentInOverlayPresent(SIMPLE_DIV_ELEMENT_ID, NEW_COMPONENT_TYPE, false);
	});
});
