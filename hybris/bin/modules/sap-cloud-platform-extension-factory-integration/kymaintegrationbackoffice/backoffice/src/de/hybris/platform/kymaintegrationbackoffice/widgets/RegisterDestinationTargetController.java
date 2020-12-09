/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */

package de.hybris.platform.kymaintegrationbackoffice.widgets;

import de.hybris.platform.apiregistryservices.enums.DestinationChannel;
import de.hybris.platform.apiregistryservices.exceptions.ApiRegistrationException;
import de.hybris.platform.apiregistryservices.model.DestinationTargetModel;
import de.hybris.platform.apiregistryservices.services.DestinationTargetService;
import de.hybris.platform.kymaintegrationbackoffice.constants.KymaintegrationbackofficeConstants;
import de.hybris.platform.kymaintegrationservices.strategies.impl.KymaDestinationTargetRegistrationStrategy;
import de.hybris.platform.servicelayer.exceptions.AmbiguousIdentifierException;
import de.hybris.platform.servicelayer.exceptions.ModelCreationException;
import de.hybris.platform.servicelayer.exceptions.ModelSavingException;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Textbox;

import com.hybris.cockpitng.annotations.SocketEvent;
import com.hybris.cockpitng.annotations.ViewEvent;
import com.hybris.cockpitng.dataaccess.context.impl.DefaultContext;
import com.hybris.cockpitng.dataaccess.facades.object.ObjectCRUDHandler;
import com.hybris.cockpitng.dataaccess.util.CockpitGlobalEventPublisher;
import com.hybris.cockpitng.util.DefaultWidgetController;
import com.hybris.cockpitng.util.notifications.NotificationService;
import com.hybris.cockpitng.util.notifications.event.NotificationEvent;
import com.hybris.cockpitng.widgets.collectionbrowser.CollectionBrowserController;


public class RegisterDestinationTargetController extends DefaultWidgetController
{

	private static final Logger LOG = LoggerFactory.getLogger(RegisterDestinationTargetController.class);
	private static final String TEMPLATE_DESTINATION_TARGET_SOCKET_ID = "templateDestinationTarget";
	private static final String REGISTER_DESTINATION_TARGET = "registerDestinationTarget";
	private static final String SUCCESS = "completed";
	private static final String FAILED = "failed";
	private static final String REGISTER_DESTINATION_TARGET_FAILED = "destinationTarget.register.failed";
	private static final String DESTINATION_TARGET_REGISTER_SUCCESS = "destinationTarget.register.success";
	private static final String DESTINATION_TARGET_REGISTER_WIDGET_EMPTY_FIELD = "destinationTarget.register.widget.empty.field";

	@Wire
	private Textbox tokenUrl;

	@Wire
	private Textbox newDestinationTargetId;

	@Resource
	private transient DestinationTargetService destinationTargetService;

	@Resource
	private transient NotificationService notificationService;

	@Resource
	private transient CockpitGlobalEventPublisher eventPublisher;

	@SocketEvent(socketId = "templateDestinationTarget")
	public void initializeWithContext(final DestinationTargetModel destinationTarget)
	{
		this.setValue(TEMPLATE_DESTINATION_TARGET_SOCKET_ID, destinationTarget);
	}

	@ViewEvent(componentID = "registerDestinationTarget", eventName = Events.ON_CLICK)
	public void registerDestinationTarget()
	{
		if (StringUtils.isEmpty(tokenUrl.getValue()) || StringUtils.isEmpty(newDestinationTargetId.getValue()))
		{
			getNotificationService().notifyUser(getWidgetInstanceManager(), KymaintegrationbackofficeConstants.NOTIFICATION_TYPE,
					NotificationEvent.Level.WARNING, getLabel(DESTINATION_TARGET_REGISTER_WIDGET_EMPTY_FIELD));
			sendOutput(REGISTER_DESTINATION_TARGET, FAILED);

			return;
		}

		final DestinationTargetModel templateDestinationTarget = this.getValue(TEMPLATE_DESTINATION_TARGET_SOCKET_ID,
				DestinationTargetModel.class);

		DestinationTargetModel newDestinationTarget = null;
		try
		{
			newDestinationTarget = getDestinationTargetService().createDestinationTarget(templateDestinationTarget,
					newDestinationTargetId.getValue(), DestinationChannel.KYMA);

			final Map<String, String> params = new HashMap<>();
			params.put(KymaDestinationTargetRegistrationStrategy.TOKEN_URL, tokenUrl.getValue());

			getDestinationTargetService().registerDestinationTarget(newDestinationTarget, params);
			getDestinationTargetService().createDestinations(templateDestinationTarget, newDestinationTarget, null);
			getDestinationTargetService().createEventConfigurations(templateDestinationTarget, newDestinationTarget, null);

		}
		catch (final ApiRegistrationException | AmbiguousIdentifierException | ModelCreationException | IllegalArgumentException
				| ModelSavingException e)
		{
			final String errorMessage = String.format(getLabel(REGISTER_DESTINATION_TARGET_FAILED),
					newDestinationTargetId.getValue()) + ' ' + e.getMessage();

			LOG.error(errorMessage, e);

			deleteDestinationTarget(newDestinationTarget);

			getNotificationService().notifyUser(getWidgetInstanceManager(), KymaintegrationbackofficeConstants.NOTIFICATION_TYPE,
					NotificationEvent.Level.FAILURE, errorMessage);
			sendOutput(REGISTER_DESTINATION_TARGET, FAILED);

			return;
		}

		final String successMessage = getLabel(DESTINATION_TARGET_REGISTER_SUCCESS, new String[]
		{ newDestinationTargetId.getValue() });

		LOG.info(successMessage);

		getNotificationService().notifyUser(getWidgetInstanceManager(), KymaintegrationbackofficeConstants.NOTIFICATION_TYPE,
				NotificationEvent.Level.SUCCESS, successMessage);

		final DefaultContext context = new DefaultContext();
		context.addAttribute(CollectionBrowserController.SHOULD_RELOAD_AFTER_UPDATE, Boolean.TRUE);
		eventPublisher.publish(ObjectCRUDHandler.OBJECTS_UPDATED_EVENT, Collections.singleton(newDestinationTarget), context);

		sendOutput(REGISTER_DESTINATION_TARGET, SUCCESS);
	}

	protected void deleteDestinationTarget(final DestinationTargetModel newDestinationTarget)
	{
		if (newDestinationTarget != null)
		{
			try
			{
				getDestinationTargetService().deleteDestinationTarget(newDestinationTarget);
			}
			catch (final ApiRegistrationException e)
			{
				LOG.error("Deletion of the destination target[{}] is failed", newDestinationTargetId.getValue());
				LOG.error(e.getMessage(), e);
			}
		}
	}

	protected DestinationTargetService getDestinationTargetService()
	{
		return destinationTargetService;
	}

	protected NotificationService getNotificationService()
	{
		return notificationService;
	}
}
