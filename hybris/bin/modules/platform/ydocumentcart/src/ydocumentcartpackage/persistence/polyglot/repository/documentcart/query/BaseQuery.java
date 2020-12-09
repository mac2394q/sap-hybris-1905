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
package ydocumentcartpackage.persistence.polyglot.repository.documentcart.query;

import ydocumentcartpackage.persistence.polyglot.repository.documentcart.Document;
import ydocumentcartpackage.persistence.polyglot.repository.documentcart.Query;
import de.hybris.platform.persistence.polyglot.model.Identity;

import java.util.Optional;


public interface BaseQuery extends Query
{
	default boolean isKnownThereIsNoResult()
	{
		return false;
	}

	default Optional<Document> getKnownDocument()
	{
		return Optional.empty();
	}

	default boolean isDocumentInstantiation()
	{
		return false;
	}

	default Optional<Identity> getRootId()
	{
		return Optional.empty();
	}

	default Optional<EntityCondition> getUniqueRootCondition()
	{
		return Optional.empty();
	}

	default Optional<Identity> getEntityId()
	{
		return Optional.empty();
	}

	default Optional<EntityCondition> getRootCondition()
	{
		return Optional.empty();
	}

	default Optional<EntityCondition> getEntityCondition()
	{
		return Optional.empty();
	}
}
