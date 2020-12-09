/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.pages.populator.data;

import de.hybris.platform.cms2.common.annotations.HybrisDeprecation;
import de.hybris.platform.cms2.model.pages.ContentPageModel;
import de.hybris.platform.cmsfacades.data.ContentPageData;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;


/**
 * Converts an {@link AbstractPageData} of the type code ContentPage to {@link ContentPageModel}
 * 
 * @deprecated since 6.6
 */
@Deprecated
@HybrisDeprecation(sinceVersion = "6.6")
public class ContentPageDataPopulator implements Populator<ContentPageData, ContentPageModel>
{
	@Override
	public void populate(final ContentPageData data, final ContentPageModel model) throws ConversionException
	{
		model.setLabel(data.getLabel());
	}
}
