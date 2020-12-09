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
package de.hybris.platform.sap.agentdesktopdataexchange.handler;

import de.hybris.platform.core.PK;
import de.hybris.platform.tx.AfterSaveEvent;


/**
 *
 */
public interface AfterSaveEventHandler
{
	void handleEvent(AfterSaveEvent event);

	public void customerSaveAndUpdate(final PK customerPk, final String defaultAddressId);

	public void addressSaveAndUpdate(final PK addressPk);

	public void addressDelete(final PK addressPk);

	public void orderSaveAndUpdate(final PK orderPk, final String requestType, final int eventType);

	public void returnSaveAndUpdate(final PK returnOrderPk, final int eventType);

}
