/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */

package de.hybris.platform.sap.agentdesktopdataexchange.service.impl;

import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade;
import de.hybris.platform.sap.agentdesktopdataexchange.service.AgentDesktopDefaultOutboundService;
import de.hybris.platform.sap.sapcpiadapter.model.SAPCpiOutboundCustomerModel;
import de.hybris.platform.sap.sapcpicustomerexchange.service.SapCpiCustomerConversionService;
import de.hybris.platform.servicelayer.config.ConfigurationService;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;

import rx.Observable;


public class AgentDesktopOutboundServiceImpl implements AgentDesktopDefaultOutboundService
{

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopOutboundServiceImpl.class);

	// Customer Outbound
	private static final String CEC_OUTBOUND_CUSTOMER_OBJECT = "CECOutboundCustomer";
	private static final String CEC_OUTBOUND_CUSTOMER_DESTINATION = "cecCPICustomerDestination";

	//address outbound
	private static final String CEC_OUTBOUND_ADDRESS_OBJECT = "CECOutboundAddress";
	private static final String CEC_OUTBOUND_ADDRESS_DESTINATION = "cecCPIAddressDestination";

	//Order outbound
	private static final String CEC_OUTBOUND_ORDER_OBJECT = "CECOutboundOrder";
	private static final String CEC_OUTBOUND_ORDER_DESTINATION = "cecCPIOrderDestination";

	//Return Order outbound
	private static final String CEC_OUTBOUND_RETURN_OBJECT = "CECOutboundReturnOrder";
	private static final String CEC_OUTBOUND_RETURN_ORDER_DESTINATION = "cecCPIReturnOrderDestination";

	private ConfigurationService configurationService;
	private SapCpiCustomerConversionService sapCpiCustomerConversionService;
	private OutboundServiceFacade outboundServiceFacade;
	private AgentDesktopAddressConversionService sapAddressConversionService;
	private AgentDesktopOrderConversionService agentDesktopOrderConversionService;
	private AgentDesktopReturnOrderConversionService agentDesktopReturnOrderConversionService;



	@Override
	public Observable<ResponseEntity<Map>> sendCustomerData(final CustomerModel cecOutboudCustomerModel, final String baseStoreUid,
			final String sessionLanguage, final AddressModel addressModel, final String defaultAddressId)
	{

		final SAPCpiOutboundCustomerModel sapCpiOutboundCustomer = getSapCpiCustomerConversionService()
				.convertCustomerToSapCpiCustomer(cecOutboudCustomerModel, addressModel, "", "");

		return getOutboundServiceFacade().send(sapCpiOutboundCustomer, CEC_OUTBOUND_CUSTOMER_OBJECT,
				CEC_OUTBOUND_CUSTOMER_DESTINATION);

	}

	@Override
	public Observable<ResponseEntity<Map>> sendCustomerDeleteData(final CustomerModel customerModel)
	{
		final SAPCpiOutboundCustomerModel sapCpiOutboundCustomer = getSapCpiCustomerConversionService()
				.convertCustomerToSapCpiCustomer(customerModel, customerModel.getDefaultShipmentAddress(), "", "");
		sapCpiOutboundCustomer.setIsDelete(true);

		return getOutboundServiceFacade().send(sapCpiOutboundCustomer, CEC_OUTBOUND_CUSTOMER_OBJECT,
				CEC_OUTBOUND_CUSTOMER_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendAddessData(final AddressModel addressModel)
	{
		final AddressModel cpiAddressModel = getSapAddressConversionService().convertAddressForCEC(addressModel);
		return getOutboundServiceFacade().send(cpiAddressModel, CEC_OUTBOUND_ADDRESS_OBJECT, CEC_OUTBOUND_ADDRESS_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendAddressDeleteData(final AddressModel addressModel)
	{
		return getOutboundServiceFacade().send(addressModel, CEC_OUTBOUND_ADDRESS_OBJECT, CEC_OUTBOUND_ADDRESS_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendOrderData(final OrderModel orderModel)
	{
		return getOutboundServiceFacade().send(orderModel, CEC_OUTBOUND_ORDER_OBJECT, CEC_OUTBOUND_ORDER_DESTINATION);
	}

	@Override
	public Observable<ResponseEntity<Map>> sendReturnOrderData(final OrderModel returnOrderModel)
	{
		return getOutboundServiceFacade().send(returnOrderModel, CEC_OUTBOUND_RETURN_OBJECT, CEC_OUTBOUND_RETURN_ORDER_DESTINATION);
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

	/**
	 * @return the sapCpiCustomerConversionService
	 */
	public SapCpiCustomerConversionService getSapCpiCustomerConversionService()
	{
		return sapCpiCustomerConversionService;
	}

	/**
	 * @param sapCpiCustomerConversionService
	 *           the sapCpiCustomerConversionService to set
	 */
	public void setSapCpiCustomerConversionService(final SapCpiCustomerConversionService sapCpiCustomerConversionService)
	{
		this.sapCpiCustomerConversionService = sapCpiCustomerConversionService;
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

	/**
	 * @return the sapAddressConversionService
	 */
	public AgentDesktopAddressConversionService getSapAddressConversionService()
	{
		return sapAddressConversionService;
	}

	/**
	 * @param sapAddressConversionService
	 *           the sapAddressConversionService to set
	 */
	public void setSapAddressConversionService(final AgentDesktopAddressConversionService sapAddressConversionService)
	{
		this.sapAddressConversionService = sapAddressConversionService;
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





}
