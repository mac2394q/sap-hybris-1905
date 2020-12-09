/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.assertions;

import de.hybris.platform.servicelayer.cronjob.PerformResult;

import org.assertj.core.api.Assertions;


public class BaseCommerceAssertions extends Assertions
{
	public static CronJobResultAssert assertThat(final PerformResult performResult)
	{
		return new CronJobResultAssert(performResult);
	}
}
