/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @description
 * Interface for CMSItem information
 */
export interface CMSItem {
	name: string;
	typeCode: string;
	itemtype?: string;
	uid: string;
	uuid: string;
	catalogVersion: string;
	creationtime?: Date;
	modifiedtime?: Date;
	onlyOneRestrictionMustApply?: boolean;
}
