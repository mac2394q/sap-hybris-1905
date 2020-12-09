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
package ydocumentcartpackage.persistence.polyglot.repository.documentcart.serializer;

import ydocumentcartpackage.persistence.polyglot.repository.documentcart.Document;


public interface Serializer
{
	String serialize(Document document);

	String serializeWithOverriddenVersion(Document document, long version);

	Document deserialize(String string);
}
