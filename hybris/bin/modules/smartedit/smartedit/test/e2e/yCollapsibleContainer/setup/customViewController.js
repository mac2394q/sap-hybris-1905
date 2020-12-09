/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module("customViewModule", [
        "yCollapsibleContainerModule"
    ])

    .constant("PATH_TO_CUSTOM_VIEW", "setup/customView.html")

    .controller("customViewController", function(
        COLLAPSIBLE_CONTAINER_CONSTANTS
    ) {

        this.resetSetup = function() {

            // emptying configuration
            for (var key in this.configuration) {
                if (this.configuration.hasOwnProperty(key)) {
                    delete this.configuration[key];
                }
            }

            // applying all default configuration
            for (key in COLLAPSIBLE_CONTAINER_CONSTANTS.DEFAULT_CONFIGURATION) {
                if (COLLAPSIBLE_CONTAINER_CONSTANTS.DEFAULT_CONFIGURATION.hasOwnProperty(key)) {
                    this.configuration[key] = COLLAPSIBLE_CONTAINER_CONSTANTS.DEFAULT_CONFIGURATION[key];
                }
            }

        };

        // initialization
        this.configuration = {};
        this.resetSetup();

    });
