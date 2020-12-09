/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.integrationservices.populator;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.TypeAttributeDescriptor;
import de.hybris.platform.integrationservices.model.TypeDescriptor;
import de.hybris.platform.integrationservices.service.IntegrationObjectConversionService;
import de.hybris.platform.servicelayer.model.ModelService;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;

@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class DefaultCollectionType2MapPopulatorUnitTest
{
	private static final String QUALIFIER_CATEGORIES = "superCategories";
	private static final String ATTRIBUTE_CATEGORIES = "categories";
	private static final TypeDescriptor TYPE_DESCRIPTOR = typeDescriptor(superCategoriesAttribute());
	private static final ItemModel PRODUCT_MODEL = mock(ItemModel.class);
	private static final ItemModel CATEGORY = mock(ItemModel.class);
	private static final Map<String, Object> CONVERTED_CATEGORY = ImmutableMap.of("code", "clothing");

	@InjectMocks
	private DefaultCollectionType2MapPopulator populator;
	@Mock
	private IntegrationObjectConversionService conversionService;
	@Mock
	private ModelService modelService;

	@Test
	public void testPopulateToMap_ForItemModelCollection()
	{
		when(modelService.getAttributeValue(PRODUCT_MODEL, QUALIFIER_CATEGORIES)).thenReturn(Arrays.asList(CATEGORY, CATEGORY));
		when(conversionService.convert(any(ItemToMapConversionContext.class))).thenReturn(CONVERTED_CATEGORY);
		final Map<String, Object> map = Maps.newHashMap();

		populator.populate(conversionContext(), map);

		final Collection<Object> categories = (Collection<Object>) map.get(ATTRIBUTE_CATEGORIES);
		assertThat(categories).containsExactly(CONVERTED_CATEGORY, CONVERTED_CATEGORY);
	}

	@Test
	public void testPopulateToMap_ForPrimitiveCollection()
	{
		when(modelService.getAttributeValue(PRODUCT_MODEL, QUALIFIER_CATEGORIES)).thenReturn(Arrays.asList("value1","value2"));
		final Map<String, Object> map = Maps.newHashMap();

		populator.populate(conversionContext(), map);

		final Collection<String> values = (Collection<String>) map.get(ATTRIBUTE_CATEGORIES);
		assertThat(values).containsExactlyInAnyOrder("value1", "value2");
	}

	@Test
	public void testPopulateToMap_ForParentContext()
	{
		when(modelService.getAttributeValue(PRODUCT_MODEL, QUALIFIER_CATEGORIES)).thenReturn(Arrays.asList(CATEGORY, CATEGORY));
		when(conversionService.convert(any(ItemToMapConversionContext.class))).thenReturn(CONVERTED_CATEGORY);
		final Map<String, Object> map = Maps.newHashMap();

		populator.populate(conversionContext(), map);

		final Collection<Object> categories = (Collection<Object>) map.get(ATTRIBUTE_CATEGORIES);
		assertThat(categories).containsExactly(CONVERTED_CATEGORY, CONVERTED_CATEGORY);
	}

	@Test
	public void shouldNotPopulate_whenTheCollectionIsEmpty()
	{
		when(modelService.getAttributeValue(PRODUCT_MODEL, QUALIFIER_CATEGORIES)).thenReturn(Collections.emptyList());
		final Map<String, Object> map = Maps.newHashMap();

		populator.populate(conversionContext(), map);

		assertThat(map).isEmpty();
	}

	private ItemToMapConversionContext conversionContext()
	{
		final ItemToMapConversionContext context = mock(ItemToMapConversionContext.class);
		doReturn(PRODUCT_MODEL).when(context).getItemModel();
		doReturn(TYPE_DESCRIPTOR).when(context).getTypeDescriptor();
		return context;
	}

	private static TypeDescriptor typeDescriptor(final TypeAttributeDescriptor... attributes)
	{
		final TypeDescriptor itemModel = mock(TypeDescriptor.class);
		doReturn(Arrays.asList(attributes)).when(itemModel).getAttributes();
		return itemModel;
	}

	private static TypeAttributeDescriptor superCategoriesAttribute() {
		final TypeAttributeDescriptor descriptor = mock(TypeAttributeDescriptor.class);
		doReturn(true).when(descriptor).isCollection();
		doReturn(QUALIFIER_CATEGORIES).when(descriptor).getQualifier();
		doReturn(ATTRIBUTE_CATEGORIES).when(descriptor).getAttributeName();
		return descriptor;
	}
}
