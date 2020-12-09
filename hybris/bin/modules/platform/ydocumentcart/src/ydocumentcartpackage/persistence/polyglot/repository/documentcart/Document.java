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
package ydocumentcartpackage.persistence.polyglot.repository.documentcart;

import ydocumentcartpackage.persistence.polyglot.repository.documentcart.Entity.EntityBuilder;
import de.hybris.platform.persistence.polyglot.model.Identity;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;


public class Document
{
	private final Identity rootId;
	private final long version;

	private final Map<Identity, Entity> entities = new HashMap<>();

	public Document(final Identity rootId)
	{
		this(rootId, 0L);
	}

	public Document(final Identity rootId, final long version)
	{
		Objects.requireNonNull(rootId, "rootId mustn't be null.");
		this.rootId = rootId;
		this.version = version;
	}

	public Identity getRootId()
	{
		return rootId;
	}

	public long getVersion()
	{
		return version;
	}

	public boolean isNew()
	{
		return version == 0;
	}

	public Entity getRootEntity()
	{
		return getEntity(getRootId()).orElseThrow(() -> new IllegalStateException("Root entity doesn't exist."));
	}

	public boolean containsEntity(final Identity id)
	{
		return entities.containsKey(id);
	}

	public Optional<Entity> getEntity(final Identity id)
	{
		return Optional.ofNullable(entities.get(id));
	}

	public void addEntity(final Entity entity)
	{
		entities.put(entity.getId(), entity);
	}

	public Set<Identity> getEntityIds()
	{
		return Set.copyOf(entities.keySet());
	}

	public Stream<Entity> allEntities()
	{
		return entities.values().stream();
	}

	public boolean remove(final Entity entity)
	{
		entities.remove(entity.getId());
		return rootId.equals(entity.getId());
	}

	public void apply(final EntityCreation creation)
	{
		final EntityBuilder builder = newEntityBuilder();

		builder.withId(creation.getId());
		creation.forEveryAttribute(builder::withAttribute);

		addEntity(builder.build());
	}

	public void apply(final EntityModification modification)
	{
		final Entity existingEntity = entities.get(modification.getId());

		modification.forEveryChange(existingEntity::set);
	}

	public EntityBuilder newEntityBuilder()
	{
		return Entity.builder(this);
	}
}
