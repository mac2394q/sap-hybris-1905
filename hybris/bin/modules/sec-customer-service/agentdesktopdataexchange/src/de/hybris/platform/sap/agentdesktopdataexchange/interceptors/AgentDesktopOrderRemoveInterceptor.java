/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2019 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 */
package de.hybris.platform.sap.agentdesktopdataexchange.interceptors;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;
import de.hybris.platform.sap.agentdesktopdataexchange.events.OrderRemoveEvent;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.RemoveInterceptor;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 *
 */
public class AgentDesktopOrderRemoveInterceptor implements RemoveInterceptor<OrderModel>
{

	private EventService eventService;
	private ConfigurationService configurationService;

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopOrderRemoveInterceptor.class);

	@Override
	public void onRemove(final OrderModel order, final InterceptorContext ctx) throws InterceptorException
	{

		final boolean isIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(AgentdesktopdataexchangeConstants.INTEGERATION_ENABLED, false);
		if (isIntegrationActive)
		{
			if (order.getUser() != null && order.getUser() instanceof CustomerModel)
			{
				final PK orderPK = order.getPk();
				final OrderRemoveEvent orderRemoveEvent = new OrderRemoveEvent();

				LOGGER.info("Recevied and address delete event with for order delete interceptor {}", orderPK.toString());

				final CustomerModel customer = (CustomerModel) order.getUser();
				orderRemoveEvent.setCustomerId(customer.getCustomerID());
				orderRemoveEvent.setOrderId(order.getCode().toString());
				orderRemoveEvent.setOrderPK(orderPK);
				getEventService().publishEvent(orderRemoveEvent);

			}
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
