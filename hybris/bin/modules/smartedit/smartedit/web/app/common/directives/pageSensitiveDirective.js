/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name pageSensitiveDirectiveModule
 * @description
 * This module defines the {@link pageSensitiveDirectiveModule.directive:pageSensitive pageSensitive} attribute directive.
 **/
angular.module('pageSensitiveDirectiveModule', ['smarteditServicesModule'])

    .controller('pageSensitiveController', function($timeout, EVENTS, crossFrameEventService) {

        this.$onInit = function() {
            this.hasContent = true;
            this.unRegisterPageChangeListener = crossFrameEventService.subscribe(EVENTS.PAGE_CHANGE, function() {
                this.hasContent = false;
                $timeout(function() {
                    this.hasContent = true;
                }.bind(this), 0);
            }.bind(this));
        };

        this.$onDestroy = function() {
            this.unRegisterPageChangeListener();
        };

    })
    /**
     * @ngdoc directive
     * @name pageSensitiveDirectiveModule.directive:pageSensitive
     * @restrict A
     * @description
     * Will cause an Angular re-compilation of the node declaring this directive whenever the page identifier in smartEdit layer changes
     */
    .directive("pageSensitive", function() {
        return {
            restrict: "A",
            replace: false,
            transclude: true,
            template: "<div class='se-page-sensitive' data-ng-if='ctrl.hasContent' data-ng-transclude></div>",
            scope: true,
            controller: 'pageSensitiveController',
            controllerAs: 'ctrl',
            bindToController: true
        };
    });
