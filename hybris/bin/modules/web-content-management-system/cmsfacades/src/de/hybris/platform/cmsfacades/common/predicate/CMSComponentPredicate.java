/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.common.predicate;

import de.hybris.platform.cms2.common.annotations.HybrisDeprecation;
import de.hybris.platform.cms2.model.contents.CMSItemModel;
import de.hybris.platform.cms2.model.contents.components.AbstractCMSComponentModel;

import java.util.function.Predicate;


/**
 * Predicate to verify that the CMSItemModel is of type AbstractCMSComponentModel
 *
 * @deprecated since 1811. Please use {@link de.hybris.platform.cms2.common.predicate.CMSComponentTypePredicate} instead.
 */
@Deprecated
@HybrisDeprecation(sinceVersion = "1811")
public class CMSComponentPredicate implements Predicate<CMSItemModel>
{
	@Override
	public boolean test(final CMSItemModel cmsItemModel)
	{
		return AbstractCMSComponentModel.class.isAssignableFrom(cmsItemModel.getClass());
	}
}
