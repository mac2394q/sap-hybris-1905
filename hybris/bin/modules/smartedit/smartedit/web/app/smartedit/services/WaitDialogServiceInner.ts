/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IWaitDialogService} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
export class WaitDialogService extends IWaitDialogService {
	constructor() {
		super();
	}
}
