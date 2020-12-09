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

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;


public class QueryResult
{
	private final List<Document> documents;

	private QueryResult(final List<Document> documents)
	{
		this.documents = Objects.requireNonNull(documents, "documents mustn't be null.");
	}

	public static QueryResult from(final List<Document> documents)
	{
		return new QueryResult(documents);
	}

	public static QueryResult from(final Document document)
	{
		return from(List.of(document));
	}

	public static QueryResult fromNullable(final Document document)
	{
		if (document == null)
		{
			return empty();
		}
		return from(document);
	}

	public static QueryResult empty()
	{
		return from(List.of());
	}

	public Optional<Document> single()
	{
		if (documents.isEmpty())
		{
			return Optional.empty();
		}
		if (documents.size() == 1)
		{
			return Optional.of(documents.get(0));
		}

		throw new IllegalStateException("Result contains more than one document but at most one is expected.");
	}

	public Stream<Document> stream()
	{
		return documents.stream();
	}

	public QueryResult requireAtMostOneDocument()
	{
		single();
		return this;
	}
}
