import * as lo from 'lodash';
/**
 * @ngdoc service
 * @name smarteditCommonsModule.service:OperationContextService
 * @description
 * This service provides the functionality to register a url with its associated operation contexts and also finds operation context given an url.
 */
export declare class OperationContextService {
    private lodash;
    private store;
    constructor(lodash: lo.LoDashStatic);
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:OperationContextService#register
     * @methodOf smarteditCommonsModule.service:OperationContextService
     *
     * @description
     * Register a new url with it's associated operationContext.
     *
     * @param {String} url The url that is associated to the operation context.
     * @param {String} operationContext The operation context name that is associated to the given url.
     *
     * @return {Object} operationContextService The operationContextService service
     */
    register(url: string, operationContext: string): this;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:OperationContextService#findOperationContext
     * @methodOf smarteditCommonsModule.service:OperationContextService
     *
     * @description
     * Find the first matching operation context for the given url.
     *
     * @param {String} url The request url.
     *
     * @return {String} operationContext
     */
    findOperationContext(url: string): string;
}
