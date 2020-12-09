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

import de.hybris.platform.persistence.polyglot.model.Identity;

import java.util.Objects;
import java.util.Optional;


public class QueryByRootId extends QueryByEntityId
{
	public QueryByRootId(final Identity rootId)
	{
		super(Objects.requireNonNull(rootId, "rootId mustn't be null."));
	}

	@Override
	public Optional<Identity> getRootId()
	{
		return getEntityId();
	}

	@Override
	public Optional<EntityCondition> getUniqueRootCondition()
	{
		return getEntityCondition();
	}


	@Override
	public Optional<EntityCondition> getRootCondition()
	{
		return getEntityCondition();
	}

}
