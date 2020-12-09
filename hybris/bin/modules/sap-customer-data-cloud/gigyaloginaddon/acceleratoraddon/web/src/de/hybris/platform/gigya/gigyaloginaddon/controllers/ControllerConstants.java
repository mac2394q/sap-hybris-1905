/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.gigya.gigyaloginaddon.controllers;

public interface ControllerConstants
{
	final String ADDON_PREFIX = "addon:/gigyaloginaddon/";

	interface Views
	{
		interface Pages
		{
			interface Account
			{
				String AccountLoginPage = ADDON_PREFIX + "pages/account/accountLoginPage";// NOSONAR
			}

			interface Checkout
			{
				String CheckoutLoginPage = ADDON_PREFIX + "pages/checkout/checkoutLoginPage";// NOSONAR
			}
		}

		interface Fragments
		{
			interface Checkout // NOSONAR
			{
				String TermsAndConditionsPopup = "fragments/checkout/termsAndConditionsPopup"; // NOSONAR
			}
		}
	}
}
