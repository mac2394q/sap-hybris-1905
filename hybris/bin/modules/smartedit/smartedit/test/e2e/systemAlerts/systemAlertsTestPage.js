/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('systemAlertsTestPageModule', [
        'alertServiceModule'
    ])

    .controller('systemAlertsTestController', function($scope, alertService) {


        // default for manual testing
        // automation starts each test with reset()
        this.alert = {
            message: '',
            type: 'information',
            closeable: true,
            timeout: 5000,
            template: '',
            templateUrl: ''
        };

        this.types = ['information', 'warning', 'error', 'success'];

        this.count = 1;

        this.addAlert = function() {
            if (this.alert.messagePlaceholders) {
                this.alert.messagePlaceholders = $scope.$eval(this.alert.messagePlaceholders);
            }
            for (var i = 0; i < this.count; i++) {
                alertService.showAlert(this.alert);
            }
        };

        this.reset = function() {
            this.alert = {};
        };

    })

    .component('systemAlertsTest', {
        controller: 'systemAlertsTestController',
        templateUrl: '/test/e2e/systemAlerts/systemAlertsTestPageTemplate.html'
    });

angular.module('smarteditcontainer').requires.push('systemAlertsTestPageModule');
