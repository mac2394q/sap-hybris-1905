/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.core.test.session;

import de.hybris.platform.servicelayer.session.MockSessionService;
import de.hybris.platform.servicelayer.session.Session;


/**
 * SAP Mock Session Service which returns the SAP Mock Session.
 */
public class SAPMockSessionService extends MockSessionService
{

	/*
	 * (non-Javadoc)
	 * 
	 * @see de.hybris.platform.servicelayer.session.MockSessionService#createSession()
	 */
	@Override
	public Session createSession()
	{
		return new SAPMockSession();
	}

}
