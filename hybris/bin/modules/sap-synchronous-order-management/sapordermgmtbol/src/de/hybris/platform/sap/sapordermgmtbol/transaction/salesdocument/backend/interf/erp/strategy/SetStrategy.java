/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.sapordermgmtbol.transaction.salesdocument.backend.interf.erp.strategy;

import de.hybris.platform.sap.core.jco.connection.JCoConnection;
import de.hybris.platform.sap.core.jco.exceptions.BackendException;
import de.hybris.platform.sap.sapordermgmtbol.transaction.businessobject.interf.SalesDocument;
import de.hybris.platform.sap.sapordermgmtbol.transaction.businessobject.interf.TransactionConfiguration;
import de.hybris.platform.sap.sapordermgmtbol.transaction.item.businessobject.interf.Item;
import de.hybris.platform.sap.sapordermgmtbol.transaction.salesdocument.backend.interf.erp.BackendState;
import de.hybris.platform.sap.sapordermgmtbol.transaction.salesdocument.backend.util.BackendCallResult;

import java.util.List;
import java.util.Map;


/**
 * Strategy for function module <br>
 * ERP_LORD_SET</br>
 * in the ERP. This class consists only of static method. Each of theses methods wraps the function module. The purpose
 * of this class is to maintain only one implementation of the logic necessary to call this function module via jco
 * using data provided by Java objects. <br>
 *
 * @version 1.0
 */
public interface SetStrategy
{

	/**
	 * Strategy for ERP_LORD_SET, all values found in the provided sales document are written to the backend system. If
	 * you want a field to be ignored set the corresponding value to <code>null</code>.
	 *
	 * @param salesDocR3Lrd
	 *           The SalesDocumentR3Lrd object instance
	 * @param salesDoc
	 *           The sales document
	 * @param itemsERPStatus
	 *           status of the erp items
	 * @param shop
	 *           the shop object
	 * @param cn
	 *           Connection to use
	 * @param itemNewShipTos
	 *           The list of item tech keys, for which a new ship to should be created
	 * @param onlyUpdateHeader
	 *           boolean, which indicates, if only header of the object should be updated
	 * @return containing messages of call and (if present) the code generated by the function module.
	 * @throws BackendException
	 *            This exception is thrown if there is an error in the backend layer
	 */
	public BackendCallResult execute(BackendState salesDocR3Lrd, SalesDocument salesDoc, Map<String, Item> itemsERPStatus,
			TransactionConfiguration shop, JCoConnection cn, List<String> itemNewShipTos, boolean onlyUpdateHeader)
			throws BackendException;

}
