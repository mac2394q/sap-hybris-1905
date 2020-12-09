/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.sapinvoicebol.invoice.exception;

/**
 * 
 */
public class SapInvoiceException extends RuntimeException 
{
	/**
	 * @param exp
	 */
	public SapInvoiceException(final Exception exp)
	{
		super(exp);
	}
}
