/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.core.spring;

import de.hybris.platform.converters.Populator;
import de.hybris.platform.sap.core.configuration.model.SAPConfigurationModel;
//import de.hybris.platform.sap.core.configuration.model.SAPConfigurationModel;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;

import java.util.Map;


/**
 * Populates property map with sflight_availableFood and sflight_drinks.
 */
public class TestConfigurationDataPopulator implements Populator<SAPConfigurationModel, Map<String, Object>>
{

	@Override
	public void populate(final SAPConfigurationModel source, final Map<String, Object> target) throws ConversionException
	{

		//special offer
		//		target.put("sflight_drinks", "Happy Hour!");
	}
}
