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
package de.hybris.platform.sap.agentdesktopdataexchange.constants;

/**
 * Global class for all Agentdesktopdataexchange constants. You can add global constants for your extension into this
 * class.
 */
public final class AgentdesktopdataexchangeConstants extends GeneratedAgentdesktopdataexchangeConstants
{
	public static final String EXTENSIONNAME = "agentdesktopdataexchange";

	private AgentdesktopdataexchangeConstants()
	{
		//empty to avoid instantiating this constant class
	}

	// implement here constants used by this extension

	public static final String PLATFORM_LOGO_CODE = "agentdesktopdataexchangePlatformLogo";

	public static final String EMPTY_STRING = "";
	public static final String COMMA = ",";
	public static final int CUSTOMER_MODEL_TYPECODE = 4;
	public static final int ADDRESS_MODEL_TYPECODE = 23;
	public static final int ORDER_MODEL_TYPECODE = 45;

	/* Constants required for Order replication */
	public static final String BD_TYPE = "sap.agentDesktopDataExchnage.bdtype";
	public static final String DATE_FORMATTER_TYPE = "sap.agentDesktopDataExchnage.dateformat.type";
	public static final String ORDER_ID = "id";
	public static final String CUSTOMER_ID_ATTRIBUTE = "sap.agentDesktopDataExchnage.customer.attribute.id";

	public static final String RETURN_CREATED = "return-created";
	public static final String RETURN_UPDATED = "return-updated";
	public static final String RETURN_DELETED = "return-deleted";

	public static final String ORDER_CREATED = "order-created";
	public static final String ORDER_UPDATED = "order-updated";
	public static final String ORDER_DELETED = "order-deleted";

	public static final String INTEGERATION_ENABLED = "sap.agentDesktopDataExchange.extension.enabled";

}
