/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('displayConditionsPrimaryPageControllerModule', [])
    .controller('displayConditionsPrimaryPageController', function() {
        this.associatedPrimaryPageLabelI18nKey = 'se.cms.display.conditions.primary.page.label';

        this.triggerOnPrimaryPageSelect = function() {
            this.onPrimaryPageSelect({
                primaryPage: this.associatedPrimaryPage
            });
        };
    });
