/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.subscriptionservices.daos.impl;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.commerceservices.search.pagedata.PageableData;
import de.hybris.platform.core.enums.OrderStatus;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.store.BaseStoreModel;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;


/**
 * JUnit test suite for {@link DefaultSubscriptionCustomerAccountDao}
 */
@UnitTest
public class DefaultSubscriptionCustomerAccountDaoTest
{
	@Rule
	public ExpectedException thrown = ExpectedException.none();

	private DefaultSubscriptionCustomerAccountDao customerAccountDao;

	@Before
	public void setUp() throws Exception
	{
		customerAccountDao = new DefaultSubscriptionCustomerAccountDao();
	}

	@Test
	public void testFindOrdersByCustomerAndStoreWhenNoCustomer()
	{
		final OrderStatus[] orderStatus = {};

		thrown.expect(IllegalArgumentException.class);
		thrown.expectMessage("Customer must not be null");

		customerAccountDao.findOrdersByCustomerAndStore(null, new BaseStoreModel(), orderStatus);
	}

	@Test
	public void testFindOrdersByCustomerAndStoreWhenNoStore()
	{
		final OrderStatus[] orderStatus = {};

		thrown.expect(IllegalArgumentException.class);
		thrown.expectMessage("Store must not be null");

		customerAccountDao.findOrdersByCustomerAndStore(new CustomerModel(), null, orderStatus);
	}

	@Test
	public void testFindOrdersByCustomerAndStore2WhenNoCustomer()
	{
		final OrderStatus[] orderStatus = {};

		thrown.expect(IllegalArgumentException.class);
		thrown.expectMessage("Customer must not be null");

		customerAccountDao.findOrdersByCustomerAndStore(null, new BaseStoreModel(), orderStatus, new PageableData());
	}

	@Test
	public void testFindOrdersByCustomerAndStore2WhenNoStore()
	{
		final OrderStatus[] orderStatus = {};

		thrown.expect(IllegalArgumentException.class);
		thrown.expectMessage("Store must not be null");

		customerAccountDao.findOrdersByCustomerAndStore(new CustomerModel(), null, orderStatus, new PageableData());
	}

}
