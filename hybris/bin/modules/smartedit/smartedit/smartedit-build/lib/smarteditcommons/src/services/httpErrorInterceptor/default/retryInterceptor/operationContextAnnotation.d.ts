/// <reference types="angular" />
/// <reference types="angular-resource" />
import { OperationContextService } from './OperationContextService';
/**
 * @ngdoc object
 * @name smarteditCommonsModule.object:@OperationContextRegistered
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} is delegated to
 * {@link smarteditCommonsModule.service:OperationContextService OperationContextService.register} and it provides the functionality
 * to register an url with {@link seConstantsModule.object:OPERATION_CONTEXT operation context(s)}.
 *
 * For example:
 * 1. @OperationContextRegistered('apiUrl', ['CMS', 'INTERACTIVE'])
 * 2. @OperationContextRegistered('apiUrl', 'TOOLING')
 *
 * @param {string} url
 * @param {string | string[]} operationContext
 */
export declare const OperationContextRegistered: (url: string, operationContext: string | string[]) => ClassDecorator;
export declare function OperationContextAnnotationFactory($injector: angular.auto.IInjectorService, operationContextService: OperationContextService, OPERATION_CONTEXT: any): import("../../../annotationService").ClassAnnotationFactory;
