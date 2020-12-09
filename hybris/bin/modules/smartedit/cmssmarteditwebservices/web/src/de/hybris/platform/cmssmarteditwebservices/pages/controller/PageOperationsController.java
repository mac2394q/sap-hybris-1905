/*
 * [y] hybris Platform
 *
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.cmssmarteditwebservices.pages.controller;

import static de.hybris.platform.cmssmarteditwebservices.constants.CmssmarteditwebservicesConstants.API_VERSION;

import de.hybris.platform.cms2.exceptions.CMSItemNotFoundException;
import de.hybris.platform.cmsfacades.data.CMSPageOperationsData;
import de.hybris.platform.cmsfacades.pages.PageFacade;
import de.hybris.platform.cmssmarteditwebservices.dto.CMSPageOperationWsDTO;
import de.hybris.platform.servicelayer.exceptions.UnknownIdentifierException;
import de.hybris.platform.webservicescommons.mapping.DataMapper;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


/**
 * Controller that provides an API to perform different operations on pages.
 */
@Controller
@RequestMapping(API_VERSION + "/sites/{siteId}/catalogs/{catalogId}/pages/{pageId}/operations")
public class PageOperationsController
{

	@Resource
	private DataMapper dataMapper;

	@Resource
	private PageFacade pageFacade;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	@ApiOperation(value = "Perform different operations on the page item.", notes = "Endpoint to perform different operations on the page item such as delete a page etc.")
	@ApiImplicitParams(
	{ //
			@ApiImplicitParam(name = "catalogId", value = "The catalog identifier", required = true, dataType = "string", paramType = "path"),
			@ApiImplicitParam(name = "pageUid", value = "The uid of the page", required = true, dataType = "string", paramType = "path") })
	@ApiResponses(
	{ //
			@ApiResponse(code = 404, message = "When the item has not been found (UnknownIdentifierException) "),
			@ApiResponse(code = 400, message = "When the payload does not have the 'operation' property. (IllegalArgumentException)"),
			@ApiResponse(code = 200, message = "The page operation item.", response = CMSPageOperationWsDTO.class) })
	public CMSPageOperationWsDTO perform(@ApiParam(value = "The id of the catalog", required = true)
	@PathVariable
	final String catalogId, @ApiParam(value = "The uid of the page to be updated", required = true)
	@PathVariable
	final String pageId,
			@ApiParam(value = "The DTO object containing all the information about operation to be performed", required = true)
			@RequestBody
			final CMSPageOperationWsDTO dto) throws UnknownIdentifierException, CMSItemNotFoundException
	{
		final CMSPageOperationsData data = getDataMapper().map(dto, CMSPageOperationsData.class);
		data.setCatalogId(catalogId);
		final CMSPageOperationsData newPageOperationData = getPageFacade().performOperation(pageId, data);
		return getDataMapper().map(newPageOperationData, CMSPageOperationWsDTO.class);
	}

	protected DataMapper getDataMapper()
	{
		return dataMapper;
	}

	public void setDataMapper(final DataMapper dataMapper)
	{
		this.dataMapper = dataMapper;
	}

	protected PageFacade getPageFacade()
	{
		return pageFacade;
	}

	public void setPageFacade(final PageFacade pageFacade)
	{
		this.pageFacade = pageFacade;
	}

}
