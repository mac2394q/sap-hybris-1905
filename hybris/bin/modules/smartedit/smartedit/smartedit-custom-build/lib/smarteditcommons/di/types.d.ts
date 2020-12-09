import * as angular from 'angular';
import { TypedMap } from "smarteditcommons/dtos";
export interface SeDirectiveDefinition {
    selector?: string;
    inputs?: string[];
    providers?: SeProvider[];
    require?: string | string[] | TypedMap<string>;
}
export interface SeComponentDefinition extends SeDirectiveDefinition {
    custom?: boolean;
    templateUrl?: string;
    template?: string;
    entryComponents?: SeComponentConstructor[];
}
export interface SeModuleDefinition {
    declarations?: (SeDirectiveConstructor | SeComponentConstructor)[];
    entryComponents?: (SeDirectiveConstructor | SeComponentConstructor)[];
    imports?: (string | SeModuleConstructor | SeModuleWithProviders)[];
    providers?: SeProvider[];
    config?: (...args: any[]) => void;
    initialize?: (...args: any[]) => void;
}
export declare type SeFactory = (...arg: any[]) => any;
export interface SeConstructor {
    new (...arg: any[]): any;
}
export interface SeModuleConstructor extends SeConstructor {
    moduleName?: string;
}
export interface SeDirectiveConstructor extends SeConstructor {
    directiveName?: string;
    definition?: angular.IDirective;
    providers?: SeProvider[];
}
export interface SeComponentConstructor extends SeConstructor {
    componentName?: string;
    selector?: string;
    definition?: angular.IComponentOptions;
    entryComponents?: SeComponentConstructor[];
    providers?: SeProvider[];
}
export interface SeBaseProvider {
    provide: string;
    multi?: boolean;
}
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:SeValueProvider
 * @description
 * Configures an injectable value provider in a {@link smarteditServicesModule.object:@SeModule module}, component or directive.
 */
export interface SeValueProvider extends SeBaseProvider {
    /**
     * @ngdoc property
     * @name provide
     * @propertyOf smarteditServicesModule.interface:SeValueProvider
     * @description
     * The provider name.
     */
    /**
     * @ngdoc property
     * @name useValue
     * @propertyOf smarteditServicesModule.interface:SeValueProvider
     * @description
     * An instance value of the provider.
     */
    useValue: any;
}
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:SeClassProvider
 * @description
 * Configures an injectable class provider in a {@link smarteditServicesModule.object:@SeModule module}, component or directive.
 */
export interface SeClassProvider extends SeBaseProvider {
    /**
     * @ngdoc property
     * @name provide
     * @propertyOf smarteditServicesModule.interface:SeClassProvider
     * @description
     * The provider name.
     */
    /**
     * @ngdoc property
     * @name useClass
     * @propertyOf smarteditServicesModule.interface:SeClassProvider
     * @description
     * A class to invoke of the provider.
     */
    useClass: SeConstructor;
}
/**
 * @ngdoc object
 * @name smarteditServicesModule.interface:SeFactoryProvider
 * @description
 * Configures an injectable factory provider in a {@link smarteditServicesModule.object:@SeModule module}, component or directive.
 */
export interface SeFactoryProvider extends SeBaseProvider {
    /**
     * @ngdoc property
     * @name provide
     * @propertyOf smarteditServicesModule.interface:SeFactoryProvider
     * @description
     * The provider name.
     */
    /**
     * @ngdoc property
     * @name useFactory
     * @propertyOf smarteditServicesModule.interface:SeFactoryProvider
     * @description
     * A function to invoke the construction of the provider.
     */
    useFactory: SeFactory;
    /**
     * @ngdoc property
     * @name deps (optional)
     * @propertyOf smarteditServicesModule.interface:SeFactoryProvider
     * @description
     * A list of strings or referenced dependencies to be injected into the factory. The 'ngInject;' hint may be used
     * in replacement of this property.
     */
    deps?: (SeConstructor | SeFactory | string)[];
}
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:SeModuleWithProviders
 * @description
 * The returning type of a configurable module.
 */
export interface SeModuleWithProviders {
    seModule: SeModuleConstructor;
    providers: SeProvider[];
}
export declare type SeProvider = SeValueProvider | SeClassProvider | SeFactoryProvider | SeConstructor | SeFactory;
