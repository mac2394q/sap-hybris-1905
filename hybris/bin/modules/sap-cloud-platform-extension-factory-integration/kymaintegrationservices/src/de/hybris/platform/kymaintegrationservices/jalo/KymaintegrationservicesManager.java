/*
 *  
 * [y] hybris Platform
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.kymaintegrationservices.jalo;

import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import de.hybris.platform.kymaintegrationservices.constants.KymaintegrationservicesConstants;


public class KymaintegrationservicesManager extends GeneratedKymaintegrationservicesManager
{
	
	public static final KymaintegrationservicesManager getInstance()
	{
		final ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (KymaintegrationservicesManager) em.getExtension(KymaintegrationservicesConstants.EXTENSIONNAME);
	}
	
}
