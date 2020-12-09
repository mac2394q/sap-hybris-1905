/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cms2.common.predicates;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.cms2.model.pages.AbstractPageModel;
import de.hybris.platform.cms2.model.pages.CategoryPageModel;
import de.hybris.platform.servicelayer.type.TypeService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class CategoryPageTypePredicateTest
{
	@Mock
	private TypeService typeService;

	@Mock
	private AbstractPageModel nonCategoryPageModel;

	@Mock
	private CategoryPageModel pageModel;

	@InjectMocks
	private CategoryPageTypePredicate categoryPageTypePredicate;

	@Before
	public void setUp()
	{
		when(pageModel.getItemtype()).thenReturn(CategoryPageModel._TYPECODE);
		when(nonCategoryPageModel.getItemtype()).thenReturn(AbstractPageModel._TYPECODE);

		when(typeService.isAssignableFrom(CategoryPageModel._TYPECODE, CategoryPageModel._TYPECODE)).thenReturn(true);
		when(typeService.isAssignableFrom(CategoryPageModel._TYPECODE, AbstractPageModel._TYPECODE)).thenReturn(false);
	}

	@Test
	public void givenPageIsNotCategoryPage_WhenTestIsCalled_ThenItReturnsFalse()
	{
		// WHEN
		final boolean isPage = categoryPageTypePredicate.test(nonCategoryPageModel);

		// THEN
		assertFalse(isPage);
	}

	@Test
	public void givenPageIsCategoryPage_WhenTestIsCalled_ThenItReturnsTrue()
	{
		// WHEN
		final boolean isPage = categoryPageTypePredicate.test(pageModel);

		// THEN
		assertTrue(isPage);
	}

}
