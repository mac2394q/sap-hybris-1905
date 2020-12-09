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
package de.hybris.platform.sap.agentdesktopdataexchangecore.setup;

import static de.hybris.platform.sap.agentdesktopdataexchangecore.constants.AgentdesktopdataexchangecoreConstants.PLATFORM_LOGO_CODE;

import de.hybris.platform.core.initialization.SystemSetup;

import java.io.InputStream;

import de.hybris.platform.sap.agentdesktopdataexchangecore.constants.AgentdesktopdataexchangecoreConstants;
import de.hybris.platform.sap.agentdesktopdataexchangecore.service.AgentdesktopdataexchangecoreService;


@SystemSetup(extension = AgentdesktopdataexchangecoreConstants.EXTENSIONNAME)
public class AgentdesktopdataexchangecoreSystemSetup
{
	private final AgentdesktopdataexchangecoreService agentdesktopdataexchangecoreService;

	public AgentdesktopdataexchangecoreSystemSetup(final AgentdesktopdataexchangecoreService agentdesktopdataexchangecoreService)
	{
		this.agentdesktopdataexchangecoreService = agentdesktopdataexchangecoreService;
	}

	@SystemSetup(process = SystemSetup.Process.INIT, type = SystemSetup.Type.ESSENTIAL)
	public void createEssentialData()
	{
		agentdesktopdataexchangecoreService.createLogo(PLATFORM_LOGO_CODE);
	}

	private InputStream getImageStream()
	{
		return AgentdesktopdataexchangecoreSystemSetup.class.getResourceAsStream("/agentdesktopdataexchangecore/sap-hybris-platform.png");
	}
}
