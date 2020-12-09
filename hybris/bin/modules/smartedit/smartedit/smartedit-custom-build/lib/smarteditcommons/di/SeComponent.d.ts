import { SeComponentConstructor, SeComponentDefinition } from './types';
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeComponent
 * @deprecated since 1905
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit web component from a Depencency injection standpoint.
 * The controller alias will be $ctrl.
 * inherits properties from {@link smarteditServicesModule.object:@SeDirective}
 * @deprecated since 1905
 * @param {object} definition the component definition
 * @param {string?} definition.version if set to 'NG', it will be wired through Angular as opposed to AngularJS
 * @param {string?} definition.custom for Angular components, if set to true, the component will be made available as a web component but with a selector to which  is appended.
 * @param {string?} definition.templateUrl the HTML file location for this component
 * @param {string?} definition.template the inline HTML template for this component
 * @param {object?} definition.entryComponents the array of {@link smarteditServicesModule.object:@SeComponent @SeComponent} that this new one requires.
 * @param {object} definition.providers the list of {@link smarteditServicesModule.interface:SeClassProvider service classes},
 * {@link smarteditServicesModule.interface:SeFactoryProvider service factories}, {@link smarteditServicesModule.interface:SeValueProvider value},
 * or multi providers to be injected into the component.
 */
export declare const SeComponent: (definition: SeComponentDefinition) => <T extends SeComponentConstructor>(componentConstructor: T) => T;
