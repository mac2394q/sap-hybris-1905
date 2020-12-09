/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IBaseCatalogs} from 'smarteditcommons/dtos/ICatalog';
import {rarelyChangingContent, userEvictionTag, CacheConfig} from "../../cache";
import {IRestServiceFactory} from "../IRestServiceFactory";
import {AbstractCachedRestService} from "../AbstractCachedRestService";
import {SeInjectable} from 'smarteditcommons/di';

@CacheConfig({actions: [rarelyChangingContent], tags: [userEvictionTag]})
@SeInjectable()
export class ProductCatalogRestService extends AbstractCachedRestService<IBaseCatalogs> {

	constructor(restServiceFactory: IRestServiceFactory) {
		super(restServiceFactory, '/cmssmarteditwebservices/v1/sites/:siteUID/productcatalogs');
	}
}