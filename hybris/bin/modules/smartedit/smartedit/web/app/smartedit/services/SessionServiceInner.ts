/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, ISessionService} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
export class SessionService extends ISessionService {
	constructor() {
		super();
	}
}