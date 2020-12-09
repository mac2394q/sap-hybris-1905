/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved
 */
package de.hybris.platform.importcockpit.services.impex.generator.operations.impl;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;


@RunWith(Suite.class)
@SuiteClasses(
{
		DefaultFileGeneratorOperationTest.class, //
		AbstractImpexGeneratorOperationTest.class, //
		DefaultDataGeneratorOperationTest.class, //
		DefaultHeaderGeneratorOperationTest.class
})
public class AllTests
{
	//NOPMD
}
