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
import de.hybris.platform.persistence.polyglot.PolyglotPersistence.CoreAttributes;

import java.util.Objects;
import java.util.Optional;


public class QueryByEntityId implements BaseQuery
{
	private final Identity id;

	public QueryByEntityId(final Identity id)
	{
		this.id = Objects.requireNonNull(id, "id mustn't be null.");
	}

	@Override
	public Optional<Identity> getEntityId()
	{
		return Optional.of(id);
	}

	@Override
	public Optional<EntityCondition> getEntityCondition()
	{
		return Optional.of(EntityCondition.from(CoreAttributes.pk(), id));
	}

}
