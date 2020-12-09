/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';
@SeModule({
	imports: ['smarteditServicesModule'],
	initialize: (
		decoratorService: any,
		contextualMenuService: any,
		smarteditroot: string,
		$templateCache: angular.ITemplateCacheService
	) => {

		$templateCache.put('path/to/dummyTemplate.html',
			"<div> ..... Dummy Template <img src='/static-resources/images/slot_contextualmenu_placeholder_off.png'/>   ..... </div>"
		);

		decoratorService.addMappings({
			'^.*Slot$': ['se.slotContextualMenu']
		});

		decoratorService.enable('se.slotContextualMenu');

		contextualMenuService.addItems({
			'^.*Slot$': [{
				key: 'slot.context.menu.title.dummy1',
				displayClass: 'editbutton se-ctx-menu-element__btn',
				i18nKey: 'slot.context.menu.title.dummy1',
				iconIdle: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_off.png',
				iconNonIdle: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_on.png',
				smallIcon: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_small.png',
				action: {
					callback() {
						addContextualMenuItem('dummy3');
					}
				},
			}, {
				key: 'slot.context.menu.title.dummy2',
				displayClass: 'editbutton se-ctx-menu-element__btn',
				i18nKey: 'slot.context.menu.title.dummy2',
				iconIdle: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_off.png',
				iconNonIdle: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_on.png',
				smallIcon: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_small.png',
				action: {
					callback() {
						addContextualMenuItem('dummy4');
					}
				}
			}, {
				key: 'slot.context.menu.title.dummy6',
				templateUrl: 'path/to/dummyTemplate.html',
				action: {
					callback() {
						addContextualMenuItem('dummy6');
					}
				}
			}]
		});

		const addContextualMenuItem = function(key: any) {
			contextualMenuService.addItems({
				'^.*Slot$': [{
					key: 'slot.context.menu.title' + key,
					displayClass: 'editbutton se-ctx-menu-element__btn',
					i18nKey: 'slot.context.menu.title.' + key,
					iconIdle: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_off.png',
					iconNonIdle: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_on.png',
					smallIcon: smarteditroot + '/static-resources/images/slot_contextualmenu_placeholder_small.png',
					action: {
						callback() {
							addContextualMenuItem('dummy5');
						}
					}
				}]
			});
		};
	}
})
export class InnerSlotDecorators {}
