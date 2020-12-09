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

import de.hybris.platform.commerceservices.enums.CustomerType;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;
import de.hybris.platform.sap.agentdesktopdataexchange.events.CustomerCreateOrUpdateEvent;
import de.hybris.platform.sap.agentdesktopdataexchange.events.factory.EventFactory;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.ValidateInterceptor;


/*
 * When the default address is changed from the commerce storeFront
 * To populate the defaultAddressId used in the integration flow
 * while pushing the data to Agent Desktop
 */

public class AgentDesktopCustomerValidateInterceptor implements ValidateInterceptor<CustomerModel>
{

	private EventService eventService;
	private ConfigurationService configurationService;

	@Override
	public void onValidate(final CustomerModel customer, final InterceptorContext ctx) throws InterceptorException
	{
		final boolean isIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(AgentdesktopdataexchangeConstants.INTEGERATION_ENABLED, false);
		if (isIntegrationActive)
		{
			final boolean isDefaultAddressModified = ctx.isModified(customer, "defaultShipmentAddress");
			if (isDefaultAddressModified && (customer.getDefaultShipmentAddress() != null)
					&& !CustomerType.GUEST.equals(customer.getType()))
			{
				final CustomerCreateOrUpdateEvent customerCreateEvent = EventFactory.getCustomerCreateEvent(customer.getPk(),
						customer.getDefaultShipmentAddress().getPk().toString());
				getEventService().publishEvent(customerCreateEvent);

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
