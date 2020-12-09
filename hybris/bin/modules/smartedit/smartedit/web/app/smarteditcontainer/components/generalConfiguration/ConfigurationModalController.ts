/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {ConfigurationService} from 'smarteditcontainer/services/ConfigurationService';
import {TypedMap} from 'smarteditcommons';
import './editConfigurations.scss';

/* @internal  */
interface ConfigurationModalControllerScope extends angular.IScope {
	editor?: ConfigurationService;
	form: TypedMap<any>;
}

/* @ngInject */
export class ConfigurationModalController {
	public init: () => void;

	private isDirty: boolean;
	private $log: angular.ILogService;

	private onSave: () => void;
	private onCancel: () => angular.IPromise<any>;

	constructor(
		private confirmationModalService: any,
		private $scope: ConfigurationModalControllerScope,
		private $timeout: angular.ITimeoutService,
		yjQuery: JQueryStatic,
		configurationService: ConfigurationService,
		private $q: angular.IQService,
		private modalManager: any
	) {
		this.isDirty = false;
		this.$scope.form = {};

		this.$scope.editor = configurationService;
		this.$scope.editor.init(() => {
			this.$timeout(() => {
				yjQuery("textarea").each(function() {
					yjQuery(this).height(this.scrollHeight);
				});
			}, 100);
		});

		this.onSave = () => {
			this.$scope.editor.submit(this.$scope.form.configurationForm).then(() => {
				this.modalManager.close();
			});
		};
		this.onCancel = () => {
			const deferred = this.$q.defer();

			if (this.isDirty) {
				this.confirmationModalService.confirm({
					description: 'se.editor.cancel.confirm'
				}).then(() => {
					this.modalManager.close();
					deferred.resolve();
				}, function() {
					deferred.reject();
				});
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		};

		this.init = () => {
			this.modalManager.setDismissCallback((this.onCancel).bind(this));

			this.modalManager.setButtonHandler((buttonId: string) => {
				switch (buttonId) {
					case 'save':
						return this.onSave();
					case 'cancel':
						return this.onCancel();
					default:
						this.$log.error('A button callback has not been registered for button with id', buttonId);
						break;
				}
			});

			this.$scope.$watch(() => {
				const isDirty = this.$scope.form.configurationForm && this.$scope.form.configurationForm.$dirty;
				const isValid = this.$scope.form.configurationForm && this.$scope.form.configurationForm.$valid;
				return {
					isDirty,
					isValid
				};
			}, (obj: any) => {
				if (typeof obj.isDirty === 'boolean') {
					if (obj.isDirty) {
						this.isDirty = true;
						this.modalManager.enableButton('save');
					} else {
						this.isDirty = false;
						this.modalManager.disableButton('save');
					}
				}
			}, true);
		};


	}
}
