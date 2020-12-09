/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('LoadingTemplates', ['catalogDetailsModule'])
    .run(function(catalogDetailsService) {
        catalogDetailsService.addItems([{
            include: '../../test/e2e/catalogDetails/templateOne.html'
        }]);
        catalogDetailsService.addItems([{
            include: '../../test/e2e/catalogDetails/templateTwo.html'
        }]);
    });
angular.module('smarteditcontainer').requires.push('LoadingTemplates');
