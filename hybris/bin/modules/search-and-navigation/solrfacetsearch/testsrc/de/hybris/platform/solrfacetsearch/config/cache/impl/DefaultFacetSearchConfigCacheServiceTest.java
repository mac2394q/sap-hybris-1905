/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.solrfacetsearch.config.cache.impl;

import de.hybris.bootstrap.annotations.IntegrationTest;
import de.hybris.platform.regioncache.CacheStatistics;
import de.hybris.platform.regioncache.CacheValueLoadException;
import de.hybris.platform.regioncache.region.CacheRegion;
import de.hybris.platform.servicelayer.i18n.CommonI18NService;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.solrfacetsearch.config.cache.FacetSearchConfigCacheService;
import de.hybris.platform.solrfacetsearch.daos.SolrFacetSearchConfigDao;
import de.hybris.platform.solrfacetsearch.integration.AbstractIntegrationTest;
import de.hybris.platform.solrfacetsearch.model.config.SolrFacetSearchConfigModel;

import javax.annotation.Resource;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;


@IntegrationTest
public class DefaultFacetSearchConfigCacheServiceTest extends AbstractIntegrationTest
{
	@Rule
	public ExpectedException expectedException = ExpectedException.none();

	@Resource
	private CacheRegion facetSearchConfigCacheRegion;

	@Resource
	private SolrFacetSearchConfigDao solrFacetSearchConfigDao;

	@Resource
	private ModelService modelService;

	@Resource(name = "defaultFacetSearchConfigCacheService")
	private FacetSearchConfigCacheService facetSearchConfigCacheService;

	@Resource
	private CommonI18NService commonI18NService;

	protected static final String FACET_SEARCH_CONFIG_NAME = "testFacetSearchConfig";
	protected static final String LANG_EN = "en";
	protected static final String LANG_DE = "de";

	@Test
	public void testPutOrGetFromCache() throws Exception
	{
		// given
		importConfig("/test/solrConfigBase.csv");

		// when
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());

		// then
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(1, statistics.getMissCount());
		Assert.assertEquals(2, statistics.getHitCount());
		Assert.assertEquals(1, statistics.getInstanceCount());
	}

	@Test
	public void testPutOrGetNotExisting() throws Exception
	{
		// expect
		expectedException.expect(CacheValueLoadException.class);

		// when
		facetSearchConfigCacheService.putOrGetFromCache(FACET_SEARCH_CONFIG_NAME);
	}

	@Test
	public void testPutOrGetForDifferentLaguages() throws Exception
	{
		// given
		importConfig("/test/solrConfigBase.csv");
		commonI18NService.setCurrentLanguage(commonI18NService.getLanguage(LANG_EN));

		// when
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		commonI18NService.setCurrentLanguage(commonI18NService.getLanguage(LANG_DE));
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());

		// then
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(2, statistics.getMissCount());
		Assert.assertEquals(3, statistics.getHitCount());
		Assert.assertEquals(2, statistics.getInstanceCount());
	}

	@Test
	public void testInvalidate() throws Exception
	{
		// given
		importConfig("/test/solrConfigBase.csv");

		// when
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.invalidate(getFacetSearchConfigName());

		// then
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(1, statistics.getMissCount());
		Assert.assertEquals(1, statistics.getHitCount());
		Assert.assertEquals(1, statistics.getInvalidations());
		Assert.assertEquals(0, statistics.getInstanceCount());
	}

	@Test
	public void testInvalidateForDiffrentLanguages() throws Exception
	{
		// given
		importConfig("/test/solrConfigBase.csv");
		commonI18NService.setCurrentLanguage(commonI18NService.getLanguage(LANG_EN));

		// when
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		commonI18NService.setCurrentLanguage(commonI18NService.getLanguage(LANG_DE));
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.invalidate(getFacetSearchConfigName());

		// then
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(2, statistics.getMissCount());
		Assert.assertEquals(2, statistics.getHitCount());
		Assert.assertEquals(2, statistics.getInvalidations());
		Assert.assertEquals(0, statistics.getInstanceCount());
	}

	@Test
	public void testInvalidateNotCached() throws Exception
	{
		// given
		importConfig("/test/solrConfigBase.csv");

		// when
		facetSearchConfigCacheService.invalidate(getFacetSearchConfigName());

		// then
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(0, statistics.getInvalidations());
	}

	@Test
	public void testInvalidateNotExisting() throws Exception
	{
		// given
		facetSearchConfigCacheRegion.clearCache();

		// when
		facetSearchConfigCacheService.invalidate(FACET_SEARCH_CONFIG_NAME);

		// then
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(0, statistics.getInvalidations());
	}

	@Test
	public void testInvalidationListener() throws Exception
	{
		// given
		importConfig("/test/solrConfigBase.csv");

		// when
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());
		final SolrFacetSearchConfigModel configModel = solrFacetSearchConfigDao
				.findFacetSearchConfigByName(getFacetSearchConfigName());
		configModel.setDescription("new description");
		modelService.save(configModel);
		facetSearchConfigCacheService.putOrGetFromCache(getFacetSearchConfigName());

		// then
		//currently changing model cause that clearCache() method is called so also statistics will be cleared
		final CacheStatistics statistics = facetSearchConfigCacheRegion.getCacheRegionStatistics();
		Assert.assertEquals(1, statistics.getMissCount());
		Assert.assertEquals(0, statistics.getHitCount());
		Assert.assertEquals(0, statistics.getInvalidations());
	}
}
