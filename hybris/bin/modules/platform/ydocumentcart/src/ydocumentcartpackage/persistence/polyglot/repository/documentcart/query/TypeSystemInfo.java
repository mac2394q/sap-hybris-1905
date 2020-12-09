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

import de.hybris.platform.persistence.polyglot.search.criteria.Criteria;
import de.hybris.platform.persistence.polyglot.model.Identity;
import de.hybris.platform.persistence.polyglot.model.Reference;
import de.hybris.platform.persistence.polyglot.model.SingleAttributeKey;

import java.util.Optional;


public interface TypeSystemInfo
{
	static Optional<Identity> toIdentity(final Object obj)
	{
		Identity id;
		if (obj instanceof Identity)
		{
			id = (Identity) obj;
		}
		else if (obj instanceof Reference)
		{
			id = ((Reference) obj).getIdentity();
		}
		else
		{
			return Optional.empty();
		}
		return id.isKnown() ? Optional.of(id) : Optional.empty();
	}

	boolean isDocumentRootId(Identity id);

	SingleAttributeKey getParentReferenceAttribute(Reference itemTypeReference);

	TypedCriteria getTypedCriteria(Criteria criteria);

}
