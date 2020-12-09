/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';
import {AlertCollectionServiceFacade} from './AlertCollectionServiceFacade';
import {IAlertConfig, IAlertServiceType, PromiseUtils, SeInjectable, TypedMap, WindowUtils} from 'smarteditcommons';
import {Alert} from './Alert';

/**
 * @ngdoc service
 * @name AlertServiceModule.service:AlertFactory
 * @description
 * The alertFactory allows you to create an instances of type Alert.<br />
 * When possible, it is better to use {@link AlertServiceModule.service:AlertService AlertService} to show alerts.<br />
 * This factory is useful when one of the Alert class methods is needed, like
 * hide() or isDisplayed(), or if you want to create a single instance and hide/show when necessary.
 */
@SeInjectable()
export class AlertFactory {
	constructor(
		private promiseUtils: PromiseUtils,
		private windowUtils: WindowUtils,
		private $log: angular.ILogService,
		private sanitize: angular.sanitize.ISanitizeService,
		private alertCollectionServiceFacade: AlertCollectionServiceFacade,
		private lodash: lo.LoDashStatic,
		private SE_ALERT_DEFAULTS: TypedMap<string>
	) {}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertFactory#createAlert
     * @methodOf AlertServiceModule.service:AlertFactory
     * @param {Object | string} alertConf The alert's configuration {@link smarteditServicesModule.interface: IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance
     */
	createAlert(alertConf: IAlertConfig | string): Alert {
		alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
		return this.createAlertObject(alertConf);
	}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertFactory#createInfo
     * @methodOf AlertServiceModule.service:AlertFactory
     * @param {Object | string} alertConf The alert's configuration {@link smarteditServicesModule.interface: IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to INFO
     */
	createInfo(alertConf: IAlertConfig | string): Alert {
		alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
		alertConf.type = IAlertServiceType.INFO;
		return this.createAlertObject(alertConf);
	}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertFactory#createDanger
     * @methodOf AlertServiceModule.service:AlertFactory
     * @param {Object | string} alertConf The alert's configuration {@link smarteditServicesModule.interface: IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to DANGER
     */
	createDanger(alertConf: IAlertConfig | string): Alert {
		alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
		alertConf.type = IAlertServiceType.DANGER;
		return this.createAlertObject(alertConf);
	}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertFactory#createWarning
     * @methodOf AlertServiceModule.service:AlertFactory
     * @param {Object | string} alertConf The alert's configuration {@link smarteditServicesModule.interface: IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to WARNING
     */
	createWarning(alertConf: IAlertConfig | string): Alert {
		alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
		alertConf.type = IAlertServiceType.WARNING;
		return this.createAlertObject(alertConf);
	}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertFactory#createSuccess
     * @methodOf AlertServiceModule.service:AlertFactory
     * @param {Object | string} alertConf The alert's configuration {@link smarteditServicesModule.interface: IAlertConfig IAlertConfig}
     * @returns {Alert} An {@link Alert Alert} instance with type set to SUCCESS
     */
	createSuccess(alertConf: IAlertConfig | string): Alert {
		alertConf = this.getAlertConfigFromStringOrConfig(alertConf);
		alertConf.type = IAlertServiceType.SUCCESS;
		return this.createAlertObject(alertConf);
	}

    /**
     * Allow the user to pass a str param or config object
     * Will convert a str param to { message: str }
     */
	private getAlertConfigFromStringOrConfig(strOrConf: IAlertConfig | string): IAlertConfig {
		if (typeof strOrConf === 'string') {
			return {
				message: strOrConf
			};
		}
		return strOrConf;
	}

    /**
     * Create an Alert object
     */
	private createAlertObject(alertConf: IAlertConfig) {
		return new Alert(
			alertConf,
			this.promiseUtils,
			this.windowUtils,
			this.$log,
			this.lodash,
			this.sanitize,
			this.alertCollectionServiceFacade,
			this.SE_ALERT_DEFAULTS
		);
	}
}
