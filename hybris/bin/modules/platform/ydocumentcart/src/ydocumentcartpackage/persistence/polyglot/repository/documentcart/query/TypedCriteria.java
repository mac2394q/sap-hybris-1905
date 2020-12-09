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
import de.hybris.platform.persistence.polyglot.model.SingleAttributeKey;

import java.util.Map;
import java.util.Optional;
import java.util.Set;


public interface TypedCriteria
{
	boolean containsAnySupportedType();

	Optional<Identity> getRootId();

	Map<SingleAttributeKey, Object> getRootUniqueParams();

	Optional<Identity> getEntityId();

	Set<Identity> getSupportedTypes();

	boolean onlyRootRequested();
}
