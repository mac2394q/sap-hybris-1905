import { NgModule, Provider } from '@angular/core';
import { LogService } from '../services/LogService';
import { Cloneable, TypedMap } from '../dtos';
/** @internal */
export declare class ModuleUtils {
    private logService;
    constructor(logService: LogService);
    getNgModule(appName: string): NgModule;
    addModuleToAngularJSApp(legacyAngularModuleName: string, app: string): void;
    initialize(useFactory: (...args: any[]) => void, deps?: any[]): Provider;
    bootstrap(useFactory: (...args: any[]) => void, deps?: any[]): Provider;
    provideValues(constants?: TypedMap<Cloneable>): {
        provide: string;
        useValue: Cloneable;
    }[];
}
export declare const moduleUtils: ModuleUtils;
