/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.core.jco.runtime;

import com.sap.conn.jco.ext.JCoSessionReference;


/**
 * SAPJCoSessionReference is a simple reference to a SAPHyprisSession ID.
 */
public class SAPJCoSessionReference implements JCoSessionReference
{

	private final String id;


	/**
	 * Constructor.
	 * 
	 * @param id
	 *           session reference id
	 */
	public SAPJCoSessionReference(final String id)
	{
		super();
		this.id = id;
	}

	@Override
	public void contextFinished()
	{
		// Not required in SAP hybris integration project

	}

	@Override
	public void contextStarted()
	{
		// Not required in SAP hybris integration project

	}

	@Override
	public String getID()
	{
		return id;
	}
}
