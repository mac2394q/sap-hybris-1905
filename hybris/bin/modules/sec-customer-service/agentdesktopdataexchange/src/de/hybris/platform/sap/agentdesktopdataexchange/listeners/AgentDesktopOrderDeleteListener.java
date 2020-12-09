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
package de.hybris.platform.sap.agentdesktopdataexchange.listeners;

import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.sap.agentdesktopdataexchange.events.OrderRemoveEvent;
import de.hybris.platform.sap.agentdesktopdataexchange.service.impl.AgentDesktopOutboundServiceImpl;
import de.hybris.platform.servicelayer.event.impl.AbstractEventListener;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 *
 */
public class AgentDesktopOrderDeleteListener extends AbstractEventListener<OrderRemoveEvent>
{

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopOrderDeleteListener.class);

	private ModelService modelService;
	private AgentDesktopOutboundServiceImpl agentDesktopCpiOutboundServiceImpl;


	@Override
	protected void onEvent(final OrderRemoveEvent orderEvent)
	{


		final OrderModel resultedModel = getModelService().create(OrderModel.class);
		resultedModel.setOrderId(orderEvent.getOrderId());
		resultedModel.setEventType("order-deleted");
		resultedModel.setCustomerId(orderEvent.getCustomerId());

		LOGGER.info("Received the delete request for order id {}", orderEvent.getOrderId());

		getAgentDesktopCpiOutboundServiceImpl().sendOrderData(resultedModel).subscribe();

		LOGGER.info("End of delete request for order id {}", orderEvent.getOrderId());

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
	 * @return the agentDesktopCpiOutboundServiceImpl
	 */
	public AgentDesktopOutboundServiceImpl getAgentDesktopCpiOutboundServiceImpl()
	{
		return agentDesktopCpiOutboundServiceImpl;
	}

	/**
	 * @param agentDesktopCpiOutboundServiceImpl
	 *           the agentDesktopCpiOutboundServiceImpl to set
	 */
	public void setAgentDesktopCpiOutboundServiceImpl(
			final AgentDesktopOutboundServiceImpl agentDesktopCpiOutboundServiceImpl)
	{
		this.agentDesktopCpiOutboundServiceImpl = agentDesktopCpiOutboundServiceImpl;
	}



}
