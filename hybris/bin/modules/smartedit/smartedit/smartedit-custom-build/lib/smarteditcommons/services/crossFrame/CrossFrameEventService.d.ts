import { WindowUtils } from 'smarteditcommons/utils';
import { Cloneable } from 'smarteditcommons/dtos';
import { CloneableEventHandler } from '../gateway';
import { MessageGateway } from '../gateway/MessageGateway';
import { SystemEventService } from '../SystemEventService';
/**
 * @ngdoc service
 * @name smarteditCommonsModule.service:CrossFrameEventService
 *
 * @description
 * The Cross Frame Event Service is responsible for publishing and subscribing events within and between frames.
 * It uses {@link smarteditCommonsModule.service:GatewayFactory gatewayFactory} and {@link smarteditCommonsModule.service:SystemEventService EventService} to transmit events.
 *
 */
export declare class CrossFrameEventService {
    private systemEventService;
    private crossFrameEventServiceGateway;
    private windowUtils;
    constructor(systemEventService: SystemEventService, crossFrameEventServiceGateway: MessageGateway, windowUtils: WindowUtils);
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:CrossFrameEventService#publish
     * @methodOf smarteditCommonsModule.service:CrossFrameEventService
     *
     * @description
     * Publishes an event within and across the gateway.
     *
     * The publish method is used to send events using {@link smarteditCommonsModule.SystemEventService#publishAsync publishAsync} of
     * {@link smarteditCommonsModule.SystemEventService SystemEventService} and as well send the message across the gateway by using
     * {@link smarteditCommonsModule.service:MessageGateway#publish publish} of the {@link smarteditCommonsModule.service:GatewayFactory gatewayFactory}.
     *
     * @param {String} eventId Event identifier
     * @param {any=} data The event payload. It is an optional paramter.
     * @returns {Promise<[any, any]>} Promise to resolve
     */
    publish(eventId: string, data?: any): Promise<any[]>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:CrossFrameEventService#subscribe
     * @methodOf smarteditCommonsModule.service:CrossFrameEventService
     *
     * @description
     * Subscribe to an event across both frames.
     *
     * The subscribe method is used to register for listening to events using subscribe method of
     * {@link smarteditCommonsModule.SystemEventService SystemEventService} and as well send the registration message across the gateway by using
     * {@link smarteditCommonsModule.service:MessageGateway#subscribe subscribe} of the {@link smarteditCommonsModule.service:GatewayFactory gatewayFactory}.
     *
     * @param {String} eventId Event identifier
     * @param {CloneableEventHandler} handler Callback function to be invoked
     * @returns {() => void} The function to call in order to unsubscribe the event listening; this will unsubscribe both from the systemEventService and the crossFrameEventServiceGatway
     */
    subscribe<T extends Cloneable>(eventId: string, handler: CloneableEventHandler<T>): () => void;
}
