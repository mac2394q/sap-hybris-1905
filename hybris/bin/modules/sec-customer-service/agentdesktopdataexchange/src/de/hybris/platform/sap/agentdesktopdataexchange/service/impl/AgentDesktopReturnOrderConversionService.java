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
package de.hybris.platform.sap.agentdesktopdataexchange.service.impl;



import de.hybris.platform.basecommerce.enums.ReturnStatus;
import de.hybris.platform.commerceservices.strategies.CustomerNameStrategy;
import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.returns.model.ReturnRequestModel;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.model.ModelService;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.util.StringUtils;


public class AgentDesktopReturnOrderConversionService
{

	private ModelService modelService;
	private ConfigurationService configurationService;
	private CustomerNameStrategy customerNameStrategy;

	private List<ReturnStatus> cancellableReturnOrderStatusList;

	/**
	 * returnRequestType can be return-created, return-updated and return-deleted
	 */
	public OrderModel convertOrderModel(final PK returnOrderPk, final String returnRequestType)
	{
		final OrderModel result = getModelService().create(OrderModel.class);

		result.setReturnRequestEventStatus(returnRequestType);

		final ReturnRequestModel returnRequestModel = (ReturnRequestModel) getModelService().get(returnOrderPk);

		final String formatterType = getConfigurationService().getConfiguration()
				.getString(AgentdesktopdataexchangeConstants.DATE_FORMATTER_TYPE);

		result.setReturnRequestCode(returnRequestModel.getCode());
		result.setReturnRequestRMA(returnRequestModel.getRMA());

		if (returnRequestModel.getStatus() != null)
		{
			result.setReturnRequestStatus(returnRequestModel.getStatus().getCode());
		}


		result.setReturnRequestRefundDeliveryCost(returnRequestModel.getRefundDeliveryCost());
		result.setReturnRequestCancellable(getCancellableReturnOrderStatusList().contains(returnRequestModel.getStatus()));

		if (returnRequestModel.getCreationtime() != null)
		{
			result.setReturnRequestCreatedTime(dateFormatter(returnRequestModel.getCreationtime(), formatterType));
		}

		if (returnRequestModel.getModifiedtime() != null)
		{
			result.setReturnRequestModifiedTime(dateFormatter(returnRequestModel.getModifiedtime(), formatterType));
		}

		final OrderModel order = returnRequestModel.getOrder();

		if (order == null)
		{
			return result;
		}

		/* Set the customer details */
		final CustomerModel customerModel = getCustomerModel(order.getUser());

		if (customerModel != null)
		{
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
			//result.setCustomerId(customerModel.getCustomerID());
		}

		result.setOrderId(order.getCode());

		result.setAdOrderCreatedTime(dateFormatter(order.getCreationtime(), formatterType));

		if (order.getCurrency() != null)
		{
			result.setAdCurrency(order.getCurrency().getIsocode());
		}

		BigDecimal totalPrice = returnRequestModel.getSubtotal();
		if (returnRequestModel.getRefundDeliveryCost())
		{
			totalPrice = totalPrice.add(BigDecimal.valueOf(order.getDeliveryCost()));
		}

		totalPrice = totalPrice.setScale(2, BigDecimal.ROUND_HALF_UP);
		result.setAdTotalPrice(totalPrice.toString());
		result.setAdSubTotalPrice(returnRequestModel.getSubtotal().toString());

		if (order.getModifiedtime() != null)
		{
			result.setAdOrderModifiedTime(dateFormatter(order.getModifiedtime(), formatterType));
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



	/**
	 * @return the cancellableReturnOrderStatusList
	 */
	public List<ReturnStatus> getCancellableReturnOrderStatusList()
	{
		return cancellableReturnOrderStatusList;
	}

	/**
	 * @param cancellableReturnOrderStatusList
	 *           the cancellableReturnOrderStatusList to set
	 */
	public void setCancellableReturnOrderStatusList(final List<ReturnStatus> cancellableReturnOrderStatusList)
	{
		this.cancellableReturnOrderStatusList = cancellableReturnOrderStatusList;
	}

	private String dateFormatter(final Date date, final String formatterType)
	{

		final SimpleDateFormat formatter = new SimpleDateFormat(formatterType);
		final String strDate = formatter.format(date);
		return strDate;
	}

	private CustomerModel getCustomerModel(final UserModel user)
	{
		CustomerModel customer = null;
		if (user instanceof CustomerModel)
		{
			customer = (CustomerModel) user;
		}
		return customer;
	}

}
