/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.commercefacades.catalog.converters.populator;

import de.hybris.platform.catalog.model.CatalogModel;
import de.hybris.platform.catalog.model.CatalogVersionModel;
import de.hybris.platform.commercefacades.catalog.CatalogOption;
import de.hybris.platform.commercefacades.catalog.data.CatalogData;
import de.hybris.platform.commercefacades.catalog.data.CatalogVersionData;
import de.hybris.platform.converters.ConfigurablePopulator;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

import org.springframework.beans.factory.annotation.Required;


/**
 * Populates {@link CatalogData} from {@link CatalogModel} using specific {@link CatalogOption}s
 */
public class CatalogHierarchyPopulator implements ConfigurablePopulator<CatalogModel, CatalogData, CatalogOption>
{
	private ConfigurablePopulator<CatalogVersionModel, CatalogVersionData, CatalogOption> catalogVersionPopulator;

	@Override
	public void populate(final CatalogModel source, final CatalogData target, final Collection<CatalogOption> options)
			throws ConversionException
	{
		final String url = "/" + target.getId();

		target.setId(source.getId());
		target.setName(source.getName());
		target.setLastModified(source.getModifiedtime());
		target.setUrl(url);
		target.setCatalogVersions(new ArrayList<CatalogVersionData>());

		final Set<CatalogVersionModel> catalogVersions = source.getCatalogVersions();
		for (final CatalogVersionModel catalogVersion : catalogVersions)
		{
			final String cvUrl = url + "/" + catalogVersion.getVersion();
			final CatalogVersionData catalogVersionData = new CatalogVersionData();
			catalogVersionData.setUrl(cvUrl);

			getCatalogVersionPopulator().populate(catalogVersion, catalogVersionData, options);

			target.getCatalogVersions().add(catalogVersionData);
		}
	}

	@Required
	public void setCatalogVersionPopulator(
			final ConfigurablePopulator<CatalogVersionModel, CatalogVersionData, CatalogOption> catalogVersionPopulator)
	{
		this.catalogVersionPopulator = catalogVersionPopulator;
	}

	protected ConfigurablePopulator<CatalogVersionModel, CatalogVersionData, CatalogOption> getCatalogVersionPopulator()
	{
		return catalogVersionPopulator;
	}
}
