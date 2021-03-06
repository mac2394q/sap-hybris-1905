/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('someModule', [
        'textDisplayDecorator',
    ])
    .run(function(decoratorService) {

        decoratorService.addMappings({
            'componentType1': ['textDisplay'],
        });

        decoratorService.enable('textDisplay');
    });
angular.module('textDisplayDecorator', ['decoratortemplates', 'translationServiceModule'])
    .directive('textDisplay', function() {
        return {
            templateUrl: 'textDisplayDecoratorTemplate.html',
            restrict: 'C',
            transclude: true,
            replace: false,
            scope: {
                smarteditComponentId: '@',
                smarteditComponentType: '@',
                active: '='
            },

            link: function($scope) {
                $scope.textDisplayContent = $scope.smarteditComponentId + "_Text_from_dummy_decorator";
            }
        };
    });


angular.module('decoratortemplates', []).run(function($templateCache) {
    'use strict';

    $templateCache.put('textDisplayDecoratorTemplate.html',
        "<div >\n" +
        "<div class=\"row\" data-ng-if=\"!active\">\n" +
        "</div>\n" +
        "{{textDisplayContent}}\n" +
        "<div data-ng-transclude></div>\n" +
        "</div>"
    );
});
