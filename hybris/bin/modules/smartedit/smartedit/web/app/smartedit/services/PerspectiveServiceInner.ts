/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IPerspectiveService} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
export class PerspectiveService extends IPerspectiveService {
	constructor() {
		super();
	}
}