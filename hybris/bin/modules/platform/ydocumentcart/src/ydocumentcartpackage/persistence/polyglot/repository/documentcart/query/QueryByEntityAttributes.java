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

import java.util.Objects;
import java.util.Optional;


public class QueryByEntityAttributes implements BaseQuery
{
	private final EntityCondition conditions;

	public QueryByEntityAttributes(final EntityCondition conditions)
	{
		this.conditions = Objects.requireNonNull(conditions);
	}

	@Override
	public Optional<EntityCondition> getEntityCondition()
	{
		return Optional.of(conditions);
	}


}
