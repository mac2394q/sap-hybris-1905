/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('componentTypesTabModule', ['smarteditServicesModule', 'componentSearchModule', 'componentServiceModule', 'componentTypeModule', 'nameFilterModule'])
    .controller('componentTypesTabController', function($log, systemEventService, ComponentService) {

        // --------------------------------------------------------------------------------------------------
        // Constants
        // --------------------------------------------------------------------------------------------------

        // --------------------------------------------------------------------------------------------------
        // Lifecycle Methods
        // --------------------------------------------------------------------------------------------------
        this.$onInit = function() {
            this._retrieveComponentTypes();
        };

        // --------------------------------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------------------------------
        this.onSearchTermChanged = function(searchTerm) {
            this.searchTerm = searchTerm;
        }.bind(this);

        // --------------------------------------------------------------------------------------------------
        // Helper Methods
        // --------------------------------------------------------------------------------------------------
        /*
            This method is only called on init since the whole component menu is wrapped in the 'page-sensitive' directive.
            This means that if there's a page change, the directive will be recreated. 
        */
        this._retrieveComponentTypes = function() {
            ComponentService.getSupportedComponentTypesForCurrentPage().then(function(supportedTypes) {
                this.componentTypes = supportedTypes;
            }.bind(this)).catch(function(errData) {
                $log.error('ComponentMenuController.$onInit() - error loading types. ' + errData);
            });
        };
    })
    .component('componentTypesTab', {
        templateUrl: 'componentTypesTabTemplate.html',
        controller: 'componentTypesTabController',
        bindings: {}
    });
