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

import java.util.Objects;
import java.util.Optional;


public class QueryWithKnownDocument extends QueryByRootId
{
	private final Document document;

	public QueryWithKnownDocument(final Document document)
	{
		super(Objects.requireNonNull(document, "document mustn't be null.").getRootId());
		this.document = document;
	}

	@Override
	public Optional<Document> getKnownDocument()
	{
		return Optional.of(document);
	}
}
