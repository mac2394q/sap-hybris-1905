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
package de.hybris.platform.sap.agentdesktopdataexchange.listeners;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.returns.model.ReturnRequestModel;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;
import de.hybris.platform.sap.agentdesktopdataexchange.handler.AgentDesktopDataHandler;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.tx.AfterSaveEvent;
import de.hybris.platform.tx.AfterSaveListener;

import java.util.Collection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 *
 */
public class AgentDesktopSaveListener implements AfterSaveListener
{
	private EventService eventService;
	private ModelService modelService;
	private ConfigurationService configurationService;

	private AgentDesktopDataHandler agentDesktopDataHandler;

	/**
	 * @return the configurationService
	 */
	public ConfigurationService getConfigurationService()
	{
		return configurationService;
	}

	/**
	 * @param configurationService
	 *           the configurationService to set
	 */
	public void setConfigurationService(final ConfigurationService configurationService)
	{
		this.configurationService = configurationService;
	}

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopSaveListener.class);

	@Override
	public void afterSave(final Collection<AfterSaveEvent> events)
	{
		final boolean isIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(AgentdesktopdataexchangeConstants.INTEGERATION_ENABLED, false);


		if (isIntegrationActive)
		{
			for (final AfterSaveEvent event : events)
			{
				try
				{
					final PK pk = event.getPk();
					final int typeCode = pk.getTypeCode();

					if (event.getType() == AfterSaveEvent.CREATE || event.getType() == AfterSaveEvent.UPDATE)
					{
						final ItemModel model = getModelService().get(event.getPk());
						if (typeCode == AgentdesktopdataexchangeConstants.CUSTOMER_MODEL_TYPECODE)
						{

							if (model instanceof CustomerModel)
							{

								getAgentDesktopDataHandler().customerSaveAndUpdate(event.getPk(), "");

							}
						}

						if (typeCode == AgentdesktopdataexchangeConstants.ADDRESS_MODEL_TYPECODE)
						{
							if (model instanceof AddressModel && model.getOwner() instanceof CustomerModel)
							{

								getAgentDesktopDataHandler().addressSaveAndUpdate(event.getPk());

							}
						}
						if (typeCode == AgentdesktopdataexchangeConstants.ORDER_MODEL_TYPECODE)
						{
							if (model instanceof OrderModel)
							{
								CustomerModel customer = null;

								final OrderModel orderModel = (OrderModel) model;
								final UserModel user = orderModel.getUser();
								String requestType = "created";

								if (user instanceof CustomerModel)
								{
									customer = (CustomerModel) user;
								}

								if (customer != null)
								{

									if (event.getType() != AfterSaveEvent.CREATE)
									{
										requestType = "updated";
									}

									getAgentDesktopDataHandler().orderSaveAndUpdate(event.getPk(), requestType, event.getType());
									LOGGER.info("Recevied and Published the create/update event for order pk {}", event.getPk());
								}


							}
						}

						if (model instanceof ReturnRequestModel)
						{
							getAgentDesktopDataHandler().returnSaveAndUpdate(event.getPk(), event.getType());
						}



					}

					if (event.getType() == AfterSaveEvent.REMOVE)
					{
						//this will be triggered when deleting from back office.
						if (typeCode == AgentdesktopdataexchangeConstants.ADDRESS_MODEL_TYPECODE)
						{
							getAgentDesktopDataHandler().addressDelete(event.getPk());

						}

					}

				}
				catch (final Exception e)
				{
					LOGGER.error(e);
				}

			}
		}
		else
		{
			LOGGER.info("Integration to Agent Desktop is not active");
		}


	}

	/**
	 * @return the agentDesktopDataHandler
	 */
	public AgentDesktopDataHandler getAgentDesktopDataHandler()
	{
		return agentDesktopDataHandler;
	}

	/**
	 * @param agentDesktopDataHandler
	 *           the agentDesktopDataHandler to set
	 */
	public void setAgentDesktopDataHandler(final AgentDesktopDataHandler agentDesktopDataHandler)
	{
		this.agentDesktopDataHandler = agentDesktopDataHandler;
	}

	/**
	 * @return the modelService
	 */
	public ModelService getModelService()
	{
		return modelService;
	}

	/**
	 * @param modelService
	 *           the modelService to set
	 */
	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}

	/**
	 * @return the eventService
	 */
	public EventService getEventService()
	{
		return eventService;
	}

	/**
	 * @param eventService
	 *           the eventService to set
	 */
	public void setEventService(final EventService eventService)
	{
		this.eventService = eventService;
	}



}
