/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.util.models;

import de.hybris.platform.catalog.model.CatalogVersionModel;
import de.hybris.platform.cmsfacades.util.builder.ProductModelBuilder;
import de.hybris.platform.core.model.product.ProductModel;
import de.hybris.platform.product.daos.ProductDao;

import java.util.Locale;


public class ProductModelMother extends AbstractModelMother<ProductModel>
{
	public static final String MOUSE = "mouse";
	public static final String CAR = "car";

	private ProductDao productDao;

	public ProductModel createMouseProduct(final CatalogVersionModel catalogVersion)
	{
		return createDefaultProduct(MOUSE, catalogVersion);
	}

	public ProductModel createCarProduct(final CatalogVersionModel catalogVersion)
	{
		return createDefaultProduct(CAR, catalogVersion);
	}

	protected ProductModel createDefaultProduct(final String uid, final CatalogVersionModel catalogVersion)
	{
		return getFromCollectionOrSaveAndReturn(() -> getProductDao().findProductsByCode(uid),
				() -> ProductModelBuilder.aModel() //
				.withName(uid, Locale.ENGLISH) //
				.withCatalogVersion(catalogVersion) //
				.withCode(uid).build());
	}

	public ProductDao getProductDao()
	{
		return productDao;
	}

	public void setProductDao(final ProductDao productDao)
	{
		this.productDao = productDao;
	}
}
