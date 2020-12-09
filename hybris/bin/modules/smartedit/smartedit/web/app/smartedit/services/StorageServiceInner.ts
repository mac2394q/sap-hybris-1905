/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IStorageService, SeDowngradeService} from 'smarteditcommons';

/** @internal */
@SeDowngradeService()
@GatewayProxied()
export class StorageService extends IStorageService {
	constructor() {
		super();
	}
}