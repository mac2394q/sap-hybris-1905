/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TypedMap} from 'smarteditcommons';

/**
 * @description
 * Interface for synchronization information
 */
export interface ISyncStatus {
	catalogVersionUuid: string;
	dependentItemTypesOutOfSync: TypedMap<string>[];
	itemId: string;
	itemType: string;
	name: string;
	status: string;
	lastSyncStatus: number;
	lastModifiedDate: number;
	selectedDependencies: ISyncStatus[];
	sharedDependencies: ISyncStatus[];
	unavailableDependencies: ISyncStatus[];
}