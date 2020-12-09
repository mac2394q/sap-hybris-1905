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
package com.sap.hybris.sapquoteintegration.exception;

import java.lang.RuntimeException;
import java.lang.String;
import java.lang.Throwable;

/**
 * The generic exception class for the com.hybris package.
 */
public class DefaultSapQuoteIntegrationException extends RuntimeException {
	private static final long serialVersionUID = -7403307082453533142L;

	/**
	 * Creates a new instance with the given message.
	 *
	 * @param message the reason for this HybrisSystemException
	 */
	public DefaultSapQuoteIntegrationException(final String message) {
		super(message);
	}

	/**
	 * Creates a new instance using the given message and cause exception.
	 *
	 * @param message The reason for this HybrisSystemException.
	 * @param cause   the Throwable that caused this HybrisSystemException.
	 */
	public DefaultSapQuoteIntegrationException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
