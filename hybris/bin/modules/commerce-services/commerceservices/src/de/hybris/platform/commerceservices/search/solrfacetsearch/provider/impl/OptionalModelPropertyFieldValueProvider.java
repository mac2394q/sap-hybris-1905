/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.commerceservices.search.solrfacetsearch.provider.impl;

import de.hybris.platform.core.model.c2l.LanguageModel;
import de.hybris.platform.core.model.product.ProductModel;
import de.hybris.platform.product.VariantsService;
import de.hybris.platform.servicelayer.exceptions.AttributeNotSupportedException;
import de.hybris.platform.servicelayer.i18n.CommonI18NService;
import de.hybris.platform.solrfacetsearch.config.IndexConfig;
import de.hybris.platform.solrfacetsearch.config.IndexedProperty;
import de.hybris.platform.solrfacetsearch.config.exceptions.FieldValueProviderException;
import de.hybris.platform.solrfacetsearch.provider.FieldNameProvider;
import de.hybris.platform.solrfacetsearch.provider.FieldValue;
import de.hybris.platform.solrfacetsearch.provider.FieldValueProvider;
import de.hybris.platform.solrfacetsearch.provider.impl.AbstractPropertyFieldValueProvider;
import de.hybris.platform.variants.model.VariantAttributeDescriptorModel;
import de.hybris.platform.variants.model.VariantProductModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Required;


/**
 * ModelPropertyFieldValueProvider that treats the properties as optional rather than required.
 */
public class OptionalModelPropertyFieldValueProvider extends AbstractPropertyFieldValueProvider implements FieldValueProvider
{
	private FieldNameProvider fieldNameProvider;
	private VariantsService variantsService;
	private CommonI18NService commonI18NService;

	protected FieldNameProvider getFieldNameProvider()
	{
		return fieldNameProvider;
	}

	/**
	 * @param fieldNameProvider
	 *           the fieldNameProvider to set
	 */
	@Required
	public void setFieldNameProvider(final FieldNameProvider fieldNameProvider)
	{
		this.fieldNameProvider = fieldNameProvider;
	}

	protected VariantsService getVariantsService()
	{
		return variantsService;
	}

	@Required
	public void setVariantsService(final VariantsService variantsService)
	{
		this.variantsService = variantsService;
	}


	@Override
	public Collection<FieldValue> getFieldValues(final IndexConfig indexConfig, final IndexedProperty indexedProperty,
			final Object model) throws FieldValueProviderException
	{
		if (model == null)
		{
			throw new IllegalArgumentException("No model given");
		}

		final List<FieldValue> fieldValues = new ArrayList<FieldValue>();


		if (indexedProperty.isLocalized())
		{
			final Collection<LanguageModel> languages = indexConfig.getLanguages();
			for (final LanguageModel language : languages)
			{
				List<String> rangeNameList;
				Object value = null;
				final Locale locale = i18nService.getCurrentLocale();
				try
				{
					i18nService.setCurrentLocale(commonI18NService.getLocaleForLanguage(language));
					value = getPropertyValue(model, indexedProperty);
					rangeNameList = rangeNameProvider.getRangeNameList(indexedProperty, value);
				}
				finally
				{
					i18nService.setCurrentLocale(locale);
				}

				if (value != null || !rangeNameList.isEmpty())
				{
					final Collection<String> fieldNames = fieldNameProvider.getFieldNames(indexedProperty, language.getIsocode());
					for (final String fieldName : fieldNames)
					{
						if (rangeNameList.isEmpty())
						{
							fieldValues.add(new FieldValue(fieldName, value));
						}
						else
						{
							for (final String rangeName : rangeNameList)
							{
								fieldValues.add(new FieldValue(fieldName, rangeName == null ? value : rangeName));
							}
						}
					}
				}
			}
		}
		else
		{
			final Object value = getPropertyValue(model, indexedProperty);
			final List<String> rangeNameList = rangeNameProvider.getRangeNameList(indexedProperty, value);

			if (value != null || !rangeNameList.isEmpty())
			{
				final Collection<String> fieldNames = fieldNameProvider.getFieldNames(indexedProperty, null);

				for (final String fieldName : fieldNames)
				{
					if (rangeNameList.isEmpty())
					{
						fieldValues.add(new FieldValue(fieldName, value));
					}
					else
					{
						for (final String rangeName : rangeNameList)
						{
							fieldValues.add(new FieldValue(fieldName, rangeName == null ? value : rangeName));
						}
					}
				}
			}
		}
		return fieldValues;
	}

	protected Object getPropertyValue(final Object model, final IndexedProperty indexedProperty)
	{
		final String qualifier = indexedProperty.getName();
		Object result = null;
		try
		{
			result = modelService.getAttributeValue(model, qualifier);
			if ((result == null) && (model instanceof VariantProductModel))
			{
				final ProductModel baseProduct = ((VariantProductModel) model).getBaseProduct();
				result = modelService.getAttributeValue(baseProduct, qualifier);
			}
		}
		catch (final AttributeNotSupportedException ae)
		{
			if (model instanceof VariantProductModel)
			{
				final ProductModel baseProduct = ((VariantProductModel) model).getBaseProduct();
				for (final VariantAttributeDescriptorModel att : baseProduct.getVariantType().getVariantAttributes())
				{
					if (qualifier.equals(att.getQualifier()))
					{
						result = this.variantsService.getVariantAttributeValue((VariantProductModel) model, qualifier);
						break;
					}
				}
			}
		}
		return result;
	}

	protected CommonI18NService getCommonI18NService()
	{
		return commonI18NService;
	}

	@Required
	public void setCommonI18NService(final CommonI18NService commonI18NService)
	{
		this.commonI18NService = commonI18NService;
	}
}
