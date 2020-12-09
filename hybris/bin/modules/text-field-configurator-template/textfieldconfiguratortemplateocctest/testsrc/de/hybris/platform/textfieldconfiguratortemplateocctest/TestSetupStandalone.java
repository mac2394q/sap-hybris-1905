/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.textfieldconfiguratortemplateocctest;

import de.hybris.platform.core.Registry;
import de.hybris.platform.textfieldconfiguratortemplateocctest.setup.TextfieldConfiguratorOCCTestSetup;
import de.hybris.platform.util.Config;
import de.hybris.platform.webservicescommons.testsupport.server.EmbeddedServerController;
import de.hybris.platform.ycommercewebservices.constants.YcommercewebservicesConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TestSetupStandalone
{
	private static boolean serverStarted = false;
	private static final Logger LOG = LoggerFactory.getLogger(TestSetupStandalone.class);
	private static final String[] EXTENSIONS_TO_START = new String[]
	{ YcommercewebservicesConstants.EXTENSIONNAME };

	public static void loadData()
	{
		final TextfieldConfiguratorOCCTestSetup productConfigOCCTestSetup = Registry.getApplicationContext()
				.getBean("textfieldConfiguratorOCCTestSetup", TextfieldConfiguratorOCCTestSetup.class);
		productConfigOCCTestSetup.loadData();

	}

	public static void startServer()
	{
		if (!serverStarted)
		{
			final String[] ext = EXTENSIONS_TO_START;
			if (!Config.getBoolean("ycommercewebservicestest.embedded.server.enabled", true))
			{
				LOG.info("Ignoring embedded server");
				return;
			}

			LOG.info("Starting embedded server");
			final EmbeddedServerController controller = Registry.getApplicationContext().getBean("embeddedServerController",
					EmbeddedServerController.class);
			controller.start(ext);
			LOG.info("embedded server is running");
			serverStarted = true;
		}
		else
		{
			LOG.info("embedded server alereday running");
		}

	}

	public static void stopServer()
	{
		if (!Config.getBoolean("ycommercewebservicestest.embedded.server.enabled", true))
		{
			LOG.info("Ignoring embedded server");
			return;
		}

		LOG.info("Stopping embedded server");
		final EmbeddedServerController controller = Registry.getApplicationContext().getBean("embeddedServerController",
				EmbeddedServerController.class);
		controller.stop();
		LOG.info("Stopped embedded server");
	}
}
