import { TypedMap } from 'smarteditcommons/dtos';
import { SeConstructor } from 'smarteditcommons/di/types';
import * as lo from 'lodash';
/**
 * @ngdoc object
 * @name NoModule.object:MethodAnnotation
 *
 * @description
 * Shorthand signature of a {@link https://www.typescriptlang.org/docs/handbook/decorators.html Typescript Decorator} function for methods
 * used by {@link NoModule.service:AnnotationService AnnotationService}.
 * @param {any} target the instance the method of which is annotated
 * @param {any} propertyName the name of the method that is annotated
 * @param {any} originalMethod the original method being annotated, it is prebound to the instance
 * @returns {any} the final return value of the proxied method.
 * It is left to implementers to discard, modify, reuse the original method.
 */
export declare type MethodAnnotation = (target: any, propertyName: string, originalMethod: (...x: any[]) => any, ...invocationArguments: any[]) => any;
/**
 * @ngdoc object
 * @name NoModule.object:MethodAnnotationFactory
 *
 * @description
 * A {@link NoModule.object:MethodAnnotation MethodAnnotation} factory
 * used by {@link NoModule.service:AnnotationService AnnotationService}.
 * @param {...any[]} factoryArguments the factory arguments
 * @returns {MethodAnnotation} {@link NoModule.object:MethodAnnotation MethodAnnotation}
 */
export declare type MethodAnnotationFactory = (...factoryArguments: any[]) => MethodAnnotation;
/**
 * @ngdoc object
 * @name NoModule.object:ClassAnnotation
 *
 * @description
 * Shorthand signature of a {@link https://www.typescriptlang.org/docs/handbook/decorators.html Typescript Decorator} function for classes
 * used by {@link NoModule.service:AnnotationService AnnotationService}.
 * @param {any} instance an instance of the class which is annotated
 * @param {(...x: any[]) => any} originalConstructor the prebound original constructor of the instance
 * @param {...any[]} invocationArguments the arguments with which the constructor is invoked
 * @returns {any} void or a new instance.
 * It is left to implementers to discard, modify, or reuse the original constructor then not to return or return a new instance.
 */
export declare type ClassAnnotation = (instance: any, originalConstructor: (...x: any[]) => any, ...invocationArguments: any[]) => any;
/**
 * @ngdoc object
 * @name NoModule.object:ClassAnnotationFactory
 *
 * @description
 * A {@link NoModule.object:ClassAnnotation ClassAnnotation} factory
 * used by {@link NoModule.service:AnnotationService AnnotationService}.
 * @param {...any[]} factoryArguments the factory arguments
 * @returns {ClassAnnotation} {@link NoModule.object:ClassAnnotation ClassAnnotation}
 */
export declare type ClassAnnotationFactory = (...x: any[]) => ClassAnnotation;
/**
 * @ngdoc service
 * @name NoModule.service:AnnotationService
 *
 * @description
 * Utility service to declare and consume method level and class level {@link https://www.typescriptlang.org/docs/handbook/decorators.html Typescript decorator factories}.
 * <br/>Since Decorator is a reserved word in Smartedit, Typescript Decorators are called as Annotations.
 */
export declare class AnnotationService {
    readonly INJECTABLE_NAME_KEY = "getInjectableName";
    readonly ORIGINAL_CONSTRUCTOR_KEY = "originalConstructor";
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getClassAnnotations
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Retrieves an object with all the string-indexed annotations defined on the given class target
     * @param {any} target The typescript class on which class annotations are defined
     * @returns {[index: string]: any} an object contains string-indexed annotation name and payload
     */
    getClassAnnotations: ((target: any) => TypedMap<any>) & lo.MemoizedFunction;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getMethodAnnotations
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Retrieves an object with all the string indexed annotations defined on the given class method
     * @param {any} target The typescript class to the inspected
     * @param {string} propertyName The name of the method on which annotations are defined
     * @returns {[index: string]: any} an object contains string-indexed annotation name and payload
     */
    getMethodAnnotations: ((target: any, propertyName: string) => TypedMap<any>) & lo.MemoizedFunction;
    private functionsUtils;
    private annotationFactoryMap;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getClassAnnotation
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Retrieves arguments of class annotation under a given annotation name
     * @param {any} target The typescript class on which class annotation is defined
     * @param {(args?: any) => ClassDecorator} annotation The type of the class annotation
     * @returns {any} the payload passed to the annotation
     */
    getClassAnnotation(target: any, annotation: (args?: any) => ClassDecorator): any;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getMethodAnnotation
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Retrieves arguments of method annotation for a given typescript class
     * @param {any} target The typescript class
     * @param {string} propertyName The name of the method on which annotation is defined
     * @param {(args?: any) => MethodDecorator)} annotation The type of the method annotation
     * @returns {any} the payload passed to the annotation
     */
    getMethodAnnotation(target: any, propertyName: string, annotation: (args?: any) => MethodDecorator): any;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#hasClassAnnotation
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Determines whether a given class target has given annotation name defined or not
     * @param {any} target The typescript class on which class annotation is defined
     * @param {(args?: any) => ClassDecorator} annotation The type of the class annotation
     * @returns {boolean} true if a given target has given annotation name. Otherwise false.
     */
    hasClassAnnotation(target: any, annotation: (args?: any) => ClassDecorator): boolean;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#hasMethodAnnotation
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Determines whether a given method name has given annotation name defined or not under a given typescript class
     * @param {any} target The typescript class object
     * @param {string} propertyName The name of the method on which annotation is defined
     * @param {(args?: any) => MethodDecorator} annotation The type of the method annotation
     * @returns {boolean} true if a given method name has given annotation name. Otherwise false.
     */
    hasMethodAnnotation(target: any, propertyName: string, annotation: (args?: any) => MethodDecorator): boolean;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#setClassAnnotationFactory
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Registers a {@link NoModule.object:ClassAnnotationFactory ClassAnnotationFactory} under a given name.
     * <br/>Typically, in order for the ClassAnnotationFactory to benefit from Angular dependency injection, this method will be called within an Angular factory.
     * @param {string} name the name of the factory.
     * @returns {ClassAnnotationFactory} a {@link NoModule.object:ClassAnnotationFactory ClassAnnotationFactory}
     */
    setClassAnnotationFactory(name: string, annotationFactory: ClassAnnotationFactory): ClassAnnotationFactory;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getClassAnnotationFactory
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Retrieves a {@link NoModule.object:ClassAnnotationFactory ClassAnnotationFactory}
     * previously registered under the given name:
     *
     * <pre>
     *   export const GatewayProxied = annotationService.getClassAnnotationFactory('GatewayProxied');
     * </pre>
     *
     * @param {string} name The name of the factory
     * @returns {ClassAnnotationFactory} a {@link NoModule.object:ClassAnnotationFactory ClassAnnotationFactory}
     */
    getClassAnnotationFactory(name: string): (...args: any[]) => ClassDecorator;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#setMethodAnnotationFactory
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Registers a {@link NoModule.object:MethodAnnotationFactory MethodAnnotationFactory} under a given name.
     * <br/>Typically, in order for the MethodAnnotationFactory to benefit from Angular dependency injection, this method will be called within an Angular factory.
     * @param {string} name The name of the factory.
     * @returns {MethodAnnotationFactory} a {@link NoModule.object:MethodAnnotationFactory MethodAnnotationFactory}
     */
    setMethodAnnotationFactory(name: string, annotationFactory: MethodAnnotationFactory): MethodAnnotationFactory;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getMethodAnnotationFactory
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Retrieves a method level {@link NoModule.object:MethodAnnotationFactory MethodAnnotationFactory}
     * previously registered under the given name:
     *
     * <pre>
     *   export const Cached = annotationService.getMethodAnnotationFactory('Cached');
     * </pre>
     *
     * @param {string} name the name of the factory.
     * @returns {MethodAnnotationFactory} a {@link NoModule.object:MethodAnnotationFactory MethodAnnotationFactory}.
     */
    getMethodAnnotationFactory(name: string): (...factoryArgument: any[]) => (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(...x: any[]) => any>) => void;
    /**
     * @ngdoc method
     * @name NoModule.service:AnnotationService#getOriginalConstructor
     * @methodOf NoModule.service:AnnotationService
     *
     * @description
     * Given a class constructor, returns the original constructor of it prior to any class level
     * proxying by annotations declared through {@link NoModule.service:AnnotationService AnnotationService}
     *
     * @param {SeConstructor} target the constructor
     */
    getOriginalConstructor(target: any): SeConstructor;
    private isDIReady;
    private getClassAnnotationsLogic;
    private getMethodAnnotationsLogic;
}
export declare const annotationService: AnnotationService;
