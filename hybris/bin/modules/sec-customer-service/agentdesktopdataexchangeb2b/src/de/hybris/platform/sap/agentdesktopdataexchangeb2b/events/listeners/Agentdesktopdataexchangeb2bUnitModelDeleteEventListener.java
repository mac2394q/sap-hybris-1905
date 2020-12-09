package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.listeners;

import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bUnitModelDeleteEvent;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.impl.AgentDesktopB2BOutboundServiceImpl;
import de.hybris.platform.servicelayer.event.impl.AbstractEventListener;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Agentdesktopdataexchangeb2bUnitModelDeleteEventListener
		extends AbstractEventListener<Agentdesktopdataexchangeb2bUnitModelDeleteEvent>
{

	private static final Logger LOGGER = LogManager.getLogger(Agentdesktopdataexchangeb2bUnitModelDeleteEventListener.class);

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
	protected void onEvent(final Agentdesktopdataexchangeb2bUnitModelDeleteEvent event)
	{

		final String b2bUnitUid = event.getB2bUnitUid();
		final PK b2bUnitPk = event.getPk();

		final B2BUnitModel cecUnitModelData = getModelService().create(B2BUnitModel.class);

		cecUnitModelData.setB2bUnitPk(b2bUnitPk.toString());
		cecUnitModelData.setUid(b2bUnitUid);
		cecUnitModelData.setIsDelete(true);

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2BUnitDeleteData(cecUnitModelData).subscribe();

		LOGGER.info("End of the delete request for b2b unit delete");

	}
}
