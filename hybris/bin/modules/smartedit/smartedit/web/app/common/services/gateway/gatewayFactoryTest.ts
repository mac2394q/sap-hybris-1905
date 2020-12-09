/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'zone.js/dist/zone-testing';
import * as angular from 'angular';
import {fakeAsync, tick} from '@angular/core/testing';
import {Injector} from '@angular/core';
import {
	CloneableUtils,
	FunctionsUtils,
	GatewayFactory,
	IGatewayPostMessageData,
	LogService,
	MessageGateway,
	PromiseUtils,
	StringUtils,
	SystemEventService,
	UrlUtils,
	WindowUtils,
} from 'smarteditcommons';

describe('test GatewayFactory and MessageGateway', () => {

	let gatewayFactory: GatewayFactory;
	let systemEventService: jasmine.SpyObj<SystemEventService>;
	let logService: LogService;
	let logServiceErrorSpy: jasmine.Spy;
	let injector: jasmine.SpyObj<Injector>;
	let urlUtils: jasmine.SpyObj<UrlUtils>;
	let stringUtils: StringUtils;
	let windowUtils: jasmine.SpyObj<WindowUtils>;
	let windowMock: jasmine.SpyObj<Window>;
	let promiseUtils: PromiseUtils;
	let functionsUtils: jasmine.SpyObj<FunctionsUtils>;
	let targetFrame: Window;

	beforeEach(() => {
		jasmine.clock().uninstall();
		injector = jasmine.createSpyObj<Injector>('injector', ['get']);
		systemEventService = jasmine.createSpyObj('systemEventService', ['publishAsync', 'subscribe']);
		logService = new LogService();
		logServiceErrorSpy = spyOn(logService, 'error');
		windowUtils = jasmine.createSpyObj<WindowUtils>('windowUtils', ['getWindow', 'isIframe', 'getTargetIFrame']);
		stringUtils = new StringUtils();
		promiseUtils = new PromiseUtils();
		targetFrame = jasmine.createSpyObj<Window>('targetFrame', ['postMessage']);
		urlUtils = jasmine.createSpyObj<UrlUtils>('urlUtils', ['getOrigin']);
		functionsUtils = jasmine.createSpyObj<FunctionsUtils>('functionsUtils', ['isUnitTestMode']);
		functionsUtils.isUnitTestMode.and.returnValue(false);

		gatewayFactory = new GatewayFactory(
			logService,
			injector,
			systemEventService,
			new CloneableUtils(),
			urlUtils,
			stringUtils,
			windowUtils,
			promiseUtils,
			functionsUtils
		);

	});

	beforeEach(() => {

		windowUtils.isIframe.and.returnValue(false);
		urlUtils.getOrigin.and.callFake(() => {
			return 'trusted';
		});

		windowMock = jasmine.createSpyObj<Window>("windowMock", ["addEventListener"]);

		windowUtils.getWindow.and.returnValue(windowMock);

		windowUtils.getTargetIFrame.and.returnValue(targetFrame);
	});

	it('should attach a W3C postMessage event when addEventListener exists on window', () => {

		gatewayFactory.initListener();

		expect(windowMock.addEventListener).toHaveBeenCalledWith('message', jasmine.any(Function), false);
	});

	describe('GIVEN that the parent frame receives message', () => {

		let gateway: MessageGateway;
		let listener: (e: MessageEvent) => void;
		let processEventSpy: jasmine.Spy;
		const gatewayId = 'test';
		beforeEach(() => {

			windowMock.addEventListener.and.returnValue(null);

			gateway = gatewayFactory.createGateway(gatewayId);

			injector.get.and.returnValue(['sometrusteddomain', 'someothertrusteddomain']);
			systemEventService.publishAsync.and.returnValue(Promise.resolve('systemEventService'));

			gatewayFactory.initListener();

			processEventSpy = spyOn<MessageGateway>(gateway, 'processEvent').and.returnValue('');

			listener = windowMock.addEventListener.calls.argsFor(0)[1];

			logServiceErrorSpy.calls.reset();
		});

		it('SHOULD have the listener\'s callback log error and not process event, GIVEN the domain is not white listed and the url is not same origin', () => {
			const e = {
				origin: 'untrusted'
			} as MessageEvent;
			listener(e);
			expect(gateway.processEvent).not.toHaveBeenCalled();
			expect(logServiceErrorSpy).toHaveBeenCalledWith('disallowed storefront is trying to communicate with smarteditcontainer');
		});

		it('SHOULD have the listener\'s callback process event of gateway only once, GIVEN url is same origin and gatewayId is test', () => {
			const e = {
				data: {
					pk: 'somepk',
					gatewayId: 'test'
				},
				origin: urlUtils.getOrigin()
			} as MessageEvent;

			listener(e);

			expect(gateway.processEvent).toHaveBeenCalledWith(e.data);
			expect(logServiceErrorSpy).not.toHaveBeenCalled();

			listener(e);
			expect(processEventSpy.calls.count()).toBe(1);
		});

		it('SHOULD have the listener\'s callback process the event of gateway only once, GIVEN url is not same origin but is white listed and gatewayId is test', () => {
			const e = {
				data: {
					pk: 'sometrusteddomain',
					gatewayId: 'test'
				},
				origin: urlUtils.getOrigin()
			} as MessageEvent;
			listener(e);
			expect(gateway.processEvent).toHaveBeenCalledWith(e.data);
			expect(logServiceErrorSpy).not.toHaveBeenCalled();
			listener(e);
			expect(processEventSpy.calls.count()).toBe(1);
		});

		it('SHOULD have the listener callback\'s not process the event of the gateway, GIVEN url same origin and gatewayId is not test', () => {
			const e = {
				data: {
					pk: 'sometrusteddomain',
					gatewayId: 'nottest'
				},
				origin: urlUtils.getOrigin()
			} as MessageEvent;
			listener(e);
			expect(gateway.processEvent).not.toHaveBeenCalled();
			expect(logServiceErrorSpy).not.toHaveBeenCalled();
		});
	});

	it('SHOULD return no gateway on subsequent calls to createGateway with the same gateway id', () => {

		const gateway = gatewayFactory.createGateway('TestChannel1');

		const duplicateGateway = gatewayFactory.createGateway('TestChannel1');

		expect(gateway).toBeDefined();
		expect(duplicateGateway).toBeNull();
	});

	it('SHOULD subscribe to the system event service with the event id <gateway_id>:<event_id>', () => {
		const CHANNEL_ID = 'TestChannel';
		const EVENT_ID = 'someEvent';
		const SYSTEM_EVENT_ID = CHANNEL_ID + ':' + EVENT_ID;

		const handler = angular.noop;

		const gateway = gatewayFactory.createGateway(CHANNEL_ID);

		gateway.subscribe(EVENT_ID, handler);

		expect(systemEventService.subscribe).toHaveBeenCalledWith(SYSTEM_EVENT_ID, handler);
	});

	describe('publish', () => {

		let gatewayId: string;
		let eventId: string;
		let data: any;
		let gateway: MessageGateway;
		let pk: string;
		let successEvent: any;

		beforeEach(() => {
			gatewayId = "TestChannel";
			eventId = "_testEvent";
			data = {
				arguments: [{
					key: "testKey"
				}]
			};

			gateway = gatewayFactory.createGateway(gatewayId);

			pk = '1234567890';
			spyOn(gateway as any, '_generateIdentifier').and.returnValue(pk);
			successEvent = {
				eventId: 'promiseReturn',
				data: {
					pk,
					type: 'success',
					resolvedDataOfLastSubscriber: 'someData'
				}
			};
		});

		it('SHOULD post a W3C message to the target frame and return a hanging promise', () => {
			const promise = gateway.publish(eventId, data);

			expect(promise).not.toBeResolved();
		});

		it('SHOULD return a promise from publish that is resolved to event.data.resolvedDataOfLastSubscriber when incoming success promiseReturn with same pk', (done) => {
			const promise = gateway.publish(eventId, data);

			gateway.processEvent(successEvent);

			promise.then(() => done(), (error) => fail("should have resolved" + JSON.stringify(error)));

		});

		it('SHOULD return a promise from publish that is rejected WHEN incoming failure promiseReturn with same pk', (done) => {
			const promise = gateway.publish(eventId, data);

			const failureEvent = {
				pk,
				gatewayId,
				eventId: 'promiseReturn',
				data: {
					pk,
					type: 'failure'
				}
			} as IGatewayPostMessageData;

			gateway.processEvent(failureEvent);

			promise.then(() => fail("should have reject"), () => done());

		});

		it('SHOULD return a promise from publish that is still hanging WHEN incoming promiseReturn with different pk', () => {
			const promise = gateway.publish(eventId, data);
			const randomPk = 'fgsdfgssf';

			const differentEvent = {
				pk: randomPk,
				gatewayId,
				eventId: 'promiseReturn',
				data: {
					pk: randomPk,
					type: 'success',
					resolvedDataOfLastSubscriber: 'someData'
				}
			};
			gateway.processEvent(differentEvent);

			expect(promise).not.toBeResolved();
		});

		it('SHOULD return a rejected promise even when there is no target frame', (done) => {
			windowUtils.getTargetIFrame.and.throwError('It is standalone. There is no iframe');
			const promise = gateway.publish(eventId, data);

			gateway.processEvent(successEvent);

			promise.then(() => fail("should have reject"), () => done());
		});

		it('SHOULD reject a promise after retrying publish for 5 times', fakeAsync(() => {

			const publishSpy = spyOn<MessageGateway>(gateway, 'publish').and.callThrough();

			const promise = gateway.publish(eventId, data);

			tick(4000);
			expect(publishSpy.calls.count()).toBe(6);

			expect(gateway.publish).toHaveBeenCalledWith(eventId, data, 1, pk);
			expect(gateway.publish).toHaveBeenCalledWith(eventId, data, 2, pk);
			expect(gateway.publish).toHaveBeenCalledWith(eventId, data, 3, pk);
			expect(gateway.publish).toHaveBeenCalledWith(eventId, data, 4, pk);
			expect(promise).toBeRejected();

		}));

	});

	describe('processEvent', () => {
		let gateway: MessageGateway;
		let event: any;

		beforeEach(() => {

			gateway = gatewayFactory.createGateway('TestChannel');
			event = {
				pk: 'rlktqnvghsliutergwe',
				eventId: 'someEvent',
				data: {
					key1: 'abc'
				}
			};
		});

		it("SHOULD be different from 'promiseReturn' and 'promiseAcknowledgement' will call systemEventService.publishAsync and publish a success promiseReturn event with the last resolved data from subscribers", (done) => {

			systemEventService.publishAsync.and.returnValue(Promise.resolve('someResolvedData'));

			spyOn(gateway, 'publish').and.returnValue(Promise.resolve());

			gateway.processEvent(event).then(() => {

				expect(systemEventService.publishAsync).toHaveBeenCalledWith('TestChannel:someEvent', {
					key1: 'abc'
				});

				expect(gateway.publish).toHaveBeenCalledWith("promiseReturn", {
					pk: 'rlktqnvghsliutergwe',
					type: 'success',
					resolvedDataOfLastSubscriber: 'someResolvedData'
				});

				done();
			});

		});

		it("SHOULD be different from 'promiseReturn' and 'promiseAcknowldgement' will call systemEventService.publishAsync and publish a failure promiseReturn event", async (done) => {

			systemEventService.publishAsync.and.returnValue(Promise.reject("some reason"));

			spyOn(gateway, 'publish').and.returnValue(Promise.resolve());

			gateway.processEvent(event).then(() => {
				expect(systemEventService.publishAsync).toHaveBeenCalledWith('TestChannel:someEvent', {
					key1: 'abc'
				});

				expect(gateway.publish).toHaveBeenCalledWith("promiseReturn", {
					pk: 'rlktqnvghsliutergwe',
					type: 'failure'
				});
				done();
			});
		});

	});

});
