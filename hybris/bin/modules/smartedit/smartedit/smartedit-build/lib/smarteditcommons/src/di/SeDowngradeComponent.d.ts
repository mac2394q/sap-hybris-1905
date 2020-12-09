import { SeComponentConstructor } from './types';
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeDowngradeComponent
 *
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to require an Angular component to be downgraded
 */
export declare const SeDowngradeComponent: () => <T extends SeComponentConstructor>(componentConstructor: T) => T;
