/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cms2.common.predicates;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.cms2.common.predicate.CMSComponentTypePredicate;
import de.hybris.platform.cms2.model.contents.components.AbstractCMSComponentModel;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.servicelayer.type.TypeService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class CMSComponentTypePredicateTest
{
	private static final String COMPONENT_ITEM_TYPE = "componentItemType";
	private static final String NON_COMPONENT_ITEM_TYPE = "nonComponentItemType";

	@Mock
	private TypeService typeService;

	@Mock
	private ItemModel nonComponentModel;

	@Mock
	private AbstractCMSComponentModel componentModel;

	@InjectMocks
	private CMSComponentTypePredicate cmsComponentTypePredicate;

	@Before
	public void setUp()
	{
		when(componentModel.getItemtype()).thenReturn(COMPONENT_ITEM_TYPE);
		when(nonComponentModel.getItemtype()).thenReturn(NON_COMPONENT_ITEM_TYPE);

		when(typeService.isAssignableFrom(AbstractCMSComponentModel._TYPECODE, COMPONENT_ITEM_TYPE)).thenReturn(true);
		when(typeService.isAssignableFrom(AbstractCMSComponentModel._TYPECODE, NON_COMPONENT_ITEM_TYPE)).thenReturn(false);
	}

	@Test
	public void givenItemIsNotComponent_WhenTestIsCalled_ThenItReturnsFalse()
	{
		// WHEN
		final boolean isComponent = cmsComponentTypePredicate.test(nonComponentModel);

		// THEN
		assertFalse(isComponent);
	}

	@Test
	public void givenItemIsComponent_WhenTestIsCalled_ThenItReturnsTrue()
	{
		// WHEN
		final boolean isComponent = cmsComponentTypePredicate.test(componentModel);

		// THEN
		assertTrue(isComponent);
	}
}
