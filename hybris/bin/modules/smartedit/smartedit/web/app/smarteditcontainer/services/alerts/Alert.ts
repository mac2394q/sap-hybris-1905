/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc service
 * @name AlertServiceModule.service:AlertFactory
 */

import * as angular from 'angular';
import * as lo from 'lodash';
import {AlertCollectionServiceFacade} from './AlertCollectionServiceFacade';
import {Deferred, IAlertConfig, IAlertServiceType, PromiseUtils, TypedMap, WindowUtils} from 'smarteditcommons';

export class Alert {
	public promise: Promise<any>;
	private _displayed: boolean;
	private _deferred: Deferred<{}>;
	private timeout: number;
	private timer: NodeJS.Timer;

	constructor(
		private _alertConf: IAlertConfig,
		private promiseUtils: PromiseUtils,
		private windowUtils: WindowUtils,
		private $log: angular.ILogService,
		lodash: lo.LoDashStatic,
		private sanitize: any,
		private alertCollectionServiceFacade: AlertCollectionServiceFacade,
		SE_ALERT_DEFAULTS: TypedMap<string>
	) {
		this.validateAlertConfig(this._alertConf);
		this.sanitizeTemplates(this._alertConf);

		// copy defaults and merge properties onto this
		lodash.defaultsDeep(this, _alertConf, lodash.cloneDeep(SE_ALERT_DEFAULTS));

		this._displayed = false;
	}

	get alertConf(): IAlertConfig {
		return this._alertConf;
	}

    /**
     * Displays the alert to the user.
     */
	show(): void {
		if (this.isDisplayed()) {
			return;
		}

		this.alertCollectionServiceFacade.addAlert(this);

		this._deferred = this.promiseUtils.defer();
		this.promise = this._deferred.promise;
		this._displayed = true;

		if (this.timeout > 0) {
			this.timer = this.windowUtils.runTimeoutOutsideAngular(() => {
				this.hide(true);
			}, this.timeout);
		}
	}

    /**
     * Hides the alert if it is currently being displayed to the user.
     */
	hide(timedOut: boolean): void {
		if (!this.isDisplayed()) {
			return;
		}
		this.alertCollectionServiceFacade.removeAlert(this);

		this._displayed = false;
		if (this.timer) {
			clearTimeout(this.timer);
			delete this.timer;
		}
		if (!timedOut) {
			timedOut = false;
		}

		this._deferred.resolve(timedOut);
	}

	isDisplayed(): boolean {
		return this._displayed;
	}

    /**
     * Validates the alertConfig.
     */
	private validateAlertConfig(alertConf: IAlertConfig): void {
		if (alertConf.successful) {
			this.fixLegacyAlert(alertConf);
		}
		if (!alertConf.message && !alertConf.template && !alertConf.templateUrl) {
			this.$log.warn(
				'alertService._validateAlertConfig - alert must contain at least a message, template, or templateUrl property',
				alertConf
			);
		}
		if (alertConf.messagePlaceholders && !angular.isObject(alertConf.messagePlaceholders)) {
			throw new Error('alertService._validateAlertConfig - property messagePlaceholders should be an object');
		}
		if (
			(alertConf.message && (alertConf.template || alertConf.templateUrl)) ||
			(alertConf.template && (alertConf.message || alertConf.templateUrl)) ||
			(alertConf.templateUrl && (alertConf.message || alertConf.template))
		) {
			throw new Error(
				'alertService._validateAlertConfig - only one template type is allowed for the alert: message, template, or templateUrl'
			);
		}
	}

    /**
     * Sanitizes the template and message.
     */
	private sanitizeTemplates(alertConf: IAlertConfig): void {
		if (alertConf.message) {
			alertConf.message = this.sanitize(alertConf.message);
		} else if (alertConf.template) {
			alertConf.template = alertConf.template;
		}
	}

    /**
     * @deprecated since 1905
     */
	private fixLegacyAlert(legacyAlertConf: IAlertConfig): void {
		if (legacyAlertConf.type) {
			this.$log.warn(
				'alertService validation warning: alert contains both legacy successful ' +
				'property and an alert type for alert: ',
				legacyAlertConf
			);
		} else {
			if (typeof legacyAlertConf.successful !== 'boolean') {
				this.$log.warn(
					'alertService validation warning: legacyAlertConf.successful not a boolean value for alert: ',
					legacyAlertConf
				);
			}
			legacyAlertConf.type = legacyAlertConf.successful ? IAlertServiceType.SUCCESS : IAlertServiceType.DANGER;
		}
		delete legacyAlertConf.successful;
	}
}
