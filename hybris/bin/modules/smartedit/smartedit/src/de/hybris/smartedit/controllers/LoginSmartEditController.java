/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.smartedit.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import static de.hybris.smartedit.controllers.Page.LOGIN_PAGE;

@Controller
public class LoginSmartEditController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginPage()
    {
        return LOGIN_PAGE.getViewName();
    }

}