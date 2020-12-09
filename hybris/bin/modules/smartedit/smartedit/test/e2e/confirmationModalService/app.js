/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
window.smartedit = {
    i18nAPIRoot: "somepath"
};

angular.module('app', ['templateCacheDecoratorModule', 'ngMockE2E', 'confirmationModalServiceModule', 'resourceLocationsModule', 'smarteditServicesModule'])
    .component('confirmModalTest', {
        templateUrl: 'test/e2e/confirmationModalService/confirmModalTestCasesTemplate.html',
        controller: "confirmModalTestController"
    })
    .controller("confirmModalTestController", function(confirmationModalService) {
        this.openConfirmationModalWithDescription = function() {
            confirmationModalService.confirm({
                title: 'my.confirmation.title',
                description: 'my.confirmation.message'
            });
        };

        this.openConfirmationModalWithTemplateAndScopeVariables = function() {
            confirmationModalService.confirm({
                title: 'my.confirmation.title',
                template: '<div>scopeParam: {{modalController.scopeParam}}</div>',
                scope: {
                    scopeParam: "Scope Param Rendered"
                }
            });
        };

        this.openConfirmationModalWithTemplateUrlAndScopeVariables = function() {
            confirmationModalService.confirm({
                title: 'my.confirmation.title',
                templateUrl: 'test/e2e/confirmationModalService/confirmModalTestCompTemplate.html',
                scope: {
                    scopeParam: "Scope Param Rendered"
                }
            });
        };
    })
    .controller('defaultController', function($rootScope, $scope, $httpBackend) {
        $httpBackend.whenGET(/Template/).passThrough();
    });
