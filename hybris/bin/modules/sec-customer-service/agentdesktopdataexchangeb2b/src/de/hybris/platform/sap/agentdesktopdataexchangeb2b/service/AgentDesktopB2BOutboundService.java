/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2019 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 */
package de.hybris.platform.sap.agentdesktopdataexchangeb2b.service;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.order.OrderModel;
import de.hybris.platform.core.model.user.AddressModel;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import rx.Observable;


/**
 *
 */
public interface AgentDesktopB2BOutboundService
{
	public Observable<ResponseEntity<Map>> sendB2BUnitData(final B2BUnitModel B2BUnitModelData);

	public Observable<ResponseEntity<Map>> sendB2BCustomerData(final B2BCustomerModel B2BCustomerModelData);

	public Observable<ResponseEntity<Map>> sendB2BUnitDeleteData(final B2BUnitModel B2BUnitModelData);

	public Observable<ResponseEntity<Map>> sendB2BCustomerDeleteData(final B2BCustomerModel B2BCustomerModelData);

	public Observable<ResponseEntity<Map>> sendB2BUnitAddressData(final AddressModel B2BUnitAddressModelData);

	public Observable<ResponseEntity<Map>> sendB2BUnitAddressDeleteData(final AddressModel B2BUnitDeleteAddressModelData);

	public Observable<ResponseEntity<Map>> sendB2bOrderData(final OrderModel ordermOdel, final String requestType,
			final int eventType);

	public Observable<ResponseEntity<Map>> sendB2bOrderDeleteData(final OrderModel ordermOdel);

	public Observable<ResponseEntity<Map>> sendB2bReturnOrderData(final PK returnOrderPk, final String orderType);

}
