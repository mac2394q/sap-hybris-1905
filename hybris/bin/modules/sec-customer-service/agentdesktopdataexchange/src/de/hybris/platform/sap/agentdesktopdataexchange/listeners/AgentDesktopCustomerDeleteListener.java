/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2018 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 */
package de.hybris.platform.sap.agentdesktopdataexchange.listeners;

import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchange.events.CustomerRemoveEvent;
import de.hybris.platform.sap.agentdesktopdataexchange.service.impl.AgentDesktopOutboundServiceImpl;
import de.hybris.platform.servicelayer.event.impl.AbstractEventListener;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;



/**
 *
 */
public class AgentDesktopCustomerDeleteListener extends AbstractEventListener<CustomerRemoveEvent>
{
	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopCustomerDeleteListener.class);

	private ModelService modelService;

	private AgentDesktopOutboundServiceImpl agentDesktopCpiOutboundServiceImpl;


	@Override
	protected void onEvent(final CustomerRemoveEvent event)
	{

		final String customerId = event.getCustomerId();
		LOGGER.info("Received the delete request for customer id {}", customerId);
		final CustomerModel customerModel = new CustomerModel();
		customerModel.setCustomerID(customerId);
		getAgentDesktopCpiOutboundServiceImpl().sendCustomerDeleteData(customerModel).subscribe();
		LOGGER.info("End of delete for customer id {}", customerId);

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
	public void setAgentDesktopCpiOutboundServiceImpl(final AgentDesktopOutboundServiceImpl agentDesktopCpiOutboundServiceImpl)
	{
		this.agentDesktopCpiOutboundServiceImpl = agentDesktopCpiOutboundServiceImpl;
	}



}
