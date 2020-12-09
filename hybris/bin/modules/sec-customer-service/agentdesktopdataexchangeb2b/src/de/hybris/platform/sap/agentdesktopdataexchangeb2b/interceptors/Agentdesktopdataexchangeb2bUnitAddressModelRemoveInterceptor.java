package de.hybris.platform.sap.agentdesktopdataexchangeb2b.interceptors;

import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.event.EventService;
import de.hybris.platform.servicelayer.interceptor.InterceptorContext;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;
import de.hybris.platform.servicelayer.interceptor.RemoveInterceptor;


public class Agentdesktopdataexchangeb2bUnitAddressModelRemoveInterceptor implements RemoveInterceptor<AddressModel>
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
	public void onRemove(final AddressModel arg0, final InterceptorContext arg1) throws InterceptorException
	{
		System.out.println("address delete interceptor" + arg0.getPk());

	}
}

