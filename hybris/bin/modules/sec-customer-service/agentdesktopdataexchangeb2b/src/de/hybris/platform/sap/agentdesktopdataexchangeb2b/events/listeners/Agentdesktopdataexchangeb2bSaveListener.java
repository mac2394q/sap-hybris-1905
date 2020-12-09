package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.listeners;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.returns.model.ReturnRequestModel;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.handlers.AgentDesktopDataHandler;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.tx.AfterSaveEvent;
import de.hybris.platform.tx.AfterSaveListener;

import java.util.Collection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Agentdesktopdataexchangeb2bSaveListener implements AfterSaveListener
{
	private EventService eventService;
	private ModelService modelService;
	private ConfigurationService configurationService;

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

	/**
	 * @return the agentDesktopB2BDataHandler
	 */
	public AgentDesktopDataHandler getAgentDesktopB2BDataHandler()
	{
		return agentDesktopB2BDataHandler;
	}

	/**
	 * @param agentDesktopB2BDataHandler
	 *           the agentDesktopB2BDataHandler to set
	 */
	public void setAgentDesktopB2BDataHandler(final AgentDesktopDataHandler agentDesktopB2BDataHandler)
	{
		this.agentDesktopB2BDataHandler = agentDesktopB2BDataHandler;
	}

	private AgentDesktopDataHandler agentDesktopB2BDataHandler;


	private static final Logger LOGGER = LogManager.getLogger(Agentdesktopdataexchangeb2bSaveListener.class);


	@Override
	public void afterSave(final Collection<AfterSaveEvent> events)
	{

		final boolean isB2BIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(Agentdesktopdataexchangeb2bConstants.B2B_INTEGERATION_ENABLED, false);

		if (isB2BIntegrationActive)
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
						if (typeCode == Agentdesktopdataexchangeb2bConstants.B2B_UNIT_MODEL_TYPECODE)
						{
							if (model instanceof B2BUnitModel)
							{

								getAgentDesktopB2BDataHandler().b2bUnitSaveAndUpdate(event.getPk());


							}
						}

						if (model instanceof B2BCustomerModel)
						{

							getAgentDesktopB2BDataHandler().b2bCustomerSaveAndUpdate(event.getPk());
						}

						if (model instanceof AddressModel && (model.getOwner() instanceof B2BUnitModel))
						{

							getAgentDesktopB2BDataHandler().b2bUnitAddressSaveAndUpdate(event.getPk());
						}

						if (typeCode == Agentdesktopdataexchangeb2bConstants.ORDER_MODEL_TYPECODE)
						{
							if (model instanceof OrderModel)
							{
								B2BCustomerModel customer = null;

								final OrderModel orderModel = (OrderModel) model;
								final UserModel user = orderModel.getUser();
								String requestType = "created";

								if (user instanceof B2BCustomerModel)
								{
									customer = (B2BCustomerModel) user;
								}

								if (customer != null)
								{
									if (event.getType() != AfterSaveEvent.CREATE)
									{
										requestType = "updated";
									}
									LOGGER.info("Recevied and Published the create/update event for order pk {}", event.getPk());
									getAgentDesktopB2BDataHandler().b2bOrderSaveAndUpdate(event.getPk(), requestType, event.getType());
								}


							}
						}

						if (model instanceof ReturnRequestModel)
						{
							System.out.println("Return Order");
							getAgentDesktopB2BDataHandler().b2bReturnSaveAndUpdate(event.getPk(), event.getType());
						}

					}

					if (event.getType() == AfterSaveEvent.REMOVE)
					{
						//this will be triggered when deleting from back office.
						if (typeCode == Agentdesktopdataexchangeb2bConstants.ADDRESS_MODEL_TYPECODE)
						{
							getAgentDesktopB2BDataHandler().b2bUnitAddressDelete(event.getPk());

						}

					}



				}
				catch (final Exception e)
				{
					LOGGER.error(e);
				}

			}
		}


	}

	public ModelService getModelService()
	{
		return modelService;
	}

	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}

	public EventService getEventService()
	{
		return eventService;
	}

	public void setEventService(final EventService eventService)
	{
		this.eventService = eventService;
	}

}