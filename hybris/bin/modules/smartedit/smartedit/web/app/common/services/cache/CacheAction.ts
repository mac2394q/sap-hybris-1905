/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:CacheAction
 * @description
 * A {@link smarteditServicesModule.object:@Cached @Cached} annotation is associated to a CacheAction.
 */
export class CacheAction {

	public name: string;

	constructor(name: string) {
		this.name = name;
	}

}