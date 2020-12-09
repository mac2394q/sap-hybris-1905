/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {AlertService} from 'smarteditcontainer/services/alerts/AlertServiceOuter';
import {AlertFactory} from 'smarteditcontainer/services/alerts/AlertFactory';
import {AlertCollectionLegacySupport} from 'smarteditcontainer/services/alerts/AlertCollectionLegacySupport';
import {IAlertConfig} from 'smarteditcommons';
import {Alert} from 'smarteditcontainer/services/alerts/Alert';


describe('alertService', () => {
	// service under test
	let alertService: AlertService;

	// spies
	let alertFactory: jasmine.SpyObj<AlertFactory>;
	let alertCollectionLegacySupport: jasmine.SpyObj<AlertCollectionLegacySupport>;

	beforeEach(() => {


		alertFactory = jasmine.createSpyObj<AlertFactory>('alertFactory', [
			'createInfo',
			'createAlert',
			'createWarning',
			'createSuccess',
			'createDanger'
		]);

		alertCollectionLegacySupport = jasmine.createSpyObj<AlertCollectionLegacySupport>(
			'alertCollectionLegacySupport',
			['removeAlertById']
		);

		alertService = new AlertService(alertFactory, alertCollectionLegacySupport);
	});

	describe('all alertService.showXZY() functions', () => {
		// spies
		const alertConfig: IAlertConfig = {message: 'Alert Test'};
		let mockAlert: jasmine.SpyObj<Alert>;

		function testShowXYZFunction(
			alertServiceFn: Exclude<keyof AlertService, 'pushAlerts' | 'removeAlertById'>,
			alertFactoryFn: keyof jasmine.SpyObj<AlertFactory>
		) {
			// give
			mockAlert = jasmine.createSpyObj('mockAlert', ['show']);
			alertFactory[alertFactoryFn].and.returnValue(mockAlert);

			// when
			alertService[alertServiceFn](alertConfig);

			// then
			expect(alertFactory[alertFactoryFn]).toHaveBeenCalledWith(alertConfig);
			expect(mockAlert.show).toHaveBeenCalled();
		}

		it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
			testShowXYZFunction('showAlert', 'createAlert');
		});

		it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
			testShowXYZFunction('showInfo', 'createInfo');
		});

		it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
			testShowXYZFunction('showWarning', 'createWarning');
		});

		it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
			testShowXYZFunction('showSuccess', 'createSuccess');
		});

		it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
			testShowXYZFunction('showDanger', 'createDanger');
		});
	});

	describe('LEGACY functions', () => {
		it('delegates a single legacy alert to showAlert()', () => {
			spyOn(alertService, 'showAlert').and.callThrough();
			const dummyAlertConf = {};
			const mockAlert = jasmine.createSpyObj('mockAlert', ['show']);
			alertFactory.createAlert.and.returnValue(mockAlert);

			alertService.pushAlerts([dummyAlertConf]);

			expect(mockAlert.show).toHaveBeenCalled();
			expect(alertService.showAlert).toHaveBeenCalledWith(dummyAlertConf);
		});

		it('delegates multiple legacy alerts to showAlert()', () => {
			const dummyAlertConf1 = {};
			const mockAlert1 = jasmine.createSpyObj('mockAlert1', ['show']);
			const dummyAlertConf2 = {};
			const mockAlert2 = jasmine.createSpyObj('mockAlert2', ['show']);
			alertFactory.createAlert.and.returnValues(mockAlert1, mockAlert2);

			alertService.pushAlerts([dummyAlertConf1, dummyAlertConf2]);

			expect(mockAlert1.show).toHaveBeenCalled();
			expect(mockAlert2.show).toHaveBeenCalled();
		});

		it('delegates the legacy removeById to the alertCollectionLegacySupport service', () => {
			const dummyInput: string = 'garbage';
			alertService.removeAlertById(dummyInput);

			expect(alertCollectionLegacySupport.removeAlertById).toHaveBeenCalledWith(dummyInput);
		});
	});
});