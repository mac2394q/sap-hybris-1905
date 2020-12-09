package de.hybris.platform.cmsfacades.common.predicate;

import java.util.function.Predicate;


/**
 * Predicate to test if a given page type code is a Email page code.
 */
public class EmailPageTypeCodePredicate implements Predicate<String>
{
	@Override
	public boolean test(final String pageTypeCode)
	{
		return "EmailPage".equals(pageTypeCode);
	}
}
