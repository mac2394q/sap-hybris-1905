import { SeConstructor, SeFactory, SeValueProvider } from './types';
/** @internal */
export declare class DINameUtils {
    buildComponentName(componentConstructor: SeConstructor): string;
    buildServiceName(serviceConstructor: SeConstructor | SeFactory): string;
    buildModuleName(moduleConstructor: SeConstructor | SeFactory): string;
    buildName(constructor: SeConstructor | SeFactory): string;
    convertNameCasing(originalName: string): string;
    makeValueProvider(variableShortHand: {
        [index: string]: any;
    }): SeValueProvider;
}
export declare const diNameUtils: DINameUtils;
