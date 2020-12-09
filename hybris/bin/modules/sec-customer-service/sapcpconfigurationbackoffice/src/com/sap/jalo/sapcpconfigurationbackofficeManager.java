/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package com.sap.jalo;

import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;

import org.apache.log4j.Logger;

import com.sap.constants.SapcpconfigurationbackofficeConstants;


@SuppressWarnings("PMD")
public class sapcpconfigurationbackofficeManager extends GeneratedsapcpconfigurationbackofficeManager
{
	@SuppressWarnings("unused")
	private static final Logger log = Logger.getLogger(sapcpconfigurationbackofficeManager.class.getName());

	public static final sapcpconfigurationbackofficeManager getInstance()
	{
		final ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (sapcpconfigurationbackofficeManager) em.getExtension(SapcpconfigurationbackofficeConstants.EXTENSIONNAME);
	}

}
