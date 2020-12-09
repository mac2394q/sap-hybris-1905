import { SeModuleConstructor, SeModuleDefinition } from "./types";
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeModule
 * @deprecated since 1905
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit module from a Dependency injection standpoint.
 *
 * To create a configurable module, create a static method returning an SeModuleWithProvider object. The module
 * can then be imported by a parent module returning the SeModuleWithProvider object from the static method.
 * @deprecated since 1905
 * @param {object} definition the module definition
 * @param {object} definition.declarations the array of {@link smarteditServicesModule.object:@SeDirective @SeDirective} and {@link smarteditServicesModule.object:@SeComponent @SeComponent} on which this new {@link smarteditServicesModule.object:@SeModule @SeModule} depends.
 * @param {object} definition.imports the array of modules on which this new module depends.
 * <br/> This is a mixed array of string (legacy approach) and {@link smarteditServicesModule.object:@SeModule @SeModule} annotated classes (recommended approach).
 * @param {object} definition.providers the list of {@link smarteditServicesModule.interface:SeClassProvider service classes},
 * {@link smarteditServicesModule.interface:SeFactoryProvider service factories}, {@link smarteditServicesModule.interface:SeValueProvider value},
 * or multi providers to be injected into this new module.
 * @param {Array} definition.config the injectable callback to be executed at configuration time
 * @param {Array} definition.initialize the injectable callback to be executed at startup time
 */
export declare const SeModule: (definition: SeModuleDefinition) => <T extends SeModuleConstructor>(moduleConstructor: T) => T;
