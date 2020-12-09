/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.agentdesktopdataexchange.service.impl;

import de.hybris.platform.commerceservices.constants.GeneratedCommerceServicesConstants.Enumerations.CustomerType;
import de.hybris.platform.commerceservices.strategies.CustomerNameStrategy;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.sap.sapcpiadapter.model.SAPCpiOutboundConfigModel;
import de.hybris.platform.sap.sapcpiadapter.model.SAPCpiOutboundCustomerModel;
import de.hybris.platform.sap.sapcpicustomerexchange.service.SapCpiCustomerConversionService;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.util.StringUtils;



public class AgentDesktopCustomerConversionService implements SapCpiCustomerConversionService
{
	private ModelService modelService;
	private CustomerNameStrategy customerNameStrategy;

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopCustomerConversionService.class);


	@Override
	public SAPCpiOutboundCustomerModel convertCustomerToSapCpiCustomer(final CustomerModel customerModel,
			final AddressModel addressModel, final String baseStoreUid, final String sessionLanguage)
	{
		final SAPCpiOutboundCustomerModel sapCpiOutboundCustomer = getModelService().create(SAPCpiOutboundCustomerModel.class);

		// Configuration
		final SAPCpiOutboundConfigModel config = getModelService().create(SAPCpiOutboundConfigModel.class);
		config.setClient("cecCustomerscpi");
		config.setReceiverName("cecCustomerscpi");
		sapCpiOutboundCustomer.setSapCpiConfig(config);

		final String[] names = getCustomerNameStrategy().splitName(customerModel.getName());

		sapCpiOutboundCustomer.setUid(customerModel.getUid());
		sapCpiOutboundCustomer.setCustomerId(customerModel.getCustomerID());
		sapCpiOutboundCustomer.setBaseStore(baseStoreUid);
		sapCpiOutboundCustomer.setIsSealed(customerModel.isSealed());
		sapCpiOutboundCustomer.setIsGuest(false);
		sapCpiOutboundCustomer.setIsDelete(false);
		if (CustomerType.GUEST.equals(customerModel.getType()))
		{
			sapCpiOutboundCustomer.setIsGuest(true);
		}

		if (customerModel.getTitle() != null && !StringUtils.isEmpty(customerModel.getTitle()))
		{
			sapCpiOutboundCustomer.setTitle(customerModel.getTitle().getCode());
		}

		if (names.length > 0 && !StringUtils.isEmpty(names[0]))
		{
			sapCpiOutboundCustomer.setFirstName(names[0]);
		}
		if (names.length > 1 && !StringUtils.isEmpty(names[1]))
		{
			sapCpiOutboundCustomer.setLastName(names[1]);
		}

		sapCpiOutboundCustomer.setDefaultAddressId(customerModel.getDefaultAddressId());

		if (addressModel == null)
		{
			return sapCpiOutboundCustomer;
		}

		// Address
		final String countryIsoCode = addressModel.getCountry() != null ? addressModel.getCountry().getIsocode() : null;
		sapCpiOutboundCustomer.setCountry(countryIsoCode);
		sapCpiOutboundCustomer.setStreet(addressModel.getLine2());
		sapCpiOutboundCustomer.setPhone(addressModel.getPhone1());
		sapCpiOutboundCustomer.setFax(addressModel.getFax());
		sapCpiOutboundCustomer.setTown(addressModel.getTown());
		sapCpiOutboundCustomer.setPostalCode(addressModel.getPostalcode());
		sapCpiOutboundCustomer.setStreetNumber(addressModel.getLine1());
		sapCpiOutboundCustomer.setTown(addressModel.getTown());

		final String regionIsoCode = addressModel.getRegion() != null ? addressModel.getRegion().getIsocodeShort() : null;
		sapCpiOutboundCustomer.setRegion(regionIsoCode);

		return sapCpiOutboundCustomer;
	}


	/**
	 * @return the customerNameStrategy
	 */
	public CustomerNameStrategy getCustomerNameStrategy()
	{
		return customerNameStrategy;
	}

	/**
	 * @param customerNameStrategy
	 *           the customerNameStrategy to set
	 */
	public void setCustomerNameStrategy(final CustomerNameStrategy customerNameStrategy)
	{
		this.customerNameStrategy = customerNameStrategy;
	}

	/**
	 * @return the modelService
	 */
	public ModelService getModelService()
	{
		return modelService;
	}


	/**
	 * @param modelService
	 *           the modelService to set
	 */
	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}

}
