/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.agentdesktopdataexchange.interceptors;


import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;
import de.hybris.platform.sap.agentdesktopdataexchange.events.CustomerRemoveEvent;
import de.hybris.platform.sap.agentdesktopdataexchange.events.factory.EventFactory;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.RemoveInterceptor;


public class AgentDesktopCustomerRemoveInterceptor implements RemoveInterceptor<CustomerModel>
{

	private EventService eventService;
	private ConfigurationService configurationService;

	@Override
	public void onRemove(final CustomerModel customer, final InterceptorContext ctx) throws InterceptorException
	{
		final boolean isIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(AgentdesktopdataexchangeConstants.INTEGERATION_ENABLED, false);
		if (isIntegrationActive)
		{
			final CustomerRemoveEvent customerRemoveEvent = EventFactory.getCustomerRemoveEvent(customer.getCustomerID());
			getEventService().publishEvent(customerRemoveEvent);
		}


	}

	public EventService getEventService()
	{
		return eventService;
	}

	public void setEventService(final EventService eventService)
	{
		this.eventService = eventService;
	}

	public ConfigurationService getConfigurationService()
	{
		return configurationService;
	}

	public void setConfigurationService(final ConfigurationService configurationService)
	{
		this.configurationService = configurationService;
	}


}
