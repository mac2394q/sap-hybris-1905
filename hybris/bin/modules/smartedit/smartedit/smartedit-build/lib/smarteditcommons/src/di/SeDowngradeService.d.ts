import { InjectionToken } from '@angular/core';
import { SeConstructor } from './types';
import { TypedMap } from 'smarteditcommons/dtos/TypedMap';
export declare const servicesToBeDowngraded: TypedMap<SeConstructor>;
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@SeDowngradeService
 *
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory}
 * used to require an Angular service to be downgraded
 * @param {token=} an `InjectionToken` that identifies a service provided from Angular.
 * Will default to using the constructor itself
 */
export declare const SeDowngradeService: (token?: string | InjectionToken<any>) => <T extends SeConstructor>(serviceConstructor: T) => T;
