/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.gigya.gigyaservices.service.impl;

import de.hybris.platform.gigya.gigyaservices.api.exception.GigyaApiException;
import de.hybris.platform.gigya.gigyaservices.model.GigyaConfigModel;
import de.hybris.platform.gigya.gigyaservices.service.GigyaService;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gigya.socialize.GSObject;
import com.gigya.socialize.GSRequest;
import com.gigya.socialize.GSResponse;

/**
 * Default implementation of GigyaService
 */
public class DefaultGigyaService implements GigyaService {

	private static final Logger LOG = Logger.getLogger(DefaultGigyaService.class);

	@Override
	public GSResponse callRawGigyaApiWithConfig(final String method, final Map<String, Object> params,
			final GigyaConfigModel conf, final int maxTries, final int tryNum) {
		if (params != null) {
			try {
				final ObjectMapper objectMapper = new ObjectMapper();
				final GSObject gigyaParams = new GSObject(objectMapper.writeValueAsString(params));
				return callRawGigyaApiWithConfigAndObject(method, gigyaParams, conf, maxTries, tryNum);
			} catch (final GigyaApiException e) {
				LOG.error(e.getMessage() + ", errorCode=" + e.getGigyaErrorCode(), e);
				throw e;
			} catch (final Exception e) {
				LOG.error(e.getMessage(), e);
				throw new GigyaApiException(e.getMessage());
			}
		} else {
			throw new GigyaApiException("Parameters are empty!");
		}
	}

	@Override
	public GSResponse callRawGigyaApiWithConfigAndObject(final String method, final GSObject gigyaParams,
			final GigyaConfigModel gigyaConfig, final int maxTries, int tryNum) {
		final GSRequest gsRequest;
		if (StringUtils.isNotEmpty(gigyaConfig.getGigyaSiteSecret())) {
			gsRequest = new GSRequest(gigyaConfig.getGigyaApiKey(), gigyaConfig.getGigyaSiteSecret(), method,
					gigyaParams, true);
		} else {
			gsRequest = new GSRequest(gigyaConfig.getGigyaApiKey(), gigyaConfig.getGigyaUserSecret(), null, method,
					gigyaParams, true, gigyaConfig.getGigyaUserKey());
		}
		gsRequest.setAPIDomain(gigyaConfig.getGigyaDataCenter());
		final GSResponse res = gsRequest.send();
		if (res.getErrorCode() != 0) {
			if (tryNum > maxTries) {
				throw new GigyaApiException(res.getErrorMessage(), res.getErrorCode());
			} else {
				tryNum++;
				callRawGigyaApiWithConfigAndObject(method, gigyaParams, gigyaConfig, maxTries, tryNum);
			}
		}
		return res;
	}
}