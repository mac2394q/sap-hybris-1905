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
package de.hybris.platform.sap.agentdesktopdataexchange.setup;

import de.hybris.platform.core.initialization.SystemSetup;
import de.hybris.platform.sap.agentdesktopdataexchange.constants.AgentdesktopdataexchangeConstants;

import java.io.InputStream;


@SystemSetup(extension = AgentdesktopdataexchangeConstants.EXTENSIONNAME)
public class AgentdesktopdataexchangeSystemSetup
{

	private InputStream getImageStream()
	{
		return AgentdesktopdataexchangeSystemSetup.class.getResourceAsStream("/agentdesktopdataexchange/sap-hybris-platform.png");
	}
}
