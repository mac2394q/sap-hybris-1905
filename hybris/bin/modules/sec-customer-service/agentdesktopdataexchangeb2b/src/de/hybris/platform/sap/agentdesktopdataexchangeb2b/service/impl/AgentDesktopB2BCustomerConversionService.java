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
import de.hybris.platform.b2b.services.B2BUnitService;
import de.hybris.platform.commerceservices.strategies.CustomerNameStrategy;
import de.hybris.platform.core.model.security.PrincipalGroupModel;
import de.hybris.platform.servicelayer.model.ModelService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.util.StringUtils;


/**
 *
 */
public class AgentDesktopB2BCustomerConversionService
{

	private ModelService modelService;

	private CustomerNameStrategy customerNameStrategy;

	private B2BUnitService b2bUnitService;

	/**
	 * @return the b2bUnitService
	 */
	public B2BUnitService getB2bUnitService()
	{
		return b2bUnitService;
	}

	/**
	 * @param b2bUnitService
	 *           the b2bUnitService to set
	 */
	public void setB2bUnitService(final B2BUnitService b2bUnitService)
	{
		this.b2bUnitService = b2bUnitService;
	}

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopB2BCustomerConversionService.class);

	public B2BCustomerModel convertB2bCustomerForCEC(final B2BCustomerModel b2bCustomerModelData)
	{
		final B2BCustomerModel cecB2bCustomerModelData = getModelService().create(B2BCustomerModel.class);
		cecB2bCustomerModelData.setIsDelete(false);
		cecB2bCustomerModelData.setIsGuest(false);
		cecB2bCustomerModelData.setIsSealed(false);

		cecB2bCustomerModelData.setUid(b2bCustomerModelData.getUid());
		cecB2bCustomerModelData.setB2bCustomerPk(b2bCustomerModelData.getPk().toString());

		final String[] names = getCustomerNameStrategy().splitName(b2bCustomerModelData.getName());

		if (!StringUtils.isEmpty(b2bCustomerModelData.getTitle()))
		{
			cecB2bCustomerModelData.setTitle(b2bCustomerModelData.getTitle());
		}

		if (names.length > 0 && !StringUtils.isEmpty(names[0]))
		{
			cecB2bCustomerModelData.setFirstName(names[0]);
		}
		if (names.length > 1 && !StringUtils.isEmpty(names[1]))
		{
			cecB2bCustomerModelData.setLastName(names[1]);
		}

		if (!StringUtils.isEmpty(b2bCustomerModelData.getSessionCurrency()))
		{
			cecB2bCustomerModelData.setPreferredCurrency(b2bCustomerModelData.getSessionCurrency().getIsocode());
		}

		final B2BUnitModel b2bUnit = (B2BUnitModel) getB2bUnitService().getParent(b2bCustomerModelData);

		if (!StringUtils.isEmpty(b2bUnit))
		{
			b2bUnit.setB2bUnitPk(b2bUnit.getPk().toString());

			cecB2bCustomerModelData.setDefaultB2BUnit(b2bUnit);
		}

		final List<PrincipalGroupModel> cecGroups = new ArrayList<>();


		b2bCustomerModelData.getGroups().stream().map(groupData -> {
			groupData.setGroupItemPk(groupData.getPk().toString());

			final PrincipalGroupModel tempGroupModel = new PrincipalGroupModel();

			tempGroupModel.setUid(groupData.getUid());
			tempGroupModel.setGroupItemPk(groupData.getGroupItemPk().toString());
			tempGroupModel.setGroupItemtype(groupData.getItemtype());

			cecGroups.add(tempGroupModel);

			return groupData;
		}).collect(Collectors.toList());

		cecB2bCustomerModelData.setCecGroups(cecGroups);
		cecB2bCustomerModelData.setB2bItemType(b2bCustomerModelData.getItemtype());

		return cecB2bCustomerModelData;
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

}
