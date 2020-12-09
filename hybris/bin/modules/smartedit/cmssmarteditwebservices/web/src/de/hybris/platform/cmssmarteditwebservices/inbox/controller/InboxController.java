/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmssmarteditwebservices.inbox.controller;

import static de.hybris.platform.cmssmarteditwebservices.constants.CmssmarteditwebservicesConstants.API_VERSION;

import de.hybris.platform.cms2.data.PageableData;
import de.hybris.platform.cmsfacades.data.CMSWorkflowTaskData;
import de.hybris.platform.cmsfacades.workflow.CMSWorkflowActionFacade;
import de.hybris.platform.cmssmarteditwebservices.dto.CMSWorkflowTaskListWsDTO;
import de.hybris.platform.cmssmarteditwebservices.dto.CMSWorkflowTaskWsDTO;
import de.hybris.platform.cmssmarteditwebservices.dto.PageableWsDTO;
import de.hybris.platform.servicelayer.search.SearchResult;
import de.hybris.platform.webservicescommons.mapping.DataMapper;
import de.hybris.platform.webservicescommons.pagination.WebPaginationUtils;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


/**
 * Controller to retrieve inbox information related to all sites
 */
@RestController
@RequestMapping(API_VERSION + "/inbox")
public class InboxController
{
	private static final Logger LOGGER = LoggerFactory.getLogger(InboxController.class);

	@Resource
	private DataMapper dataMapper;
	@Resource
	private CMSWorkflowActionFacade cmsWorkflowActionFacade;
	@Resource
	private WebPaginationUtils webPaginationUtils;

	@GetMapping(value = "/workflowtasks", params =
	{ "pageSize", "currentPage" })
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	@ApiOperation(value = "Retrieves all workflow tasks for the current user that are yet to be acted upon", notes = "Endpoint that retrieves all workflow tasks for the current user")
	@ApiImplicitParams(
	{ //
			@ApiImplicitParam(name = "pageSize", value = "Page size for paging", required = true, dataType = "string", paramType = "query"),
			@ApiImplicitParam(name = "currentPage", value = "Request page number", required = true, dataType = "string", paramType = "query") //
	})
	@ApiResponses(
	{ //
			@ApiResponse(code = 200, message = "The dto containing the workflow tasks", response = CMSWorkflowTaskListWsDTO.class) //
	})
	public CMSWorkflowTaskListWsDTO getWorkflowTasks( //
			@ApiParam(value = "Pageable DTO", required = true)
			@ModelAttribute
			final PageableWsDTO pageableDto)
	{

		final PageableData pageableData = getDataMapper().map(pageableDto, PageableData.class);

		final SearchResult<CMSWorkflowTaskData> taskDataSearchResult = getCmsWorkflowActionFacade()
				.findAllWorkflowTasks(pageableData);
		final List<CMSWorkflowTaskWsDTO> tasks = taskDataSearchResult.getResult().stream()
				.map(task -> getDataMapper().map(task, CMSWorkflowTaskWsDTO.class)).collect(Collectors.toList());

		final CMSWorkflowTaskListWsDTO workflowTaskListWsDTO = new CMSWorkflowTaskListWsDTO();
		workflowTaskListWsDTO.setTasks(tasks);
		workflowTaskListWsDTO.setPagination(getWebPaginationUtils().buildPagination(taskDataSearchResult));

		return workflowTaskListWsDTO;
	}

	protected DataMapper getDataMapper()
	{
		return dataMapper;
	}

	public void setDataMapper(final DataMapper dataMapper)
	{
		this.dataMapper = dataMapper;
	}

	protected CMSWorkflowActionFacade getCmsWorkflowActionFacade()
	{
		return cmsWorkflowActionFacade;
	}

	public void setCmsWorkflowActionFacade(final CMSWorkflowActionFacade cmsWorkflowActionFacade)
	{
		this.cmsWorkflowActionFacade = cmsWorkflowActionFacade;
	}

	protected WebPaginationUtils getWebPaginationUtils()
	{
		return webPaginationUtils;
	}

	public void setWebPaginationUtils(final WebPaginationUtils webPaginationUtils)
	{
		this.webPaginationUtils = webPaginationUtils;
	}
}
