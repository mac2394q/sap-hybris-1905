/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
import * as angular from 'angular';
import {Component, NgModule} from '@angular/core';
import {
	diBridgeUtils,
	moduleUtils,
	AbstractDecorator,
	CrossFrameEventService,
	IExperience,
	IFeatureService,
	IPositionRegistry,
	SeComponent,
	SeDecorator,
	SeEntryModule,
	SeModule,
	SeModuleConstructor,
	TypedMap,
	TYPE_ATTRIBUTE
} from 'smarteditcommons';

//////////////// NEW ANGULAR COMPONENT BASED DECORATORS ////////////////

@SeDecorator()
@Component({
	selector: 'deco-1',
	template: "<div style='background: rgba(0, 0, 255, .4); position:relative'><span>deco1 {{smarteditComponentId}} / {{componentAttributes.smarteditComponentId}}</span><ng-content></ng-content></div>",
})
export class Deco1DecoratorComponent extends AbstractDecorator {}

@SeDecorator()
@Component({
	selector: 'deco-3',
	template: "<div style='background: rgba(0, 255, 0, .4); position:relative'><span>deco3 {{smarteditComponentId}} / {{componentAttributes.smarteditComponentId}}</span><ng-content></ng-content></div>",
})
export class Deco3DecoratorComponent extends AbstractDecorator {}


@SeComponent({
	template: "<span>{{$ctrl.getPageChangeMessage()}}</span>"
})
export class PageChangeTestComponent {
	constructor(private $rootScope: angular.IRootScopeService) {}

	getPageChangeMessage() {
		return (this.$rootScope as any).pageChangeMessage;
	}
}

@SeComponent({
	selector: 'e-debugger',
	template: '<button class="btn btn-info btn-sm toggleDebug" ng-click="$ctrl.toggleDebug();"><span ng-if="!$ctrl.showDebug">open</span><span ng-if="$ctrl.showDebug">close</span> debug</button>' +
		'<div ng-show="$ctrl.showDebug">' +
		'<pre>Total SmartEdit components in page: <div id="total-store-front-components"><strong>{{$ctrl.getTotalSmartEditComponents()}}</strong></div></pre>' +
		'<pre>Total visible SmartEdit components: <div id="total-visible-store-front-components"><strong>{{$ctrl.getTotalVisibleSmartEditComponents()}}</strong></div><span data-ng-if="false">{{$ctrl.getVisibleSmartEditComponents() | json}}</span></pre>' +
		'<pre>Total decorators: <div id="total-decorators"><strong>{{$ctrl.getTotalDecorators()}}</strong></div></pre>' +
		'<pre>Total sakExecutor stored elements:<div id="total-sak-executor-elements"><strong>{{$ctrl.getTotalSakExecutorElements()}}</strong></div><span data-ng-if="false">{{$ctrl.getSakExecutorElements() | json}}</span></pre>' +
		'<pre>Total resize eventlisteners in DOM:<div id="total-resize-listeners"><strong>{{$ctrl.getTotalResizeEventListeners()}}</strong></div></pre>' +
		'<pre>Total position eventlisteners in DOM:<div id="total-reposition-listeners"><strong>{{$ctrl.getTotalPositionEventListeners()}}</strong></div></pre>' +
		'<pre>Total components in queue:<div id="total-components-queue"><strong>{{$ctrl.getTotalComponentsQueue()}}</strong></div></pre>' +
		'<pre><span id="healthStatus">{{$ctrl.assertAllGood() ? "OK" : "ERROR (possible leak)"}}</span></pre>' +
		'</div>',
})
export class SakExecutorDebugComponent {

	private visibleElements: Element[] = [];
	private inPageElements: Element[] = [];
	private intersectionObserver: IntersectionObserver;
	private showDebug = true;
	private smartEditAttributeNames: string[];

	constructor(
		private $interval: angular.IIntervalService,
		private legacyDecoratorToCustomElementConverter: any,
		private yjQuery: JQueryStatic,
		private COMPONENT_CLASS: string,
		private ID_ATTRIBUTE: string,
		private UUID_ATTRIBUTE: string,
		private resizeListener: any,
		private positionRegistry: IPositionRegistry,
		private smartEditContractChangeListener: any,
		private isInExtendedViewPort: any,
		private CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS: TypedMap<string>) {
		this.smartEditAttributeNames = [TYPE_ATTRIBUTE, this.ID_ATTRIBUTE, this.UUID_ATTRIBUTE];
	}

	_isInExtendedViewPort(target: Element, isIntersecting: boolean) {
		return this.smartEditContractChangeListener.isExtendedViewEnabled() ? this.isInExtendedViewPort(target) : isIntersecting;
	}

	toggleDebug() {
		this.showDebug = !this.showDebug;
	}

	$onInit() {
		this.showDebug = true;

		this.$interval(() => {
			if (this.intersectionObserver) {
				this.intersectionObserver.disconnect();
			}

			this.intersectionObserver = new IntersectionObserver((entries) => {
				this.cleanVisibleElements();
				entries.filter((entry) => {
					const index = this.visibleElements.indexOf(entry.target);
					if (this._isInExtendedViewPort(entry.target, entry.isIntersecting)) {
						if (index === -1) {
							this.visibleElements.push(entry.target);
						}
					} else {
						if (index !== -1) {
							this.visibleElements.splice(index, 1);
						}
					}
				});

				if (this.smartEditContractChangeListener.isExtendedViewEnabled()) {
					this.visibleElements.filter((element) => {
						return !this.isInExtendedViewPort(element);
					}).forEach((element, index) => {
						this.visibleElements.splice(index, 1);
					});
				}

			}, this.CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS);

			this.inPageElements = Array.prototype.slice.apply(this.yjQuery("." + this.COMPONENT_CLASS));
			this.inPageElements.forEach((element) => {
				this.intersectionObserver.unobserve(element);
				this.intersectionObserver.observe(element);
			});
		}, 500);

	}

	/**
	 * Removes all elements from the visibleElements that dont have smartedit attributes.
	 * This can happen when a smartedit component was converted to a simple element by removing smartedit attributes.
	 */
	cleanVisibleElements(): void {
		const index = this.visibleElements.findIndex((element) => {
			return this.smartEditAttributeNames.every((attributeName) => {
				return !element.hasAttribute(attributeName);
			});
		});
		this.visibleElements.splice(index, 1);
	}

	getTotalDecorators(): number {
		return this.yjQuery(".se-decorator-wrap").length;
	}

	getTotalSmartEditComponents(): number {
		return this.yjQuery("." + this.COMPONENT_CLASS).length;
	}

	getTotalVisibleSmartEditComponents() {
		return this.visibleElements.length;
	}

	getVisibleSmartEditComponents() {
		return this.visibleElements.map((element) => {
			return this.yjQuery(element).attr(this.ID_ATTRIBUTE);
		}).sort();
	}

	getTotalSakExecutorElements() {
		return AbstractDecorator.getScopes().length + this.legacyDecoratorToCustomElementConverter.getScopes().length;
	}

	getSakExecutorElements() {
		const arr: string[] = [];
		arr.concat(AbstractDecorator.getScopes());
		arr.concat(this.legacyDecoratorToCustomElementConverter.getScopes());
		return arr.sort();
	}

	getTotalResizeEventListeners() {
		return (this.resizeListener as any)._listenerCount();
	}

	getTotalPositionEventListeners() {
		return (this.positionRegistry as any)._listenerCount();
	}

	getTotalComponentsQueue() {
		return this.smartEditContractChangeListener._componentsQueueLength();
	}

	assertAllGood() {
		const totalVisibleElements = this.getTotalVisibleSmartEditComponents();

		return this.getTotalDecorators() >= this.getTotalSakExecutorElements() &&
			totalVisibleElements <= this.getTotalPositionEventListeners() &&
			totalVisibleElements <= this.getTotalResizeEventListeners() &&
			this.getTotalPositionEventListeners() === this.getTotalResizeEventListeners() &&
			this.getTotalComponentsQueue() <= this.getTotalSmartEditComponents();
	}

}

@SeEntryModule('innerSECCLDecorators')
@NgModule({
	declarations: [
		Deco1DecoratorComponent,
		Deco3DecoratorComponent,
	],
	entryComponents: [
		Deco1DecoratorComponent,
		Deco3DecoratorComponent,
	],
	exports: [
	],
	providers: [
		diBridgeUtils.upgradeProvider('$q'),
		diBridgeUtils.upgradeProvider('$rootScope'),
		diBridgeUtils.upgradeProvider('decoratorService'),
		diBridgeUtils.upgradeProvider('featureService'),
		diBridgeUtils.upgradeProvider('$interval'),

		moduleUtils.bootstrap((
			$rootScope: angular.IRootScopeService,
			decoratorService: any,
			crossFrameEventService: CrossFrameEventService,
			featureService: IFeatureService) => {

			crossFrameEventService.subscribe("PAGE_CHANGE", (eventId: string, experience: IExperience) => {
				($rootScope as any).pageChangeMessage = "paged changed to " + experience.pageId;
				($rootScope as any).currentPageId = experience.pageId;
				return Promise.resolve();
			});

			decoratorService.addMappings({
				componentType1: ['deco1', 'deco2', 'deco3', 'deco4'],
				componentType2: ['deco2'],
				ContentSlot: ['deco3']
			});

			decoratorService.enable('deco1');
			decoratorService.enable('deco2');
			decoratorService.enable('deco3');

			featureService.addDecorator({
				key: 'deco4',
				nameI18nKey: 'deco4',
				displayCondition() {
					return Promise.resolve(($rootScope as any).currentPageId === 'demo_storefront_page_id');
				}
			});
		}, ['$rootScope', 'decoratorService', CrossFrameEventService, 'featureService'])
	]
})
export class InnerSECCLDecoratorsModule {}

@SeModule({
	imports: [
		'smarteditServicesModule',
		'functionsModule'
	],
	declarations: [
		PageChangeTestComponent,
		SakExecutorDebugComponent
	]
})
export class InnerSECCLDecorators {}


//////////////// LEGACY ANGULARJS DIRECTIVE BASED DECORATORS ////////////////
angular.module((InnerSECCLDecorators as SeModuleConstructor).moduleName)
	.directive("deco2", () => {
		return {
			template: "<div style='background: rgba(255, 0, 0, .4); position:relative'><span>deco2 {{$ctrl.smarteditComponentId}} / {{$ctrl.componentAttributes.smarteditComponentId}}</span><div ng-transclude></div></div>",
			restrict: 'C',
			transclude: true,
			replace: false,
			scope: {},
			controller: () => {
				//
			},
			bindToController: {
				smarteditComponentId: '@',
				smarteditComponentType: '@',
				componentAttributes: '<',
				active: '='
			},
			controllerAs: '$ctrl'
		};
	})
	.directive("deco4", () => {
		return {
			template: "<div style='background: rgba(0, 255, 255, .8); position:relative'><span>deco4 {{$ctrl.smarteditComponentId}} / {{$ctrl.componentAttributes.smarteditComponentId}}</span><div ng-transclude></div></div>",
			restrict: 'C',
			transclude: true,
			replace: false,
			scope: {},
			controller: () => {
				//
			},
			bindToController: {
				smarteditComponentId: '@',
				smarteditComponentType: '@',
				componentAttributes: '<',
				active: '='
			},
			controllerAs: '$ctrl'
		};
	});
