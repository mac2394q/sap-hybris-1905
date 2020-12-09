import { Component, InjectionToken, Provider } from '@angular/core';
import { SeConstructor } from './types';
/** @internal */
export declare class DIBridgeUtils {
    downgradeComponent(definition: Component, componentConstructor: SeConstructor): void;
    downgradeService(name: string, serviceConstructor: SeConstructor, token?: string | InjectionToken<any>): void;
    upgradeProvider(angularJSInjectionKey: string): Provider;
    private _getBridgeModule;
}
export declare const diBridgeUtils: DIBridgeUtils;
