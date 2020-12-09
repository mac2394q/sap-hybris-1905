/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('pageListTemplatePrinterModule', ['cmsSmarteditServicesModule'])
    .controller('pageListTemplatePrinterController', function(cmsitemsRestService) {

        this.$onInit = function() {

            cmsitemsRestService.getById(this.templateUuid).then(function(templateInfo) {
                this.template = templateInfo.uid;
            }.bind(this));

        };
    })
    .component('pageListTemplatePrinter', {
        template: '<div>{{$ctrl.template}}</div>',
        controller: 'pageListTemplatePrinterController',
        bindings: {
            templateUuid: '<'
        }
    });
