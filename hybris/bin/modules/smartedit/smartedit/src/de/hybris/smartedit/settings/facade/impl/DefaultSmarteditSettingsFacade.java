/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.smartedit.settings.facade.impl;

import de.hybris.platform.core.Registry;

import de.hybris.smartedit.settings.facade.SmarteditSettingsFacade;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Default implementation of {@link SmarteditSettingsFacade}.
 */
public class DefaultSmarteditSettingsFacade implements SmarteditSettingsFacade
{
	private static final String BOOTSTRAP_EXTENSIONS_CONFIG_MATCH = "smartedit\\.bootstrapOuterExtensions\\.(.*)";

	@Override
	public List<Map<String, String>> getBootstrapOuterExtensions()
	{
		final Map<String, String> bootstrapExtensionsConfig = Registry.getCurrentTenantNoFallback().getConfig()
				.getParametersMatching(BOOTSTRAP_EXTENSIONS_CONFIG_MATCH, true);

		final List<Map<String, String>> bootstrapExtensionsList = new ArrayList<>();
		for (final String bootstrapExtensionConfig : bootstrapExtensionsConfig.values())
		{
			final String[] extensionConfig = bootstrapExtensionConfig.split(":");
			if (extensionConfig.length == 2)
			{
				final Map<String, String> bootstrapExtension = new HashMap<>();
				bootstrapExtension.put(extensionConfig[0], extensionConfig[1]);
				bootstrapExtensionsList.add(bootstrapExtension);
			}
		}

		return bootstrapExtensionsList;
	}
}
