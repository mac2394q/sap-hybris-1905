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

import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.servicelayer.model.ModelService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;



public class AgentDesktopAddressConversionService
{
	private ModelService modelService;

	private static final Logger LOGGER = LogManager.getLogger(AgentDesktopAddressConversionService.class);

	protected String getModelId(final AddressModel customerAddressModel)
	{
		String hybrisCustomerId = null;
		final Object owner = customerAddressModel.getOwner();
		if (owner instanceof CustomerModel)
		{
			final CustomerModel customerModel = (CustomerModel) customerAddressModel.getOwner();
			hybrisCustomerId = customerModel.getCustomerID();
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

	protected boolean isDefaultAddress(final AddressModel customerAddressModel)
	{
		final Object owner = customerAddressModel.getOwner();
		if (owner instanceof CustomerModel)
		{
			final CustomerModel customerModel = (CustomerModel) customerAddressModel.getOwner();
			return customerModel.getDefaultShipmentAddress() != null
					&& customerModel.getDefaultShipmentAddress().getPk().toString().equals(customerAddressModel.getPk().toString());
		}
		else
		{
			return false;
		}
	}

	public AddressModel convertAddressForCEC(final AddressModel addressModel)
	{

		final AddressModel sendAddressModel = getModelService().create(AddressModel.class);

		final ItemModel owner = addressModel.getOwner();
		final String hybrisCustomerId = getModelId(addressModel);
		sendAddressModel.setSapCustomerID(hybrisCustomerId);
		sendAddressModel.setEmail(getCustomerUid(addressModel));

		final boolean isDefaultAddress = isDefaultAddress(addressModel);
		sendAddressModel.setIsDefault(isDefaultAddress);

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
		sendAddressModel.setOwnerType(addressModel.getItemtype());


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
