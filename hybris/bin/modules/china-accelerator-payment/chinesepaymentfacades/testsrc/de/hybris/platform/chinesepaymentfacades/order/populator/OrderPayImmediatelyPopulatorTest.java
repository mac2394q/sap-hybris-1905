/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.chinesepaymentfacades.order.populator;

import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.commercefacades.order.data.OrderData;
import de.hybris.platform.core.enums.OrderStatus;
import de.hybris.platform.core.enums.PaymentStatus;
import de.hybris.platform.core.model.order.OrderModel;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


@UnitTest
public class OrderPayImmediatelyPopulatorTest
{

	@Mock
	private OrderModel source;
	@Mock
	private PaymentStatus paymentStatus;
	@Mock
	private OrderStatus orderStatus;

	private OrderData target;
	private OrderPayImmediatelyPopulator populator;

	@Before
	public void prepare()
	{
		MockitoAnnotations.initMocks(this);

		target = new OrderData();
		populator = new OrderPayImmediatelyPopulator();

		given(source.getPaymentStatus()).willReturn(paymentStatus);
		given(source.getStatus()).willReturn(orderStatus);
	}

	@Test
	public void testPopulate()
	{
		populator.populate(source, target);

		assertEquals(paymentStatus, target.getPaymentStatus());
		assertEquals(orderStatus, target.getStatus());
	}
}
