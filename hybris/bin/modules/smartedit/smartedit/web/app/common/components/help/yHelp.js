/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('yHelpModule', ['yPopoverModule'])
    /**
     * @ngdoc directive
     * @name yHelpModule.component:yHelp
     * @scope
     * @restrict E
     * @element y-help
     * 
     * @description
     * This component will generate a help button that will show a customizable popover on top of it when hovering.
     * It relies on the {@link yPopoverModule.directive:yPopover yPopover} directive.
     * @param {String} template the HTML body to be used in the popover body, it will automatically be trusted by the directive. Optional but exactly one of either template or templateUrl must be defined.
     * @param {String} templateUrl the location of the HTML template to be used in the popover body. Optional but exactly one of either template or templateUrl must be defined.
     * @param {String} title the title to be used in the popover title section. Optional.
     */
    .component('yHelp', {
        templateUrl: 'yHelpTemplate.html',
        controller: function() {
            this.$onInit = function() {
                this.placement = 'top';
                this.trigger = 'hover';
            };

            this.$onChanges = function(changesObj) {
                if (this.template && changesObj.template) {
                    this.template = "<div>" + this.template + "</div>";
                }
            };
        },
        bindings: {
            title: '<?',
            template: '<?',
            templateUrl: '<?'
        }
    });
