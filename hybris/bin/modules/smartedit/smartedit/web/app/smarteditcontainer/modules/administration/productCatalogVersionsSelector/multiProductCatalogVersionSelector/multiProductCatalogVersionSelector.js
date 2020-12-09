/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('multiProductCatalogVersionSelectorModule', [])
    .controller('multiProductCatalogVersionSelectorController', function($q) {

        this.$onInit = function() {
            this.OriginalProductCatalogs = [];

            this.productCatalogs.forEach(function(productCatalog) {

                productCatalog.fetchStrategy = {
                    fetchAll: function() {
                        return $q.when(productCatalog.versions);
                    }
                };

                productCatalog.versions.forEach(function(version) {
                    version.id = version.uuid;
                    version.label = version.version;
                });

                productCatalog.selectedItem = productCatalog.versions.find(function(version) {
                    return this.selectedVersions.indexOf(version.uuid) > -1;
                }.bind(this)).uuid;

            }.bind(this));
        };

        this.updateModel = function() {

            var updatedSelections = this.productCatalogs.map(function(productCatalog) {
                return productCatalog.selectedItem;
            });

            this.onSelectionChange({
                $selectedVersions: updatedSelections
            });
        }.bind(this);

    })
    .component('multiProductCatalogVersionSelector', {
        templateUrl: "multiProductCatalogVersionSelectorTemplate.html",
        controller: "multiProductCatalogVersionSelectorController",
        bindings: {
            'productCatalogs': '<',
            'selectedVersions': '<',
            'onSelectionChange': '&'
        }
    });
