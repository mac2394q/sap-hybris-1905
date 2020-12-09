/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.saporderexchangeoms.cancellation;


import de.hybris.bootstrap.annotations.IntegrationTest;
import de.hybris.platform.warehousing.replacement.OrderManagementOrderCancelCompleteTest;
import org.junit.Assert;
import org.junit.Test;

/*
    Replacement test made for GRIFFIN-3201, empty test since the test it replaces replaces another test itself
     with pointless test due to functionality not being possible in OMS scenario
 */
@IntegrationTest(replaces = OrderManagementOrderCancelCompleteTest.class)
public class ReplaceOrderManagementOrderCancelCompleteTest {

    @Test
    public void testCompleteCancels(){
        Assert.assertEquals(true, true);
    }
}
