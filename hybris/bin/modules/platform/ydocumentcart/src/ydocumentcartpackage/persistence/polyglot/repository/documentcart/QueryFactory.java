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
package ydocumentcartpackage.persistence.polyglot.repository.documentcart;

import de.hybris.platform.persistence.polyglot.search.criteria.Criteria;
import de.hybris.platform.persistence.polyglot.model.Identity;


public interface QueryFactory
{

	Query getQuery(Identity id);

	Query getQuery(Entity entity);

	Query getQuery(EntityCreation creation);

	Query getQuery(EntityModification modification);

	Query getQuery(Criteria criteria);

}
