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
package de.hybris.platform.kymaintegrationservices.services;

import de.hybris.platform.apiregistryservices.model.ConsumedCertificateCredentialModel;
import de.hybris.platform.apiregistryservices.exceptions.CredentialException;

import java.net.URI;


/**
 * One-click integration interface that responsible for setup of Consumed Destinations and connected Credential.
 */
public interface CertificateService
{
	/**
	 * method that retrieves Consumed Certificate Credential and updates connected Consumed * Destinations.
	 *
	 * @param certificateUrl
	 *           Url to retrieve client certificate.
	 * @param certificationCredential
	 *           Credential to be updated.
	 * @return updated certificate
	 * @throws CredentialException
	 *            if the generation of PrivateKey, CSR, Certificate fails
	 */
	ConsumedCertificateCredentialModel retrieveCertificate(URI certificateUrl, ConsumedCertificateCredentialModel certificationCredential)
			throws CredentialException;

	/**
	 * Renew an existing certificate before it expires, at the moment we don't have real implementation of this method.
	 * @param certificationCredential
	 *           ConsumedCertificateCredentialModel which contains the old certificate
	 * @return updated Certificate
	 *           updated ConsumedCertificateCredentialModel which contains the new certificate
	 * @throws CredentialException
	 *           if the renewal of the certificate fails
	 */
	ConsumedCertificateCredentialModel renewCertificate(ConsumedCertificateCredentialModel certificationCredential) throws CredentialException;
}
