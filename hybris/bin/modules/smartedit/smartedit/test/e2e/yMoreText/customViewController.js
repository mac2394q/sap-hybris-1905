/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('customViewModule', [
        'coretemplates', 'templateCacheDecoratorModule', 'legacySmarteditCommonsModule', 'translationServiceModule'
    ])
    .constant('PATH_TO_CUSTOM_VIEW', '../../test/e2e/yMoreText/customView.html')
    .controller('customViewController', function() {

    });
