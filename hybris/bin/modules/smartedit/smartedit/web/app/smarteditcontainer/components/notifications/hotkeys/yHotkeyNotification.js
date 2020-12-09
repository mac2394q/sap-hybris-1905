/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('yHotkeyNotificationModule', [])
    /*
     * This component renders the hotke notification template which includes the required key(s),
     * a title and optional message.
     */
    .component('yHotkeyNotification', {
        templateUrl: 'yHotkeyNotificationTemplate.html',
        controller: function() {},
        bindings: {
            hotkeyNames: '<',
            title: '<',
            message: '<?'
        }
    });
