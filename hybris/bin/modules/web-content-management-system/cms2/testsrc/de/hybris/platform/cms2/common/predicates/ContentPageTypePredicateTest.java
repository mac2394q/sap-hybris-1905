/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cms2.common.predicates;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.cms2.model.pages.AbstractPageModel;
import de.hybris.platform.cms2.model.pages.ContentPageModel;
import de.hybris.platform.servicelayer.type.TypeService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class ContentPageTypePredicateTest
{
	@Mock
	private TypeService typeService;

	@Mock
	private AbstractPageModel nonContentPageModel;

	@Mock
	private ContentPageModel pageModel;

	@InjectMocks
	private ContentPageTypePredicate contentPageTypePredicate;

	@Before
	public void setUp()
	{
		when(pageModel.getItemtype()).thenReturn(ContentPageModel._TYPECODE);
		when(nonContentPageModel.getItemtype()).thenReturn(AbstractPageModel._TYPECODE);

		when(typeService.isAssignableFrom(ContentPageModel._TYPECODE, ContentPageModel._TYPECODE)).thenReturn(true);
		when(typeService.isAssignableFrom(ContentPageModel._TYPECODE, AbstractPageModel._TYPECODE)).thenReturn(false);
	}

	@Test
	public void givenPageIsNotContentPage_WhenTestIsCalled_ThenItReturnsFalse()
	{
		// WHEN
		final boolean isPage = contentPageTypePredicate.test(nonContentPageModel);

		// THEN
		assertFalse(isPage);
	}

	@Test
	public void givenPageIsContentPage_WhenTestIsCalled_ThenItReturnsTrue()
	{
		// WHEN
		final boolean isPage = contentPageTypePredicate.test(pageModel);

		// THEN
		assertTrue(isPage);
	}

}
