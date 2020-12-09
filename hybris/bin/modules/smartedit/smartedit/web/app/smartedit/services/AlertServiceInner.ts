/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IAlertService, SeInjectable} from 'smarteditcommons';

/** @internal */
@GatewayProxied()
@SeInjectable()
export class AlertService extends IAlertService {}
