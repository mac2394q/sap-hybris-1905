/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2019 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 */
package de.hybris.platform.sap.agentdesktopdataexchangeb2b.service.impl;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 *
 */
public class AgentDesktopB2BUnitAddressConversionService
{

	private ModelService modelService;

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopB2BUnitAddressConversionService.class);

	protected String getModelId(final AddressModel customerAddressModel)
	{
		String hybrisCustomerId = null;
		final ItemModel owner = customerAddressModel.getOwner();
		if (owner instanceof B2BUnitModel || owner instanceof B2BCustomerModel)
		{
			hybrisCustomerId = owner.getPk().toString();
		}
		return hybrisCustomerId;
	}

	protected String getCustomerUid(final AddressModel customerAddressModel)
	{
		String hybrisUid = null;
		final Object owner = customerAddressModel.getOwner();
		if (owner instanceof CustomerModel)
		{
			final CustomerModel customerModel = (CustomerModel) customerAddressModel.getOwner();
			hybrisUid = customerModel.getUid();
		}
		return hybrisUid;
	}

	public AddressModel convertB2bUnitForCEC(final AddressModel addressModel)
	{
		final AddressModel sendAddressModel = getModelService().create(AddressModel.class);

		final ItemModel owner = addressModel.getOwner();
		final String hybrisCustomerId = getModelId(addressModel);
		sendAddressModel.setSapCustomerID(hybrisCustomerId);
		sendAddressModel.setEmail(addressModel.getEmail());

		sendAddressModel.setIsDefault(false);

		sendAddressModel.setSapAddressUUID(addressModel.getPk().toString());
		final String countryIsoCode = addressModel.getCountry() != null ? addressModel.getCountry().getIsocode() : null;
		sendAddressModel.setContactName(addressModel.getFirstname() + " " + addressModel.getLastname());

		sendAddressModel.setCountryName(countryIsoCode);
		sendAddressModel.setStreet(addressModel.getStreetname());
		sendAddressModel.setStreetnumber(addressModel.getStreetnumber());
		sendAddressModel.setStreetAppendix(addressModel.getStreetnumber());
		sendAddressModel.setAdCity(addressModel.getTown());
		sendAddressModel.setLine1(addressModel.getLine1());
		sendAddressModel.setLine2(addressModel.getLine2());
		final String regionIsoCode = addressModel.getRegion() != null ? addressModel.getRegion().getIsocodeShort() : null;
		sendAddressModel.setState(regionIsoCode);
		sendAddressModel.setPostalcode(addressModel.getPostalcode());
		sendAddressModel.setPhone1(addressModel.getPhone1());
		sendAddressModel.setOwnerType(addressModel.getOwner().getItemtype());


		sendAddressModel.setIsDelete(false);

		return sendAddressModel;
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
