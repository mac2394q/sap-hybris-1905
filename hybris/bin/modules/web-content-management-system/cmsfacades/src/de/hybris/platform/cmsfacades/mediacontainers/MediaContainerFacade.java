/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.mediacontainers;

import de.hybris.platform.core.model.media.MediaContainerModel;


/**
 * Facade for managing media containers.
 */
public interface MediaContainerFacade
{

	/**
	 * Creates a new Media Container with a sequential qualifier name.
	 * @return a new {@link MediaContainerModel}
	 */
	MediaContainerModel createMediaContainer();
}
