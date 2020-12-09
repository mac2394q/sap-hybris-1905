/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmssmarteditwebservices.constants;

/**
 * Global class for all Cmssmarteditwebservices constants. You can add global constants for your extension into this
 * class.
 */
public final class CmssmarteditwebservicesConstants extends GeneratedCmssmarteditwebservicesConstants
{
	public static final String EXTENSIONNAME = "cmssmarteditwebservices";
	public static final String API_VERSION = "/v1";
	public static final String TYPE_CACHE_EXPIRATION = "cmssmarteditwebservices.types.cache.expiration";

	private CmssmarteditwebservicesConstants()
	{
		//empty to avoid instantiating this constant class
	}

	public static final String URI_CATALOG_ID = "catalogId";
	public static final String URI_VERSION_ID = "versionId";
	public static final String URI_SITE_ID = "siteId";
	public static final String URI_PAGE_SIZE = "pageSize";
	public static final String URI_CURRENT_PAGE = "currentPage";
	public static final String URI_SOURCE_CATALOG_VERSION = "sourceCatalogVersion";
	public static final String URI_TARGET_CATALOG_VERSION = "targetCatalogVersion";

	public static final String ITEM_DATA_PROTOTYPE_BEAN = "cmsSeItemData";

	public static final String HEADER_LOCATION = "Location";

	public static final String DOCUMENTATION_TITLE_PROPERTY = EXTENSIONNAME + ".documentation.title";
	public static final String DOCUMENTATION_DESC_PROPERTY = EXTENSIONNAME + ".documentation.desc";
	public static final String TERMS_OF_SERVICE_URL_PROPERTY = EXTENSIONNAME + ".terms.of.service.url";
	public static final String LICENSE_PROPERTY = EXTENSIONNAME + ".licence";
	public static final String LICENSE_URL_PROPERTY = EXTENSIONNAME + ".license.url";
	public static final String DOCUMENTATION_API_VERSION = "1.0";
	public static final String AUTHORIZATION_SCOPE_PROPERTY = EXTENSIONNAME + ".oauth.scope";
	public static final String AUTHORIZATION_URL = "/authorizationserver/oauth/token";
	public static final String PASSWORD_AUTHORIZATION_NAME = "oauth2_password";
}
