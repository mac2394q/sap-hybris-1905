/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name yMessageModule
 * @description
 * This module provides the yMessage component, which is responsible for rendering contextual
 * feedback messages for the user actions.
 */
angular.module('yMessageModule', [])
    .controller('YMessageController', function() {
        this.$onInit = function() {
            this.messageId = this.messageId || 'y-message-default-id';
            switch (this.type) {
                case 'danger':
                    this.classes = 'fd-alert--error';
                    break;
                case 'info':
                    this.classes = 'fd-alert--information';
                    break;
                case 'success':
                    this.classes = 'fd-alert--success';
                    break;
                case 'warning':
                    this.classes = 'fd-alert--warning';
                    break;
                default:
                    this.classes = 'fd-alert--information';
            }
        };
    })
    /**
     *  @ngdoc directive
     *  @name yMessageModule.component:yMessage
     *  @scope
     *  @restrict E
     *  @element yMessage
     *
     *  @description
     *  This component provides contextual feedback messages for the user actions. To provide title and description for the yMessage
     *  use transcluded elements: message-title and message-description.
     *  @param {@String=} messageId Id for the component.
     *  @param {@String} type The type of the component (danger, info, success, warning). Default: info
     */
    .component('yMessage', {
        templateUrl: 'yMessage.html',
        controller: 'YMessageController',
        transclude: {
            messageTitle: '?messageTitle',
            messageDescription: '?messageDescription'
        },
        bindings: {
            messageId: '@?',
            type: '@'
        }
    });
