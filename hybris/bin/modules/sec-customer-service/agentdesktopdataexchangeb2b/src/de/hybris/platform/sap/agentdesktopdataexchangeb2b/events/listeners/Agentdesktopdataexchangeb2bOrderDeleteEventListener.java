package de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.listeners;

import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.events.Agentdesktopdataexchangeb2bOrderDeleteEvent;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.impl.AgentDesktopB2BOutboundServiceImpl;
import de.hybris.platform.servicelayer.event.impl.AbstractEventListener;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Agentdesktopdataexchangeb2bOrderDeleteEventListener
		extends AbstractEventListener<Agentdesktopdataexchangeb2bOrderDeleteEvent>
{

	private static final Logger LOGGER = LogManager.getLogger(Agentdesktopdataexchangeb2bOrderDeleteEventListener.class);

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
	protected void onEvent(final Agentdesktopdataexchangeb2bOrderDeleteEvent orderEvent)
	{

		final OrderModel resultedModel = getModelService().create(OrderModel.class);
		resultedModel.setOrderId(orderEvent.getOrderId());
		resultedModel.setEventType("order-deleted");
		resultedModel.setCustomerId(orderEvent.getCustomerId());

		LOGGER.info("Received the delete request for b2b order id {}", orderEvent.getOrderId());

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2bOrderDeleteData(resultedModel).subscribe();

		LOGGER.info("End of delete request for b2b order id {}", orderEvent.getOrderId());

	}
}
