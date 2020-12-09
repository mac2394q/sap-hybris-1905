/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* tslint:disable:max-classes-per-file */
import * as angular from 'angular';
import {
	moduleUtils,
	ComponentAttributes,
	IContextualMenuButton,
	SeInjectable,
	SeModule,
	SeModuleConstructor,
	SystemEventService,
	TypedMap
} from 'smarteditcommons';
import {
	ComponentHandlerService,
	ContextualMenu,
	ContextualMenuService
} from "smartedit/services";

export class BaseContextualMenuController {

	public active: boolean = false;
	public status = {
		isopen: false
	};

	protected remainOpenMap: TypedMap<boolean> = {};

	isHybrisIcon(icon: string): boolean {
		return icon && icon.indexOf("hyicon") >= 0;
	}

    /*
     setRemainOpen receives a key name and a boolean value
     the button name needs to be unique across all buttons so it won' t collide with other button actions.
     */
	setRemainOpen(key: string, remainOpen: boolean): void {
		this.remainOpenMap[key] = remainOpen;
	}

	showOverlay(): boolean {
		if (this.active === true) {
			return true;
		}

		return Object.keys(this.remainOpenMap)
			.reduce((isOpen: boolean, key: string) => {
				return isOpen || this.remainOpenMap[key];
			}, false);
	}

}

@SeInjectable()
export class ContextualMenuController extends BaseContextualMenuController implements angular.IController {

	public smarteditComponentType: string;
	public smarteditComponentId: string;
	public smarteditContainerType: string;
	public smarteditContainerId: string;
	public smarteditSlotId: string;
	public smarteditSlotUuid: string;
	public componentAttributes: ComponentAttributes;

	public items: ContextualMenu;
	public openItem: IContextualMenuButton = null;
	public moreMenuIsOpen = false;

	public slotAttributes: {
		smarteditSlotId: string,
		smarteditSlotUuid: string
	};

	public itemTemplateOverlayWrapper = {
		templateUrl: 'contextualMenuItemOverlayWrapper.html'
	};
	public moreMenuPopupConfig = {
		templateUrl: 'moreItemsTemplate.html',
		halign: 'left'
	};

	public moreButton = {
		displayClass: 'sap-icon--overflow',
		i18nKey: 'se.cms.contextmenu.title.more'
	};

	private displayedItem: IContextualMenuButton;
	private oldWidth: number = null;
	private dndUnRegFn: () => void;
	private unregisterRefreshItems: () => void;

	constructor(
		private $element: JQuery<HTMLElement>,
		private REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT: any,
		private CLOSE_CTX_MENU: string,
		private contextualMenuService: ContextualMenuService,
		private systemEventService: SystemEventService,
		private componentHandlerService: ComponentHandlerService
	) {
		super();

	}

	/*
	* will only init when this.$element.width is not 0, which is what happens after a recompile of decorators called by sakExecutor after perspective change or refresh
	*/
	$doCheck = () => {
		if (this.$element) {
			const width = this.$element.width();
			if (this.oldWidth !== width) {
				this.oldWidth = width;
				this.$onDestroy();
				this.onInit();
			}
		}
	}

	$onDestroy() {
		if (this.dndUnRegFn) {
			this.dndUnRegFn();
		}
		if (this.unregisterRefreshItems) {
			this.unregisterRefreshItems();
		}
	}

	$postLink() {

		this.smarteditSlotId = this.componentHandlerService.getParentSlotForComponent(this.$element);
		this.smarteditSlotUuid = this.componentHandlerService.getParentSlotUuidForComponent(this.$element);
		this.slotAttributes = {
			smarteditSlotId: this.smarteditSlotId,
			smarteditSlotUuid: this.smarteditSlotUuid
		};

		this.onInit();
	}

	onInit() {

		this.updateItems();

		this.dndUnRegFn = this.systemEventService.subscribe(this.CLOSE_CTX_MENU, this.hideAllPopups);
		this.unregisterRefreshItems = this.systemEventService.subscribe(this.REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT, this.updateItems);

	}

	shouldShowTemplate(menuItem: IContextualMenuButton): boolean {
		return this.displayedItem === menuItem;
	}

	onShowItemPopup = (item: IContextualMenuButton): void => {
		this.setRemainOpen('someContextualPopupOverLay', true);

		this.openItem = item;
		(this.openItem as any).isOpen = true; // does anything use this?
	}

	onHideItemPopup = (hideMoreMenu?: boolean): void => {
		if (this.openItem) {
			(this.openItem as any).isOpen = false; // does anything use this?
			this.openItem = null;
		}

		this.displayedItem = null;
		this.setRemainOpen('someContextualPopupOverLay', false);
		if (hideMoreMenu) {
			this.onHideMoreMenuPopup();
		}
	}

	onShowMoreMenuPopup = (): void => {
		this.setRemainOpen('someContextualPopupOverLay', true);
	}

	onHideMoreMenuPopup = (): void => {
		this.moreMenuIsOpen = false;
		this.setRemainOpen('someContextualPopupOverLay', false);
	}

	hideAllPopups = (): void => {
		this.onHideMoreMenuPopup();
		this.onHideItemPopup();
	}

	getItems(): ContextualMenu {
		return this.items;
	}

	showContextualMenuBorders(): boolean {
		return this.active && this.items && this.items.leftMenuItems.length > 0;
	}

	triggerMenuItemAction = (item: IContextualMenuButton, $event: Event): void => {
		if (item.action.template || item.action.templateUrl) {
			if (this.displayedItem === item) {
				this.displayedItem = null;
			} else {
				this.displayedItem = item;
			}
		} else if (item.action.callback) {
			// close any popups
			this.hideAllPopups();
			item.action.callback({
				componentType: this.smarteditComponentType,
				componentId: this.smarteditComponentId,
				containerType: this.smarteditContainerType,
				containerId: this.smarteditContainerId,
				componentAttributes: this.componentAttributes,
				slotId: this.smarteditSlotId,
				slotUuid: this.smarteditSlotUuid,
				element: this.$element,
			}, $event);
		}
	}

	private maxContextualMenuItems(): number {
		const ctxSize = 50;
		const buttonMaxCapacity = Math.round(this.$element.width() / ctxSize) - 1;
		let leftButtons = buttonMaxCapacity >= 4 ? 3 : buttonMaxCapacity - 1;
		leftButtons = (leftButtons < 0 ? 0 : leftButtons);
		return leftButtons;
	}

	private updateItems = (): void => {
		this.contextualMenuService.getContextualMenuItems({
			componentType: this.smarteditComponentType,
			componentId: this.smarteditComponentId,
			containerType: this.smarteditContainerType,
			containerId: this.smarteditContainerId,
			componentAttributes: this.componentAttributes,
			iLeftBtns: this.maxContextualMenuItems(),
			element: this.$element
		}).then((newItems: ContextualMenu) => {
			this.items = newItems;
		});
	}

}

@SeModule({
	imports: [
		'smarteditServicesModule',
		'ui.bootstrap',
		'yPopupOverlayModule',
		'contextualMenuItemModule'
	],
	providers: [
		...moduleUtils.provideValues({
			CTX_MENU_DROPDOWN_IS_OPEN: 'CTX_MENU_DROPDOWN_IS_OPEN',
			CLOSE_CTX_MENU: 'CLOSE_CTX_MENU'
		})
	]
})
export class ContextualMenuDecoratorModule {}

angular.module((ContextualMenuDecoratorModule as SeModuleConstructor).moduleName)
	.directive('contextualMenu', () => {
		return {
			templateUrl: 'contextualMenuDecoratorTemplate.html',
			restrict: 'C',
			transclude: true,
			replace: false,
			controller: ContextualMenuController,
			controllerAs: 'ctrl',
			scope: {},
			bindToController: {
				smarteditComponentId: '@',
				smarteditComponentType: '@',
				smarteditContainerId: '@',
				smarteditContainerType: '@',
				componentAttributes: '<',
				active: '<'
			}
		};
	});
