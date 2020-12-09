/// <reference types="angular" />
import { IRestService } from "./IRestService";
import { IRestServiceFactory } from "./IRestServiceFactory";
import { Page, Pageable, Payload } from 'smarteditcommons/dtos';
/**
 * @ngdoc service
 * @name smarteditServicesModule.service:AbstractCachedRestService
 *
 * @description
 * Base class to implement Cache enabled {@link smarteditServicesModule.interface:IRestService IRestServices}.
 * <br/>Implementing classes just need declare a class level {@link smarteditServicesModule.object:@CacheConfig @CacheConfig} annotation
 * with at least one {@link smarteditServicesModule.object:CacheAction CacheAction} and one {@link smarteditServicesModule.object:EvictionTag EvictionTag}.
 * <br/>Cache policies called by the set of {@link smarteditServicesModule.object:CacheAction CacheActions} will have access to
 * REST call response headers being added to the response under "headers" property.
 * <br/>Those headers are then stripped from the response.
 *
 * <h2>Usage</h2>
 * <pre>
 * &#64;CacheConfig({actions: [rarelyChangingContent], tags: [userEvictionTag]})
 * &#64;SeInjectable()
 * export class ProductCatalogRestService extends AbstractCachedRestService<IBaseCatalogs> {
 * 	constructor(restServiceFactory: IRestServiceFactory) {
 * 		super(restServiceFactory, '/productcatalogs');
 * 	}
 * }
 * </pre>
 */
export declare abstract class AbstractCachedRestService<T> implements IRestService<T> {
    protected innerRestService: IRestService<T>;
    constructor(restServiceFactory: IRestServiceFactory, uri: string, identifier?: string);
    getById(identifier: string): angular.IPromise<T>;
    get(searchParams?: Payload): angular.IPromise<T>;
    query(searchParams: Payload): angular.IPromise<T[]>;
    page(searchParams: Pageable): angular.IPromise<Page<T>>;
    update(payload: Payload): angular.IPromise<T>;
    remove(payload: Payload): angular.IPromise<void>;
    save(payload: Payload): angular.IPromise<T>;
}
