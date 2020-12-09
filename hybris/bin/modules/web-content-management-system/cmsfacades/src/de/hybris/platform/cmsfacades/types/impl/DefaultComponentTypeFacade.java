/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.cmsfacades.types.impl;

import static de.hybris.platform.cmsfacades.constants.CmsfacadesConstants.TYPE_READONLY_MODE;
import static java.util.stream.Collectors.toList;

import de.hybris.platform.cms2.exceptions.TypePermissionException;
import de.hybris.platform.cms2.servicelayer.services.admin.CMSAdminSiteService;
import de.hybris.platform.cmsfacades.data.ComponentTypeData;
import de.hybris.platform.cmsfacades.data.StructureTypeCategory;
import de.hybris.platform.cmsfacades.data.StructureTypeMode;
import de.hybris.platform.cmsfacades.types.ComponentTypeFacade;
import de.hybris.platform.cmsfacades.types.ComponentTypeNotFoundException;
import de.hybris.platform.cmsfacades.types.service.ComponentTypeStructure;
import de.hybris.platform.cmsfacades.types.service.ComponentTypeStructureService;
import de.hybris.platform.cmsfacades.types.service.StructureTypeModeService;
import de.hybris.platform.servicelayer.dto.converter.Converter;
import de.hybris.platform.servicelayer.type.TypeService;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;


/**
 * This implementation of the {@link ComponentTypeFacade} will get the
 * {@link de.hybris.platform.core.model.type.ComposedTypeModel} items and convert them to DTOs.
 * <p>
 * The types available are determined by using the {@link ComponentTypeStructureService} to get all registered component
 * types.
 * </p>
 */
public class DefaultComponentTypeFacade implements ComponentTypeFacade
{
	private static final Logger LOG = LoggerFactory.getLogger(DefaultComponentTypeFacade.class);

	private ComponentTypeStructureService componentTypeStructureService;
	private StructureTypeModeService structureTypeModeService;
	private Converter<ComponentTypeStructure, ComponentTypeData> componentTypeStructureConverter;
	private TypeService typeService;
	private CMSAdminSiteService cmsAdminSiteService;

	/**
	 * {@inheritDoc}
	 *
	 * @deprecated
	 */
	@Override
	@Deprecated(since = "1905", forRemoval = true)
	public List<ComponentTypeData> getAllComponentTypes()
	{
		return getAllCmsItemTypes(Arrays.asList(StructureTypeCategory.values()), false);
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @deprecated
	 */
	@Override
	@Deprecated(since = "1905", forRemoval = true)
	public List<ComponentTypeData> getAllComponentTypes(final String category)
	{
		return getAllCmsItemTypes(Collections.singletonList(StructureTypeCategory.valueOf(category)), false);
	}

	@Override
	public List<ComponentTypeData> getAllCmsItemTypes(final List<StructureTypeCategory> categories, final boolean readOnly)
	{
		final Predicate<ComponentTypeStructure> nonNullTypeCode = (structure) -> Objects.nonNull(structure.getTypecode());

		final Predicate<ComponentTypeData> includeCategory = (structure) -> categories //
				.stream() //
				.anyMatch(category -> category.name().equalsIgnoreCase(structure.getCategory()));

		setStructureTypeContext(readOnly);

		return getComponentTypeStructureService().getComponentTypeStructures() //
				.stream() //
				.filter(nonNullTypeCode) //
				.map(this::convertComponentStructure) //
				.filter(Optional::isPresent) //
				.map(Optional::get).filter(includeCategory).collect(toList());
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @deprecated
	 */
	@Override
	@Deprecated(since = "1905", forRemoval = true)
	public ComponentTypeData getComponentTypeByCode(final String code) throws ComponentTypeNotFoundException
	{
		return getCmsItemTypeByCodeAndMode(code, null, false);
	}

	/**
	 * {@inheritDoc}
	 * 
	 * @deprecated
	 */
	@Override
	@Deprecated(since = "1905", forRemoval = true)
	public ComponentTypeData getComponentTypeByCodeAndMode(final String code, final String mode)
			throws ComponentTypeNotFoundException
	{
		return getCmsItemTypeByCodeAndMode(code, mode, false);
	}

	@Override
	public ComponentTypeData getCmsItemTypeByCodeAndMode(final String code, final String mode, final boolean readOnly)
			throws ComponentTypeNotFoundException
	{
		setStructureTypeContext(readOnly);
		final ComponentTypeStructure componentType = Objects.isNull(mode) ? getComponentTypeStructureByCode(code)
				: getStructureTypeModeService().getComponentTypeByCodeAndMode(code, StructureTypeMode.valueOf(mode));
		if (componentType == null)
		{
			throw new ComponentTypeNotFoundException("Component Type [" + code + "] is not supported.");
		}
		return getComponentTypeStructureConverter().convert(componentType);
	}

	/**
	 * Sets the type structure context. The context contains information about whether all attributes for a given type
	 * should be editable or not. In read-only mode, all attributes will have their <tt>editable</tt> property set to
	 * <tt>FALSE</tt>.
	 *
	 * @param readOnly
	 *           defines whether all attributes will have their <tt>editable</tt> property set to <tt>FALSE</tt>.
	 */
	protected void setStructureTypeContext(final boolean readOnly)
	{
		final Map<String, Object> structureTypeContext = new HashMap<>();
		structureTypeContext.put(TYPE_READONLY_MODE, readOnly);
		getCmsAdminSiteService().setTypeContext(structureTypeContext);
	}

	/**
	 * Returns a {@link ComponentTypeStructure} by its code.
	 *
	 * @param code
	 *           - the code of the cms item type.
	 * @return the {@link ComponentTypeStructure}
	 * @throws ComponentTypeNotFoundException
	 *            if cms item type can not be found by its code.
	 */
	protected ComponentTypeStructure getComponentTypeStructureByCode(final String code) throws ComponentTypeNotFoundException
	{
		final ComponentTypeStructure componentType = getComponentTypeStructureService().getComponentTypeStructure(code);
		if (componentType == null)
		{
			throw new ComponentTypeNotFoundException("Component Type [" + code + "] is not supported.");
		}

		return componentType;
	}

	/**
	 * Converts {@link ComponentTypeStructure} to {@link ComponentTypeData}. Returns <tt>null</tt> in case of
	 * {@link TypePermissionException}.
	 *
	 * @param structure
	 *           the {@link ComponentTypeStructure}
	 * @return the {@link ComponentTypeData}
	 */
	protected Optional<ComponentTypeData> convertComponentStructure(final ComponentTypeStructure structure)
	{
		try
		{
			return Optional.of(getComponentTypeStructureConverter().convert(structure));
		}
		catch (final TypePermissionException e)
		{
			if (LOG.isDebugEnabled())
			{
				LOG.debug("Insufficient type permission", e);
			}
			return Optional.empty();
		}
	}

	protected ComponentTypeStructureService getComponentTypeStructureService()
	{
		return componentTypeStructureService;
	}

	@Required
	public void setComponentTypeStructureService(final ComponentTypeStructureService componentTypeStructureService)
	{
		this.componentTypeStructureService = componentTypeStructureService;
	}

	protected Converter<ComponentTypeStructure, ComponentTypeData> getComponentTypeStructureConverter()
	{
		return componentTypeStructureConverter;
	}

	@Required
	public void setComponentTypeStructureConverter(
			final Converter<ComponentTypeStructure, ComponentTypeData> componentTypeStructureConverter)
	{
		this.componentTypeStructureConverter = componentTypeStructureConverter;
	}

	protected TypeService getTypeService()
	{
		return typeService;
	}

	@Required
	public void setTypeService(final TypeService typeService)
	{
		this.typeService = typeService;
	}

	protected StructureTypeModeService getStructureTypeModeService()
	{
		return structureTypeModeService;
	}

	@Required
	public void setStructureTypeModeService(final StructureTypeModeService structureTypeModeService)
	{
		this.structureTypeModeService = structureTypeModeService;
	}

	protected CMSAdminSiteService getCmsAdminSiteService()
	{
		return cmsAdminSiteService;
	}

	@Required
	public void setCmsAdminSiteService(final CMSAdminSiteService cmsAdminSiteService)
	{
		this.cmsAdminSiteService = cmsAdminSiteService;
	}
}
