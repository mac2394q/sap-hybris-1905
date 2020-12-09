/**
 * @ngdoc service
 * @name functionsModule.service:FunctionsUtils
 *
 * @description
 * utility service around Functions.
 */
export declare class FunctionsUtils {
    private signatureArgsRegexp;
    /**
     * @ngdoc method
     * @name functionsModule.service:FunctionsUtils#isEmpty
     * @methodOf functionsModule.service:FunctionsUtils
     *
     * @description
     * Will determine whether a function body is empty or should be considered empty for proxying purposes
     *
     * @param {Function} func, the function to evaluate
     * @returns {Boolean} a boolean.
     */
    isEmpty(func: (...args: any[]) => any): boolean;
    /**
     * @ngdoc method
     * @name functionsModule.service:FunctionsUtils#getArguments
     * @methodOf functionsModule.service:FunctionsUtils
     *
     * @description
     * Returns the array of string arguments of the given function signature
     *
     * @param {Function} func the function to analyze
     * @returns {string[]} an array of string arguments
     */
    getArguments(func: (...args: any[]) => any): string[];
    /**
     * @ngdoc method
     * @name functionsModule.service:FunctionsUtils#hasArguments
     * @methodOf functionsModule.service:FunctionsUtils
     *
     * @description
     * Determines whether a given function (anonymous or not) has arguments in it signature
     *
     * @param {Function} func the function to analyze
     * @returns {boolean} true if the function has signature arguments
     */
    hasArguments(func: (...args: any[]) => any): boolean;
    /**
     * @ngdoc method
     * @name functionsModule.service:FunctionsUtils#getConstructorName
     * @methodOf functionsModule.service:FunctionsUtils
     *
     * @description
     * Returns the constructor name in a cross browser fashion
     *
     * @param {Function} func the function to analyze
     * @returns {string} the constructor name
     */
    getConstructorName(func: new (...args: any[]) => any): string;
    /**
     * @ngdoc method
     * @name functionsModule.service:FunctionsUtils#getInstanceConstructorName
     * @methodOf functionsModule.service:FunctionsUtils
     *
     * @description
     * Returns the constructor name in a cross browser fashion of a class instance
     *
     * @param {Object} instance instance class to analyze
     * @returns {string} the constructor name of the instance
     */
    getInstanceConstructorName(instance: object): string;
    /**
     * @ngdoc method
     * @name functionsModule.service:FunctionsUtils#extendsConstructor
     * @methodOf functionsModule.service:FunctionsUtils
     *
     * @description
     * Overrides a given constructor with a new constructor body. The resulting constructor will share the same prototype as the original one.
     *
     * @param {(...args:any[]) => T} originalConstructor the original constructor to override
     * @returns {(...args:any[]) => T} newConstructorBody the new constructor body to execute in the override. It may or may not return an instance. Should it return an instance, the latter will be returned by the override.
     */
    extendsConstructor<T>(originalConstructor: (...args: any[]) => T, newConstructorBody: (...args: any[]) => T): any;
}
export declare const functionsUtils: FunctionsUtils;
