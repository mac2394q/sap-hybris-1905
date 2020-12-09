package de.hybris.platform.sap.agentdesktopdataexchangeb2b.interceptors;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bCustomerModelDeleteEvent;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.RemoveInterceptor;


public class Agentdesktopdataexchangeb2bCustomerModelRemoveInterceptor implements RemoveInterceptor<B2BCustomerModel>
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
	public void onRemove(final B2BCustomerModel model, final InterceptorContext ctx) throws InterceptorException
	{

		final boolean isB2BIntegrationActive = getConfigurationService().getConfiguration()
				.getBoolean(Agentdesktopdataexchangeb2bConstants.B2B_INTEGERATION_ENABLED, false);

		if (isB2BIntegrationActive)
		{
			final Agentdesktopdataexchangeb2bCustomerModelDeleteEvent agentdesktopdataexchangeb2bCustomerModelDeleteEvent = new Agentdesktopdataexchangeb2bCustomerModelDeleteEvent();
			agentdesktopdataexchangeb2bCustomerModelDeleteEvent.setPk(model.getPk());
			agentdesktopdataexchangeb2bCustomerModelDeleteEvent.setB2bCustomerUid(model.getUid());

			getEventService().publishEvent(agentdesktopdataexchangeb2bCustomerModelDeleteEvent);

		}

	}
}

