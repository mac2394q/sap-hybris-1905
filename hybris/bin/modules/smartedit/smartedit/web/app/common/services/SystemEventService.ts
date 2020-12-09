/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TypedMap} from 'smarteditcommons/dtos';
import {PromiseUtils} from 'smarteditcommons/utils';
import {SeDowngradeService} from 'smarteditcommons/di';
import {LogService} from 'smarteditcommons/services/LogService';

export type EventHandler = (eventId: string, eventData?: any) => Promise<any> | any;

/**
 * @ngdoc service
 * @name smarteditCommonsModule.service:SystemEventService
 * @description
 *
 * The SystemEventService is used to transmit events synchronously or asynchronously. It is supported by the SmartEdit {@link smarteditCommonsModule.service:GatewayFactory gatewayFactory} to propagate events between SmartEditContainer and SmartEdit.
 * It also contains options to publish events, as well as subscribe the event handlers.
 *
 */

@SeDowngradeService()
export class SystemEventService {

	private _eventHandlers: TypedMap<EventHandler[]> = {};

	constructor(
		private logService: LogService,
		private promiseUtils: PromiseUtils
	) {
	}

    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:SystemEventService#publish
     * @methodOf smarteditCommonsModule.service:SystemEventService
     *
     * @description
     * send the event with data synchronously.
     *
     * @param {String} eventId The identifier of the event.
     * @param {any=} data The event payload. It is optional parameter.
     *
     * @return {Promise<any>} A promise with resolved data of last subscriber or with the rejected error reason
     */
	publish(eventId: string, data?: any): Promise<any> {
		if (!eventId) {
			this.logService.error('Failed to send event. No event ID provided for data: ' + data);
		} else {
			if (this._eventHandlers[eventId] && this._eventHandlers[eventId].length > 0) {
				return this._invokeEventHandlers(eventId, data);
			}
		}
		return Promise.resolve();
	}

    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:SystemEventService#sendSynchEvent
     * @methodOf smarteditCommonsModule.service:SystemEventService
     * @deprecated since 1808
     * @description
     * send the event with data synchronously.
     *
     * @param {String} eventId The identifier of the event.
     * @param {any=} data The event payload. It is optional parameter.
     *
     * @return {Promise<any>} A promise with resolved data of last subscriber or with the rejected error reason
     */
	sendSynchEvent(eventId: string, data?: any): Promise<any> {
		return this.publish(eventId, data);
	}

    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:SystemEventService#publishAsync
     * @methodOf smarteditCommonsModule.service:SystemEventService
     *
     * @description
     * send the event with data asynchronously.
     *
     * @param {String} eventId The identifier of the event.
     * @param {any=} data The event payload. It is an optional parameter.
     *
     * @return {Promise<any>} A deferred promise
     */
	publishAsync(eventId: string, data?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.publish(eventId, data).then(
					(resolvedData: any) => resolve(resolvedData),
					(reason: any) => reject(reason)
				);
			}, 0);
		});
	}

    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:SystemEventService#sendAsynchEvent
     * @methodOf smarteditCommonsModule.service:SystemEventService 
     * @deprecated since 1808
     * @description
     * send the event with data asynchronously.
     *
     * @param {String} eventId The identifier of the event.
     * @param {any=} data The event payload. It is an optional parameter.
     *
     * @return {Promise<any>} A deferred promise
     */
	sendAsynchEvent(eventId: string, data?: any): Promise<any> {
		return this.publishAsync(eventId, data);
	}

	/**
	 * @ngdoc method
	 * @name smarteditCommonsModule.service:SystemEventService#subscribe
	 * @methodOf smarteditCommonsModule.service:SystemEventService
	 *
	 * @description
	 * method to subscribe the event handler given the eventId and handler
	 * 
	 * @param {String} eventId The identifier of the event.
	 * @param {EventHandler} handler The event handler, a callback function which can either return a promise or directly a value. 
	 * 
	 * @return {() => void} unsubscribeFn Function to unsubscribe the event handler
	 */
	subscribe(eventId: string, handler: EventHandler): () => void {
		let unsubscribeFn: () => void;
		if (!eventId || !handler) {
			this.logService.error('Failed to subscribe event handler for event: ' + eventId);
		} else {
			// create handlers array for this event if not already created
			if (this._eventHandlers[eventId] === undefined) {
				this._eventHandlers[eventId] = [];
			}
			this._eventHandlers[eventId].push(handler);

			unsubscribeFn = () => {
				this._unsubscribe(eventId, handler);
			};
		}
		return unsubscribeFn;
	}

	/**
	 * @ngdoc method
	 * @name smarteditCommonsModule.service:SystemEventService#registerEventHandler
	 * @methodOf smarteditCommonsModule.service:SystemEventService
	 * @deprecated since 1808
	 * @description
	 * method to subscribe the event handler given the eventId and handler
	 * 
	 * @param {String} eventId The identifier of the event.
	 * @param {EventHandler} handler The event handler, a callback function which can either return a promise or directly a value. 
	 * 
	 * @return {() => void} unsubscribeFn Function to unsubscribe the event handler
	 */
	registerEventHandler(eventId: string, handler: EventHandler): () => void {
		return this.subscribe(eventId, handler);
	}

	private _unsubscribe(eventId: string, handler: EventHandler) {
		const handlersArray = this._eventHandlers[eventId];
		const index = handlersArray ? this._eventHandlers[eventId].indexOf(handler) : -1;
		if (index >= 0) {
			this._eventHandlers[eventId].splice(index, 1);
		} else {
			this.logService.warn('Attempting to remove event handler for ' + eventId + ' but handler not found.');
		}
	}

	private _invokeEventHandlers(eventId: string, data?: any): Promise<any> {
		return Promise.all(this._eventHandlers[eventId].map((eventHandler: EventHandler) => {
			const promiseClosure = this.promiseUtils.toPromise(eventHandler);
			return promiseClosure(eventId, data);
		})).then((results: any) => {
			return Promise.resolve(results.pop());
		}, (reason: any) => {
			return Promise.reject(reason);
		});
	}
}