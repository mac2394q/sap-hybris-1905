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
package de.hybris.platform.sap.agentdesktopdataexchangeb2b.setup;

import static de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants.PLATFORM_LOGO_CODE;

import de.hybris.platform.core.initialization.SystemSetup;

import java.io.InputStream;

import de.hybris.platform.sap.agentdesktopdataexchangeb2b.constants.Agentdesktopdataexchangeb2bConstants;
import de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.Agentdesktopdataexchangeb2bService;


@SystemSetup(extension = Agentdesktopdataexchangeb2bConstants.EXTENSIONNAME)
public class Agentdesktopdataexchangeb2bSystemSetup
{
	private final Agentdesktopdataexchangeb2bService agentdesktopdataexchangeb2bService;

	public Agentdesktopdataexchangeb2bSystemSetup(final Agentdesktopdataexchangeb2bService agentdesktopdataexchangeb2bService)
	{
		this.agentdesktopdataexchangeb2bService = agentdesktopdataexchangeb2bService;
	}

	@SystemSetup(process = SystemSetup.Process.INIT, type = SystemSetup.Type.ESSENTIAL)
	public void createEssentialData()
	{
		agentdesktopdataexchangeb2bService.createLogo(PLATFORM_LOGO_CODE);
	}

	private InputStream getImageStream()
	{
		return Agentdesktopdataexchangeb2bSystemSetup.class.getResourceAsStream("/agentdesktopdataexchangeb2b/sap-hybris-platform.png");
	}
}
