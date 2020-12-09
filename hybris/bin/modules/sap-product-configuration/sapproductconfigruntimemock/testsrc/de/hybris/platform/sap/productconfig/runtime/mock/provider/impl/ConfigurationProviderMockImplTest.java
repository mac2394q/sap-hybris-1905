/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.runtime.mock.provider.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.sap.productconfig.runtime.interf.ConfigurationEngineException;
import de.hybris.platform.sap.productconfig.runtime.interf.KBKey;
import de.hybris.platform.sap.productconfig.runtime.interf.impl.KBKeyImpl;
import de.hybris.platform.sap.productconfig.runtime.interf.model.ConfigModel;
import de.hybris.platform.sap.productconfig.runtime.interf.model.CsticModel;
import de.hybris.platform.sap.productconfig.runtime.mock.impl.RunTimeConfigMockFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;


@UnitTest
public class ConfigurationProviderMockImplTest
{

	protected ConfigurationProviderMockImpl provider = new ConfigurationProviderMockImpl();

	@Before
	public void setUp()
	{
		provider.setConfigMockFactory(new RunTimeConfigMockFactory());
	}

	@Test(expected = NullPointerException.class)
	public void testNullKB()
	{
		final ConfigModel configModel = provider.createDefaultConfiguration(null);
	}

	@Test(expected = NullPointerException.class)
	public void testKBWithNullName()
	{
		final KBKey kbKey = new KBKeyImpl(null, null, null, null);
		final ConfigModel configModel = provider.createDefaultConfiguration(kbKey);
	}


	public void testBuildNumberFilled()
	{
		final ConfigModel configModel = provider.createConfigMock("sapId", null);
		assertEquals("123", configModel.getKbBuildNumber());
	}

	@Test
	public void testKBWithEmptyName()
	{
		final KBKey kbKey = new KBKeyImpl("", "", "", "");
		final ConfigModel configModel = provider.createDefaultConfiguration(kbKey);
		assertNotNull(configModel);
	}

	@Test
	public void testGettingMultipleConfigsCorrectlyBasedOnConfigId() throws ConfigurationEngineException
	{
		final KBKey wcemKbKey = new KBKeyImpl("", "WCEM_SIMPLE_TEST", "", "");
		final KBKey ysapKbKey = new KBKeyImpl("", "YSAP_SIMPLE_POC_KB", "", "");

		final Set<String> ids = new HashSet<>();
		final ConfigModel wcemModel = provider.createDefaultConfiguration(wcemKbKey);
		assertTrue(ids.add(wcemModel.getId()));

		final ConfigModel ysapModel = provider.createDefaultConfiguration(ysapKbKey);
		assertTrue(ids.add(ysapModel.getId()));

		final ConfigModel wcemSecondModel = provider.retrieveConfigurationModel(wcemModel.getId());
		assertEquals(wcemModel.getName(), wcemSecondModel.getName());

		final ConfigModel ysapSecondModel = provider.retrieveConfigurationModel(ysapModel.getId());
		assertEquals(ysapModel.getName(), ysapSecondModel.getName());

	}

	@Test
	public void testGetExternalConfigNotNull() throws ConfigurationEngineException
	{
		final KBKey ysapKbKey = new KBKeyImpl("", "YSAP_SIMPLE_POC_KB", "", "");
		final ConfigModel model = provider.createDefaultConfiguration(ysapKbKey);

		final String xml = provider.retrieveExternalConfiguration(model.getId());
		assertNotNull(xml);
	}

	@Test(expected = IllegalArgumentException.class)
	public void testGetExternalConfigExceptionForUnknownConfigId() throws ConfigurationEngineException
	{
		final String xml = provider.retrieveExternalConfiguration("123");
		assertNotNull(xml);
	}

	@Test
	public void testGetExternalConfigWellformed()
			throws ParserConfigurationException, SAXException, IOException, ConfigurationEngineException
	{
		final KBKey ysapKbKey = new KBKeyImpl("", "YSAP_SIMPLE_POC_KB", "", "");
		final ConfigModel model = provider.createDefaultConfiguration(ysapKbKey);

		final String xmlString = provider.retrieveExternalConfiguration(model.getId());


		final DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		final DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		final InputStream source = new ByteArrayInputStream(xmlString.getBytes("UTF-8"));
		final Document doc = dBuilder.parse(source);
		assertNotNull(doc);
	}


	@Test
	public void testRetrieveExternalConfiguration()
			throws ParserConfigurationException, SAXException, IOException, ConfigurationEngineException
	{
		final KBKey wcemKbKey = new KBKeyImpl("", "WCEM_SIMPLE_TEST", "", "");
		final KBKey ysapKbKey = new KBKeyImpl("", "YSAP_SIMPLE_POC_KB", "", "");
		final KBKey colorKbKey = new KBKeyImpl("", "WEC_COLOR_TEST", "", "");
		// Create 3 distinct configurations to be stored in the test-session
		final Set<String> ids = new HashSet<>();
		final ConfigModel wcemModel = provider.createDefaultConfiguration(wcemKbKey);
		assertTrue(ids.add(wcemModel.getId()));

		final ConfigModel ysapModel = provider.createDefaultConfiguration(ysapKbKey);
		assertTrue(ids.add(ysapModel.getId()));

		final ConfigModel colorModel = provider.createDefaultConfiguration(colorKbKey);
		assertTrue(ids.add(colorModel.getId()));

		final String extConfigYsap = provider.retrieveExternalConfiguration(ysapModel.getId());
		// mock remebers the model even after release session so it can restore it from extConfig
		provider.releaseSession(ysapModel.getId());

		ConfigModel newModel;
		try
		{
			newModel = provider.retrieveConfigurationModel(ysapModel.getId());
			fail("config mock did not drop model after release session");
		}
		catch (final IllegalArgumentException ex)
		{
			//expected
		}
		newModel = provider.createConfigurationFromExternalSource(ysapKbKey, extConfigYsap);
		assertTrue(ids.add(newModel.getId()));
	}

	@Test
	public void testCreateConfigurationFromExternalSource() throws ConfigurationEngineException
	{
		final KBKey colorKbKey = new KBKeyImpl("", "WEC_COLOR_TEST", "", "");
		final KBKey ysapKbKey = new KBKeyImpl("", "YSAP_SIMPLE_POC_KB", "", "");
		final KBKey wcemKbKey = new KBKeyImpl("", "WCEM_SIMPLE_TEST", "", "");
		// Create 3 distinct configurations to be stored in the test-session
		final Set<String> ids = new HashSet<>();
		final ConfigModel colorModel = provider.createDefaultConfiguration(colorKbKey);
		assertTrue(ids.add(colorModel.getId()));

		final ConfigModel ysapModel = provider.createDefaultConfiguration(ysapKbKey);
		assertTrue(ids.add(ysapModel.getId()));


		final ConfigModel wcemModel = provider.createDefaultConfiguration(wcemKbKey);
		assertTrue(ids.add(wcemModel.getId()));

		// Retrieve dummy XML of first configuration
		final String extConfigColor = provider.retrieveExternalConfiguration(colorModel.getId());

		// Use extConfig of first configuration to create a configuration model. Id should not be the same as the id of old colorModel.
		final ConfigModel newColorModel = provider.createConfigurationFromExternalSource(colorKbKey, extConfigColor);
		assertNotEquals(colorModel.getId(), newColorModel.getId());
	}

	@Test
	public void testCreateDefaultMockConfiguration()
	{
		final String LOGSYS = "RR4CLNT910";
		final KBKeyImpl kbKey_SAP_SIMPLE_POC = new KBKeyImpl("YSAP_SIMPLE_POC", "YSAP_SIMPLE_POC_KB", LOGSYS, "3800");
		final ConfigModel configModel = provider.createDefaultConfiguration(kbKey_SAP_SIMPLE_POC);
		assertNotNull(configModel.getVersion());

		final List<CsticModel> cstics = configModel.getRootInstance().getCstics();

		Assert.assertEquals("Configuration schould have four cstcis: ", 4, cstics.size());

		// first characteristic is a check box
		CsticModel cstic = cstics.get(0);
		Assert.assertEquals("Cstic " + cstic.getName() + " should be X", "X", cstic.getAssignedValues().get(0).getName());
		Assert.assertEquals("Cstic Type " + cstic.getName() + " should be a STRING", CsticModel.TYPE_STRING, cstic.getValueType());
		Assert.assertEquals("Cstic " + cstic.getName() + " has a wrong language specific name ", "Simple Flag: Hide options",
				cstic.getLanguageDependentName());

		// second characteristic a numeric without default value
		cstic = cstics.get(1);
		Assert.assertEquals("Cstic " + cstic.getName() + " has no default value", 0, cstic.getAssignedValues().size());
		Assert.assertEquals("Cstic Type " + cstic.getName() + " should be numeric", CsticModel.TYPE_INTEGER, cstic.getValueType());
		Assert.assertEquals("Cstic " + cstic.getName() + " has a wrong language specific name ", "Num w/o decimal",
				cstic.getLanguageDependentName());
		Assert.assertFalse("Cstic Type " + cstic.getName() + " should not be visible", cstic.isVisible());

		// second characteristic a numeric without default value
		cstic = cstics.get(2);
		Assert.assertEquals("Cstic " + cstic.getName() + " has no default value", 0, cstic.getAssignedValues().size());
		Assert.assertEquals("Cstic Type " + cstic.getName() + " should be numeric", CsticModel.TYPE_INTEGER, cstic.getValueType());
		Assert.assertEquals("Cstic " + cstic.getName() + " has a wrong language specific name ", "Expected Number of Users",
				cstic.getLanguageDependentName());
		Assert.assertFalse("Cstic Type " + cstic.getName() + " should not be visible", cstic.isVisible());

		// fourth characteristic is radio button with a default value
		cstic = cstics.get(3);
		Assert.assertEquals("Cstic " + cstic.getName() + " should be ", "VAL3", cstic.getAssignedValues().get(0).getName());
		Assert.assertEquals("Cstic Type " + cstic.getName() + " should be radio button", CsticModel.TYPE_STRING,
				cstic.getValueType());
		Assert.assertEquals("Characteristic has 4 possible values:", 4, cstic.getAssignableValues().size());
		Assert.assertEquals("Cstic " + cstic.getName() + " has a wrong language specific name ", "Radio Button Group",
				cstic.getLanguageDependentName());
		Assert.assertFalse("Cstic Type " + cstic.getName() + " should not be visible", cstic.isVisible());
	}

}
