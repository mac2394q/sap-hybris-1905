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
package de.hybris.platform.sap.agentdesktopdataexchange.service;

import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import rx.Observable;


/**
 * Replicates customer data to CEC via CPI
 */
public interface AgentDesktopDefaultOutboundService
{

	/**
	 * Send customer data to CEC via CPI.
	 */
	public Observable<ResponseEntity<Map>> sendCustomerData(final CustomerModel customerModel, final String baseStoreUid,
			final String sessionLanguage, final AddressModel addressModel, final String defaultAddressId);

	public Observable<ResponseEntity<Map>> sendCustomerDeleteData(final CustomerModel customerModel);

	public Observable<ResponseEntity<Map>> sendAddessData(final AddressModel addressModel);

	public Observable<ResponseEntity<Map>> sendAddressDeleteData(final AddressModel addressModel);

	public Observable<ResponseEntity<Map>> sendOrderData(final OrderModel ordermOdel);

	public Observable<ResponseEntity<Map>> sendReturnOrderData(final OrderModel ordermOdel);


}
