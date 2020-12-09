import { Injector } from '@angular/core';
import { MessageGateway } from './MessageGateway';
import { FunctionsUtils, PromiseUtils, StringUtils, UrlUtils, WindowUtils } from 'smarteditcommons/utils';
import { CloneableUtils } from 'smarteditcommons/dtos';
import { SystemEventService } from '../SystemEventService';
import { LogService } from 'smarteditcommons/services/LogService';
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
export declare class GatewayFactory {
    private logService;
    private injector;
    private systemEventService;
    private cloneableUtils;
    private urlUtils;
    private stringUtils;
    private windowUtils;
    private promiseUtils;
    private functionsUtils;
    /**
     * @description
     * the name of the configuration key containing the list of white listed storefront domain names
     */
    static WHITE_LISTED_STOREFRONTS_CONFIGURATION_KEY: string;
    static TIMEOUT_TO_RETRY_PUBLISHING: number;
    private messageGatewayMap;
    constructor(logService: LogService, injector: Injector, systemEventService: SystemEventService, cloneableUtils: CloneableUtils, urlUtils: UrlUtils, stringUtils: StringUtils, windowUtils: WindowUtils, promiseUtils: PromiseUtils, functionsUtils: FunctionsUtils);
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:GatewayFactory#initListener
     * @methodOf smarteditCommonsModule.service:GatewayFactory
     *
     * @description
     * Initializes a postMessage event handler that dispatches the handling of an event to the specified gateway.
     * If the corresponding gateway does not exist, an error is logged.
     */
    initListener(): void;
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
    createGateway(gatewayId: string): MessageGateway;
    /**
     * allowed if receiving end is frame or [container + (white listed storefront or same origin)]
     */
    private _isAllowed;
}
