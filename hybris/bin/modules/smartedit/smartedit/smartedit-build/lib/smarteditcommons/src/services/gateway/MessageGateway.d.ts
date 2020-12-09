import * as angular from 'angular';
import { PromiseUtils, WindowUtils } from 'smarteditcommons/utils';
import { Cloneable, CloneableUtils } from 'smarteditcommons/dtos';
import { SystemEventService } from '../SystemEventService';
import { LogService } from 'smarteditcommons/services/LogService';
export declare type CloneableEventHandler<T extends Cloneable> = (eventId: string, eventData?: T) => angular.IPromise<any> | any;
/**
 * @ngdoc service
 * @name smarteditCommonsModule.service:MessageGateway
 *
 * @description
 * The Message Gateway is a private channel that is used to publish and subscribe to events across iFrame
 * boundaries. The gateway uses the W3C-compliant postMessage as its underlying technology. The benefits of
 * the postMessage are that:
 * <ul>
 *     <li>It works in cross-origin scenarios.</li>
 *     <li>The receiving end can reject messages based on their origins.</li>
 * </ul>
 *
 * The creation of instances is controlled by the {@link smarteditCommonsModule.service:GatewayFactory gatewayFactory}. Only one
 * instance can exist for each gateway ID.
 *
 * @param {String} gatewayId The channel identifier
 * @constructor
 */
export declare class MessageGateway {
    private logService;
    private systemEventService;
    private cloneableUtils;
    private windowUtils;
    private promiseUtils;
    private TIMEOUT_TO_RETRY_PUBLISHING;
    readonly gatewayId: string;
    private PROMISE_ACKNOWLEDGEMENT_EVENT_ID;
    private PROMISE_RETURN_EVENT_ID;
    private SUCCESS;
    private FAILURE;
    private MAX_RETRIES;
    private promisesToResolve;
    constructor(logService: LogService, systemEventService: SystemEventService, cloneableUtils: CloneableUtils, windowUtils: WindowUtils, promiseUtils: PromiseUtils, TIMEOUT_TO_RETRY_PUBLISHING: number, gatewayId: string);
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:MessageGateway#publish
     * @methodOf smarteditCommonsModule.service:MessageGateway
     *
     * @description
     * Publishes a message across the gateway using the postMessage.
     *
     * The gateway's publish method implements promises, which are an AngularJS implementation. To resolve a
     * publish promise, all listener promises on the side of the channel must resolve. If a failure occurs in the
     * chain, the chain is interrupted and the publish promise is rejected.
     *
     * @param {String} eventId Event identifier
     * @param {Object} data Message payload
     * @param {Number} retries The current number of attempts to publish a message. By default it is 0.
     * @param {String=} pk An optional parameter. It is a primary key for the event, which is generated after
     * the first attempt to send a message.
     * @returns {Promise} Promise to resolve
     */
    publish<Tin extends Cloneable, Tout extends Cloneable>(eventId: string, _data: Tin, retries?: number, pk?: string): Promise<void | Tout>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:MessageGateway#subscribe
     * @methodOf smarteditCommonsModule.service:MessageGateway
     *
     * @description
     * Registers a given callback function to the given event ID.
     *
     * @param {String} eventId Event identifier
     * @param {CloneableEventHandler} callback Callback function to be invoked
     * @returns {() => void)} The function to call in order to unsubscribe the event listening
     */
    subscribe<T extends Cloneable>(eventId: string, callback: CloneableEventHandler<T>): () => void;
    processEvent(event: IGatewayPostMessageData): Promise<any>;
    private _setTimeout;
    private _generateIdentifier;
    private _getSystemEventId;
}
