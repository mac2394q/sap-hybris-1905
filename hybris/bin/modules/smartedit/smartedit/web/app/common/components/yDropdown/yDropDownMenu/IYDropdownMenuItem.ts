/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @description
 * Interface for dropdownItem Object for {@link yDropDownMenuModule.directive:yDropDownMenu yDropDownMenu} component.
 */
export interface IYDropdownMenuItem {
	key?: string;
	icon?: string;
	template?: string;
	templateUrl?: boolean;
	customCss?: string;
	callback?(): void;
	condition?(): void;
}
