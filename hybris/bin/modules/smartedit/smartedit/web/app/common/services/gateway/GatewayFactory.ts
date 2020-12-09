/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Injector} from '@angular/core';
import {IGatewayPostMessageData, MessageGateway} from './MessageGateway';
import {FunctionsUtils, PromiseUtils, StringUtils, UrlUtils, WindowUtils} from 'smarteditcommons/utils';
import {CloneableUtils, TypedMap} from 'smarteditcommons/dtos';
import {SeDowngradeService} from 'smarteditcommons/di';
import {SystemEventService} from '../SystemEventService';
import {LogService} from 'smarteditcommons/services/LogService';


/**
 * @ngdoc service
 * @name smarteditCommonsModule.service:GatewayFactory
 *
 * @description
 * The Gateway Factory controls the creation of and access to {@link smarteditCommonsModule.service:MessageGateway MessageGateway}
 * instances.
 *
 * To construct and access a gateway, you must use the GatewayFactory's createGateway method and provide the channel
 * ID as an argument. If you try to create the same gateway twice, the second call will return a null.
 */


@SeDowngradeService()
export class GatewayFactory {

	/**
	 * @description
	 * the name of the configuration key containing the list of white listed storefront domain names
	 */
	static WHITE_LISTED_STOREFRONTS_CONFIGURATION_KEY = 'whiteListedStorefronts';

	/*
	* Period between two retries of a MessageGateway to publish an event
	* this value must be greater than the time needed by the browser to process a postMessage back and forth across two frames.
	* Internet Explorer is now known to need more than 100ms.
	*/
	static TIMEOUT_TO_RETRY_PUBLISHING = 500;


	private messageGatewayMap: TypedMap<MessageGateway> = {};

	constructor(
		private logService: LogService,
		private injector: Injector,
		private systemEventService: SystemEventService,
		private cloneableUtils: CloneableUtils,
		private urlUtils: UrlUtils,
		private stringUtils: StringUtils,
		private windowUtils: WindowUtils,
		private promiseUtils: PromiseUtils,
		private functionsUtils: FunctionsUtils
	) {}

    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:GatewayFactory#initListener
     * @methodOf smarteditCommonsModule.service:GatewayFactory
     *
     * @description
     * Initializes a postMessage event handler that dispatches the handling of an event to the specified gateway.
     * If the corresponding gateway does not exist, an error is logged.
     */

	initListener() {

		const processedPrimaryKeys: string[] = [];

		// Listen to message from child window
		this.windowUtils.getWindow().addEventListener('message', (e: MessageEvent) => {

			if (this._isAllowed(e.origin)) {
				// add control on e.origin
				const event: IGatewayPostMessageData = e.data;

				if (processedPrimaryKeys.indexOf(event.pk) > -1) {
					return;
				}
				processedPrimaryKeys.push(event.pk);
				this.logService.debug('message event handler called', event.eventId);

				const gatewayId: string = event.gatewayId;
				const gateway: MessageGateway = this.messageGatewayMap[gatewayId];
				if (!gateway) {
					this.logService.debug('Incoming message on gateway ' + gatewayId + ', but no destination exists.');
					return;
				}

				gateway.processEvent(event);
			} else {
				this.logService.error("disallowed storefront is trying to communicate with smarteditcontainer");
			}

		}, false);
	}

    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:GatewayFactory#createGateway
     * @methodOf smarteditCommonsModule.service:GatewayFactory
     *
     * @description
     * Creates a gateway for the specified gateway identifier and caches it in order to handle postMessage events
     * later in the application lifecycle. This method will fail on subsequent calls in order to prevent two
     * clients from using the same gateway.
     *
     * @param {String} gatewayId The identifier of the gateway.
     * @returns {MessageGateway} Returns the newly created Message Gateway or null.
     */
	createGateway(gatewayId: string): MessageGateway {
		if (this.messageGatewayMap[gatewayId] && !this.functionsUtils.isUnitTestMode()) {
			this.logService.error('Message Gateway for ' + gatewayId + ' already reserved');
			return null;
		}

		this.messageGatewayMap[gatewayId] = new MessageGateway(this.logService,
			this.systemEventService, this.cloneableUtils, this.windowUtils, this.promiseUtils,
			GatewayFactory.TIMEOUT_TO_RETRY_PUBLISHING, gatewayId);

		return this.messageGatewayMap[gatewayId];
	}

    /**
     * allowed if receiving end is frame or [container + (white listed storefront or same origin)]
     */
	private _isAllowed(origin: string): boolean {
		const whiteListedStorefronts: string[] = this.injector.get(GatewayFactory.WHITE_LISTED_STOREFRONTS_CONFIGURATION_KEY, []);
		return this.windowUtils.isIframe() || this.urlUtils.getOrigin() === origin || (whiteListedStorefronts.some((allowedURI: string) => {
			return this.stringUtils.regExpFactory(allowedURI).test(origin);
		}));
	}
}