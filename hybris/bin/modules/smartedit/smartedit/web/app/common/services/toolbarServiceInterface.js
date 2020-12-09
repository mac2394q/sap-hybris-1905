/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('toolbarInterfaceModule', ['functionsModule'])

    /**
     * @ngdoc service
     * @name toolbarInterfaceModule.ToolbarServiceInterface
     *
     * @description
     * Provides an abstract extensible toolbar service. Used to manage and perform actions to either the SmartEdit
     * application or the SmartEdit container.
     *
     * This class serves as an interface and should be extended, not instantiated.
     */
    .factory('ToolbarServiceInterface', function($q, $log, $templateCache, generateIdentifier, permissionService) {

        /////////////////////////////////////
        // ToolbarServiceInterface Prototype
        /////////////////////////////////////

        function ToolbarServiceInterface() {}

        ToolbarServiceInterface.prototype.getItems = function() {
            return this.actions;
        };

        ToolbarServiceInterface.prototype.getAliases = function() {
            return this.aliases;
        };

        /**
         * @ngdoc method
         * @name toolbarInterfaceModule.ToolbarServiceInterface#addItems
         * @methodOf toolbarInterfaceModule.ToolbarServiceInterface
         *
         * @description
         * Takes an array of actions and maps them internally for display and trigger through an internal callback key.
         * The action's properties are made available through the included template by a variable named 'item'.
         * 
         * The toolbar item can accept a context that is displayed beside the toolbar item using either ContextTemplate or ContextTemplateUrl. This context
         * can be shown or hidden by calling the events {@link seConstantsModule.object:SHOW_TOOLBAR_ITEM_CONTEXT SHOW_TOOLBAR_ITEM_CONTEXT} and 
         * {@link seConstantsModule.object:HIDE_TOOLBAR_ITEM_CONTEXT HIDE_TOOLBAR_ITEM_CONTEXT} respectively. Both the events need the key of the toolbar item as data.
         * 
         * @example crossFrameEventService.publish(SHOW_TOOLBAR_ITEM_CONTEXT, 'toolbar.item.key');
         *
         * @param {Object[]} actions - List of actions
         * @param {String} actions.key - Unique identifier of the toolbar action item.
         * @param {Function} actions.callback - Callback triggered when this toolbar action item is clicked.
         * @param {String} actions.nameI18nkey - Name translation key
         * @param {String} actions.descriptionI18nkey - Description translation key
         * @param {String[]=} actions.icons - List of image URLs for the icon images (only for ACTION and HYBRID_ACTION)
         * @param {String} actions.type - TEMPLATE, ACTION, or HYBRID_ACTION
         * @param {String} actions.include - HTML template URL (only for TEMPLATE and HYBRID_ACTION)
         * @param {Integer} actions.priority - Determines the position of the item in the toolbar, ranging from 0-1000 with the default priority being 500.
         * An item with a higher priority number will be to the right of an item with a lower priority number in the toolbar.
         * @param {String} actions.section - Determines the sections(left, middle or right) of the item in the toolbar.
         * @param {String=} actions.iconClassName - List of classes used to display icons from fonts
         * @param {String=} actions.actionButtonFormat - Formats the button in compact/header-toolbar manner if 'compact' param is passed
         * @param {Boolean=} [actions.keepAliveOnClose=false] - Keeps the dropdown content in the DOM on close.
         * @param {String=} actions.contextTemplate - the context template that needs to be displayed for the toolbar item.
         * @param {String=} actions.contextTemplateUrl - the path to the context template that needs to be displayed for the toolbar item.
         * @param {String=} actions.dropdownPosition - Arranges the dropdown in either of these left/center/right positions.
         * @param {String[]=} actions.permissions - List of permission names used to determine whether to show or hide the toolbar item.
         */
        ToolbarServiceInterface.prototype.addItems = function(actions) {
            var promisesToResolve = actions.filter(function(action) {
                // Validate provided actions -> The filter will return only valid items.
                var includeAction = true;

                if (!action.key) {
                    $log.error("addItems() - Cannot add action without key.");
                    includeAction = false;
                }

                if (action.contextTemplate && action.contextTemplateUrl) {
                    $log.error("addItems() - Toolbar item should contain only one of contextTemplate or contextTemplateUrl");
                    includeAction = false;
                }

                return includeAction;
            }.bind(this)).map(function(action) {
                var key = action.key;
                this.actions[key] = action.callback;

                var generatedContextTemplateUrl;
                if (action.contextTemplate) {
                    generatedContextTemplateUrl = "toolbarItemContextTemplate" + btoa(generateIdentifier());
                    $templateCache.put(generatedContextTemplateUrl, action.contextTemplate);
                } else {
                    generatedContextTemplateUrl = action.contextTemplateUrl;
                }

                var toolbarItem = {
                    key: key,
                    name: action.nameI18nKey,
                    iconClassName: action.iconClassName,
                    description: action.descriptionI18nKey,
                    icons: action.icons,
                    type: action.type,
                    include: action.include,
                    className: action.className,
                    priority: action.priority || 500,
                    section: action.section || 'left',
                    isOpen: false,
                    actionButtonFormat: action.actionButtonFormat,
                    keepAliveOnClose: action.keepAliveOnClose || false,
                    contextTemplateUrl: generatedContextTemplateUrl,
                    dropdownPosition: action.dropdownPosition
                };

                if (action.permissions) {
                    toolbarItem.permissions = action.permissions;
                }

                return this._populateIsPermissionGranted(toolbarItem);

            }, this);

            $q.all(promisesToResolve).then(function(aliases) {
                if (aliases.length > 0) {
                    this.addAliases(aliases);
                }
            }.bind(this));
        };

        ToolbarServiceInterface.prototype._populateIsPermissionGranted = function(toolbarItem) {
            if (toolbarItem.permissions) {
                return permissionService.isPermitted([{
                    names: toolbarItem.permissions
                }]).then(function(isGranted) {
                    toolbarItem.isPermissionGranted = isGranted;
                    return $q.when(toolbarItem);
                });
            } else {
                toolbarItem.isPermissionGranted = true;
                return $q.when(toolbarItem);
            }
        };

        /////////////////////////////////////
        // Proxied Functions : these functions will be proxied if left unimplemented
        /////////////////////////////////////

        ToolbarServiceInterface.prototype.addAliases = function() {};

        ToolbarServiceInterface.prototype.removeItemByKey = function() {};

        ToolbarServiceInterface.prototype._removeItemOnInner = function() {};

        ToolbarServiceInterface.prototype.removeAliasByKey = function() {};

        ToolbarServiceInterface.prototype.addItemsStyling = function() {};

        ToolbarServiceInterface.prototype.triggerActionOnInner = function() {};

        return ToolbarServiceInterface;
    });
