/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.solrfacetsearch.search.impl;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.catalog.model.CatalogVersionModel;
import de.hybris.platform.servicelayer.dto.converter.Converter;
import de.hybris.platform.solrfacetsearch.config.FacetSearchConfig;
import de.hybris.platform.solrfacetsearch.config.IndexedType;
import de.hybris.platform.solrfacetsearch.config.SolrConfig;
import de.hybris.platform.solrfacetsearch.model.SolrIndexModel;
import de.hybris.platform.solrfacetsearch.search.SearchQuery;
import de.hybris.platform.solrfacetsearch.search.SearchResult;
import de.hybris.platform.solrfacetsearch.search.context.FacetSearchContext;
import de.hybris.platform.solrfacetsearch.search.context.FacetSearchContextFactory;
import de.hybris.platform.solrfacetsearch.solr.SolrIndexService;
import de.hybris.platform.solrfacetsearch.solr.SolrSearchProvider;
import de.hybris.platform.solrfacetsearch.solr.SolrSearchProviderFactory;
import de.hybris.platform.solrfacetsearch.solr.impl.DefaultIndex;

import java.util.Collections;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


@UnitTest
public class DefaultFacetSearchStrategyTest
{
	@Rule
	public final ExpectedException expectedException = ExpectedException.none();

	private DefaultFacetSearchStrategy defaultFacetSearchStrategy;

	private FacetSearchConfig facetSearchConfig;
	private IndexedType indexedType;

	@Mock
	private SolrSearchProviderFactory solrSearchProviderFactory;

	@Mock
	private SolrSearchProvider solrSearchProvider;

	@Mock
	private SolrIndexService solrIndexService;

	@Mock
	private FacetSearchContextFactory<FacetSearchContext> facetSearchContextFactory;

	@Mock
	private Converter<SearchQueryConverterData, SolrQuery> facetSearchQueryConverter;

	@Mock
	private Converter<SearchResultConverterData, SearchResult> facetSearchResultConverter;

	@Mock
	private CatalogVersionModel catalogVersion;

	@Mock
	private FacetSearchContext facetSearchContext;

	@Mock
	private SolrClient solrClient;

	@Before
	public void setUp() throws Exception
	{
		MockitoAnnotations.initMocks(this);

		facetSearchConfig = new FacetSearchConfig();
		facetSearchConfig.setSolrConfig(new SolrConfig());
		indexedType = new IndexedType();
		final DefaultIndex index = new DefaultIndex();
		index.setName("test");
		final SolrIndexModel indexModel = new SolrIndexModel();
		indexModel.setQualifier(StringUtils.EMPTY);

		defaultFacetSearchStrategy = new DefaultFacetSearchStrategy();
		defaultFacetSearchStrategy.setSolrSearchProviderFactory(solrSearchProviderFactory);
		defaultFacetSearchStrategy.setSolrIndexService(solrIndexService);
		defaultFacetSearchStrategy.setFacetSearchQueryConverter(facetSearchQueryConverter);
		defaultFacetSearchStrategy.setFacetSearchResultConverter(facetSearchResultConverter);
		defaultFacetSearchStrategy.setFacetSearchContextFactory(facetSearchContextFactory);

		when(solrSearchProviderFactory.getSearchProvider(facetSearchConfig, indexedType)).thenReturn(solrSearchProvider);
		when(solrSearchProvider.getClient(index)).thenReturn(solrClient);
		when(solrSearchProvider.resolveIndex(eq(facetSearchConfig), eq(indexedType), anyString())).thenReturn(index);
		when(solrIndexService.getActiveIndex(facetSearchConfig.getName(), indexedType.getIdentifier())).thenReturn(indexModel);
	}

	@Test
	public void testSearchQueryNull() throws Exception
	{
		// expect
		expectedException.expect(IllegalArgumentException.class);

		// when
		defaultFacetSearchStrategy.search(null, Collections.<String, String> emptyMap());
	}

	@Test
	public void testSearch() throws Exception
	{
		// given
		final SearchQuery searchQuery = new SearchQuery(facetSearchConfig, indexedType);
		searchQuery.setLanguage("en");
		searchQuery.setCurrency("EUR");
		searchQuery.setCatalogVersions(Collections.singletonList(catalogVersion));

		final SolrQuery solrQuery = new SolrQuery();
		final QueryResponse queryResponse = new QueryResponse();

		final SearchResult expectedSearchResult = new SolrSearchResult();

		final SearchQueryConverterData searchQueryConverterData = new SearchQueryConverterData();
		searchQueryConverterData.setFacetSearchContext(facetSearchContext);
		searchQueryConverterData.setSearchQuery(searchQuery);

		final SearchResultConverterData searchResultConverterData = new SearchResultConverterData();
		searchResultConverterData.setFacetSearchContext(facetSearchContext);
		searchResultConverterData.setQueryResponse(queryResponse);

		when(facetSearchContextFactory.getContext()).thenReturn(facetSearchContext);
		when(facetSearchContextFactory.createContext(facetSearchConfig, indexedType, searchQuery)).thenReturn(facetSearchContext);
		when(facetSearchContext.getSearchHints()).thenReturn(Collections.<String, String> emptyMap());

		when(facetSearchQueryConverter.convert(searchQueryConverterData)).thenReturn(solrQuery);
		when(solrClient.query(anyString(), eq(solrQuery), any())).thenReturn(queryResponse);
		when(facetSearchResultConverter.convert(searchResultConverterData)).thenReturn(expectedSearchResult);

		// when
		final SearchResult searchResult = defaultFacetSearchStrategy.search(searchQuery, Collections.<String, String> emptyMap());

		// then
		Assert.assertEquals(expectedSearchResult, searchResult);
	}
}
