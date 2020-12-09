/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayFactory} from './gateway/GatewayFactory';
import {SeInjectable} from 'smarteditcommons/di';

@SeInjectable()
export class SmarteditBootstrapGateway {
	constructor(gatewayFactory: GatewayFactory) {
		return gatewayFactory.createGateway('smartEditBootstrap');
	}
}