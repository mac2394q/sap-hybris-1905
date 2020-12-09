/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name authenticationModule
 *
 * @description
 * # The authenticationModule
 *
 * The authentication module provides a service to authenticate and logout from SmartEdit.
 * It also allows the management of entry points used to authenticate the different resources in the application.
 *
 */
import {Payload, SeModule} from "smarteditcommons";
import {AuthenticationService} from '../services/authentication/AuthenticationServiceOuter';
@SeModule({
	providers: [
		/**
		 * @ngdoc service
		 * @name authenticationModule.object:DEFAULT_AUTH_MAP
		 *
		 * @description
		 * The default authentication map contains the entry points to use before an authentication map
		 * can be loaded from the configuration.
		 */
		{
			provide: 'DEFAULT_AUTH_MAP',
			useFactory: (I18N_ROOT_RESOURCE_URI: string, DEFAULT_AUTHENTICATION_ENTRY_POINT: string) => {
				'ngInject';

				const DEFAULT_ENTRY_POINT_MATCHER = "^(?!" + I18N_ROOT_RESOURCE_URI + '\/.*$).*$';
				const DEFAULT_AUTH_MAP: IAuthMap = {};
				DEFAULT_AUTH_MAP[DEFAULT_ENTRY_POINT_MATCHER] = DEFAULT_AUTHENTICATION_ENTRY_POINT;

				return DEFAULT_AUTH_MAP;
			}
		},
		/**
		 * @ngdoc service
		 * @name authenticationModule.object:DEFAULT_CREDENTIALS_MAP
		 *
		 * @description
		 * The default credentials map contains the credentials to use before an authentication map
		 * can be loaded from the configuration.
		 */
		{
			provide: 'DEFAULT_CREDENTIALS_MAP',
			useFactory: (DEFAULT_AUTHENTICATION_ENTRY_POINT: string, DEFAULT_AUTHENTICATION_CLIENT_ID: string) => {
				'ngInject';

				const DEFAULT_CREDENTIALS_MAP: ICredentialsMap = {};
				DEFAULT_CREDENTIALS_MAP[DEFAULT_AUTHENTICATION_ENTRY_POINT] = {
					client_id: DEFAULT_AUTHENTICATION_CLIENT_ID
				};
				return DEFAULT_CREDENTIALS_MAP;
			}
		},
		AuthenticationService
	]
})
export class AuthenticationModule {}

export interface ICredentialsMapRecord extends Payload {
	client_id: string;
	client_secret?: string;
}
export interface ICredentialsMap {
	[entryPoint: string]: ICredentialsMapRecord;
}

export interface IAuthMap {
	[entryPoint: string]: string;
}