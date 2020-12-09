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

import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.servicelayer.model.ModelService;

import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 *
 */
public class AgentDesktopB2BUnitConversionService
{

	private ModelService modelService;

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopB2BUnitConversionService.class);

	public B2BUnitModel convertB2bUnitForCEC(final B2BUnitModel b2bUnitModelData)
	{
		final B2BUnitModel cecUnitModelData = getModelService().create(B2BUnitModel.class);

		cecUnitModelData.setB2bUnitPk(b2bUnitModelData.getPk().toString());
		cecUnitModelData.setUid(b2bUnitModelData.getUid());
		cecUnitModelData.setIsSealed(false);
		cecUnitModelData.setIsDelete(false);
		cecUnitModelData.setName(b2bUnitModelData.getDisplayName());

		b2bUnitModelData.getGroups().stream().map(groupData -> {

			if (groupData instanceof B2BUnitModel)
			{

				cecUnitModelData.setParentB2BUnitId(((B2BUnitModel) groupData).getUid());
				cecUnitModelData.setParentB2BUnitPk(((B2BUnitModel) groupData).getPk().toString());

			}

			return groupData;
		}).collect(Collectors.toList());

		cecUnitModelData.setDescription(b2bUnitModelData.getDescription());

		return cecUnitModelData;
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
