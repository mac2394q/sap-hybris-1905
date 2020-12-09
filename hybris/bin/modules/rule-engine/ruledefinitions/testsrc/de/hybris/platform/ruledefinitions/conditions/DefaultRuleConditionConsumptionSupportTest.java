/*
 * [y] hybris Platform
 *
 * Copyright (c) 2019 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.ruledefinitions.conditions;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.ruleengineservices.compiler.RuleCompilerContext;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeOperator;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeRelCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrCondition;
import de.hybris.platform.ruleengineservices.configuration.Switch;
import de.hybris.platform.ruleengineservices.configuration.SwitchService;
import de.hybris.platform.ruleengineservices.rao.ProductConsumedRAO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.List;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;


@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class DefaultRuleConditionConsumptionSupportTest
{
	private static final String ORDER_ENTRY_RAO_VAR = "orderEntryRaoVariable";
	private static final String PRODUCT_CONSUMED_RAO_VAR = "productConsumedRaoVariable";
	private static final String AVAILABLE_QUANTITY_VAR = "availableQuantity";

	@Mock
	private SwitchService switchService;
	@Mock
	private RuleCompilerContext context;

	@InjectMocks
	private DefaultRuleConditionConsumptionSupport support;

	@Before
	public void setUp()
	{
		when(context.generateVariable(ProductConsumedRAO.class)).thenReturn(PRODUCT_CONSUMED_RAO_VAR);
	}

	@Test
	public void shouldReturnEmptyListWhenConsumptionIsDisabled()
	{
		when(switchService.isEnabled(Switch.CONSUMPTION)).thenReturn(false);
		assertTrue(support.newProductConsumedCondition(context, ORDER_ENTRY_RAO_VAR).isEmpty());
	}

	@Test
	public void shouldReturnConsumedConditionsWhenConsumptionIsEnabled()
	{
		when(switchService.isEnabled(Switch.CONSUMPTION)).thenReturn(true);

		final List<RuleIrCondition> ruleIrConditions = support.newProductConsumedCondition(context, ORDER_ENTRY_RAO_VAR);

		assertThat(ruleIrConditions.get(0), instanceOf(RuleIrAttributeRelCondition.class));
		final RuleIrAttributeRelCondition ruleIrCartConsumedCondition = (RuleIrAttributeRelCondition) ruleIrConditions.get(0);
		assertEquals(RuleIrAttributeOperator.EQUAL, ruleIrCartConsumedCondition.getOperator());
		assertEquals(ORDER_ENTRY_RAO_VAR, ruleIrCartConsumedCondition.getTargetVariable());

		assertThat(ruleIrConditions.get(1), instanceOf(RuleIrAttributeCondition.class));
		final RuleIrAttributeCondition ruleIrAvailableQtyCondition = (RuleIrAttributeCondition) ruleIrConditions.get(1);
		assertEquals(RuleIrAttributeOperator.GREATER_THAN_OR_EQUAL, ruleIrAvailableQtyCondition.getOperator());
		assertEquals(AVAILABLE_QUANTITY_VAR, ruleIrAvailableQtyCondition.getAttribute());
	}
}
