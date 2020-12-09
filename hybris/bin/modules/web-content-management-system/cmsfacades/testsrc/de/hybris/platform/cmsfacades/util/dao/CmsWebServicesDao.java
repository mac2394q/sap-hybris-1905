/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.util.dao;

import de.hybris.platform.catalog.model.CatalogVersionModel;


public interface CmsWebServicesDao<T>
{
	public T getByUidAndCatalogVersion(String code, CatalogVersionModel catalogVersion);
}
