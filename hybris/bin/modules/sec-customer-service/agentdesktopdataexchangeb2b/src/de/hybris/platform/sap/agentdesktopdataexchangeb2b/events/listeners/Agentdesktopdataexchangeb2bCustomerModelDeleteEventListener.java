package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.listeners;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bCustomerModelDeleteEvent;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.impl.AgentDesktopB2BOutboundServiceImpl;
import de.hybris.platform.servicelayer.event.impl.AbstractEventListener;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Agentdesktopdataexchangeb2bCustomerModelDeleteEventListener
		extends AbstractEventListener<Agentdesktopdataexchangeb2bCustomerModelDeleteEvent>
{
	private static final Logger LOGGER = LogManager.getLogger(Agentdesktopdataexchangeb2bCustomerModelDeleteEvent.class);

	private AgentDesktopB2BOutboundServiceImpl agentDesktopB2BCpiOutboundServiceImpl;

	/**
	 * @return the agentDesktopB2BCpiOutboundServiceImpl
	 */
	public AgentDesktopB2BOutboundServiceImpl getAgentDesktopB2BCpiOutboundServiceImpl()
	{
		return agentDesktopB2BCpiOutboundServiceImpl;
	}

	/**
	 * @param agentDesktopB2BCpiOutboundServiceImpl
	 *           the agentDesktopB2BCpiOutboundServiceImpl to set
	 */
	public void setAgentDesktopB2BCpiOutboundServiceImpl(
			final AgentDesktopB2BOutboundServiceImpl agentDesktopB2BCpiOutboundServiceImpl)
	{
		this.agentDesktopB2BCpiOutboundServiceImpl = agentDesktopB2BCpiOutboundServiceImpl;
	}

	private ModelService modelService;


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

	@Override
	protected void onEvent(final Agentdesktopdataexchangeb2bCustomerModelDeleteEvent event)
	{

		final PK b2bCustomerPk = event.getPk();

		final B2BCustomerModel cecCustomerModelData = getModelService().create(B2BCustomerModel.class);

		cecCustomerModelData.setB2bCustomerPk(b2bCustomerPk.toString());
		cecCustomerModelData.setUid(event.getB2bCustomerUid());
		cecCustomerModelData.setIsDelete(true);

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2BCustomerDeleteData(cecCustomerModelData).subscribe();

		LOGGER.info("End of the delete request for b2b Customer delete");

	}
}
