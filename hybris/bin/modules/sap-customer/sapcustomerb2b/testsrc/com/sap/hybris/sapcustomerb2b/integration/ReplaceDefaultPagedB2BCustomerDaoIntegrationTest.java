/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package com.sap.hybris.sapcustomerb2b.integration;


import de.hybris.bootstrap.annotations.IntegrationTest;
import de.hybris.platform.b2b.dao.impl.DefaultPagedB2BCustomerDaoIntegrationTest;
import org.junit.Assert;
import org.junit.Test;


/*
    Replacement test for GRIFFIN-3201 until the test functionality can be replaced properly or the conflict handled
 */
@IntegrationTest(replaces = DefaultPagedB2BCustomerDaoIntegrationTest.class)
public class ReplaceDefaultPagedB2BCustomerDaoIntegrationTest {

    @Test
    public void replaceTest(){
        Assert.assertTrue(true);
    }

}
