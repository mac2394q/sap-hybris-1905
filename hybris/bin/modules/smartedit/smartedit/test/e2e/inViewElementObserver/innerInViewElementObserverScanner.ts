/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
import {
	InViewElementObserver,
	SeComponent,
	SeModule
} from 'smarteditcommons';

@SeComponent({
	selector: 'e-debugger',
	template: `
    <button class="btn btn-info btn-sm toggleDebug" ng-click="$ctrl.toggleDebug();"><span ng-if="!$ctrl.showDebug">open</span><span ng-if="$ctrl.showDebug">close</span> debug</button>
        <div ng-show="$ctrl.showDebug">' +
        <button id="removeFirstComponent" class="btn btn-info btn-sm" ng-click="$ctrl.removeFirstComponent();">remove first eligible component</button>
        <button id="addComponentAsFirst"  class="btn btn-info btn-sm" ng-click="$ctrl.addComponentAsFirst();">add eligible component as first</button>
        <pre>Total eligible components in page: <div id="total-eligible-components"><strong>{{$ctrl.getReallyEligibleElements()}}</strong></div></pre>
        <pre>Total eligible components according to observer: <div id="total-eligible-components-from-observer"><strong>{{$ctrl.getEligibleElements()}}</strong></div></pre>
        <pre>Total visible components according to observer: <div id="total-visible-eligible-components-from-observer"><strong>{{$ctrl.getInViewElements()}}</strong></div><span data-ng-if="false">{{$ctrl.getVisibleSmartEditComponents() | json}}</span></pre>
    </div>`,

})
export class ScannerDebugComponent {

	public showDebug = true;

	constructor(
		private inViewElementObserver: InViewElementObserver,
		private yjQuery: JQueryStatic,
		private TEST_TARGET_SELECTOR: string) {
	}

	$onInit() {
		this.showDebug = true;
	}

	toggleDebug() {
		this.showDebug = !this.showDebug;
	}

	getReallyEligibleElements() {
		return this.yjQuery(this.TEST_TARGET_SELECTOR).length;
	}

	getEligibleElements() {
		return this.inViewElementObserver.getAllElements().length;
	}

	getInViewElements() {
		return this.inViewElementObserver.getInViewElements().length;
	}

	removeFirstComponent() {
		this.yjQuery(this.TEST_TARGET_SELECTOR + ':first').remove();
	}

	addComponentAsFirst() {
		this.yjQuery('body').prepend(this.yjQuery("<div class='smartEditComponent' data-smartedit-component-type='ContentSlot'>AAAAAA</div>"));
	}

}

@SeModule({
	declarations: [ScannerDebugComponent],
	providers: [
		{
			provide: 'TEST_TARGET_SELECTOR',
			useValue: ".smartEditComponent[data-smartedit-component-type='ContentSlot']"
		}
	],
	initialize: (inViewElementObserver: InViewElementObserver, TEST_TARGET_SELECTOR: string) => {

		inViewElementObserver.addSelector(TEST_TARGET_SELECTOR);
	}
})
export class InnerInViewElementObserverScanner {}
