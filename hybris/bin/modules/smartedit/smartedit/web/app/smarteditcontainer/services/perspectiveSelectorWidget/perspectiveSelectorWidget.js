/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('perspectiveSelectorModule', [
        'yjqueryModule',
        'iframeClickDetectionServiceModule',
        'smarteditServicesModule',
        'yPopoverModule',
        'seConstantsModule'
    ])
    .constant('isE2eTestingActive', false)
    .controller('PerspectiveSelectorController', function($log, $timeout, $translate, yjQuery, perspectiveService, iframeClickDetectionService, $scope, $document, systemEventService, EVENT_PERSPECTIVE_ADDED, EVENT_PERSPECTIVE_CHANGED, EVENT_PERSPECTIVE_REFRESHED, ALL_PERSPECTIVE, EVENTS, crossFrameEventService, isE2eTestingActive, EVENT_STRICT_PREVIEW_MODE_REQUESTED, NONE_PERSPECTIVE) {
        var perspectives = [];
        var displayedPerspectives = [];

        var unRegOverlayDisabledFn;
        var unRegPerspectiveAddedFn;
        var unRegPerspectiveChgFn;
        var unRegUserHasChanged;
        var unRegPerspectiveRefreshFn;
        var unRegStrictPreviewModeToggleFn;

        this.activePerspective = null;
        this.isOpen = false;
        this.isDisabled = false;

        var closeDropdown = function() {
            this.isOpen = false;
        }.bind(this);

        var onPerspectiveAdded = function() {
            perspectiveService.getPerspectives().then(function(result) {
                perspectives = result;
                displayedPerspectives = this._filterPerspectives(perspectives);
            }.bind(this));
        }.bind(this);

        this.refreshPerspectives = function() {
            perspectiveService.getPerspectives().then(function(result) {
                perspectives = result;
                this._refreshActivePerspective();
                displayedPerspectives = this._filterPerspectives(perspectives);
            }.bind(this));
        };

        this.$onInit = function() {
            this.activePerspective = null;
            iframeClickDetectionService.registerCallback('perspectiveSelectorClose', closeDropdown);

            unRegOverlayDisabledFn = systemEventService.subscribe('OVERLAY_DISABLED', closeDropdown);
            unRegPerspectiveAddedFn = systemEventService.subscribe(EVENT_PERSPECTIVE_ADDED, onPerspectiveAdded);

            unRegPerspectiveChgFn = crossFrameEventService.subscribe(EVENT_PERSPECTIVE_CHANGED, this.refreshPerspectives.bind(this));
            unRegPerspectiveRefreshFn = crossFrameEventService.subscribe(EVENT_PERSPECTIVE_REFRESHED, this.refreshPerspectives.bind(this));
            unRegUserHasChanged = crossFrameEventService.subscribe(EVENTS.USER_HAS_CHANGED, onPerspectiveAdded);
            unRegStrictPreviewModeToggleFn = crossFrameEventService.subscribe(EVENT_STRICT_PREVIEW_MODE_REQUESTED, function(eventId, isDisabled) {
                this.togglePerspectiveSelector(isDisabled);
            }.bind(this));

            onPerspectiveAdded();

            $document.on('click', function(event) {
                $timeout(function() {
                    if (yjQuery(event.target).parents('.se-perspective-selector').length <= 0 && this.isOpen) {
                        closeDropdown();
                    }
                });
            }.bind(this));
        };

        this.$onDestroy = function() {
            unRegOverlayDisabledFn();
            unRegPerspectiveAddedFn();
            unRegPerspectiveChgFn();
            unRegPerspectiveRefreshFn();
            unRegUserHasChanged();
            unRegStrictPreviewModeToggleFn();
        };

        this.selectPerspective = function(choice) {
            try {
                perspectiveService.switchTo(choice);
                closeDropdown();
            } catch (e) {
                $log.error("selectPerspective() - Cannot select perspective.", e);
            }
        };

        this.getDisplayedPerspectives = function() {
            return displayedPerspectives;
        };

        this.getActivePerspectiveName = function() {
            return this.activePerspective ? this.activePerspective.nameI18nKey : '';
        };

        this.hasActivePerspective = function() {
            return this.activePerspective !== null;
        };

        this.isTooltipVisible = function() {
            return !!this.activePerspective && !!this.activePerspective.descriptionI18nKey &&
                this.checkTooltipVisibilityCondition();
        };

        this.checkTooltipVisibilityCondition = function() {
            if (
                this.activePerspective.key !== NONE_PERSPECTIVE ||
                (this.activePerspective.key === NONE_PERSPECTIVE && this.isDisabled)
            ) {
                return true;
            }
            return false;
        };

        this._filterPerspectives = function(perspectives) {
            return perspectives.filter(function(perspective) {
                var isActivePerspective = this.activePerspective && (perspective.key === this.activePerspective.key);
                var isAllPerspective = perspective.key === ALL_PERSPECTIVE;

                return !isActivePerspective && (!isAllPerspective || isE2eTestingActive);
            }.bind(this));
        };

        this.getTooltipTemplate = function() {
            return '<div>' + $translate.instant(this.activePerspective.descriptionI18nKey) + '</div>';
        };

        this._refreshActivePerspective = function() {
            this.activePerspective = perspectiveService.getActivePerspective();
        };

        this.togglePerspectiveSelector = function(value) {
            this.isDisabled = value;
        };
    })
    .component('perspectiveSelector', {
        templateUrl: 'perspectiveSelectorWidgetTemplate.html',
        controller: 'PerspectiveSelectorController'
    });
