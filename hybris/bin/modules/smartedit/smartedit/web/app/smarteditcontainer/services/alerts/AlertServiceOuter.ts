/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, IAlertConfig, IAlertService, SeInjectable} from 'smarteditcommons';
import {AlertFactory} from './AlertFactory';
import {AlertCollectionLegacySupport} from './AlertCollectionLegacySupport';


/**
 * @ngdoc service
 * @name AlertServiceModule.service:AlertService
 * @description
 * The alert service provides a simple interface for presenting alerts to the user.<br />
 * It acts as a facade to the lower level Alert and AlertFactory.
 */

/** @internal */
@SeInjectable()
@GatewayProxied()
export class AlertService implements IAlertService {
	constructor(
		private alertFactory: AlertFactory,
		private alertCollectionLegacySupport: AlertCollectionLegacySupport
	) {}

    /**
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
	showAlert(alertConf: IAlertConfig | string): void {
		const alert = this.alertFactory.createAlert(alertConf);
		alert.show();
	}

    /**
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
	showInfo(alertConf: IAlertConfig | string): void {
		const alert = this.alertFactory.createInfo(alertConf);
		alert.show();
	}

    /**
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
	showDanger(alertConf: IAlertConfig | string): void {
		const alert = this.alertFactory.createDanger(alertConf);
		alert.show();
	}

    /**
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
	showWarning(alertConf: IAlertConfig | string): void {
		const alert = this.alertFactory.createWarning(alertConf);
		alert.show();
	}

    /**
     * Displays an alert to the user. <br />
     * Convenience method to create an alert and call.show() on it immediately.
     */
	showSuccess(alertConf: IAlertConfig | string): void {
		const alert = this.alertFactory.createSuccess(alertConf);
		alert.show();
	}

	// ================= LEGACY FUNCTIONS =================

    /**
     * @deprecated since 1905
     */
	pushAlerts(alerts: any): void {
		alerts.forEach((alert: any) => {
			this.showAlert(alert);
		});
	}

    /**
     * @deprecated since 1905
     */
	removeAlertById(id: string): void {
		this.alertCollectionLegacySupport.removeAlertById(id);
	}
}
