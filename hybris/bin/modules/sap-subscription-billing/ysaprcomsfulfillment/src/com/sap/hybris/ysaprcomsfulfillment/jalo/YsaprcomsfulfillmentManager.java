/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package com.sap.hybris.ysaprcomsfulfillment.jalo;

import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import com.sap.hybris.ysaprcomsfulfillment.constants.YsaprcomsfulfillmentConstants;
import org.apache.log4j.Logger;

@SuppressWarnings("PMD")
public class YsaprcomsfulfillmentManager extends GeneratedYsaprcomsfulfillmentManager
{
	@SuppressWarnings("unused")
	private static final Logger log = Logger.getLogger( YsaprcomsfulfillmentManager.class.getName() );
	
	public static final YsaprcomsfulfillmentManager getInstance()
	{
		ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (YsaprcomsfulfillmentManager) em.getExtension(YsaprcomsfulfillmentConstants.EXTENSIONNAME);
	}
	
}
