/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.hybris.yprofile.listeners;

import com.hybris.yprofile.consent.services.ConsentService;
import com.hybris.yprofile.services.ProfileConfigurationService;
import com.hybris.yprofile.services.ProfileTransactionService;
import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.commerceservices.event.LoginSuccessEvent;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.servicelayer.session.impl.DefaultSessionTokenService;
import de.hybris.platform.store.BaseStoreModel;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@UnitTest
public class LoginSuccessEventListenerTest {

    private static final String CONSENT_REFERENCE_ID = "1410d071-4efb-44e8-b33c-9ba30a03f24a";

    private LoginSuccessEventListener loginSuccessEventListener;

    @Mock
    private ProfileTransactionService profileTransactionService;

    @Mock
    private DefaultSessionTokenService defaultSessionTokenService;

    @Mock
    private ProfileConfigurationService profileConfigurationService;

    @Mock
    private ConsentService consentService;

    @Mock
    private LoginSuccessEvent loginSuccessEvent;

    @Before
    public void setUp() throws Exception {

        MockitoAnnotations.initMocks(this);
        loginSuccessEventListener = new LoginSuccessEventListener();
        loginSuccessEventListener.setConsentService(consentService);
        loginSuccessEventListener.setProfileTransactionService(profileTransactionService);
        loginSuccessEventListener.setDefaultSessionTokenService(defaultSessionTokenService);
        loginSuccessEventListener.setProfileConfigurationService(profileConfigurationService);

        when(defaultSessionTokenService.getOrCreateSessionToken()).thenReturn("someToken");
        BaseStoreModel baseStoreModel = mock(BaseStoreModel.class);
        when(baseStoreModel.getUid()).thenReturn("myBaseStore");
        when(loginSuccessEvent.getBaseStore()).thenReturn(baseStoreModel);

    }

    @Test
    public void testLoginSuccessWhenConsentReferenceFromSessionIsNotNull() {

        when(consentService.getConsentReferenceFromSession()).thenReturn(CONSENT_REFERENCE_ID);
        CustomerModel customerModel = mock(CustomerModel.class);

        when(loginSuccessEvent.getCustomer()).thenReturn(customerModel);
        when(profileConfigurationService.isProfileTagDebugEnabledInSession()).thenReturn(true);

        loginSuccessEventListener.onSiteEvent(loginSuccessEvent);

        verify(this.profileTransactionService, times(1)).sendLoginEvent(any(CustomerModel.class), eq(CONSENT_REFERENCE_ID), anyString(), anyString());
    }

    @Test
    public void testLoginSuccessWhenConsentReferenceFromCustomerModelIsNotNull() {

        when(consentService.getConsentReferenceFromSession()).thenReturn(null);
        CustomerModel customerModel = mock(CustomerModel.class);
        when(customerModel.getConsentReference()).thenReturn(CONSENT_REFERENCE_ID);

        when(loginSuccessEvent.getCustomer()).thenReturn(customerModel);
        when(profileConfigurationService.isProfileTagDebugEnabledInSession()).thenReturn(true);

        loginSuccessEventListener.onSiteEvent(loginSuccessEvent);

        verify(this.profileTransactionService, times(1)).sendLoginEvent(any(CustomerModel.class), eq(CONSENT_REFERENCE_ID), anyString(), anyString());
    }

    @Test
    public void testLoginSuccessWhenConsentReferenceIsNull() {

        when(consentService.getConsentReferenceFromSession()).thenReturn(null);
        CustomerModel customerModel = mock(CustomerModel.class);
        when(customerModel.getConsentReference()).thenReturn(null);

        when(loginSuccessEvent.getCustomer()).thenReturn(customerModel);
        when(profileConfigurationService.isProfileTagDebugEnabledInSession()).thenReturn(true);

        loginSuccessEventListener.onSiteEvent(loginSuccessEvent);

        verify(this.profileTransactionService, never()).sendLoginEvent(any(CustomerModel.class), anyString(), anyString(), anyString());
    }
}