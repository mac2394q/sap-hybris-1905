/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('dynamicPageListAppModule', ['coretemplates', 'yjqueryModule', 'dynamicPagedListModule', 'templateCacheDecoratorModule', 'smarteditServicesModule', 'e2eBackendMocks'])
    .run(function($q, permissionService) {
        permissionService.registerRule({
            names: ['se.some.rule'],
            verify: function() {
                return $q.when(window.sessionStorage.getItem("PERSPECTIVE_SERVICE_RESULT") === 'true');
            }
        });

        permissionService.registerPermission({
            aliases: ['se.edit.page'],
            rules: ['se.some.rule']
        });
    })
    .controller('defaultController', function(yjQuery) {
        this.query = {
            value: ""
        };

        this.pagedListConfig = {
            sortBy: 'name',
            reversed: false,
            itemsPerPage: 10,
            displayCount: true
        };
        this.pagedListConfig.uri = '/pagedItems';

        this.pagedListConfig.keys = [{
            property: 'name',
            i18n: 'pagelist.headerpagetitle',
            sortable: true
        }, {
            property: 'uid',
            i18n: 'pagelist.headerpageid'
        }, {
            property: 'typeCode',
            i18n: 'pagelist.headerpagetype'
        }, {
            property: 'template',
            i18n: 'pagelist.headerpagetemplate'
        }, {
            property: 'dropdownitems',
            i18n: ''
        }];



        this.pagedListConfig.dropdownItems = [{
            key: 'pagelist.dropdown.edit',
            callback: function() {
                yjQuery('.se-paged-list-table tbody tr:nth-child(1) .se-paged-list-item-name a').addClass('link-clicked');
            }.bind(this)
        }];

        this.pagedListConfig.renderers = {
            name: function() {
                return "<a data-ng-click=\"$ctrl.config.injectedContext.changeColor($parent.$parent.$index)\">{{ item[column.property] }}</a>";
            },
            uid: function() {
                return "<span class='custom'> {{ item[column.property] }} </span>";
            },
            dropdownitems: function() {
                return '<div has-operation-permission="$ctrl.config.injectedContext.permissionForDropdownItems" class="paged-list-table__body__td paged-list-table__body__td-menu"><y-drop-down-menu dropdown-items="$ctrl.config.injectedContext.dropdownItems" selected-item="item" class="y-dropdown pull-right" /></div>';
            }
        };

        // injectedContext Object. This object is passed to the dynamic-paged-list directive.
        this.pagedListConfig.injectedContext = {
            changeColor: function(index) {
                var nth = index + 1;
                yjQuery('.se-paged-list-table tbody tr:nth-child(' + nth + ') .se-paged-list-item-name a').addClass('visited');
            },
            dropdownItems: this.pagedListConfig.dropdownItems,
            permissionForDropdownItems: 'se.edit.page'
        };

    });
