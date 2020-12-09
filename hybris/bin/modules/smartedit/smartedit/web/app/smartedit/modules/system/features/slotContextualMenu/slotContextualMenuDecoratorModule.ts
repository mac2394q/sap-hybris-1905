/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
import * as angular from 'angular';
import {
	moduleUtils,
	ComponentAttributes,
	IContextualMenuButton,
	IOnChangesObject,
	ISeComponent,
	SeInjectable,
	SeModule,
	SeModuleConstructor,
	SystemEventService
} from 'smarteditcommons';
import {BaseContextualMenuController, ContextualMenuDecoratorModule} from '../contextualMenu/contextualMenuDecoratorModule';
import {ContextualMenu, ContextualMenuService, PermissionService, SmarteditServicesModule} from 'smartedit/services';

@SeInjectable()
export class SlotContextualMenuController extends BaseContextualMenuController implements ISeComponent {

	public smarteditComponentType: string;
	public smarteditComponentId: string;
	public smarteditContainerType: string;
	public smarteditContainerId: string;
	public smarteditSlotId: string;
	public smarteditSlotUuid: string;
	public componentAttributes: ComponentAttributes;

	public showItems = false;
	public items: ContextualMenu;

	private oldRightMostOffsetFromPage: number = null;
	private maxContextualMenuItems = 3;
	private permissionsObject: any;
	private showSlotMenuUnregFn: () => void;
	private hideSlotMenuUnregFn: () => void;
	private refreshContextualMenuUnregFn: () => void;
	private hideSlotUnSubscribeFn: () => void;
	private showSlotUnSubscribeFn: () => void;

	constructor(
		private $timeout: angular.ITimeoutService,
		private $element: JQuery<HTMLElement>,
		private SHOW_SLOT_MENU: string,
		private HIDE_SLOT_MENU: string,
		private REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT: string,
		private systemEventService: SystemEventService,
		private contextualMenuService: ContextualMenuService,
		private permissionService: PermissionService,
		private yjQuery: JQueryStatic,
		throttle: (func: (...args: any[]) => any, maxWait: number) => any
	) {
		super();

		const THROTTLE_DELAY = 200;
		this.positionPanelHorizontally = throttle(this.positionPanelHorizontally, THROTTLE_DELAY);
		this.positionPanelVertically = throttle(this.positionPanelVertically, THROTTLE_DELAY);
		this.hidePadding = throttle(this.hidePadding, THROTTLE_DELAY);

	}

	$onChanges(changes: IOnChangesObject) {

		if (changes.active) {
			this.$timeout(() => {
				this.hidePadding();
				if (this.active) {
					this.positionPanelVertically();
					this.positionPanelHorizontally();
				}
			});
		}

	}

	$onInit() {
		this.updateItems();

		this.permissionsObject = [{
			names: ["se.slot.not.external"],
			context: {
				slotCatalogVersionUuid: this.componentAttributes.smarteditCatalogVersionUuid
			}
		}];

		this.permissionService.isPermitted(this.permissionsObject).then((isAllowed) => {
			this.showItems = isAllowed;

			this.showSlotMenuUnregFn = this.systemEventService.subscribe(this.smarteditComponentId + this.SHOW_SLOT_MENU, (eventId: string, slotId: string): void => {
				this.remainOpenMap.slotMenuButton = true;
				this.positionPanelVertically();
				this.positionPanelHorizontally();
			});

			this.hideSlotMenuUnregFn = this.systemEventService.subscribe(this.HIDE_SLOT_MENU, (): void => {
				if (this.remainOpenMap.slotMenuButton) {
					delete this.remainOpenMap.slotMenuButton;
				}
				this.hidePadding();
			});

			this.refreshContextualMenuUnregFn = this.systemEventService.subscribe(this.REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT, this.updateItems);

		});

	}

	$doCheck = () => {
		const rightMostOffsetFromPage = this.getRightMostOffsetFromPage();
		if (this.active && !isNaN(rightMostOffsetFromPage) && rightMostOffsetFromPage !== this.oldRightMostOffsetFromPage) {
			this.oldRightMostOffsetFromPage = rightMostOffsetFromPage;
			this.positionPanelHorizontally(rightMostOffsetFromPage);
		}
	}

	$onDestroy() {
		if (this.showSlotMenuUnregFn) {
			this.showSlotMenuUnregFn();
		}
		if (this.hideSlotMenuUnregFn) {
			this.hideSlotMenuUnregFn();
		}
		if (this.refreshContextualMenuUnregFn) {
			this.refreshContextualMenuUnregFn();
		}
		if (this.hideSlotUnSubscribeFn) {
			this.hideSlotUnSubscribeFn();
		}
		if (this.showSlotUnSubscribeFn) {
			this.showSlotUnSubscribeFn();
		}
	}


	updateItems = (): void => {
		this.contextualMenuService.getContextualMenuItems({
			componentType: this.smarteditComponentType,
			componentId: this.smarteditComponentId,
			containerType: this.smarteditContainerType,
			containerId: this.smarteditContainerId,
			componentAttributes: this.componentAttributes,
			iLeftBtns: this.maxContextualMenuItems,
			element: this.$element
		}).then((newItems) => {
			this.items = newItems;
		});
	}

	triggerMenuItemAction = (item: IContextualMenuButton, $event: Event): void => {
		item.action.callback({
			componentType: this.smarteditComponentType,
			componentId: this.smarteditComponentId,
			containerType: this.smarteditContainerType,
			containerId: this.smarteditContainerId,
			componentAttributes: this.componentAttributes,
			slotId: this.smarteditSlotId,
			slotUuid: this.smarteditSlotUuid,
			element: this.$element
		}, $event);
	}

	getItems(): ContextualMenu {
		return this.items;
	}

	private hidePadding(): void {
		this.$element.find('.se-decorative-body__padding--left').css('display', 'none');
		this.$element.find('.se-decorative-body__padding--right').css('display', 'none');
	}

	private getRightMostOffsetFromPage(): number {
		const $decorativePanel = this.$element.find('.se-decorative-panel-area');
		return this.$element.offset().left + $decorativePanel.width();
	}

	private positionPanelHorizontally = (rightMostOffsetFromPage?: number): void => {
		const $decorativePanel = this.$element.find('.se-decorative-panel-area');

		rightMostOffsetFromPage = rightMostOffsetFromPage !== undefined ? rightMostOffsetFromPage : this.getRightMostOffsetFromPage();

		// Calculate if the slot is overflowing the body width.
		const isOnLeft = rightMostOffsetFromPage >= this.yjQuery('body').width();

		if (isOnLeft) {
			const offset = $decorativePanel.outerWidth() - this.$element.find('.se-wrapper-data').width();
			$decorativePanel.css('margin-left', -offset);
			this.$element.find('.se-decorative-body__padding--left').css('margin-left', -offset);
		}

		// Hide all paddings and show the left or right one.
		this.hidePadding();
		this.$element.find(isOnLeft ? '.se-decorative-body__padding--left' : '.se-decorative-body__padding--right').css('display', 'flex');
	}

	private positionPanelVertically = (): void => {
		const decorativePanelArea = this.$element.find('.se-decorative-panel-area');
		const decoratorPaddingContainer = this.$element.find('.se-decoratorative-body-area');
		let marginTop;
		const height = decorativePanelArea.height();
		if (this.$element.offset().top <= height) {
			const borderOffset = 6; // accounts for 3px border around the slots

			marginTop = decoratorPaddingContainer.height() + borderOffset;
			decoratorPaddingContainer.css('margin-top', -(marginTop + height));
		} else {
			marginTop = -32;
		}
		decorativePanelArea.css('margin-top', marginTop);
	}

}

@SeModule({
	imports: [
		SmarteditServicesModule,
		ContextualMenuDecoratorModule,
		'ui.bootstrap',
	],
	providers: [
		...moduleUtils.provideValues({
			SHOW_SLOT_MENU: '_SHOW_SLOT_MENU',
			HIDE_SLOT_MENU: 'HIDE_SLOT_MENU'
		})
	]
})
export class SlotContextualMenuDecoratorModule {}

angular.module((SlotContextualMenuDecoratorModule as SeModuleConstructor).moduleName)
	.directive('slotContextualMenu', () => {
		return {
			templateUrl: 'slotContextualMenuDecoratorTemplate.html',
			restrict: 'C',
			transclude: true,
			replace: false,
			controller: SlotContextualMenuController,
			controllerAs: 'ctrl',
			scope: {},
			bindToController: {
				smarteditComponentId: '@',
				smarteditComponentType: '@',
				componentAttributes: '<',
				active: '<'
			}
		};
	});
