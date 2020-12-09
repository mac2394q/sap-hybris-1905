/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import {loginModalFactory, LoginDialogForm, LoginModalService} from 'smarteditcontainer/services';
import {promiseHelper} from "testhelpers";
import {stringUtils, urlUtils, ISessionService, IStorageService} from 'smarteditcommons';

describe('Login Modal Service', () => {

	const MESSAGE = "{{0[a='constructor'][a]('alert(\"XSS\")')()}}password";
	const SANITIZED_MESSAGE = "{{0[a='constructor'][a]\\('alert\\(\"XSS\"\\)'\\)\\(\\)}}password";

	const AUTH_URI_AND_CLIENT_CREDENTIALS_MOCK = {
		initialized: true,
		authURI: '/defaultAuthEntryPoint1',
		clientCredentials: {
			client_id: 'client_id_1'
		}
	};

	const DEFAULT_AUTHENTICATION_ENTRY_POINT_MOCK = '/defaultAuthEntryPoint1';

	const DUMMY_ERROR = {
		status: 'error',
		data: {
			error_description: MESSAGE
		}
	};

	const VALID_LOGIN_FORM = {
		$valid: true
	} as LoginDialogForm;
	const INVALID_LOGIN_FORM = {
		$valid: false
	} as LoginDialogForm;


	let loginModalService: LoginModalService;
	let sessionServiceMock: jasmine.SpyObj<ISessionService>;
	let $q: jasmine.SpyObj<angular.IQService>;
	let $log: jasmine.SpyObj<angular.ILogService>;
	let $http: jasmine.Spy;
	let $httpMock: jasmine.SpyObj<angular.IHttpService>;
	let storageService: jasmine.SpyObj<IStorageService>;
	let modalManager: jasmine.SpyObj<any>;
	const oauthToken = {
		access_token: 'access-token1',
		token_type: 'bearer'
	};
	const expectedPayload = {
		client_id: 'client_id_1',
		username: 'someusername',
		password: 'somepassword',
		grant_type: 'password'
	};

	beforeEach(() => {

		sessionServiceMock = jasmine.createSpyObj<ISessionService>('sessionService', ['hasUserChanged', 'setCurrentUsername']);
		sessionServiceMock.hasUserChanged.and.returnValue(false);

		$q = promiseHelper.$q();
		$log = jasmine.createSpyObj<angular.ILogService>('$log', ['debug', 'error']);
		$http = jasmine.createSpy('$http');

		$http.and.callFake((payload: angular.IRequestConfig) => {

			if (payload.url !== '/defaultAuthEntryPoint1' && payload.url !== '/authEntryPoint') {
				throw new Error(`unexpected http url ${payload.url}`);
			}
			if (payload.method !== 'POST') {
				throw new Error(`unexpected http method ${payload.method}`);
			}
			if (payload.headers['Content-Type'] !== 'application/x-www-form-urlencoded') {
				throw new Error(`unexpected http Content-Type ${payload.headers['Content-Type']}`);
			}
			if (lo.isEqual(expectedPayload, urlUtils.parseQuery(payload.data))) {
				return $q.when({data: oauthToken});
			} else {
				return $q.reject(DUMMY_ERROR);
			}
		});

		$httpMock = $http as any as jasmine.SpyObj<angular.IHttpService>;
		storageService = jasmine.createSpyObj<IStorageService>('storageService', ['removeAuthToken', 'storeAuthToken']);
		modalManager = jasmine.createSpyObj('modalManager', ['close', 'setShowHeaderDismiss']);


		loginModalService = new (loginModalFactory(AUTH_URI_AND_CLIENT_CREDENTIALS_MOCK))(
			$q,
			$log,
			$httpMock,
			sessionServiceMock,
			lo.cloneDeep,
			storageService,
			stringUtils,
			urlUtils,
			modalManager,
			DEFAULT_AUTHENTICATION_ENTRY_POINT_MOCK
		);

		expect(modalManager.setShowHeaderDismiss).toHaveBeenCalledWith(false);
		expect(loginModalService.initialized).toBe(true);

	});

	it('when credentials are marked as wrong then returns a rejected promise', () => {
		expect(loginModalService.submit(INVALID_LOGIN_FORM)).toBeRejected();

		expect(sessionServiceMock.setCurrentUsername).not.toHaveBeenCalled();
		expect(storageService.storeAuthToken).not.toHaveBeenCalled();
		expect(storageService.removeAuthToken).toHaveBeenCalled();
	});

	it('when backend rejects the authentication then returns a rejected promise with API failure error', () => {
		// when
		loginModalService.auth = {
			username: 'unexpected',
			password: 'unexpected',
		};

		// then
		expect(loginModalService.submit(VALID_LOGIN_FORM)).toBeRejectedWithData(DUMMY_ERROR);

		expect(storageService.removeAuthToken).toHaveBeenCalledWith("/defaultAuthEntryPoint1");
		expect(sessionServiceMock.setCurrentUsername).not.toHaveBeenCalled();
		expect(storageService.storeAuthToken).not.toHaveBeenCalled();
		expect(VALID_LOGIN_FORM.errorMessage).toEqual(SANITIZED_MESSAGE);
		expect(modalManager.close).not.toHaveBeenCalledWith({
			userHasChanged: false
		});

	});

	it(`when backend accepts the authentication on default entry point 
		and user has not changed
		then auth token is stored
		and current user is updated`, () => {

			sessionServiceMock.hasUserChanged.and.returnValue(false);

			// when
			loginModalService.auth = {
				username: 'someusername',
				password: 'somepassword',
			};

			// then
			expect(loginModalService.submit(VALID_LOGIN_FORM)).toBeResolved();

			expect(sessionServiceMock.setCurrentUsername).not.toHaveBeenCalled();
			expect(storageService.storeAuthToken).toHaveBeenCalledWith("/defaultAuthEntryPoint1", oauthToken);
			expect(storageService.removeAuthToken).toHaveBeenCalled();
			expect(modalManager.close).toHaveBeenCalledWith({
				userHasChanged: false
			});
		});

	it(`when backend accepts the authentication on default entry point 
		and user has changed
		then auth token is stored
		and current user is updated`, () => {

			sessionServiceMock.hasUserChanged.and.returnValue(true);

			// when
			loginModalService.auth = {
				username: 'someusername',
				password: 'somepassword',
			};

			// then
			expect(loginModalService.submit(VALID_LOGIN_FORM)).toBeResolved();

			expect(sessionServiceMock.setCurrentUsername).toHaveBeenCalled();
			expect(storageService.storeAuthToken).toHaveBeenCalledWith("/defaultAuthEntryPoint1", oauthToken);
			expect(storageService.removeAuthToken).toHaveBeenCalled();
			expect(modalManager.close).toHaveBeenCalledWith({
				userHasChanged: true
			});
		});

	it(`when backend accepts the authentication on non default entry point 
		then auth token is stored
		and current user is not updated`, () => {


			// when

			sessionServiceMock.hasUserChanged.and.throwError("sessionServiceMock.hasUserChanged should not be invoked");

			loginModalService.auth = {
				username: 'someusername',
				password: 'somepassword',
			};

			loginModalService.authURI = "/authEntryPoint";

			// then
			expect(loginModalService.submit(VALID_LOGIN_FORM)).toBeResolved();

			expect(sessionServiceMock.setCurrentUsername).not.toHaveBeenCalled();
			expect(storageService.storeAuthToken).toHaveBeenCalledWith("/authEntryPoint", oauthToken);
			expect(storageService.removeAuthToken).toHaveBeenCalled();
			expect(modalManager.close).toHaveBeenCalledWith({
				userHasChanged: false
			});
		});

});