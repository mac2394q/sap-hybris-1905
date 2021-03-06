/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.core.jco.service;

import de.hybris.platform.sap.core.configuration.rfc.RFCDestination;


/**
 * Service for SAP RFC Destinations.
 */
public interface SAPRFCDestinationService
{

	/**
	 * Get an RFC Destination by destination name.
	 * 
	 * @param rfcDestinationName
	 *           RFC destination name
	 * @return The selected RFC Destination.
	 */
	public RFCDestination getRFCDestination(String rfcDestinationName);

}
