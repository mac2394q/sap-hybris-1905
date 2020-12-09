/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.runtime.cps.cache.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.apiregistryservices.strategies.ConsumedDestinationLocatorStrategy;
import de.hybris.platform.basecommerce.model.site.BaseSiteModel;
import de.hybris.platform.regioncache.key.CacheUnitValueType;
import de.hybris.platform.sap.productconfig.runtime.interf.cache.ProductConfigurationUserIdProvider;
import de.hybris.platform.sap.productconfig.runtime.interf.cache.impl.ProductConfigurationCacheKey;
import de.hybris.platform.site.BaseSiteService;
import de.hybris.platform.site.impl.DefaultBaseSiteConsumedDestinationLocatorStrategy;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.tuple.Pair;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;


@SuppressWarnings("javadoc")
@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class CPSCacheKeyGeneratorImplTest
{
	private static final String USER_ID = "user id";
	private static final String SERVICE_CLIENT_ID = "Service client Id";
	private static final String CONFIG_ID = "config id";
	private static final String PRODUCT = "product";
	private static final String BASE_SITE_UID = "base site uid";
	private static final String SERVICE_ID = "service id";
	private static final String CPS_SERVICE_TENANT = "cps service tenant";
	private static final String CPS_SERVICE_URL = "cps service url";
	private static final String TENANT_ID = "tenant id";
	private static final String LANGUAGE = "language";
	private static final String KB_ID = "kb id";
	@InjectMocks
	private CPSCacheKeyGeneratorImpl classUnderTest;

	@Mock
	private BaseSiteService baseSiteService;
	@Mock
	private BaseSiteModel baseSiteModel;
	@Mock
	private ProductConfigurationUserIdProvider userIdProvider;
	@Mock
	private ConsumedDestinationLocatorStrategy consumedDestinationLocatorStrategy;
	@Mock
	private ConsumedDestinationModel consumedDestination;
	private final Map<String, String> additionalProps = new HashMap<>();


	@Before
	public void setup()
	{
		additionalProps.put(DefaultBaseSiteConsumedDestinationLocatorStrategy.BASE_SITE, CPS_SERVICE_TENANT);
		Mockito.when(consumedDestinationLocatorStrategy.lookup(SERVICE_ID)).thenReturn(consumedDestination);
		Mockito.when(consumedDestination.getUrl()).thenReturn(CPS_SERVICE_URL);
		Mockito.when(consumedDestination.getAdditionalProperties()).thenReturn(additionalProps);
		Mockito.when(baseSiteService.getCurrentBaseSite()).thenReturn(baseSiteModel);
		Mockito.when(baseSiteModel.getUid()).thenReturn(BASE_SITE_UID);
		Mockito.when(userIdProvider.getCurrentUserId()).thenReturn(USER_ID);
	}

	@Test
	public void testConsumedDestinationLocatorStrategy()
	{
		assertEquals(consumedDestinationLocatorStrategy, classUnderTest.getConsumedDestinationLocatorStrategy());
	}

	@Test
	public void testCreateMasterDataCacheKey()
	{

		Mockito.when(consumedDestinationLocatorStrategy.lookup(CPSCacheKeyGeneratorImpl.MASTER_DATA_SERVICE_ID))
				.thenReturn(consumedDestination);
		final ProductConfigurationCacheKey result = classUnderTest.createMasterDataCacheKey(KB_ID, LANGUAGE);
		assertNotNull(result);
		assertEquals(KB_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_KB_ID));
		assertEquals(LANGUAGE, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_LANGUAGE));
		assertEquals(classUnderTest.getTenantId(), result.getTenantId());
		assertEquals(CPS_SERVICE_URL, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_URL));
		assertEquals(CPS_SERVICE_TENANT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_TENANT));
		assertEquals(CPSCacheKeyGeneratorImpl.TYPECODE_MASTER_DATA, result.getTypeCode());
	}

	@Test
	public void testGetCPSServiceParameter()
	{
		final Pair<String, String> result = classUnderTest.getCPSServiceParameter(SERVICE_ID);
		assertEquals(CPS_SERVICE_URL, result.getLeft());
		assertEquals(CPS_SERVICE_TENANT, result.getRight());
	}

	@Test
	public void testCreateKnowledgeBaseHeadersCacheKey()
	{
		Mockito.when(consumedDestinationLocatorStrategy.lookup(CPSCacheKeyGeneratorImpl.KB_DETERMINATION_SERVICE_ID))
				.thenReturn(consumedDestination);
		final ProductConfigurationCacheKey result = classUnderTest.createKnowledgeBaseHeadersCacheKey(PRODUCT);
		assertNotNull(result);
		assertEquals(PRODUCT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_PRODUCT));
		assertEquals(classUnderTest.getTenantId(), result.getTenantId());
		assertEquals(CPS_SERVICE_URL, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_URL));
		assertEquals(CPS_SERVICE_TENANT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_TENANT));
		assertEquals(CPSCacheKeyGeneratorImpl.TYPECODE_KNOWLEDGEBASES, result.getTypeCode());
	}

	@Test
	public void testCreateCookieCacheKey()
	{

		Mockito.when(consumedDestinationLocatorStrategy.lookup(CPSCacheKeyGeneratorImpl.CONFIGRATION_SERVICE_ID))
				.thenReturn(consumedDestination);

		final ProductConfigurationCacheKey result = classUnderTest.createCookieCacheKey(CONFIG_ID);
		assertNotNull(result);
		assertEquals(CONFIG_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CONFIG_ID));
		assertEquals(classUnderTest.getTenantId(), result.getTenantId());
		assertEquals(CPS_SERVICE_URL, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_URL));
		assertEquals(CPS_SERVICE_TENANT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_TENANT));
		assertEquals(CacheUnitValueType.SERIALIZABLE, result.getCacheValueType());
		assertEquals(CPSCacheKeyGeneratorImpl.TYPECODE_COOKIE, result.getTypeCode());
	}

	@Test
	public void testCreateValuePricesCacheKey()
	{
		Mockito.when(consumedDestinationLocatorStrategy.lookup(CPSCacheKeyGeneratorImpl.PRICING_SERVICE_ID))
				.thenReturn(consumedDestination);
		final ProductConfigurationCacheKey result = classUnderTest.createValuePricesCacheKey(KB_ID, PRODUCT);
		assertNotNull(result);
		assertEquals(KB_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_KB_ID));
		assertEquals(PRODUCT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_PRODUCT));
		assertEquals(USER_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_USER_ID));
		assertEquals(classUnderTest.getTenantId(), result.getTenantId());
		assertEquals(CPS_SERVICE_URL, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_URL));
		assertEquals(CPS_SERVICE_TENANT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_TENANT));
		assertEquals(CPSCacheKeyGeneratorImpl.TYPECODE_VALUE_PRICES, result.getTypeCode());
	}

	@Test
	public void testCreateValuePricesCacheKeyWithNullPricingProduct()
	{

		Mockito.when(consumedDestinationLocatorStrategy.lookup(CPSCacheKeyGeneratorImpl.PRICING_SERVICE_ID))
				.thenReturn(consumedDestination);
		final ProductConfigurationCacheKey result = classUnderTest.createValuePricesCacheKey(KB_ID, null);
		assertNotNull(result);
		assertEquals(KB_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_KB_ID));
		assertNull(result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_PRODUCT));
		assertEquals(USER_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_USER_ID));
		assertEquals(classUnderTest.getTenantId(), result.getTenantId());
		assertEquals(CPS_SERVICE_URL, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_URL));
		assertEquals(CPS_SERVICE_TENANT, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_TENANT));
		assertEquals(CPSCacheKeyGeneratorImpl.TYPECODE_VALUE_PRICES, result.getTypeCode());
	}

	@Test
	public void testRetrieveBasicCPSParameters()
	{

		Mockito.when(consumedDestinationLocatorStrategy.lookup(SERVICE_CLIENT_ID)).thenReturn(consumedDestination);
		final Map<String, String> result = classUnderTest.retrieveBasicCPSParameters(SERVICE_CLIENT_ID);
		assertNotNull(result);
		assertEquals(2, result.size());
		assertEquals(CPS_SERVICE_URL, result.get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_URL));
		assertEquals(CPS_SERVICE_TENANT, result.get(CPSCacheKeyGeneratorImpl.KEY_CPS_SERVICE_TENANT));
	}

	@Test
	public void testCreateConfigurationCacheKey()
	{
		Mockito.when(consumedDestinationLocatorStrategy.lookup(CPSCacheKeyGeneratorImpl.CONFIGRATION_SERVICE_ID))
				.thenReturn(consumedDestination);
		final ProductConfigurationCacheKey result = classUnderTest.createConfigurationCacheKey(CONFIG_ID);
		assertNotNull(result);
		assertEquals(CONFIG_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_CONFIG_ID));
		assertEquals(USER_ID, result.getKeys().get(CPSCacheKeyGeneratorImpl.KEY_USER_ID));
		assertEquals(classUnderTest.getTenantId(), result.getTenantId());
		assertEquals(CacheUnitValueType.NON_SERIALIZABLE, result.getCacheValueType());
		assertEquals(CPSCacheKeyGeneratorImpl.TYPECODE_RUNTIME_CONFIGURATION, result.getTypeCode());
	}
}
