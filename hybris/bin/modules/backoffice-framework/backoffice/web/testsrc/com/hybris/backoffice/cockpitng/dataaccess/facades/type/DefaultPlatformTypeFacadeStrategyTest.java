/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved
 */
package com.hybris.backoffice.cockpitng.dataaccess.facades.type;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;

import de.hybris.platform.servicelayer.exceptions.UnknownIdentifierException;
import de.hybris.platform.servicelayer.type.TypeService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@RunWith(MockitoJUnitRunner.class)
public class DefaultPlatformTypeFacadeStrategyTest
{
	private DefaultPlatformTypeFacadeStrategy typeFacade = new DefaultPlatformTypeFacadeStrategy();

	@Mock
	private TypeService typeService;

	@Before
	public void setup()
	{
		typeFacade.setTypeService(typeService);
	}

	@Test
	public void shouldReturnNullWhenAttributeNotFoundOnType()
	{
		// given
		when(typeService.getAttributeDescriptor(eq("type"), eq("qualifier"))).thenThrow(UnknownIdentifierException.class);

		// when
		final String attributeDescription = typeFacade.getAttributeDescription("type", "qualifier");

		// then
		assertThat(attributeDescription).isNull();
	}
}