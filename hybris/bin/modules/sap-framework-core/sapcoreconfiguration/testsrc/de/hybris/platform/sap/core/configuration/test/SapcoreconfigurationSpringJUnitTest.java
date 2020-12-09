/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.core.configuration.test;

import de.hybris.platform.sap.core.test.SapcoreSpringJUnitTest;


/**
 * Base test class for sapcoreconfiguration junit test in the hybris environment without starting the server.
 */
// Standard spring xml cannot be added since it uses objects which are only available at server runtime
//  "classpath:sapcoreconfiguration-spring.xml" and "classpath:sapcoreconfiguration-datahub-spring.xml" explicitly omitted due to server dependencies 
public abstract class SapcoreconfigurationSpringJUnitTest extends SapcoreSpringJUnitTest // NOPMD
{

	// 

}
