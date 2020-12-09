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
package com.sap.hybris.sapquoteintegrationoms.setup;

import static com.sap.hybris.sapquoteintegrationoms.constants.SapquoteintegrationomsConstants.PLATFORM_LOGO_CODE;

import de.hybris.platform.core.initialization.SystemSetup;

import java.io.InputStream;

import com.sap.hybris.sapquoteintegrationoms.constants.SapquoteintegrationomsConstants;
import com.sap.hybris.sapquoteintegrationoms.service.SapquoteintegrationomsService;


@SystemSetup(extension = SapquoteintegrationomsConstants.EXTENSIONNAME)
public class SapquoteintegrationomsSystemSetup
{
	private final SapquoteintegrationomsService sapquoteintegrationomsService;

	public SapquoteintegrationomsSystemSetup(final SapquoteintegrationomsService sapquoteintegrationomsService)
	{
		this.sapquoteintegrationomsService = sapquoteintegrationomsService;
	}

	@SystemSetup(process = SystemSetup.Process.INIT, type = SystemSetup.Type.ESSENTIAL)
	public void createEssentialData()
	{
		sapquoteintegrationomsService.createLogo(PLATFORM_LOGO_CODE);
	}

	private InputStream getImageStream()
	{
		return SapquoteintegrationomsSystemSetup.class.getResourceAsStream("/sapquoteintegrationoms/sap-hybris-platform.png");
	}
}
