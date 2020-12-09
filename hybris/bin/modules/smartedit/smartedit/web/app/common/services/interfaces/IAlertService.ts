/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
export enum IAlertServiceType {
	INFO = 'information',
	SUCCESS = 'success',
	WARNING = 'warning',
	DANGER = 'error'
}

export interface IAlertConfig {
	message?: string;
	type?: IAlertServiceType;
	messagePlaceholders?: {[key: string]: any};
	template?: string;
	templateUrl?: string;
	closeable?: boolean;
	timeout?: number;
	successful?: boolean;
	id?: string;
	controller?: angular.IControllerConstructor;
}

export abstract class IAlertService {
	showAlert(alertConf: IAlertConfig | string): void {
		'proxyFunction';
		return null;
	}

	showInfo(alertConf: IAlertConfig | string): void {
		'proxyFunction';
		return null;
	}

	showDanger(alertConf: IAlertConfig | string): void {
		'proxyFunction';
		return null;
	}

	showWarning(alertConf: IAlertConfig | string): void {
		'proxyFunction';
		return null;
	}

	showSuccess(alertConf: IAlertConfig | string): void {
		'proxyFunction';
		return null;
	}

	// =========== Legacy functions ===========

    /**
     * @deprecated since 1905
     */
	pushAlerts(alerts: any): void {
		'proxyFunction';
		return null;
	}

    /**
     * @deprecated since 1905
     */
	removeAlertById(id: string): void {
		'proxyFunction';
		return null;
	}
}
