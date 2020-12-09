/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons';
import {Alert} from './Alert';

/** @internal */
@SeInjectable()
export class AlertCollection {
	private alerts: Alert[];

	constructor() {
		this.alerts = [];
	}

	getAlerts(): Alert[] {
		return this.alerts;
	}

	addAlert(newAlert: Alert): void {
		this.alerts = [newAlert, ...this.alerts];
	}

	removeAlert(alertToRemove: Alert): void {
		this.alerts = this.alerts.filter((alert) => alert !== alertToRemove);
	}
}
