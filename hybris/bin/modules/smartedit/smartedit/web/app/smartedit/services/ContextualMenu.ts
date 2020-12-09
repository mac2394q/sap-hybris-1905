/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IContextualMenuButton} from 'smarteditcommons';
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:ContextualMenu
 * @description
 * A full representation of a component contextual menu,
 * specifying the layout of {@link smarteditServicesModule.interface:IContextualMenuButton buttons}
 * to be displayed for a speicific smartedit component
 * 
 */
export interface ContextualMenu {

	/**
	 * @ngdoc property
	 * @name leftMenuItems
	 * @propertyOf smarteditServicesModule.interface:ContextualMenu
	 * @description leftMenuItems the ordered list of {@link smarteditServicesModule.interface:IContextualMenuButton IContextualMenuButton}
	 * to appear on the "left" side of the contextual menu
	 */
	leftMenuItems: IContextualMenuButton[];
	/**
	 * @ngdoc property
	 * @name moreMenuItems
	 * @propertyOf smarteditServicesModule.interface:ContextualMenu
	 * @description leftMenuItems the ordered list of {@link smarteditServicesModule.interface:IContextualMenuButton IContextualMenuButton}
	 * to appear under the "more" menu button
	 */
	moreMenuItems: IContextualMenuButton[];
}