/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.cmsitems.predicates;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import de.hybris.bootstrap.annotations.IntegrationTest;
import de.hybris.platform.cms2lib.model.components.AbstractBannerComponentModel;
import de.hybris.platform.cmsfacades.common.predicate.DefaultClassTypeAttributePredicate;
import de.hybris.platform.core.model.type.AttributeDescriptorModel;
import de.hybris.platform.core.model.type.ComposedTypeModel;
import de.hybris.platform.servicelayer.ServicelayerTest;
import de.hybris.platform.servicelayer.type.TypeService;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;

@IntegrationTest
public class MediaAttributePredicateIntegrationTest extends ServicelayerTest
{
	@Resource
	private TypeService typeService;
	
	private AttributeDescriptorModel mediaAttribute;

	@Resource
	private DefaultClassTypeAttributePredicate cmsMediaTypeAttributePredicate;

	@Before
	public void setup()
	{
		final ComposedTypeModel composedType = typeService.getComposedTypeForCode(
				AbstractBannerComponentModel._TYPECODE);
		
		this.mediaAttribute = composedType //
				.getDeclaredattributedescriptors() //
				.stream() //
				.filter(attribute -> attribute.getQualifier().equals("media")) //
				.findFirst() //
				.get();
	}
	
	@Test
	public void testMediaPredicateAttributeIsValid()
	{
		assertThat(cmsMediaTypeAttributePredicate.test(mediaAttribute), is(true));
	}
}
