/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import * as angular from 'angular';
import {AlertFactory} from 'smarteditcontainer/services/alerts/AlertFactory';
import {AlertCollectionServiceFacade} from 'smarteditcontainer/services/alerts/AlertCollectionServiceFacade';
import {promiseUtils, IAlertServiceType, TypedMap, WindowUtils} from 'smarteditcommons';
import {LogHelper} from 'testhelpers';
import {Alert} from 'smarteditcontainer/services/alerts/Alert';

describe('alertFactory', () => {
	// service under test
	let alertFactory: AlertFactory;

	// spies
	let windowUtils: WindowUtils;
	let $log: angular.ILogService;
	let sanitize: any;
	let alertCollectionServiceFacade: jasmine.SpyObj<AlertCollectionServiceFacade>;
	const SE_ALERT_DEFAULTS: TypedMap<any> = {
		type: IAlertServiceType.INFO,
		message: '',
		closeable: true,
		timeout: 3000
	};

	beforeEach(() => {
		jasmine.clock().uninstall();
		windowUtils = new WindowUtils();
		spyOn(windowUtils, 'runTimeoutOutsideAngular').and.callFake((callback: () => void, timeout: number) => {
			return setTimeout(callback, timeout);
		});


		$log = new LogHelper();
		alertCollectionServiceFacade = jasmine.createSpyObj('alertCollectionServiceFacade', [
			'addAlert',
			'removeAlert'
		]);
		sanitize = jasmine.createSpy('sanitize');
		sanitize.and.callFake((str: string) => str);

		alertFactory = new AlertFactory(
			promiseUtils,
			windowUtils,
			$log,
			sanitize,
			alertCollectionServiceFacade,
			lo,
			SE_ALERT_DEFAULTS
		);
	});

	it('Alerts are created with the expected default values', () => {
		const alert: Alert = alertFactory.createAlert({});
		expect(alert).toEqual(jasmine.objectContaining(SE_ALERT_DEFAULTS));
	});

	it('Will convert a string param into an AlertConfig with message', () => {
		const MESSAGE: string = 'my alert message';
		const alert: Alert = alertFactory.createAlert(MESSAGE);
		expect(alert.alertConf.message).toBe(MESSAGE);
	});

	it('isDisplayed() correctly returns displayed state for show() and hide() functions', () => {
		const alert: Alert = alertFactory.createAlert({message: 'Alert message.'});
		expect(alert.isDisplayed()).toBe(false);

		alert.show();
		expect(alert.isDisplayed()).toBe(true);

		alert.hide(true);
		expect(alert.isDisplayed()).toBe(false);
	});

	it('Alert is resolved and hidden automatically after correct timeout', (done) => {
		const alert: Alert = alertFactory.createAlert({
			message: 'Alert message',
			timeout: 3000
		});
		alert.show();

		expect(alert.isDisplayed()).toBe(true);
		expect(alert.promise).not.toBeResolved();
		setTimeout(() => {
			expect(alert.isDisplayed()).toBe(false);
			expect(alert.promise).toBeResolvedWithData(true);
			done();
		}, 3020);


	});

	it('Alert promise is resolved with manual hide value', () => {
		const alert: Alert = alertFactory.createAlert({
			timeout: 3000
		});
		alert.show();
		alert.hide(false);

		expect(alert.promise).toBeResolvedWithData(false);
	});

	it('Alert contains the type of template that is inputted', () => {
		const alert1: Alert = alertFactory.createAlert({
			message: 'A string message'
		});
		const alert2: Alert = alertFactory.createAlert({
			template: '<h1>This is a sentence.</h1>'
		});
		const alert3: Alert = alertFactory.createAlert({
			templateUrl: 'somehtmlfile.html'
		});

		expect(alert1.alertConf.message).toBeDefined();
		expect(alert2.alertConf.template).toBeDefined();
		expect(alert3.alertConf.templateUrl).toBeDefined();
	});

	it('Alert message placeholder should be of type object', () => {
		const error = 'alertService._validateAlertConfig - property messagePlaceholders should be an object';

		expect(() => {
			alertFactory.createAlert({
				message: 'A string message',
				messagePlaceholders: {
					value: 12345
				}
			});
		}).not.toThrowError(error);
	});

	it('Alert contains only one type of template', () => {
		const error =
			'alertService._validateAlertConfig - only one template type is allowed for the alert: message, template, or templateUrl';

		expect(() => {
			alertFactory.createAlert({
				message: 'A string message.',
				template: '<h1>This is a sentence.</h1>'
			});
		}).toThrowError(error);

		expect(() => {
			alertFactory.createAlert({
				message: 'A string message.',
				templateUrl: 'somehtmlfile.html'
			});
		}).toThrowError(error);

		expect(() => {
			alertFactory.createAlert({
				template: '<h1>This is a sentence.</h1>',
				templateUrl: 'somehtmlfile.html'
			});
		}).toThrowError(error);
	});

	it('Factory recipe interface properly assigns the Alert type', () => {
		const info = alertFactory.createInfo({});
		const danger = alertFactory.createDanger({});
		const warning = alertFactory.createWarning({});
		const success = alertFactory.createSuccess({});

		expect(info.alertConf.type).toBe(IAlertServiceType.INFO);
		expect(danger.alertConf.type).toBe(IAlertServiceType.DANGER);
		expect(warning.alertConf.type).toBe(IAlertServiceType.WARNING);
		expect(success.alertConf.type).toBe(IAlertServiceType.SUCCESS);
	});
});
