/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package com.sap.platform.sapcpconfiguration.service;

import com.sap.platform.model.CecServiceModel;
import com.sap.platform.model.CecTechnicalUserModel;


public interface CecTechnicalUserLookup<T extends CecServiceModel, K extends CecTechnicalUserModel>
{
	K lookup(T cecServiceMdoel);
}
