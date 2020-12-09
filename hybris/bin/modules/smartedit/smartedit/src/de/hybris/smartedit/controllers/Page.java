/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.smartedit.controllers;


public enum Page {

    LOGIN_PAGE("loginPage"),
    SMART_EDIT_ROOT_PAGE("index");

    private final String viewName;

    Page(final String viewName) {
        this.viewName = viewName;
    }

    public String getViewName() {
        return viewName;
    }
}
