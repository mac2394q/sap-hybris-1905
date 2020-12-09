package de.hybris.platform.sap.agentdesktopdataexchangeb2b.interceptors;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bOrderDeleteEvent;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.RemoveInterceptor;


public class Agentdesktopdataexchangeb2bOrderRemoveInterceptor implements RemoveInterceptor<OrderModel>
{

	private EventService eventService;
	private ConfigurationService configurationService;

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

	@Override
	public void onRemove(final OrderModel order, final InterceptorContext arg1) throws InterceptorException
	{
		final boolean isB2BIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(Agentdesktopdataexchangeb2bConstants.B2B_INTEGERATION_ENABLED, false);

		if (isB2BIntegrationActive)
		{
			if (order.getUser() != null && order.getUser() instanceof B2BCustomerModel)
			{
				final PK orderPK = order.getPk();
				final Agentdesktopdataexchangeb2bOrderDeleteEvent orderRemoveEvent = new Agentdesktopdataexchangeb2bOrderDeleteEvent();

				final CustomerModel customer = (CustomerModel) order.getUser();
				orderRemoveEvent.setCustomerId(customer.getCustomerID());
				orderRemoveEvent.setOrderId(order.getCode().toString());
				orderRemoveEvent.setPk(orderPK);
				getEventService().publishEvent(orderRemoveEvent);

			}
		}


	}

}

