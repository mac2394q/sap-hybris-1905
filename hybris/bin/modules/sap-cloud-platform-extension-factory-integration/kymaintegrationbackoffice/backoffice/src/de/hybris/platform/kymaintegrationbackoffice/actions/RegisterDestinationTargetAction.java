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

package de.hybris.platform.kymaintegrationbackoffice.actions;

import de.hybris.platform.apiregistryservices.model.DestinationTargetModel;

import com.hybris.cockpitng.actions.ActionContext;
import com.hybris.cockpitng.actions.ActionResult;
import com.hybris.cockpitng.actions.CockpitAction;
import com.hybris.cockpitng.engine.impl.AbstractComponentWidgetAdapterAware;
import org.apache.commons.lang.BooleanUtils;


public class RegisterDestinationTargetAction extends AbstractComponentWidgetAdapterAware
		implements CockpitAction<DestinationTargetModel, String>
{

	private static final String TEMPLATE_DESTINATION_TARGET_SOCKET_ID = "templateDestinationTarget";

	@Override
	public ActionResult<String> perform(final ActionContext<DestinationTargetModel> actionContext)
	{
		sendOutput(TEMPLATE_DESTINATION_TARGET_SOCKET_ID, actionContext.getData());
		return new ActionResult<>(ActionResult.SUCCESS);
	}


	@Override
	public boolean canPerform(final ActionContext<DestinationTargetModel> ctx)
	{
		return ctx.getData() != null && BooleanUtils.isTrue(ctx.getData().getTemplate());
	}
}
