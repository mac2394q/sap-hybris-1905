/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cms2.common.predicates;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.cms2.model.pages.AbstractPageModel;
import de.hybris.platform.cms2.model.pages.ProductPageModel;
import de.hybris.platform.servicelayer.type.TypeService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class ProductPageTypePredicateTest
{
	@Mock
	private TypeService typeService;

	@Mock
	private AbstractPageModel nonProductPageModel;

	@Mock
	private ProductPageModel pageModel;

	@InjectMocks
	private ProductPageTypePredicate ProductPageTypePredicate;

	@Before
	public void setUp()
	{
		when(pageModel.getItemtype()).thenReturn(ProductPageModel._TYPECODE);
		when(nonProductPageModel.getItemtype()).thenReturn(AbstractPageModel._TYPECODE);

		when(typeService.isAssignableFrom(ProductPageModel._TYPECODE, ProductPageModel._TYPECODE)).thenReturn(true);
		when(typeService.isAssignableFrom(ProductPageModel._TYPECODE, AbstractPageModel._TYPECODE)).thenReturn(false);
	}

	@Test
	public void givenPageIsNotProductPage_WhenTestIsCalled_ThenItReturnsFalse()
	{
		// WHEN
		final boolean isPage = ProductPageTypePredicate.test(nonProductPageModel);

		// THEN
		assertFalse(isPage);
	}

	@Test
	public void givenPageIsProductPage_WhenTestIsCalled_ThenItReturnsTrue()
	{
		// WHEN
		final boolean isPage = ProductPageTypePredicate.test(pageModel);

		// THEN
		assertTrue(isPage);
	}

}
