import { SeDirectiveConstructor, SeDirectiveDefinition } from './types';
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeDirective
 * @deprecated since 1905
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit web directive from a Depencency injection standpoint.
 * This directive will have an isolated scope and will bind its properties to its controller
 * @deprecated since 1905
 * @param {object} definition the component definition
 * @param {string?} definition.version if set to 'NG', it will be wired through Angular as opposed to AngularJS
 * @param {string?} definition.selector The CSS selector that triggers the instantiation of a directive.
 * selector may be declared as one of the following:
 * <ul>
 * <li>element-name: select by element name.</li>
 * <li>.class: select by class name.</li>
 * <li>[attribute]: select by attribute name.</li>
 * </ul>
 * If no selector is set, will default to an element named as the lower camel case of the component class.
 * @param {string[]?} definition.inputs the array of input data binding
 * The inputs property defines a set of directiveProperty to bindingProperty configuration:
 * <ul>
 * <li>directiveProperty specifies the component property where the value is written.</li>
 * <li>bindingProperty specifies the binding type and/or the DOM property where the value is read from.</li>
 * binding type is legacy support for "@", "&" and "=" of Angular 1.x
 * </ul>
 * example: inputs: ['bankName', 'id: account-id']
 * @param {object} definition.providers the list of {@link smarteditServicesModule.interface:SeClassProvider service classes},
 * {@link smarteditServicesModule.interface:SeFactoryProvider service factories}, {@link smarteditServicesModule.interface:SeValueProvider value},
 * or multi providers to be injected into the component.
 */
export declare const SeDirective: (definition: SeDirectiveDefinition) => (directiveConstructor: SeDirectiveConstructor) => SeDirectiveConstructor;
