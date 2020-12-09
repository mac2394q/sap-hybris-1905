import * as angular from 'angular';
import { Page, Pageable, Payload } from 'smarteditcommons/dtos';
import { IReflectable } from '../interfaces';
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IRestService
 *
 * @description
 * Common interface of smartedit REST services generated by calls to {@link smarteditServicesModule.interface:restServiceFactory restServiceFactory#get<T>}
 * IRestService<T> has strongly typed methods in both signature and return type
 * When used in the smartedit application (as opposed to smarteditContainer) calls are proxied to the smarteditContainer
 * in order to prevent cross-origin issues in the case where smartEdit and the embedded storefront are in different domains.
 */
export interface IRestService<T> extends IReflectable<T> {
    activateMetadata?(): void;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#getById
     * @methodOf smarteditServicesModule.interface:IRestService
     *
     * @description
     * Loads a component based on its identifier.
     *
     * @param {String} identifier The value of the object identifier.
     *
     * @returns {Object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of T
     */
    getById(identifier: string): angular.IPromise<T>;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#get
     * @methodOf smarteditServicesModule.interface:IRestService
     *
     * @description
     * Loads a unique component based on its identifier that must match the specified get parameters.
     * <br/>The REST Service Factory evaluates placeholders in the URI, if any are provided, to verify if they
     * match the search parameters.
     *
     * @param {object} searchParams The object that contains the query parameters, which are then mapped to the
     * query string
     *
     * @returns {object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of T
     */
    get(searchParams: void | Payload): angular.IPromise<T>;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#query
     * @methodOf smarteditServicesModule.interface:IRestService
     *
     * @description
     * Loads a list of components that match the specified search parameters.
     * <br/>The REST service evaluates the placeholders in the URI, if any are provided, to verify if
     * they match the search parameters.
     *
     * @param {object} searchParams The object that contains the query parameters, which are then mapped to the
     * query string
     *
     * @returns {object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of T[]
     */
    query(searchParams: Payload): angular.IPromise<T[]>;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#page
     * @methodOf smarteditServicesModule.interface:IRestService
     * @description
     * To be called instead of {@link smarteditServicesModule.interface:IRestService#query query} when the list is wrapped by server in an object (ex: Page).
     * <br/>The service will evaluate any placeholder in the URI with matching search params.
     * @param {object} searchParams The object that contains the query parameters, which are then mapped to the
     * query string
     * @returns {object} a {@link https://docs.angularjs.org/api/ng/service/$q promise} of <Page<T>>
     */
    page(searchParams: Pageable): angular.IPromise<Page<T>>;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#update
     * @methodOf smarteditServicesModule.interface:IRestService
     *
     * @description
     * Updates a component.  It appends the value of the identifier to the URI.
     *
     * @param {object} payload The object to be updated. <br/>The promise will be rejected if the payload does not contain the identifier.
     *
     * @returns {object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of T
     */
    update(payload: Payload): angular.IPromise<T>;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#save
     * @methodOf smarteditServicesModule.interface:IRestService
     *
     * @description
     * Saves a component. It appends the value of the identifier to the URI.
     *
     * @param {object} payload The object to be saved.
     * <br/>The promise will be rejected if the payload does not contain the identifier.
     *
     * @returns {object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of T
     * to what the server returns.
     */
    save(payload: Payload): angular.IPromise<T>;
    /**
     * @ngdoc service
     * @name smarteditServicesModule.interface:IRestService#remove
     * @methodOf smarteditServicesModule.interface:IRestService
     *
     * @description
     * Deletes a component. It appends the value of the identifier to the URI.
     *
     * @param {object} payload The object to be updated.
     * <br/>The promise will be rejected if the payload does not contain the identifier.
     *
     * @returns {object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of void
     */
    remove(payload: Payload): angular.IPromise<void>;
}
