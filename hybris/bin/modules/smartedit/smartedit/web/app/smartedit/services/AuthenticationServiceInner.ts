/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IAuthenticationService, SeInjectable} from "smarteditcommons";

@GatewayProxied()
@SeInjectable()
export class AuthenticationService extends IAuthenticationService {
	constructor() {
		super();
	}

}