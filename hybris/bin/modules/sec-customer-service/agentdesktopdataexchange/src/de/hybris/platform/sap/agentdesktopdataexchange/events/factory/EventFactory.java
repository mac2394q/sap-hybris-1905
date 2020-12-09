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
package de.hybris.platform.sap.agentdesktopdataexchange.events.factory;

import de.hybris.platform.core.PK;
import de.hybris.platform.sap.agentdesktopdataexchange.events.CustomerCreateOrUpdateEvent;
import de.hybris.platform.sap.agentdesktopdataexchange.events.CustomerRemoveEvent;


/**
 *
 */
public class EventFactory
{

	public static CustomerCreateOrUpdateEvent getCustomerCreateEvent(final PK customerPK, final String defaultAddressId)
	{
		final CustomerCreateOrUpdateEvent customerCreateEvent = new CustomerCreateOrUpdateEvent();
		customerCreateEvent.setCustomerPk(customerPK);
		customerCreateEvent.setDefaultAddressId(defaultAddressId);
		return customerCreateEvent;
	}

	public static CustomerRemoveEvent getCustomerRemoveEvent(final String customerId)
	{
		final CustomerRemoveEvent customerRemoveEvent = new CustomerRemoveEvent();
		customerRemoveEvent.setCustomerId(customerId);
		return customerRemoveEvent;
	}

}
