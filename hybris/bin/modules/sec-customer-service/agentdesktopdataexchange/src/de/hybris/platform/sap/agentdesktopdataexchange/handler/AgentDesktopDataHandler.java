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
package de.hybris.platform.sap.agentdesktopdataexchange.handler;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;
import de.hybris.platform.sap.agentdesktopdataexchange.service.impl.AgentDesktopOrderConversionService;
import de.hybris.platform.sap.agentdesktopdataexchange.service.impl.AgentDesktopOutboundServiceImpl;
import de.hybris.platform.sap.agentdesktopdataexchange.service.impl.AgentDesktopReturnOrderConversionService;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.tx.AfterSaveEvent;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 *
 */
public class AgentDesktopDataHandler implements AfterSaveEventHandler
{


	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopDataHandler.class);

	private ModelService modelService;

	private AgentDesktopOutboundServiceImpl agentDesktopCpiOutboundServiceImpl;

	private AgentDesktopOrderConversionService agentDesktopOrderConversionService;

	private AgentDesktopReturnOrderConversionService agentDesktopReturnOrderConversionService;


	/**
	 * @return the agentDesktopReturnOrderConversionService
	 */
	public AgentDesktopReturnOrderConversionService getAgentDesktopReturnOrderConversionService()
	{
		return agentDesktopReturnOrderConversionService;
	}

	/**
	 * @param agentDesktopReturnOrderConversionService
	 *           the agentDesktopReturnOrderConversionService to set
	 */
	public void setAgentDesktopReturnOrderConversionService(
			final AgentDesktopReturnOrderConversionService agentDesktopReturnOrderConversionService)
	{
		this.agentDesktopReturnOrderConversionService = agentDesktopReturnOrderConversionService;
	}

	@Override
	public void handleEvent(final AfterSaveEvent event)
	{
		// XXX Auto-generated method stub

	}

	@Override
	public void customerSaveAndUpdate(final PK customerPk, final String defaultAddressId)
	{
		LOGGER.info("Received the create/Update request for customer id {}", customerPk);
		final CustomerModel customerModel = modelService.get(customerPk);
		customerModel.setDefaultAddressId(defaultAddressId);
		getAgentDesktopCpiOutboundServiceImpl()
				.sendCustomerData(customerModel, "", "", customerModel.getDefaultShipmentAddress(), defaultAddressId).subscribe();
		LOGGER.info("End of create/Update request for customer id {}", customerPk);

	}

	@Override
	public void addressSaveAndUpdate(final PK addressPk)
	{

		LOGGER.info("Received the create/Update request for address pk {}", addressPk);
		final AddressModel addressModel = modelService.get(addressPk);
		getAgentDesktopCpiOutboundServiceImpl().sendAddessData(addressModel).subscribe();
		LOGGER.info("End of create/Update request for address pk {}", addressPk);

	}

	@Override
	public void addressDelete(final PK addressPk)
	{
		LOGGER.info("Received the delete request for address id {}", addressPk.toString());
		final AddressModel deleteAddressModel = getModelService().create(AddressModel.class);
		deleteAddressModel.setSapAddressUUID(addressPk.toString());
		deleteAddressModel.setIsDelete(true);
		getAgentDesktopCpiOutboundServiceImpl().sendAddressDeleteData(deleteAddressModel).subscribe();
		LOGGER.info("End of delete for address id {}", addressPk.toString());

	}

	@Override
	public void orderSaveAndUpdate(final PK orderPk, final String requestType, final int eventType)
	{
		LOGGER.info("Received the create/Update request for order pk {}", orderPk);
		final OrderModel orderModel = modelService.get(orderPk);

		if (requestType != null && "created".equals(requestType) && orderModel.getStatus() != null
				&& orderModel.getStatus().getCode().equals("COMPLETED"))
		{
			return;
		}

		final OrderModel resultedModel = getAgentDesktopOrderConversionService().convertOrderModel(orderModel, eventType);
		resultedModel.setRequestType(requestType);
		getAgentDesktopCpiOutboundServiceImpl().sendOrderData(resultedModel).subscribe();

		LOGGER.info("End of create/Update request for order pk {}", orderPk);

	}


	@Override
	public void returnSaveAndUpdate(final PK returnOrderPk, final int eventType)
	{

		LOGGER.info("Received the create/Update request for return order pk {}", returnOrderPk);

		String orderType = AgentdesktopdataexchangeConstants.RETURN_CREATED;
		if (eventType != AfterSaveEvent.CREATE)
		{
			orderType = AgentdesktopdataexchangeConstants.RETURN_UPDATED;

		}

		final OrderModel returnOrderModel = getAgentDesktopReturnOrderConversionService().convertOrderModel(returnOrderPk,
				orderType);

		getAgentDesktopCpiOutboundServiceImpl().sendReturnOrderData(returnOrderModel).subscribe();

		LOGGER.info("End of create/Update request for return order pk {}", returnOrderPk);

	}

	/**
	 * @return the agentDesktopOrderConversionService
	 */
	public AgentDesktopOrderConversionService getAgentDesktopOrderConversionService()
	{
		return agentDesktopOrderConversionService;
	}

	/**
	 * @param agentDesktopOrderConversionService
	 *           the agentDesktopOrderConversionService to set
	 */
	public void setAgentDesktopOrderConversionService(final AgentDesktopOrderConversionService agentDesktopOrderConversionService)
	{
		this.agentDesktopOrderConversionService = agentDesktopOrderConversionService;
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
