/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.smartedit.controllers;

import de.hybris.platform.util.Config;
import de.hybris.smartedit.settings.facade.SmarteditSettingsFacade;

import javax.annotation.Resource;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Unauthenticated controller returning a map of non-protected settings necessary for front-end to self-configure
 * <p>
 */
@RestController("settingsController")
@RequestMapping("/settings")
@Api(tags = "settings")
public class SettingsController
{
	private static final String BOOTSTRAP_OUTER_EXTENSIONS = "bootstrapOuterExtensions";

	@Resource
	private SmarteditSettingsFacade smarteditSettingsFacade;

	private final List<String> properties = Arrays.asList("smartedit.sso.enabled");

	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseBody
	@ApiOperation(value = "Get a map of application settings", notes = "Endpoint to retrieve a map of non-protected settings necessary for front-end to self-configure")
	public Map<String, Object> getSettings()
	{
		final Map<String, String> settings = properties
				.stream()
				.collect(HashMap::new, (m, v) -> m.put(v, Config.getString(v, null)), HashMap::putAll);
		settings.entrySet().removeIf(entry -> entry.getValue() == null);

		final Map<String, List<Map<String, String>>> bootstrapOuterExtensions = getBootstrapOuterExtensions();

		return Stream.of(settings, bootstrapOuterExtensions).flatMap(m -> m.entrySet().stream())
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}

	protected Map<String, List<Map<String, String>>> getBootstrapOuterExtensions()
	{
		final Map<String, List<Map<String, String>>> bootstrapOuterExtensionsMap = new HashMap<>();
		bootstrapOuterExtensionsMap.put(BOOTSTRAP_OUTER_EXTENSIONS, getSmarteditSettingsFacade().getBootstrapOuterExtensions());

		return bootstrapOuterExtensionsMap;
	}

	protected SmarteditSettingsFacade getSmarteditSettingsFacade()
	{
		return smarteditSettingsFacade;
	}

	public void setSmarteditSettingsFacade(final SmarteditSettingsFacade smarteditSettingsFacade)
	{
		this.smarteditSettingsFacade = smarteditSettingsFacade;
	}

}
