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
package de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.impl;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.AgentDesktopB2BOutboundService;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;

import rx.Observable;


/**
 *
 */
public class AgentDesktopB2BOutboundServiceImpl implements AgentDesktopB2BOutboundService
{
	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopB2BOutboundServiceImpl.class);

	// Customer Outbound
	private static final String CEC_OUTBOUND_B2B_UNIT_OBJECT = "CECOutboundB2BUnit";
	private static final String CEC_OUTBOUND_B2B_UNIT_DESTINATION = "cecCPIB2BUnitDestination";

	private static final String CEC_OUTBOUND_B2B_CUSTOMER_OBJECT = "CECOutboundB2BCustomer";
	private static final String CEC_OUTBOUND_B2B_CUSTOMER_DESTINATION = "cecCPIB2BCustomerDestination";

	private static final String CEC_OUTBOUND_B2B_UNIT_ADDRESS_OBJECT = "CECOutboundB2BAddress";
	private static final String CEC_OUTBOUND_B2B_UNIT_ADDRESS_DESTINATION = "cecCPIB2BAddressDestination";

	private static final String CEC_OUTBOUND_B2B_UNIT_ORDER_OBJECT = "CECOutboundB2BOrder";
	private static final String CEC_OUTBOUND_B2B_UNIT_ORDER_DESTINATION = "cecCPIB2BOrderDestination";

	private static final String CEC_OUTBOUND_B2B_UNIT_RETURN_ORDER_OBJECT = "CECOutboundB2BReturnOrder";
	private static final String CEC_OUTBOUND_B2B_UNIT_RETURN_ORDER_DESTINATION = "cecCPIB2BReturnOrderDestination";


	private OutboundServiceFacade outboundServiceFacade;

	private AgentDesktopB2BUnitConversionService agentDesktopB2BUnitConversionService;

	private AgentDesktopB2BCustomerConversionService agentDesktopB2BCustomerConversionService;

	private AgentDesktopB2BUnitAddressConversionService agentDesktopB2BUnitAddressConversionService;

	private AgentDesktopB2BUnitOrderConversionService agentDesktopB2bOrderConversionService;

	private AgentDesktopB2BReturnOrderConversionService agentDesktopB2BReturnOrderConversionService;

	/**
	 * @return the agentDesktopB2BReturnOrderConversionService
	 */
	public AgentDesktopB2BReturnOrderConversionService getAgentDesktopB2BReturnOrderConversionService()
	{
		return agentDesktopB2BReturnOrderConversionService;
	}

	/**
	 * @param agentDesktopB2BReturnOrderConversionService
	 *           the agentDesktopB2BReturnOrderConversionService to set
	 */
	public void setAgentDesktopB2BReturnOrderConversionService(
			final AgentDesktopB2BReturnOrderConversionService agentDesktopB2BReturnOrderConversionService)
	{
		this.agentDesktopB2BReturnOrderConversionService = agentDesktopB2BReturnOrderConversionService;
	}

	/**
	 * @return the agentDesktopB2bOrderConversionService
	 */
	public AgentDesktopB2BUnitOrderConversionService getAgentDesktopB2bOrderConversionService()
	{
		return agentDesktopB2bOrderConversionService;
	}

	/**
	 * @param agentDesktopB2bOrderConversionService
	 *           the agentDesktopB2bOrderConversionService to set
	 */
	public void setAgentDesktopB2bOrderConversionService(
			final AgentDesktopB2BUnitOrderConversionService agentDesktopB2bOrderConversionService)
	{
		this.agentDesktopB2bOrderConversionService = agentDesktopB2bOrderConversionService;
	}

	/**
	 * @return the agentDesktopB2BUnitAddressConversionService
	 */
	public AgentDesktopB2BUnitAddressConversionService getAgentDesktopB2BUnitAddressConversionService()
	{
		return agentDesktopB2BUnitAddressConversionService;
	}

	/**
	 * @param agentDesktopB2BUnitAddressConversionService
	 *           the agentDesktopB2BUnitAddressConversionService to set
	 */
	public void setAgentDesktopB2BUnitAddressConversionService(
			final AgentDesktopB2BUnitAddressConversionService agentDesktopB2BUnitAddressConversionService)
	{
		this.agentDesktopB2BUnitAddressConversionService = agentDesktopB2BUnitAddressConversionService;
	}

	/**
	 * @return the agentDesktopB2BCustomerConversionService
	 */
	public AgentDesktopB2BCustomerConversionService getAgentDesktopB2BCustomerConversionService()
	{
		return agentDesktopB2BCustomerConversionService;
	}

	/**
	 * @param agentDesktopB2BCustomerConversionService
	 *           the agentDesktopB2BCustomerConversionService to set
	 */
	public void setAgentDesktopB2BCustomerConversionService(
			final AgentDesktopB2BCustomerConversionService agentDesktopB2BCustomerConversionService)
	{
		this.agentDesktopB2BCustomerConversionService = agentDesktopB2BCustomerConversionService;
	}

	/**
	 * @return the agentDesktopB2BUnitConversionService
	 */
	public AgentDesktopB2BUnitConversionService getAgentDesktopB2BUnitConversionService()
	{
		return agentDesktopB2BUnitConversionService;
	}

	/**
	 * @param agentDesktopB2BUnitConversionService
	 *           the agentDesktopB2BUnitConversionService to set
	 */
	public void setAgentDesktopB2BUnitConversionService(
			final AgentDesktopB2BUnitConversionService agentDesktopB2BUnitConversionService)
	{
		this.agentDesktopB2BUnitConversionService = agentDesktopB2BUnitConversionService;
	}

	/**
	 * @return the outboundServiceFacade
	 */
	public OutboundServiceFacade getOutboundServiceFacade()
	{
		return outboundServiceFacade;
	}

	/**
	 * @param outboundServiceFacade
	 *           the outboundServiceFacade to set
	 */
	public void setOutboundServiceFacade(final OutboundServiceFacade outboundServiceFacade)
	{
		this.outboundServiceFacade = outboundServiceFacade;
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2BUnitData(final B2BUnitModel B2BUnitModelData)
	{

		final B2BUnitModel cecB2bUnitMode = getAgentDesktopB2BUnitConversionService().convertB2bUnitForCEC(B2BUnitModelData);

		return getOutboundServiceFacade().send(cecB2bUnitMode, CEC_OUTBOUND_B2B_UNIT_OBJECT, CEC_OUTBOUND_B2B_UNIT_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2BCustomerData(final B2BCustomerModel B2BCustomerModelData)
	{
		final B2BCustomerModel cecB2bCustomerModelData = getAgentDesktopB2BCustomerConversionService()
				.convertB2bCustomerForCEC(B2BCustomerModelData);

		return getOutboundServiceFacade().send(cecB2bCustomerModelData, CEC_OUTBOUND_B2B_CUSTOMER_OBJECT,
				CEC_OUTBOUND_B2B_CUSTOMER_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2BUnitDeleteData(final B2BUnitModel B2BUnitModelData)
	{
		return getOutboundServiceFacade().send(B2BUnitModelData, CEC_OUTBOUND_B2B_UNIT_OBJECT, CEC_OUTBOUND_B2B_UNIT_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2BCustomerDeleteData(final B2BCustomerModel B2BCustomerModelData)
	{
		return getOutboundServiceFacade().send(B2BCustomerModelData, CEC_OUTBOUND_B2B_CUSTOMER_OBJECT,
				CEC_OUTBOUND_B2B_CUSTOMER_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2BUnitAddressData(final AddressModel B2BUnitAddressModelData)
	{
		final AddressModel cecB2bUnitAddressModelData = getAgentDesktopB2BUnitAddressConversionService()
				.convertB2bUnitForCEC(B2BUnitAddressModelData);

		return getOutboundServiceFacade().send(cecB2bUnitAddressModelData, CEC_OUTBOUND_B2B_UNIT_ADDRESS_OBJECT,
				CEC_OUTBOUND_B2B_UNIT_ADDRESS_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2BUnitAddressDeleteData(final AddressModel B2BUnitDeleteAddressModelData)
	{
		return getOutboundServiceFacade().send(B2BUnitDeleteAddressModelData, CEC_OUTBOUND_B2B_UNIT_ADDRESS_OBJECT,
				CEC_OUTBOUND_B2B_UNIT_ADDRESS_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2bOrderData(final OrderModel ordermOdel, final String requestType,
			final int eventType)
	{
		final OrderModel resultedModel = getAgentDesktopB2bOrderConversionService().convertOrderModel(ordermOdel, eventType);

		return getOutboundServiceFacade().send(resultedModel, CEC_OUTBOUND_B2B_UNIT_ORDER_OBJECT,
				CEC_OUTBOUND_B2B_UNIT_ORDER_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2bOrderDeleteData(final OrderModel ordermOdel)
	{
		return getOutboundServiceFacade().send(ordermOdel, CEC_OUTBOUND_B2B_UNIT_ORDER_OBJECT,
				CEC_OUTBOUND_B2B_UNIT_ORDER_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendB2bReturnOrderData(final PK returnOrderPk, final String orderType)
	{

		final OrderModel returnOrderModel = getAgentDesktopB2BReturnOrderConversionService().convertOrderModel(returnOrderPk,
				orderType);

		return getOutboundServiceFacade().send(returnOrderModel, CEC_OUTBOUND_B2B_UNIT_RETURN_ORDER_OBJECT,
				CEC_OUTBOUND_B2B_UNIT_RETURN_ORDER_DESTINATION);
	}


}
