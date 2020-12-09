/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc overview
 * @name genericEditorModalServiceModule
 * @description
 * # The genericEditorModalServiceModule
 *
 * The generic editor modal service module provides a service to open an editor modal window with a tabset inside. The editor modal is populated with a save
 * and cancel button, and allows specifying the different editor tabs.
 *
 */
angular.module('genericEditorModalServiceModule', [
        'confirmationModalServiceModule',
        'coretemplates',
        'smarteditServicesModule',
        'modalServiceModule',
        'yLoDashModule',
        'genericEditorModule',
        'functionsModule'
    ])

    /**
     * @ngdoc service
     * @name genericEditorModalServiceModule.service:genericEditorModalService
     *
     * @description
     * The Generic Editor Modal Service is used to open an editor modal window that contains a tabset.
     *
     */
    .factory('genericEditorModalService', function(modalService, MODAL_BUTTON_ACTIONS, MODAL_BUTTON_STYLES, TYPES_RESOURCE_URI, CMS_LINK_TO_RELOAD_STRUCTURE_EVENT_ID, CONTEXT_SITE_ID, GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT, confirmationModalService, crossFrameEventService) {
        function GenericEditorModalService() {}

        /**
         * @ngdoc method
         * @name genericEditorModalServiceModule.service:genericEditorModalService#open
         * @methodOf genericEditorModalServiceModule.service:genericEditorModalService
         *
         * @description
         * Function that opens an editor modal. For this method, you must specify an object to contain the edited information, and a save
         * callback that will be triggered once the Save button is clicked.
         *
         * @param {Object} data the object that contains the information to be displayed and edited in the modal.
         * @param {Object=} data.componentUuid the smartEdit component uuid of the entity to edit, empty when creating
         * @param {Object} data.componentType the smartEdit component type of the entity to edit
         * @param {String=} data.title the title of the form
         * @param {Object=} data.content the optional initial content, especially in create mode
         * @param {String=} data.structure the optional data binding to a REST Structure JSON; defaults to the Structure API when not provided.
         * @param {String=} data.contentApi the optional REST API used to create, read, update, or delete content; defaults to the CMSItem API when not provided.
         * @param {String=} data.targetedQualifier the optional name of the qualifier the tab of which we want to initialize the editor with
         * @param {String=} data.cancelLabel the optional localization key of the cancel button label.
         * @param {String=} data.saveLabel the optional localization key of the save button label.
         * @param {String=} data.editorStackId When working with nested components, a generic editor can be opened from within another editor. This parameter is used to specify the stack of nested editors.
         * @param {Boolean=} data.initialDirty the optional parameter that makes the form dirty upon loading.
         * @param {Boolean=} data.readOnlyMode the optional parameter that moves the generic editor in read only mode. It disables all fields and save button. Default is false.
         * @param {Object[]=} data.messages the optional list of messages to display on top of generic editor.
         * @param {Object} saveCallback the optional function that is executed if the user clicks the Save button and the modal closes successfully. The function provides one parameter: item that has been saved.
         * @param {Object} errorCallback the optional function that is executed if error happens during save operation. The function provides two parameters: messages and instance of genericEditor.
         *
         * @returns {Promise} A promise that resolves to the data returned by the modal when it is closed.
         */
        GenericEditorModalService.prototype.open = function(data, saveCallback, errorCallback) {

            return modalService.open({
                title: data.title,
                titleSuffix: 'se.cms.editor.title.suffix',
                templateUrl: 'genericEditorModalTemplate.html',
                controller: ['modalManager', 'systemEventService', '$scope', '$log', '$q', 'lodash', 'generateIdentifier', 'isFunction',
                    function(modalManager, systemEventService, $scope, $log, $q, lodash, generateIdentifier, isFunction) {
                        this.controls = {};
                        this.editorStackId = data.editorStackId;
                        this.data = lodash.cloneDeep(data);
                        this.genericEditorId = generateIdentifier();
                        var STRUCTURE_API_BASE_URL = TYPES_RESOURCE_URI + '?code=:smarteditComponentType&mode=:structureApiMode';

                        this.getApi = function(genericEditorAPI) {
                            this.controls.genericEditorAPI = genericEditorAPI;
                            if (this.data.targetedQualifier) {
                                genericEditorAPI.switchToTabContainingQualifier(this.data.targetedQualifier);
                            }
                            if (this.data.initialDirty) {
                                genericEditorAPI.considerFormDirty();
                            }
                        }.bind(this);

                        this.onSave = function() {
                            return this.controls.submit().then(function(item) {
                                crossFrameEventService.publish("CMSITEMS_UPDATE");
                                if (saveCallback) {
                                    saveCallback(item);
                                }
                                this.removeEventListeners();
                                return item;
                            }.bind(this));
                        };

                        this.onCancel = function() {
                            var deferred = $q.defer();
                            if (this.genericEditorIsDirty()) {
                                confirmationModalService.confirm({
                                    description: 'se.editor.cancel.confirm'
                                }).then(function() {
                                    this.controls.reset().then(function() {
                                        this.removeEventListeners();
                                        deferred.resolve();
                                    }.bind(this), function() {
                                        deferred.reject();
                                    });
                                }.bind(this), function() {
                                    deferred.reject();
                                });
                            } else {
                                this.removeEventListeners();
                                deferred.resolve();
                            }

                            return deferred.promise;
                        };

                        this.init = function() {
                            modalManager.setDismissCallback(this.onCancel.bind(this));

                            modalManager.setButtonHandler(function(buttonId) {
                                switch (buttonId) {
                                    case 'save':
                                        return this.onSave();
                                    case 'cancel':
                                        return this.onCancel();
                                    default:
                                        $log.error('A button callback has not been registered for button with id', buttonId);
                                        break;
                                }
                            }.bind(this));

                            $scope.$watch(function() {
                                return this.controls.genericEditorAPI && this.controls.genericEditorAPI.isSubmitDisabled();
                            }.bind(this), function(isSubmitDisabled) {
                                if (isSubmitDisabled || this.isGenericEditorInReadOnlyMode()) {
                                    modalManager.disableButton('save');
                                } else {
                                    modalManager.enableButton('save');
                                }
                            }.bind(this));

                            this.structure = data.structure;
                            if (!this.structure) {
                                this.structureApi = this.getStructureApiByMode('DEFAULT');
                                if (this.isGenericEditorInReadOnlyMode()) {
                                    this.structureApi = this.applyReadOnlyModeToStructureApiUrl(this.structureApi);
                                }
                            } else if (this.isGenericEditorInReadOnlyMode()) {
                                this.structure = this.makeStructureReadOnly(this.structure);
                            }
                            this.changeStructureEventListener = systemEventService.subscribe(CMS_LINK_TO_RELOAD_STRUCTURE_EVENT_ID, this.onChangeStructureEvent.bind(this));

                            this.unrelatedValidationErrorsEvent = systemEventService.subscribe(GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT, this.onUnrelatedErrors.bind(this));

                            this.contentApi = data.contentApi || '/cmswebservices/v1/sites/' + CONTEXT_SITE_ID + '/cmsitems';
                        };

                        /**
                         * Method makes each attribute of the structure non editable.
                         */
                        this.makeStructureReadOnly = function(structure) {
                            structure.attributes = structure.attributes || [];
                            structure.attributes.forEach(function(element) {
                                element.editable = false;
                            });
                            return structure;
                        };

                        /**
                         * Method verifies whether the generic editor is in read only mode or not.
                         * Returns TRUE if the generic editor is in read only mode, FALSE otherwise.
                         */
                        this.isGenericEditorInReadOnlyMode = function() {
                            return !!this.data.readOnlyMode;
                        }.bind(this);

                        /**
                         * Method returns generic editor content object.
                         */
                        this.getGenericEditorContent = function() {
                            return this.controls.genericEditorAPI && this.controls.genericEditorAPI.getContent();
                        };

                        /**
                         * Method verifies whether the generic editor is in dirty state or not.
                         * Returns TRUE if the generic editor is in dirty state, FALSE otherwise.
                         */
                        this.genericEditorIsDirty = function() {
                            return isFunction(this.controls.isDirty) && this.controls.isDirty();
                        }.bind(this);

                        this.onChangeStructureEvent = function(eventId, payload) {
                            // Structure is reloaded only for the Generic Editor that owns the component where this event came from.
                            // This is done to avoid contaminating editors in a nested set-up.
                            if (this.genericEditorId === payload.editorId) {
                                if (payload.structureApiMode) {
                                    this.structure = null;
                                    this.structureApi = this.getStructureApiByMode(payload.structureApiMode);
                                } else if (payload.structure) {
                                    this.structureApi = null;
                                    this.structure = payload.structure;
                                }
                                this.data.content = payload.content;
                            }
                        };

                        this.onUnrelatedErrors = function(eventId, eventData) {
                            if (eventData.sourceGenericEditorId === data.componentUuid && errorCallback) {
                                errorCallback(eventData.messages, this);
                            }
                        };

                        /**
                         * Converts the structure api url to read only mode. All fields return in read only mode will not be editable.
                         */
                        this.applyReadOnlyModeToStructureApiUrl = function(structureApiUrl) {
                            return structureApiUrl + '&readOnly=true';
                        };

                        this.getStructureApiByMode = function(structureApiMode) {
                            return STRUCTURE_API_BASE_URL.replace(/:structureApiMode/gi, structureApiMode);
                        };

                        this.removeEventListeners = function() {
                            this.unrelatedValidationErrorsEvent();
                            this.changeStructureEventListener();
                        };
                    }
                ],
                buttons: [{
                    id: 'cancel',
                    label: data.cancelLabel || 'se.cms.component.confirmation.modal.cancel',
                    style: MODAL_BUTTON_STYLES.SECONDARY,
                    action: MODAL_BUTTON_ACTIONS.DISMISS
                }, {
                    id: 'save',
                    label: data.saveLabel || 'se.cms.component.confirmation.modal.save',
                    action: MODAL_BUTTON_ACTIONS.CLOSE,
                    disabled: true
                }]
            });
        };

        return new GenericEditorModalService();

    });
