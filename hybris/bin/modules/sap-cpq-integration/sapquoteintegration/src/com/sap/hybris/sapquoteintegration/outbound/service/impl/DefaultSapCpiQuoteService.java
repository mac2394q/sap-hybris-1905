/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2018 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 */
package com.sap.hybris.sapquoteintegration.outbound.service.impl;

import static de.hybris.platform.servicelayer.util.ServicesUtil.validateParameterNotNullStandardMessage;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.sap.hybris.sapquoteintegration.events.SapCpiQuoteBuyerSubmitEvent;
import com.sap.hybris.sapquoteintegration.events.SapCpiQuoteCancelEvent;

import de.hybris.platform.commerceservices.enums.QuoteAction;
import de.hybris.platform.commerceservices.enums.QuoteUserType;
import de.hybris.platform.commerceservices.event.QuoteSalesRepSubmitEvent;
import de.hybris.platform.commerceservices.order.impl.DefaultCommerceQuoteService;
import de.hybris.platform.core.model.order.AbstractOrderEntryModel;
import de.hybris.platform.core.model.order.CartModel;
import de.hybris.platform.core.model.order.QuoteEntryModel;
import de.hybris.platform.core.model.order.QuoteModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.servicelayer.exceptions.SystemException;
import de.hybris.platform.tx.Transaction;
import de.hybris.platform.tx.TransactionBody;

/**
 *
 */
public class DefaultSapCpiQuoteService extends DefaultCommerceQuoteService {
	

	@Override
	public void cancelQuote(final QuoteModel quoteModel, final UserModel userModel) {

		QuoteModel quoteToCancel = quoteModel;
		
		List<String> externalEntryIds = new ArrayList<>();
		for(AbstractOrderEntryModel quoteEntry: quoteModel.getEntries()) {
			String externalEntryId =((QuoteEntryModel) quoteEntry).getExternalQuoteEntryId();
			externalEntryIds.add(externalEntryId);
		}
		validateParameterNotNullStandardMessage("quoteModel", quoteToCancel);
		validateParameterNotNullStandardMessage("userModel", userModel);

		getQuoteActionValidationStrategy().validate(QuoteAction.CANCEL, quoteToCancel, userModel);
		if (isSessionQuoteSameAsRequestedQuote(quoteToCancel)) {
			final Optional<CartModel> optionalCart = Optional.ofNullable(getCartService().getSessionCart());
			if (optionalCart.isPresent()) {
				quoteToCancel = updateQuoteFromCartInternal(optionalCart.get());
				removeQuoteCart(quoteToCancel);
			}
		}
		quoteToCancel = getQuoteUpdateStateStrategy().updateQuoteState(QuoteAction.CANCEL, quoteToCancel, userModel);

		getModelService().save(quoteToCancel);
		getModelService().refresh(quoteToCancel);

   	   if (quoteToCancel.getExternalQuoteId() != null &&  !quoteToCancel.getExternalQuoteId().isEmpty()) {
		    getEventService().publishEvent(new SapCpiQuoteCancelEvent(quoteToCancel, userModel,
		                getQuoteUserTypeIdentificationStrategy().getCurrentQuoteUserType(userModel).get()));
		}
		
	}

	@Override
	public QuoteModel submitQuote(final QuoteModel quoteModel, final UserModel userModel) {
		validateParameterNotNullStandardMessage("quoteModel", quoteModel);
		validateParameterNotNullStandardMessage("userModel", userModel);

		getQuoteActionValidationStrategy().validate(QuoteAction.SUBMIT, quoteModel, userModel);

		QuoteModel updatedQuoteModel = isSessionQuoteSameAsRequestedQuote(quoteModel)
				? updateQuoteFromCart(getCartService().getSessionCart(), userModel) : quoteModel;

		validateQuoteTotal(updatedQuoteModel);

		getQuoteMetadataValidationStrategy().validate(QuoteAction.SUBMIT, updatedQuoteModel, userModel);

		updatedQuoteModel = getQuoteUpdateExpirationTimeStrategy().updateExpirationTime(QuoteAction.SUBMIT,
				updatedQuoteModel, userModel);
		updatedQuoteModel = getQuoteUpdateStateStrategy().updateQuoteState(QuoteAction.SUBMIT, updatedQuoteModel,
				userModel);
		getModelService().save(updatedQuoteModel);
		getModelService().refresh(updatedQuoteModel);

		final QuoteUserType quoteUserType = getQuoteUserTypeIdentificationStrategy().getCurrentQuoteUserType(userModel)
				.get();
		if (QuoteUserType.BUYER.equals(quoteUserType)) {
			final SapCpiQuoteBuyerSubmitEvent quoteBuyerSubmitEvent = new SapCpiQuoteBuyerSubmitEvent(updatedQuoteModel,
					userModel, quoteUserType);
			getEventService().publishEvent(quoteBuyerSubmitEvent);
		} else if (QuoteUserType.SELLER.equals(quoteUserType)) {
			final QuoteSalesRepSubmitEvent quoteSalesRepSubmitEvent = new QuoteSalesRepSubmitEvent(updatedQuoteModel,
					userModel, quoteUserType);
			getEventService().publishEvent(quoteSalesRepSubmitEvent);
		}

		return updatedQuoteModel;
	}
	
	@Override
	public Set<QuoteAction> getAllowedActions(final QuoteModel quoteModel, final UserModel userModel)
	{
		Set<QuoteAction> allowedActions = super.getAllowedActions(quoteModel, userModel);
		allowedActions.remove(QuoteAction.DOWNLOAD_PROPOSAL_DOCUMENT);
		if(quoteModel.getProposalDocument() != null) {
			allowedActions.add(QuoteAction.DOWNLOAD_PROPOSAL_DOCUMENT);
		}
		return allowedActions;
	}
	
	@Override
	   protected QuoteModel saveUpdate(final CartModel cart, final QuoteModel outdatedQuote, final QuoteModel updatedQuote)
	   {

	       if(outdatedQuote.getExternalQuoteId()!=null && !outdatedQuote.getExternalQuoteId().isEmpty()) {
	           updatedQuote.setExternalQuoteId(outdatedQuote.getExternalQuoteId());
	           for(int i= 0 ; i < outdatedQuote.getEntries().size() ; i++) {
	               String externalEntryId =  ((QuoteEntryModel) outdatedQuote.getEntries().get(i)).getExternalQuoteEntryId();
	               ((QuoteEntryModel) updatedQuote.getEntries().get(i)).setExternalQuoteEntryId(externalEntryId);
	           }
	       }
	       try
	       {
	           final Transaction tx = Transaction.current();
	           tx.setTransactionIsolationLevel(Connection.TRANSACTION_READ_COMMITTED);
	           return (QuoteModel) tx.execute(new TransactionBody()
	           {
	               @Override
	               public QuoteModel execute() throws Exception
	               {
	                   getModelService().remove(outdatedQuote);
	                   getModelService().saveAll(updatedQuote, cart);
	                   return updatedQuote;
	               }
	           });
	       }
	       catch (final Exception e)
	       {
	           throw new SystemException(String.format("Updating quote with code [%s] and version [%s] from cart [%s] failed.",
	                   outdatedQuote.getCode(), outdatedQuote.getVersion(), cart.getCode()), e);
	       }
	   }

}
