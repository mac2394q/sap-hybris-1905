/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationservices.model.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.integrationservices.model.TypeAttributeDescriptor
import de.hybris.platform.servicelayer.model.ModelService
import org.junit.Test
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class StandardAttributeValueAccessorUnitTest extends Specification {

	private static final def SPANISH = new Locale("es")

	def attributeDescriptor = Stub TypeAttributeDescriptor
	def modelService = Mock ModelService
	def attributeValueAccessor = new StandardAttributeValueAccessor(attributeDescriptor, modelService)

	@Test
	@Unroll
	def "throws exception when instantiated with null #paramName"() {
		when:
		new StandardAttributeValueAccessor(descriptor, service)

		then:
		def e = thrown IllegalArgumentException
		e.message.toLowerCase().contains paramName

		where:
		paramName              | descriptor                    | service
		'attribute descriptor' | null                          | Stub(ModelService)
		'model service'        | Stub(TypeAttributeDescriptor) | null
	}

	@Test
	def 'uses attribute qualifier when getting value from the model service'() {
		given: 'attribute name differs from attribute qualifier'
		attributeDescriptor.getAttributeName() >> 'name'
		attributeDescriptor.getQualifier() >> 'qualifier'
		and: 'an item model to get value for'
		def item = Stub ItemModel
		and: 'the model service returns different values for attribute name and qualifier'
		modelService.getAttributeValue(item, attributeDescriptor.attributeName) >> 'name value'
		modelService.getAttributeValue(item, attributeDescriptor.qualifier) >> 'qualifier value'

		expect:
		attributeValueAccessor.getValue(item) == 'qualifier value'
	}

	@Test
	@Unroll
	def "uses attribute qualifier when getting #locale locale value from the model service"() {
		given: 'attribute name differs from attribute qualifier'
		attributeDescriptor.getAttributeName() >> 'name'
		attributeDescriptor.getQualifier() >> 'qualifier'
		and: 'an item model to get value for'
		def item = Stub ItemModel
		and: 'the model service returns different values for attribute name and qualifier'
		modelService.getAttributeValue(item, attributeDescriptor.attributeName, locale) >> 'name value'
		modelService.getAttributeValue(item, attributeDescriptor.qualifier, locale) >> 'qualifier value'

		expect:
		attributeValueAccessor.getValue(item, locale) == 'qualifier value'

		where:
		locale << [Locale.ENGLISH, null]
	}

	@Test
	def "uses attribute qualifiers when getting multiple locales values from the model service"() {
		given: 'attribute name differs from attribute qualifier'
		attributeDescriptor.getAttributeName() >> 'name'
		attributeDescriptor.getQualifier() >> 'qualifier'
		and: 'an item model to get value for'
		def item = Stub ItemModel
		and: 'the model service returns different values for attribute name and qualifier'
		modelService.getAttributeValues(item, attributeDescriptor.attributeName, Locale.ENGLISH, SPANISH) >> nameValues
		modelService.getAttributeValues(item, attributeDescriptor.qualifier, Locale.ENGLISH, SPANISH) >> qualifierValues

		def values = attributeValueAccessor.getValues(item, Locale.ENGLISH, SPANISH)
		expect:
		values == qualifierValues

		where:
		nameValues                                                      | qualifierValues
		[(Locale.ENGLISH): 'name value', (SPANISH): 'valor del nombre'] | [(Locale.ENGLISH): 'qualifier value', (SPANISH): 'valor del calificador']
	}

	@Test
	def 'returns null value for a null item model'() {
		when:
		def value = attributeValueAccessor.getValue null

		then:
		0 * modelService._
		!value
	}

	@Test
	def 'returns null localized value for a null item model'() {
		when:
		def value = attributeValueAccessor.getValue null, Locale.ENGLISH

		then:
		0 * modelService._
		!value
	}

	@Test
	def 'returns null localized values for a null item model'() {
		when:
		def value = attributeValueAccessor.getValues null, Locale.ENGLISH, SPANISH

		then:
		0 * modelService._
		!value
	}
}
