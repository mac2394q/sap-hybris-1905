/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import 'jasmine';

import {
	CrossFrameEventService,
	GatewayFactory,
	MessageGateway,
	WindowUtils
} from 'smarteditcommons';

import {HeartBeatService} from 'smarteditcontainer/services/HeartBeatService';
import {AlertFactory} from 'smarteditcontainer/services/alerts/AlertFactory';
import {getSpyMock, AlertMock} from './mocks/AlertMock';
import {GenericEventer} from './mocks/GenericEventer';

const mockMessageGateway = new GenericEventer();
const mockRootScopeService = new GenericEventer();
const mockCrossFrameEventService = new GenericEventer();
let mockLocation: jasmine.SpyObj<angular.ILocationService>;
let mockAlertFactory: jasmine.SpyObj<AlertFactory>;
const storefrontPath = "/storefront";
let mockDisconnectedAlert: AlertMock;
let mockReconnectedAlert: AlertMock;
const MOCK_EVENTS = {
	PAGE_CHANGE: "page_change",
	EVENT_STRICT_PREVIEW_MODE_REQUESTED: 'EVENT_STRICT_PREVIEW_MODE_REQUESTED'
};
let windowUtils: WindowUtils;
let heartBeatService: HeartBeatService;


describe('Storefront <-> SmartEdit Heart beat service', () => {

	function createHeartBeatServiceInstance(heartbeatTimeout: number = 10000) {

		windowUtils = new WindowUtils();
		spyOn(windowUtils, 'runTimeoutOutsideAngular').and.callFake((callback: () => void, timeout: number) => {
			return setTimeout(callback, timeout);
		});
		// $location
		mockLocation = jasmine.createSpyObj('$location', ['path']);
		mockLocation.path.and.callFake(() => "dummypath");

		// Alerts
		mockDisconnectedAlert = getSpyMock();
		mockReconnectedAlert = getSpyMock();
		mockAlertFactory = jasmine.createSpyObj('alertFactory', ['createInfo']);
		mockAlertFactory.createInfo.and.returnValues(mockDisconnectedAlert, mockReconnectedAlert);

		// Translate
		const translateMock: jasmine.SpyObj<angular.translate.ITranslateService> = jasmine.createSpyObj('$translate', ['instant']);
		translateMock.instant.and.callFake(() => "some string");

		// Gateway
		const gatewayFactoryMock: jasmine.SpyObj<GatewayFactory> = jasmine.createSpyObj('gatewayFactory', ['createGateway']);
		gatewayFactoryMock.createGateway.and.returnValue(mockMessageGateway as any as MessageGateway);

		mockCrossFrameEventService.subscribe(
			MOCK_EVENTS.EVENT_STRICT_PREVIEW_MODE_REQUESTED,
			angular.noop
		);

		heartBeatService = new HeartBeatService(
			heartbeatTimeout,
			translateMock,
			mockRootScopeService as any as angular.IRootScopeService,
			mockLocation,
			MOCK_EVENTS,
			storefrontPath,
			windowUtils,
			mockAlertFactory,
			mockCrossFrameEventService as any as CrossFrameEventService,
			MOCK_EVENTS.EVENT_STRICT_PREVIEW_MODE_REQUESTED,
			gatewayFactoryMock,
		);
	}

	beforeEach(() => {
		jasmine.clock().uninstall();
		jasmine.clock().install();
	});

	afterEach(() => {
		// just to make sure its all cleaned up on window
		heartBeatService.resetAndStop();
		jasmine.clock().uninstall();
	});

	it('On $routeChangeStart will reset and hide all alerts', () => {

		// Given
		createHeartBeatServiceInstance();

		// When
		mockRootScopeService.publish('$routeChangeStart');

		// Then
		expect(mockDisconnectedAlert.shown).toBe(false);
		expect(mockReconnectedAlert.shown).toBe(false);
	});

	it('On timerElapsed reconnecting is shown, then heartBeat event will show reconnected', () => {

		// Given
		createHeartBeatServiceInstance(20);
		spyOn(window, 'setTimeout').and.callThrough();
		spyOn(mockCrossFrameEventService, 'publish').and.callThrough();

		// Then
		expect(mockDisconnectedAlert.shown).toBe(false);
		expect(mockReconnectedAlert.shown).toBe(false);

		// When
		mockCrossFrameEventService.publish(MOCK_EVENTS.PAGE_CHANGE);   // trigger very short timer
		jasmine.clock().tick(20);

		// Then disconnected will be shown
		expect(window.setTimeout).toHaveBeenCalled();
		expect(mockDisconnectedAlert.shown).toBe(true);
		expect(mockReconnectedAlert.shown).toBe(false);

		// When - finaly we receive a heartbeat...
		mockMessageGateway.publish(HeartBeatService.HEART_BEAT_MSG_ID);

		// Then disconnected should be hidden and reconnected displayed
		expect(mockDisconnectedAlert.shown).toBe(false);
		expect(mockReconnectedAlert.shown).toBe(true);
		expect(mockCrossFrameEventService.publish).toHaveBeenCalledWith(
			MOCK_EVENTS.EVENT_STRICT_PREVIEW_MODE_REQUESTED,
			false
		);

		// When - reconnected time elapses...
		jasmine.clock().tick(3000);

		// Then
		expect(mockReconnectedAlert.shown).toBe(false);
		expect(window.setTimeout).toHaveBeenCalled();

	});

	it('On $routeChangeSuccess will not start heartbeat timer for non-storefront path', () => {

		// Given
		// note: mockLocation will return default test value of "dummy path"
		createHeartBeatServiceInstance();
		spyOn(window, 'setTimeout');

		// When
		mockRootScopeService.publish('$routeChangeSuccess');

		// Then
		expect(window.setTimeout).not.toHaveBeenCalled();
	});


	it('On $routeChangeSuccess will start heartbeat timer for storefront path', () => {

		// Given
		createHeartBeatServiceInstance();
		mockLocation.path.and.callFake(() => storefrontPath);
		spyOn(window, 'setTimeout');

		// When
		mockRootScopeService.publish('$routeChangeSuccess');

		// Then
		expect(mockDisconnectedAlert.shown).toBe(false);
		expect(mockReconnectedAlert.shown).toBe(false);
		expect(window.setTimeout).toHaveBeenCalled();
	});

	it('On PAGE_CHANGE will trigger a restart of the heartbeat timer', () => {

		// Given
		createHeartBeatServiceInstance();
		spyOn(window, 'setTimeout');

		// When
		mockCrossFrameEventService.publish(MOCK_EVENTS.PAGE_CHANGE);

		// Then
		expect(mockDisconnectedAlert.shown).toBe(false);
		expect(mockReconnectedAlert.shown).toBe(false);
		expect(window.setTimeout).toHaveBeenCalled();
	});

});

