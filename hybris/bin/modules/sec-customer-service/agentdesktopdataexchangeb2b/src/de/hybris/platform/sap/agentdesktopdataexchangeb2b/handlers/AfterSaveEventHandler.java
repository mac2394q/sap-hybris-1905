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
package de.hybris.platform.sap.agentdesktopdataexchangeb2b.handlers;

import de.hybris.platform.core.PK;
import de.hybris.platform.tx.AfterSaveEvent;


/**
 *
 */
public interface AfterSaveEventHandler
{
	void handleEvent(AfterSaveEvent event);

	public void b2bUnitSaveAndUpdate(final PK b2bUnitPk);

	public void b2bCustomerSaveAndUpdate(final PK b2bCustomerPk);

	public void b2bUnitAddressSaveAndUpdate(final PK b2bAddressPk);

	public void b2bUnitAddressDelete(final PK b2bAddressPk);

	public void b2bOrderSaveAndUpdate(final PK orderPk, final String requestType, final int eventType);

	public void b2bReturnSaveAndUpdate(final PK returnOrderPk, final int eventType);

}
