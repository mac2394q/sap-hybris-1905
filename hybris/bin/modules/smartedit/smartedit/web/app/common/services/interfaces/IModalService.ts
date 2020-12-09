/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface IModalService {
	open: (config: {
		title?: string,
		titleSuffix?: string,
		cssClasses?: string,
		buttons?: any[],
		size?: string,
		templateInline?: string,
		templateUrl?: string,
		template?: string,
		animation?: boolean,
		controller: angular.IControllerConstructor
	}) => angular.IPromise<any>;
	close: (data?: any) => void;
	dismiss: (data?: any) => void;
}
