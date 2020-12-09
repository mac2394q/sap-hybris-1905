/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons/di/SeInjectable';
import {GatewayFactory} from '../gateway/GatewayFactory';

/** @internal */
@SeInjectable()
export class LanguageServiceGateway {
	constructor(gatewayFactory: GatewayFactory) {
		return gatewayFactory.createGateway('languageSwitch');
	}
}
