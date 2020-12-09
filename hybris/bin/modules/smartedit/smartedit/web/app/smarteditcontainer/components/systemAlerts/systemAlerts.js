/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name systemAlertsModule
 * @description
 * # systemAlertsModule
 * The systemAlertsModule contains the systemAlerts component.
 */
angular
    .module('systemAlertsModule', ['alertServiceModule'])

    .constant('SE_ALERT_SERVICE_TYPES', {
        INFO: 'information',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'error'
    })

    /**
     * @ngdoc directive
     * @name systemAlertsModule.systemAlerts
     * @restrict E
     * @scope
     * @description
     * The systemAlerts component provides the view layer for system alerts. It renders alerts triggered both from
     * the {@link AlertServiceModule.service:AlertService AlertService} or the lower layer {@link AlertServiceModule.service:AlertFactory AlertFactory}<br />
     * <br />
     * Only use one (1) instance of the systemAlerts component and use it at the root. If you remove this unique instance
     * of the component no alerts will be rendered. If you add multiple instances of the component, multiple alerts will
     * be rendered, which could cause instability in the SmartEdit web application or the test suite.
     */
    .component('systemAlerts', {
        templateUrl: 'systemAlertsTemplate.html',
        controller: [
            'alertCollectionComponentFacade',
            'SE_ALERT_SERVICE_TYPES',
            function(alertCollectionComponentFacade, SE_ALERT_SERVICE_TYPES) {
                this.$onInit = function() {
                    this.getAlerts = function() {
                        return alertCollectionComponentFacade.getAlerts();
                    };
                };

                this.getAlertType = function(type) {
                    switch (type) {
                        case SE_ALERT_SERVICE_TYPES.SUCCESS:
                            return 'fd-alert--success';
                        case SE_ALERT_SERVICE_TYPES.WARNING:
                            return 'fd-alert--warning';
                        case SE_ALERT_SERVICE_TYPES.DANGER:
                            return 'fd-alert--error';
                    }
                    return 'fd-alert--information';
                };

            }
        ]
    });
