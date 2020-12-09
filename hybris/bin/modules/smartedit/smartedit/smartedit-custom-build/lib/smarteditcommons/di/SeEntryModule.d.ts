/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeModule
 *
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to declare a Smartedit module as en try point.
 * @param {object} id the module identifier used when loading it into Smartedit
 */
export declare const SeEntryModule: (id: string) => (moduleConstructor: any) => any;
