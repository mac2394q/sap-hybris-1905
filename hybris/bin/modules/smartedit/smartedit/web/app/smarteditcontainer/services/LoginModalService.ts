/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from "angular";
import {
	IAuthToken,
	ISessionService,
	IStorageService,
	SeInjectable,
	StringUtils,
	UrlUtils,
} from 'smarteditcommons';
import {ICredentialsMapRecord} from '../modules/AuthenticationModuleOuter';
export interface LoginDialogForm {
	posted: boolean;
	errorMessage: string;
	failed: boolean;
	$valid: boolean;
}

export interface LoginData {
	initialized?: boolean;
	authURI: string;
	clientCredentials: ICredentialsMapRecord;
}

export interface LoginModalFeedback {
	userHasChanged: boolean;
}

/* @internal */
interface IRequestPayload {
	username: string;
	password: string;
	grant_type: string;
}

export interface LoginModalService {
	initialized: boolean;
	authURI: string;
	auth: {
		username: string;
		password: string;
	};
	submit(loginDialogForm: LoginDialogForm): angular.IPromise<LoginModalFeedback>;
}

/* @internal */
export function loginModalFactory(loginData: LoginData) {
	/* @ngInject */

	@SeInjectable()
	class LoginModalServiceImplem implements LoginModalService {

		public initialized: boolean;
		public authURIKey: string;
		public authURI: string;
		public auth: {
			username: string;
			password: string;
		};

		constructor(
			private $q: angular.IQService,
			private $log: angular.ILogService,
			private $http: angular.IHttpService,
			private sessionService: ISessionService,
			private copy: any,
			private storageService: IStorageService,
			private stringUtils: StringUtils,
			private urlUtils: UrlUtils,
			private modalManager: any,
			private DEFAULT_AUTHENTICATION_ENTRY_POINT: string
		) {
			/* @ngInject */
			modalManager.setShowHeaderDismiss(false);

			this.initialized = loginData.initialized;

			this.auth = {
				username: '',
				password: ''
			};

			this.authURI = loginData.authURI;
			storageService.removeAuthToken(this.authURI);
			this.authURIKey = btoa(this.authURI).replace(/=/g, '');
		}


		submit = (loginDialogForm: LoginDialogForm): angular.IPromise<LoginModalFeedback> => {
			loginDialogForm.posted = true;
			loginDialogForm.errorMessage = '';
			loginDialogForm.failed = false;

			if (!loginDialogForm.$valid) {
				loginDialogForm.errorMessage = 'se.logindialogform.username.and.password.required';
				return this.$q.reject();
			}

			const payload = this.copy(loginData.clientCredentials || {}) as IRequestPayload;
			payload.username = this.auth.username;
			payload.password = this.auth.password;
			payload.grant_type = 'password';

			return this.sendCredentials(payload)
				.then(this.didUserChanged, this.APIAuthenticationFailureReportFactory(loginDialogForm))
				.then(this.acceptNewUser, this.reportSessionServiceError);
		}

		private APIAuthenticationFailureReportFactory = (loginDialogForm: LoginDialogForm): any => {
			return (error: any) => {
				this.$log.debug(`API Authentication Failure: ${this.authURI} status: ${error.status}`);
				loginDialogForm.errorMessage =
					(error.data && this.stringUtils.sanitize(error.data.error_description)) ||
					'se.logindialogform.oauth.error.default';
				loginDialogForm.failed = true;
				return this.$q.reject(error);
			};
		}

		private didUserChanged = (response: angular.IHttpResponse<IAuthToken>): angular.IPromise<boolean> => {
			this.storageService.storeAuthToken(this.authURI, response.data);
			this.$log.debug(`API Authentication Success: ${this.authURI} status: ${response.status}`);
			return this.isMainEndPoint() ? this.sessionService.hasUserChanged() : this.$q.when(false);
		}

		private sendCredentials = (payload: IRequestPayload): angular.IPromise<angular.IHttpResponse<{}>> => {
			return this.$http({
				method: 'POST',
				url: this.authURI,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: this.urlUtils.getQueryString(payload).replace('?', '')
			});
		}

		private acceptNewUser = (hasUserChanged: boolean): angular.IPromise<LoginModalFeedback> => {
			this.modalManager.close({
				userHasChanged: hasUserChanged
			});
			if (this.isMainEndPoint() && hasUserChanged) {
				this.sessionService.setCurrentUsername();
			}
			return this.$q.when({userHasChanged: hasUserChanged});
		}

		private reportSessionServiceError = (error: any) => {
			this.$log.error(`Issue with sessionService.hasUserChanged(): ${error}`);
			return this.$q.reject(error);
		}

		private isMainEndPoint() {
			return this.DEFAULT_AUTHENTICATION_ENTRY_POINT === this.authURI;
		}
	}
	return LoginModalServiceImplem;
}