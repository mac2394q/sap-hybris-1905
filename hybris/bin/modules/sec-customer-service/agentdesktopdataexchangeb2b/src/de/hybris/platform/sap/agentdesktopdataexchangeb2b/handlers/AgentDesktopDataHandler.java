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
package de.hybris.platform.sap.agentdesktopdataexchangeb2b.handlers;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.impl.AgentDesktopB2BOutboundServiceImpl;
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

	private AgentDesktopB2BOutboundServiceImpl agentDesktopB2BCpiOutboundServiceImpl;

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
	public void handleEvent(final AfterSaveEvent event)
	{
		// XXX Auto-generated method stub

	}

	@Override
	public void b2bUnitSaveAndUpdate(final PK b2bUnitPk)
	{
		LOGGER.info("Received the create/Update request for b2bunit id {}", b2bUnitPk);
		final B2BUnitModel b2bUnitModelData = getModelService().get(b2bUnitPk);
		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2BUnitData(b2bUnitModelData).subscribe();
		LOGGER.info("End of the create/Update request for b2bunit id {}", b2bUnitPk);

	}

	@Override
	public void b2bCustomerSaveAndUpdate(final PK b2bCustomerPk)
	{
		LOGGER.info("Received the create/Update request for b2bCustomer id {}", b2bCustomerPk);

		final B2BCustomerModel b2bCustomermodelData = getModelService().get(b2bCustomerPk);

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2BCustomerData(b2bCustomermodelData).subscribe();

		LOGGER.info("End of the create/Update request for b2bCustomer id {}", b2bCustomerPk);

	}

	@Override
	public void b2bUnitAddressSaveAndUpdate(final PK b2bAddressPk)
	{
		LOGGER.info("Received the create/Update request for b2bunit address id {}", b2bAddressPk);

		final AddressModel b2bUnitAddressmodelData = getModelService().get(b2bAddressPk);

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2BUnitAddressData(b2bUnitAddressmodelData).subscribe();

		LOGGER.info("End of the create/Update request for b2bunit id {}", b2bAddressPk);

	}

	@Override
	public void b2bUnitAddressDelete(final PK b2bAddressPk)
	{
		// XXX Auto-generated method stub
		LOGGER.info("Received the delete request for address id {}", b2bAddressPk.toString());
		final AddressModel deleteAddressModel = getModelService().create(AddressModel.class);
		deleteAddressModel.setSapAddressUUID(b2bAddressPk.toString());
		deleteAddressModel.setIsDelete(true);

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2BUnitAddressDeleteData(deleteAddressModel).subscribe();

		LOGGER.info("End of the create/Update request for b2bunit id {}", b2bAddressPk);

	}

	@Override
	public void b2bOrderSaveAndUpdate(final PK orderPk, final String requestType, final int eventType)
	{
		LOGGER.info("Received the create/Update request for order pk {}", orderPk);
		final OrderModel orderModel = modelService.get(orderPk);

		if (requestType != null && "created".equals(requestType) && orderModel.getStatus() != null
				&& orderModel.getStatus().getCode().equals("COMPLETED"))
		{
			return;
		}

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2bOrderData(orderModel, requestType, eventType).subscribe();

		LOGGER.info("End of create/Update request for order pk {}", orderPk);

	}

	@Override
	public void b2bReturnSaveAndUpdate(final PK returnOrderPk, final int eventType)
	{
		LOGGER.info("Received the create/Update request for return order pk {}", returnOrderPk);

		String orderType = Agentdesktopdataexchangeb2bConstants.RETURN_CREATED;
		if (eventType != AfterSaveEvent.CREATE)
		{
			orderType = Agentdesktopdataexchangeb2bConstants.RETURN_UPDATED;

		}

		getAgentDesktopB2BCpiOutboundServiceImpl().sendB2bReturnOrderData(returnOrderPk, orderType).subscribe();

		LOGGER.info("End of create/Update request for return order pk {}", returnOrderPk);

	}


}
