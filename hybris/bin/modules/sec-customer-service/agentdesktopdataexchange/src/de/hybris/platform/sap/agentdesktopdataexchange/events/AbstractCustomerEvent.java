/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2018 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 */
package de.hybris.platform.sap.agentdesktopdataexchange.events;

import de.hybris.platform.core.PK;


/**
 *
 */
public class AbstractCustomerEvent extends AgentDesktopAbstractEvent
{


	private String customerId;

	private PK customerPk;

	private String defaultAddressId;

	/**
	 * @return the defaultAddressId
	 */
	public String getDefaultAddressId()
	{
		return defaultAddressId;
	}

	/**
	 * @param defaultAddressId
	 *           the defaultAddressId to set
	 */
	public void setDefaultAddressId(final String defaultAddressId)
	{
		this.defaultAddressId = defaultAddressId;
	}

	/**
	 * @return the customerPk
	 */
	public PK getCustomerPk()
	{
		return customerPk;
	}

	/**
	 * @param customerPk
	 *           the customerPk to set
	 */
	public void setCustomerPk(final PK customerPk)
	{
		this.customerPk = customerPk;
	}

	/**
	 * @return the customerId
	 */
	public String getCustomerId()
	{
		return customerId;
	}

	/**
	 * @param customerId
	 *           the customerId to set
	 */
	public void setCustomerId(final String customerId)
	{
		this.customerId = customerId;
	}


}
