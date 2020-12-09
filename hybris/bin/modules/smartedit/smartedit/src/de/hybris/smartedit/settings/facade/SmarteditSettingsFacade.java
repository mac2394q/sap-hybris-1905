/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.smartedit.settings.facade;

import java.util.*;

/**
 * Interface methods for SmarteditSettingsFacade.
 * The implementing class will provide methods for returning settings necessary for front-end to self-configure.
 */
public interface SmarteditSettingsFacade
{
    /**
     * Get the list of bootstrap outer extensions.
     * @return a list of {@link Map} of application name as a key and location (javascript asset) as a value.
     */
    List<Map<String, String>> getBootstrapOuterExtensions();
}
