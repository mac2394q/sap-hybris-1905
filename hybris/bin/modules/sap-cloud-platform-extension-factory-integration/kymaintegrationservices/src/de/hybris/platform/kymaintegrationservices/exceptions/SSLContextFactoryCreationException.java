/*
 * [y] hybris Platform
 *
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.kymaintegrationservices.exceptions;

/**
 * Thrown when there is a problem in creating the ssl context
 */
public class SSLContextFactoryCreationException extends Exception
{
	public SSLContextFactoryCreationException(final String message)
	{
		super(message);
	}

	public SSLContextFactoryCreationException(final String message, final Throwable t)
	{
		super(message, t);
	}
}
