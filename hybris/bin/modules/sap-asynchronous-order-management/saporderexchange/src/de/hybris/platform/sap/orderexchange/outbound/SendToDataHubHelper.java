/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.orderexchange.outbound;

import de.hybris.platform.servicelayer.model.AbstractItemModel;


/**
 * Helper for creating a raw items from a hybris item and sending it to the Data Hub
 * 
 * @param <T>
 *           The type of the item model for which the raw item shall be built and sent
 */
public interface SendToDataHubHelper<T extends AbstractItemModel>
{

	/**
	 * @param model
	 *           The item model for which the raw item shall be built and sent
	 * @return result of sending raw item to Data Hub
	 */
	SendToDataHubResult createAndSendRawItem(T model);

}
