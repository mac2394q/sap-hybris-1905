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
import de.hybris.platform.commerceservices.enums.CustomerType;
import de.hybris.platform.commerceservices.strategies.CustomerNameStrategy;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.tx.AfterSaveEvent;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.util.StringUtils;


/**
 *
 */
public class AgentDesktopB2BUnitOrderConversionService
{
	ModelService modelService;
	ConfigurationService configurationService;
	private CustomerNameStrategy customerNameStrategy;

	public OrderModel convertOrderModel(final OrderModel orderModel, final int eventType)
	{
		final OrderModel result = getModelService().create(OrderModel.class);

		if (eventType == AfterSaveEvent.CREATE)
		{
			result.setEventType(Agentdesktopdataexchangeb2bConstants.ORDER_CREATED);
		}
		else
		{
			result.setEventType(Agentdesktopdataexchangeb2bConstants.ORDER_UPDATED);
		}


		final String bdType = getConfigurationService().getConfiguration().getString(Agentdesktopdataexchangeb2bConstants.BD_TYPE);
		final String formatterType = getConfigurationService().getConfiguration()
				.getString(Agentdesktopdataexchangeb2bConstants.DATE_FORMATTER_TYPE);

		final UserModel user = orderModel.getUser();
		B2BCustomerModel customerModel = null;
		if (user instanceof CustomerModel)
		{
			customerModel = (B2BCustomerModel) user;
		}

		if (customerModel == null)
		{
			return result;
		}

		final String orderId = Agentdesktopdataexchangeb2bConstants.ORDER_ID;
		final String customerAttributeId = getConfigurationService().getConfiguration()
				.getString(Agentdesktopdataexchangeb2bConstants.CUSTOMER_ID_ATTRIBUTE);

		result.setCustomerId(customerModel.getCustomerID());

		final String[] names = getCustomerNameStrategy().splitName(customerModel.getName());

		if (names.length > 0 && !StringUtils.isEmpty(names[0]))
		{
			result.setCustomerFirstName(names[0]);
		}

		if (names.length > 1 && !StringUtils.isEmpty(names[1]))
		{
			result.setCustomerLastName(names[1]);
		}

		result.setCustomerEmail(customerModel.getContactEmail());

		if (CustomerType.GUEST.equals(customerModel.getType()))
		{
			result.setGuest(true);
		}

		result.setBdtType(bdType);
		result.setOrderId(orderModel.getCode());

		if (orderModel.getCurrency() != null)
		{
			result.setAdCurrency(orderModel.getCurrency().getIsocode());
		}

		result.setAdTotalPrice(orderModel.getTotalPrice().toString());
		result.setAdSubTotalPrice(orderModel.getSubtotal().toString());

		result.setB2bUnitDisplayName(orderModel.getUnit().getDisplayName());
		result.setB2bUnitUid(orderModel.getUnit().getUid());

		if (orderModel.getStatus() != null)
		{
			result.setOrderStatus(orderModel.getStatus().getCode());
		}


		result.setAdOrderCreatedTime(dateFormatter(orderModel.getCreationtime(), formatterType));

		if (orderModel.getModifiedtime() != null)
		{
			result.setAdOrderModifiedTime(dateFormatter(orderModel.getModifiedtime(), formatterType));
		}

		return result;
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
	 * @return the customerNameStrategy
	 */
	public CustomerNameStrategy getCustomerNameStrategy()
	{
		return customerNameStrategy;
	}

	/**
	 * @param customerNameStrategy
	 *           the customerNameStrategy to set
	 */
	public void setCustomerNameStrategy(final CustomerNameStrategy customerNameStrategy)
	{
		this.customerNameStrategy = customerNameStrategy;
	}

	protected static String dateFormatter(final Date date, final String formatterType)
	{

		final SimpleDateFormat formatter = new SimpleDateFormat(formatterType);
		final String strDate = formatter.format(date);
		return strDate;
	}

}
