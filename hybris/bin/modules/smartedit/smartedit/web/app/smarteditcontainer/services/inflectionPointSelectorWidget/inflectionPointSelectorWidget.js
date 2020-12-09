/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */

angular.module('inflectionPointSelectorModule', ['yjqueryModule', 'smarteditServicesModule', 'resourceLocationsModule', 'iframeClickDetectionServiceModule'])
    .directive('inflectionPointSelector', function($timeout, DEVICE_SUPPORTS, iframeManagerService, iframeClickDetectionService, systemEventService, $document, yjQuery) {
        return {
            templateUrl: 'inflectionPointSelectorWidgetTemplate.html',
            restrict: 'E',
            transclude: true,
            $scope: {},
            link: function($scope) {
                $scope.selectPoint = function(choice) {

                    $scope.currentPointSelected = choice;
                    $scope.status.isopen = !$scope.status.isopen;

                    if (choice !== undefined) {
                        iframeManagerService.apply(choice, $scope.deviceOrientation);
                    }
                };

                $scope.currentPointSelected = DEVICE_SUPPORTS.find(function(deviceSupport) {
                    return deviceSupport.default;
                });

                $scope.points = DEVICE_SUPPORTS;

                $scope.status = {
                    isopen: false
                };

                $scope.toggleDropdown = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.status.isopen = !$scope.status.isopen;
                };

                iframeClickDetectionService.registerCallback('inflectionPointClose', function() {
                    $scope.status.isopen = false;
                });

                $document.on('click', function(event) {
                    $timeout(function() {
                        if (yjQuery(event.target).parents('inflection-point-selector').length <= 0 && $scope.status.isopen) {
                            $scope.status.isopen = false;
                        }
                    });
                });

                var unRegFn = systemEventService.subscribe('OVERLAY_DISABLED', function() {
                    $scope.status.isopen = false;
                });

                $scope.$on('$destroy', function() {
                    unRegFn();
                });

                $scope.getIconClass = function(choice) {
                    if (choice !== undefined) {
                        return choice.iconClass;
                    } else {
                        return $scope.currentPointSelected.iconClass;
                    }
                };

                $scope.isSelected = function(choice) {
                    if (choice !== undefined) {
                        return choice.type === $scope.currentPointSelected.type;
                    }
                };
            }
        };
    });
