import { InjectionToken } from '@angular/core';
import { GatewayFactory } from '../gateway/GatewayFactory';
/** @internal */
export declare class CrossFrameEventServiceGateway {
    static crossFrameEventServiceGatewayToken: InjectionToken<string>;
    constructor(gatewayFactory: GatewayFactory);
}
