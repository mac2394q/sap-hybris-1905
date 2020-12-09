/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IBaseCatalogs} from 'smarteditcommons/dtos';
import {SeInjectable} from 'smarteditcommons/di';

import {
	contentCatalogUpdateEvictionTag,
	pageEvictionTag,
	rarelyChangingContent,
	userEvictionTag,
	CacheConfig
} from "../../cache";
import {IRestServiceFactory} from "../IRestServiceFactory";
import {AbstractCachedRestService} from "../AbstractCachedRestService";
import {OperationContextRegistered} from '../../httpErrorInterceptor/default/retryInterceptor/operationContextAnnotation';

const CONTENT_CATALOG_VERSION_DETAILS_RESOURCE_API = '/cmssmarteditwebservices/v1/sites/:siteUID/contentcatalogs';

@CacheConfig({actions: [rarelyChangingContent], tags: [userEvictionTag, pageEvictionTag, contentCatalogUpdateEvictionTag]})
@OperationContextRegistered(CONTENT_CATALOG_VERSION_DETAILS_RESOURCE_API, ['CMS', 'INTERACTIVE'])
@SeInjectable()
export class ContentCatalogRestService extends AbstractCachedRestService<IBaseCatalogs> {

	constructor(restServiceFactory: IRestServiceFactory) {
		super(restServiceFactory, CONTENT_CATALOG_VERSION_DETAILS_RESOURCE_API);
	}
}
