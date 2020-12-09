/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */

package de.hybris.platform.kymaintegrationservices.strategies.impl;

import de.hybris.platform.apiregistryservices.dao.EventConfigurationDao;
import de.hybris.platform.apiregistryservices.enums.DestinationChannel;
import de.hybris.platform.apiregistryservices.enums.RegistrationStatus;
import de.hybris.platform.apiregistryservices.model.AbstractCredentialModel;
import de.hybris.platform.apiregistryservices.model.AbstractDestinationModel;
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.apiregistryservices.model.DestinationTargetModel;
import de.hybris.platform.apiregistryservices.model.EndpointModel;
import de.hybris.platform.apiregistryservices.model.ExposedDestinationModel;
import de.hybris.platform.apiregistryservices.model.ExposedOAuthCredentialModel;
import de.hybris.platform.apiregistryservices.model.events.EventConfigurationModel;
import de.hybris.platform.apiregistryservices.services.DestinationService;
import de.hybris.platform.apiregistryservices.strategies.DestinationTargetCloningStrategy;
import de.hybris.platform.cronjob.enums.CronJobStatus;
import de.hybris.platform.cronjob.model.CronJobModel;
import de.hybris.platform.servicelayer.cronjob.CronJobService;
import de.hybris.platform.servicelayer.exceptions.AmbiguousIdentifierException;
import de.hybris.platform.servicelayer.exceptions.UnknownIdentifierException;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.util.Config;
import de.hybris.platform.webservicescommons.model.OAuthClientDetailsModel;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;


/**
 * Kyma specific implementation of {@link DestinationTargetCloningStrategy}
 */
public class KymaDestinationTargetCloningStrategy implements DestinationTargetCloningStrategy
{
	private static final Logger LOG = LoggerFactory.getLogger(KymaDestinationTargetCloningStrategy.class);

	private static final String VALID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+{}[]|:;<>?,./";
	private static final Integer DEFAULT_PASSWORD_LENGTH = 12;
	private static final String DEPLOYMENT_API_ENDPOINT_PROP = "{ccv2.services.api.url.0}";
	private static final String AUTHORIZATION_URL = "kymaintegrationservices.authorization.url";

	private ModelService modelService;
	private DestinationService<AbstractDestinationModel> destinationService;
	private EventConfigurationDao eventConfigurationDao;
	private CronJobService cronJobService;


	@Override
	public DestinationTargetModel createDestinationTarget(final DestinationTargetModel source, final String newId)
	{
		final DestinationTargetModel cloneDestinationTarget = getModelService().clone(source);
		cloneDestinationTarget.setId(newId);
		cloneDestinationTarget.setTemplate(false);
		cloneDestinationTarget.setDestinationChannel(DestinationChannel.KYMA);
		cloneDestinationTarget.setRegistrationStatus(RegistrationStatus.STARTED);
		getModelService().save(cloneDestinationTarget);

		return cloneDestinationTarget;
	}

	@Override
	public void createDestinations(final DestinationTargetModel source, final DestinationTargetModel target,
			final List<AbstractDestinationModel> destinations)
	{
		List<AbstractDestinationModel> destinationsToBeCopied = destinations;
		final List<AbstractDestinationModel> clonedDestinations = new ArrayList<>();

		final ExposedOAuthCredentialModel credential = createCredential(target.getId());

		if (CollectionUtils.isEmpty(destinations))
		{
			destinationsToBeCopied = getDestinationService().getDestinationsByDestinationTargetId(source.getId());
		}


		for (final AbstractDestinationModel destination : destinationsToBeCopied)
		{
			final AbstractDestinationModel cloneDestination = getModelService().clone(destination);
			cloneDestination.setDestinationTarget(target);
			cloneDestination.setCredential(credential);

			clonedDestinations.add(cloneDestination);
		}

		getModelService().saveAll(clonedDestinations);
	}

	@Override
	public void createEventConfigurations(final DestinationTargetModel source, final DestinationTargetModel target,
			final List<EventConfigurationModel> eventConfigurations)
	{
		List<EventConfigurationModel> eventConfigurationsToBeCopied = eventConfigurations;
		final List<EventConfigurationModel> clonedEventConfigurations = new ArrayList<>();

		if (CollectionUtils.isEmpty(eventConfigurations))
		{
			eventConfigurationsToBeCopied = getEventConfigurationDao().findEventConfigsByDestinationTargetId(source.getId());
		}

		for (final EventConfigurationModel eventConfiguration : eventConfigurationsToBeCopied)
		{
			final EventConfigurationModel cloneEventConfiguration = getModelService().clone(eventConfiguration);
			cloneEventConfiguration.setDestinationTarget(target);

			clonedEventConfigurations.add(cloneEventConfiguration);
		}

		getModelService().saveAll(clonedEventConfigurations);
	}

	@Override
	public void deleteDestinationTarget(final DestinationTargetModel destinationTarget)
	{

		final List<AbstractDestinationModel> destinations = getDestinationService()
				.getDestinationsByDestinationTargetId(destinationTarget.getId());

		final List<EventConfigurationModel> eventConfigurations = getEventConfigurationDao()
				.findEventConfigsByDestinationTargetId(destinationTarget.getId());

		final Set<AbstractCredentialModel> credentialsToBeDeleted = new HashSet<>();
		final Set<EndpointModel> endpointsToBeDeleted = new HashSet<>();
		final Set<OAuthClientDetailsModel> clientDetailsToBeDeleted = new HashSet<>();
		for (final AbstractDestinationModel destination : destinations)
		{
			if (destination instanceof ExposedDestinationModel)
			{
				((ExposedDestinationModel)destination).setTargetId(null);
			}
			else if (destination instanceof ConsumedDestinationModel)
			{
				endpointsToBeDeleted.add(destination.getEndpoint());
			}

			if(destination.getCredential() != null)
			{
				credentialsToBeDeleted.add(destination.getCredential());

				if(destination.getCredential() instanceof  ExposedOAuthCredentialModel)
				{
					clientDetailsToBeDeleted.add(((ExposedOAuthCredentialModel)destination.getCredential()).getOAuthClientDetails());
				}
			}
		}

		removeGetInfoCronJob(destinationTarget);
		getModelService().removeAll(clientDetailsToBeDeleted);
		getModelService().removeAll(endpointsToBeDeleted);
		getModelService().removeAll(credentialsToBeDeleted);
		getModelService().removeAll(destinations);
		getModelService().removeAll(eventConfigurations);
		getModelService().removeAll(destinationTarget);
	}

	protected void removeGetInfoCronJob(final DestinationTargetModel destinationTarget)
	{
		try
		{
			final CronJobModel cronJob = getCronJobService().getCronJob(destinationTarget.getId());
			if(cronJob.getStatus() == CronJobStatus.RUNNING)
			{
				getCronJobService().requestAbortCronJob(cronJob);
				getModelService().refresh(cronJob);
				if (BooleanUtils.isTrue(cronJob.getRequestAbort()))
				{
					cronJob.setRequestAbort(null);
					cronJob.setStatus(CronJobStatus.ABORTED);
					getModelService().save(cronJob);
				}
			}
			getModelService().removeAll(cronJob.getTriggers());
			getModelService().removeAll(cronJob.getJob(), cronJob);
		}
		catch (final UnknownIdentifierException | AmbiguousIdentifierException e)
		{
			LOG.warn(e.getMessage(), e);
		}
	}

	protected ExposedOAuthCredentialModel createCredential(final String clientId)
	{
		final String hostUrl = DEPLOYMENT_API_ENDPOINT_PROP;

		final OAuthClientDetailsModel oAuthClientDetails  = getModelService().create(OAuthClientDetailsModel.class);
		oAuthClientDetails.setClientId(clientId);
		oAuthClientDetails.setScope(getScopes());
		oAuthClientDetails.setAuthorizedGrantTypes(getAuthorizationGrantTypes());
		oAuthClientDetails.setAuthorities(getAuthorities());
		oAuthClientDetails.setOAuthUrl(hostUrl.concat(Config.getParameter(AUTHORIZATION_URL)));

		final ExposedOAuthCredentialModel exposedOAuthCredential = getModelService().create(ExposedOAuthCredentialModel.class);
		exposedOAuthCredential.setOAuthClientDetails(oAuthClientDetails);
		exposedOAuthCredential.setId(clientId);

		setPasswordForCredentials(oAuthClientDetails, exposedOAuthCredential);

		return exposedOAuthCredential;
	}


	protected void setPasswordForCredentials(final OAuthClientDetailsModel oAuthClientDetails,
			final ExposedOAuthCredentialModel exposedOAuthCredential)
	{
		final char[] generatedClientSecret;

		if (StringUtils.isEmpty(oAuthClientDetails.getClientSecret()))
		{
			generatedClientSecret = RandomStringUtils
					.random(DEFAULT_PASSWORD_LENGTH, 0, VALID_CHARS.length(), false, false, VALID_CHARS.toCharArray(),
							new SecureRandom()).toCharArray();

			oAuthClientDetails.setClientSecret(String.valueOf(generatedClientSecret));
			exposedOAuthCredential.setPassword(String.valueOf((generatedClientSecret)));

			Arrays.fill(generatedClientSecret, '\u0000');
		}
	}


	protected Set<String> getScopes()
	{
		final Set<String> scopes = new HashSet<>();
		scopes.add("basic");
		scopes.add("email");
		scopes.add("profile");
		scopes.add("openid");
		scopes.add("extended");

		return scopes;
	}

	protected Set<String> getAuthorizationGrantTypes()
	{
		final Set<String> grantTypes = new HashSet<>();
		grantTypes.add("client_credentials");

		return grantTypes;
	}

	protected Set<String> getAuthorities()
	{
		final Set<String> authorities = new HashSet<>();
		authorities.add("ROLE_TRUSTED_CLIENT");

		return authorities;
	}

	protected ModelService getModelService()
	{
		return modelService;
	}

	@Required
	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}

	protected DestinationService<AbstractDestinationModel> getDestinationService()
	{
		return destinationService;
	}

	@Required
	public void setDestinationService(final DestinationService<AbstractDestinationModel> destinationService)
	{
		this.destinationService = destinationService;
	}

	protected EventConfigurationDao getEventConfigurationDao()
	{
		return eventConfigurationDao;
	}

	@Required
	public void setEventConfigurationDao(final EventConfigurationDao eventConfigurationDao)
	{
		this.eventConfigurationDao = eventConfigurationDao;
	}

	protected CronJobService getCronJobService()
	{
		return cronJobService;
	}

	@Required
	public void setCronJobService(final CronJobService cronJobService)
	{
		this.cronJobService = cronJobService;
	}
}
