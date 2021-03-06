/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.customercouponservices.cronjob;

import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.customercouponservices.constants.CustomercouponservicesConstants;
import de.hybris.platform.customercouponservices.model.CouponNotificationModel;
import de.hybris.platform.notificationservices.service.NotificationService;

import java.util.Map;


/**
 * Deals with the task that sends coupon notification to customers
 */
public class CouponNotificationTask implements Runnable
{
	private final NotificationService notificationService;
	private final Map<String, ? extends ItemModel> data;
	private final CouponNotificationModel couponNotification;

	public CouponNotificationTask(final NotificationService notificationService, final Map<String, ? extends ItemModel> data)
	{
		this.notificationService = notificationService;
		this.data = data;
		this.couponNotification = (CouponNotificationModel) data.get(CustomercouponservicesConstants.COUPON_NOTIFICATION);
	}

	@Override
	public void run()
	{
		final ItemModel notifycationType = data.get(CustomercouponservicesConstants.NOTIFICATION_TYPE);
		notificationService.notifyCustomer(notifycationType.getProperty(CustomercouponservicesConstants.NOTIFICATION_TYPE),
				couponNotification.getCustomer(), data);
	}

}
