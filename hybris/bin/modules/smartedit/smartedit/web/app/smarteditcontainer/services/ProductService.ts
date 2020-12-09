/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IProduct, IRestService, IRestServiceFactory, Page, Pageable, SeInjectable} from 'smarteditcommons';

/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IProductSearch
 * @description
 * Interface used by {@link smarteditServicesModule.service:ProductService ProductService} for product search
 */
export interface IProductSearch {
	/**
	 * @ngdoc property
	 * @name catalogId
	 * @propertyOf smarteditServicesModule.interface:IProductSearch
	 * @description id of the catalog
	 */
	catalogId: string;
	/**
	 * @ngdoc property
	 * @name catalogVersion
	 * @propertyOf smarteditServicesModule.interface:IProductSearch
	 * @description version of the catalog
	 */
	catalogVersion: string;
}

/**
 * @ngdoc service
 * @name smarteditServicesModule.service:ProductService
 * @description
 * The ProductService provides is used to access products from the product catalog
 */
@SeInjectable()
export class ProductService {

	private productService: IRestService<IProduct>;
	private productListService: IRestService<Page<IProduct>>;

	constructor(private restServiceFactory: IRestServiceFactory, PRODUCT_RESOURCE_API: string, PRODUCT_LIST_RESOURCE_API: string) {
		this.productService = this.restServiceFactory.get(PRODUCT_RESOURCE_API);
		this.productListService = this.restServiceFactory.get(PRODUCT_LIST_RESOURCE_API);
	}
	/**
	 * @ngdoc method
	 * @name smarteditServicesModule.service:ProductService#getProductById
	 * @methodOf smarteditServicesModule.service:ProductService
	 * @description
	 * Returns a Product that matches the given siteUID and productUID
	 * @param {String} siteUID unique site ID
	 * @param {String} productUID unique product ID
	 * @returns {Object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of IProduct
	 */
	getProductById(siteUID: string, productUID: string): angular.IPromise<IProduct> {
		return this.productService.get({
			siteUID,
			productUID
		});
	}
	/**
	 * @ngdoc method
	 * @name smarteditServicesModule.service:ProductService#findProducts
	 * @methodOf smarteditServicesModule.service:ProductService
	 * @description
	 * Returns a list of Products from the catalog that match the given mask
	 * @param {Object} productSearch {@link smarteditServicesModule.interface:IProductSearch productSearch} catalog search criteria
	 * @param {Object} pageable  object
	 * @returns {Object} A {@link https://docs.angularjs.org/api/ng/service/$q promise} of Page<IProduct>
	 * 
	 */
	findProducts(productSearch: IProductSearch, pageable: Pageable): angular.IPromise<Page<IProduct>> | Error {
		this._validateProductCatalogInfo(productSearch);
		return this.productListService.get({
			catalogId: productSearch.catalogId,
			catalogVersion: productSearch.catalogVersion,
			text: pageable.mask,
			pageSize: pageable.pageSize,
			currentPage: pageable.currentPage
		});
	}

	private _validateProductCatalogInfo(productSearch: IProductSearch) {
		if (!productSearch.catalogId) {
			throw new Error("[productService] - catalog ID missing.");
		}
		if (!productSearch.catalogVersion) {
			throw new Error("[productService] - catalog version missing.");
		}
	}
}