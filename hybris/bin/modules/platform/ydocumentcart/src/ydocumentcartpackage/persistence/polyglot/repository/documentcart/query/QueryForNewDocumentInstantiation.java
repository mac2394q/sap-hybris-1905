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


public class QueryForNewDocumentInstantiation extends QueryByRootId
{

	public QueryForNewDocumentInstantiation(final Identity rootId)
	{
		super(Objects.requireNonNull(rootId, "rootId mustn't be null."));
	}

	@Override
	public boolean isDocumentInstantiation()
	{
		return true;
	}

}
