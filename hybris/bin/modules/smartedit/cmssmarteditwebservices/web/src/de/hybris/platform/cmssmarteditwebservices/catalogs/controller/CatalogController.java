/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmssmarteditwebservices.catalogs.controller;

import de.hybris.platform.cmssmarteditwebservices.catalogs.CatalogFacade;
import de.hybris.platform.cmssmarteditwebservices.dto.CatalogListWsDTO;
import de.hybris.platform.cmssmarteditwebservices.dto.CatalogWsDTO;
import de.hybris.platform.webservicescommons.cache.CacheControl;
import de.hybris.platform.webservicescommons.cache.CacheControlDirective;
import de.hybris.platform.webservicescommons.mapping.DataMapper;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

import static de.hybris.platform.cmssmarteditwebservices.constants.CmssmarteditwebservicesConstants.API_VERSION;
import static org.springframework.web.bind.annotation.RequestMethod.GET;


/**
 * Controller to retrieve catalog information related to a given site.
 */
@RestController
@RequestMapping(API_VERSION + "/sites/{siteId}")
@CacheControl(directive = CacheControlDirective.PUBLIC, maxAge = 1800)
public class CatalogController
{
	@Resource(name = "cmsSeCatalogFacade")
	private CatalogFacade catalogFacade;
	@Resource
	private DataMapper dataMapper;

	@RequestMapping(value = "/contentcatalogs", method = GET)
	@ApiOperation(
			value = "Get content catalogs",
			notes = "Endpoint to retrieve content catalog information including the related catalog versions for all catalogs for a given site.")
	public CatalogListWsDTO getContentCatalogs(
			@ApiParam(value = "The site identifier", required = true) @PathVariable final String siteId)
	{
		final List<CatalogWsDTO> catalogs = getDataMapper() //
				.mapAsList(getCatalogFacade().getContentCatalogs(siteId), CatalogWsDTO.class, null);

		final CatalogListWsDTO catalogList = new CatalogListWsDTO();
		catalogList.setCatalogs(catalogs);
		return catalogList;
	}

	@RequestMapping(value = "/productcatalogs", method = GET)
	@ApiOperation(
			value = "Get product catalogs",
			notes = "Endpoint to retrieve product catalog information including the related catalog versions for all catalogs for a given site")
	public CatalogListWsDTO getProductCatalogs(
			@ApiParam(value = "The site identifier", required = true) @PathVariable final String siteId)
	{
		final List<CatalogWsDTO> catalogs = getDataMapper() //
				.mapAsList(getCatalogFacade().getProductCatalogs(siteId), CatalogWsDTO.class, null);

		final CatalogListWsDTO catalogList = new CatalogListWsDTO();
		catalogList.setCatalogs(catalogs);
		return catalogList;
	}

	protected CatalogFacade getCatalogFacade()
	{
		return catalogFacade;
	}

	public void setCatalogFacade(final CatalogFacade catalogFacade)
	{
		this.catalogFacade = catalogFacade;
	}

	protected DataMapper getDataMapper()
	{
		return dataMapper;
	}

	public void setDataMapper(final DataMapper dataMapper)
	{
		this.dataMapper = dataMapper;
	}
}
