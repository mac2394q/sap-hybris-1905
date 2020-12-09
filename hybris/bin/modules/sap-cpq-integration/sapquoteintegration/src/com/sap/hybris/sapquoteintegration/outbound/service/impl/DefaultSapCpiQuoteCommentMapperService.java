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

import com.sap.hybris.sapquoteintegration.model.SAPCpiOutboundQuoteCommentModel;
import com.sap.hybris.sapquoteintegration.outbound.service.SapCpiQuoteCommentMapperService;

import de.hybris.platform.b2b.model.B2BCustomerModel;
import de.hybris.platform.b2b.model.B2BUnitModel;
import de.hybris.platform.b2b.services.B2BUnitService;
import de.hybris.platform.catalog.model.CompanyModel;
import de.hybris.platform.comments.model.CommentModel;
import de.hybris.platform.core.model.user.EmployeeModel;

/**
 * Mapper service for Comments in Quote Outbound
 *
 */
public class DefaultSapCpiQuoteCommentMapperService
        implements SapCpiQuoteCommentMapperService<CommentModel, SAPCpiOutboundQuoteCommentModel> {

	private B2BUnitService<B2BUnitModel, ?> b2bUnitService;

	@Override
    public void map(final CommentModel comment, final SAPCpiOutboundQuoteCommentModel scpiQuoteComment) {
        mapComments(comment, scpiQuoteComment);
    }

	protected CompanyModel getRootB2BUnit(final B2BCustomerModel customerModel) {
		final B2BUnitModel parent = (B2BUnitModel) b2bUnitService.getParent(customerModel);
		final CompanyModel rootB2BUnit = b2bUnitService.getRootUnit(parent);
		return rootB2BUnit;
	}

    /**
     *
     */
    protected void mapComments(final CommentModel comment, final SAPCpiOutboundQuoteCommentModel scpiQuoteComment) {
        scpiQuoteComment.setCommentId(comment.getCode());
        scpiQuoteComment.setText(comment.getText());

        if (comment.getAuthor() instanceof B2BCustomerModel) {
            final B2BCustomerModel customer = (B2BCustomerModel) comment.getAuthor();
            scpiQuoteComment.setUserName(customer.getName());
            scpiQuoteComment.setEmail(customer.getUid());
            final CompanyModel rootB2BUnit = getRootB2BUnit(customer);
            scpiQuoteComment.setB2bUnitName(rootB2BUnit.getName());
        }else if(comment.getAuthor() instanceof EmployeeModel) {
            final EmployeeModel employee = (EmployeeModel) comment.getAuthor();
            scpiQuoteComment.setUserName(employee.getName());
            scpiQuoteComment.setEmail(employee.getUid());
        }
    }

	public B2BUnitService<B2BUnitModel, ?> getB2bUnitService() {
		return b2bUnitService;
	}

	public void setB2bUnitService(B2BUnitService<B2BUnitModel, ?> b2bUnitService) {
		this.b2bUnitService = b2bUnitService;
	}
}