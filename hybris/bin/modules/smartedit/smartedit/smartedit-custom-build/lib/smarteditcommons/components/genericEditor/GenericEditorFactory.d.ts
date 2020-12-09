/// <reference types="angular-mocks" />
/// <reference types="angular-translate" />
/// <reference types="angular-resource" />
import { ILanguage, IRestServiceFactory, ISharedDataService, IUriContext, LanguageService, SystemEventService } from "smarteditcommons/services";
import { Payload, TypedMap } from 'smarteditcommons/dtos';
import { EditorFieldMappingService, GenericEditorAttribute, GenericEditorAPI, GenericEditorField, GenericEditorFieldMessage, GenericEditorStructure, GenericEditorTab, GenericEditorTabService, IGenericEditorFactoryOptions, SeValidationMessageParser } from ".";
import * as angular from "angular";
import * as lo from "lodash";
/**
 * @ngdoc service
 * @name genericEditorModule.service:GenericEditor
 * @description
 * The Generic Editor is a class that makes it possible for SmartEdit users (CMS managers, editors, etc.) to edit components in the SmartEdit interface.
 * The Generic Editor class is used by the {@link genericEditorModule.directive:genericEditor genericEditor} directive.
 * The genericEditor directive makes a call either to a Structure API or, if the Structure API is not available, it reads the data from a local structure to request the information that it needs to build an HTML form.
 * It then requests the component by its type and ID from the Content API. The genericEditor directive populates the form with the data that is has received.
 * The form can now be used to edit the component. The modified data is saved using the Content API if it is provided else it would return the form data itself.
 * <br/><br/>
 * <strong>The structure and the REST structure API</strong>.
 * <br/>
 * The constructor of the {@link genericEditorModule.service:GenericEditor GenericEditor} must be provided with the pattern of a REST Structure API, which must contain the string  ":smarteditComponentType", or with a local data structure.
 * If the pattern, Structure API, or the local structure is not provided, the Generic Editor will fail. If the Structure API is used, it must return a JSON payload that holds an array within the attributes property.
 * If the actual structure is used, it must return an array. Each entry in the array provides details about a component property to be displayed and edited. The following details are provided for each property:
 *
 * <ul>
 * <li><strong>qualifier:</strong> Name of the property.
 * <li><strong>i18nKey:</strong> Key of the property label to be translated into the requested language.
 * <li><strong>editable:</strong> Boolean that indicates if a property is editable or not. The default value is true.
 * <li><strong>localized:</strong> Boolean that indicates if a property is localized or not. The default value is false.
 * <li><strong>required:</strong> Boolean that indicates if a property is mandatory or not. The default value is false.
 * <li><strong>cmsStructureType:</strong> Value that is used to determine which form widget (property editor) to display for a specified property.
 * The selection is based on an extensible strategy mechanism owned by {@link genericEditorServicesModule.service:editorFieldMappingService editorFieldMappingService}.
 * <li><strong>cmsStructureEnumType:</strong> The qualified name of the Enum class when cmsStructureType is "Enum"
 * </li>
 * <ul><br/>
 *
 * <b>Note:</b><br/>
 * The generic editor has a tabset within. This allows it to display complex types in an organized and clear way. By default, all fields are stored
 * in the default tab, and if there is only one tab the header is hidden. The selection and configuration of where each field resides is
 * controlled by the {@link genericEditorServicesModule.service:editorFieldMappingService editorFieldMappingService}. Similarly, the rendering
 * of tabs can be customized with the {@link genericEditorServicesModule.service:genericEditorTabService genericEditorTabService}.
 * <br />
 * <br />
 *
 * There are two options when you use the Structure API. The first option is to use an API resource that returns the structure object.
 * The following is an example of the JSON payload that is returned by the Structure API in this case:
 * <pre>
 * {
 *     attributes: [{
 *         cmsStructureType: "ShortString",
 *         qualifier: "someQualifier1",
 *         i18nKey: 'i18nkeyForsomeQualifier1',
 *         localized: false
 *     }, {
 *         cmsStructureType: "LongString",
 *         qualifier: "someQualifier2",
 *         i18nKey: 'i18nkeyForsomeQualifier2',
 *         localized: false
 *    }, {
 *         cmsStructureType: "RichText",
 *         qualifier: "someQualifier3",
 *         i18nKey: 'i18nkeyForsomeQualifier3',
 *         localized: true,
 *         required: true
 *     }, {
 *         cmsStructureType: "Boolean",
 *         qualifier: "someQualifier4",
 *         i18nKey: 'i18nkeyForsomeQualifier4',
 *         localized: false
 *     }, {
 *         cmsStructureType: "DateTime",
 *         qualifier: "someQualifier5",
 *         i18nKey: 'i18nkeyForsomeQualifier5',
 *         localized: false
 *     }, {
 *         cmsStructureType: "Media",
 *         qualifier: "someQualifier6",
 *         i18nKey: 'i18nkeyForsomeQualifier6',
 *         localized: true,
 *         required: true
 *     }, {
 *         cmsStructureType: "Enum",
 *         cmsStructureEnumType:'de.mypackage.Orientation'
 *         qualifier: "someQualifier7",
 *         i18nKey: 'i18nkeyForsomeQualifier7',
 *         localized: true,
 *         required: true
 *     }]
 * }
 * </pre><br/>
 * The second option is to use an API resource that returns a list of structures. In this case, the generic editor will select the first element from the list and use it to display its attributes.
 * The generic editor expects the structures to be in one of the two fields below.
 * <pre>
 * {
 *     structures: [{}, {}]
 * }
 *
 * or
 *
 * {
 *     componentTypes: [{}, {}]
 * }
 * </pre>
 * If the list has more than one element, the Generic Editor will throw an exception, otherwise it will get the first element on the list.
 * The following is an example of the JSON payload that is returned by the Structure API in this case:
 * <pre>
 * {
 *     structures: [
 *         {
 *             attributes: [{
 *                 		cmsStructureType: "ShortString",
 *                 		qualifier: "someQualifier1",
 *                 		i18nKey: 'i18nkeyForsomeQualifier1',
 *                 		localized: false
 *             		}, {
 *                 		cmsStructureType: "LongString",
 *                 		qualifier: "someQualifier2",
 *                 		i18nKey: 'i18nkeyForsomeQualifier2',
 *                 		localized: false
 *         	   		}]
 *         }
 *     ]
 * }
 * </pre>
 * <pre>
 * {
 *     componentTypes: [
 *         {
 *             attributes: [{
 *                 		cmsStructureType: "ShortString",
 *                 		qualifier: "someQualifier1",
 *                 		i18nKey: 'i18nkeyForsomeQualifier1',
 *                 		localized: false
 *             		}, {
 *                 		cmsStructureType: "LongString",
 *                 		qualifier: "someQualifier2",
 *                 		i18nKey: 'i18nkeyForsomeQualifier2',
 *                 		localized: false
 *         	   		}]
 *         }
 *     ]
 * }
 * </pre>
 * The following is an example of the expected format of a structure:
 * <pre>
 *    [{
 *         cmsStructureType: "ShortString",
 *         qualifier: "someQualifier1",
 *         i18nKey: 'i18nkeyForsomeQualifier1',
 *         localized: false
 *     }, {
 *         cmsStructureType: "LongString",
 *         qualifier: "someQualifier2",
 *         i18nKey: 'i18nkeyForsomeQualifier2',
 *         editable: false,
 *         localized: false
 *    }, {
 *         cmsStructureType: "RichText",
 *         qualifier: "someQualifier3",
 *         i18nKey: 'i18nkeyForsomeQualifier3',
 *         localized: true,
 *         required: true
 *     }, {
 *         cmsStructureType: "Boolean",
 *         qualifier: "someQualifier4",
 *         i18nKey: 'i18nkeyForsomeQualifier4',
 *         localized: false
 *     }, {
 *         cmsStructureType: "DateTime",
 *         qualifier: "someQualifier5",
 *         i18nKey: 'i18nkeyForsomeQualifier5',
 *         editable: false,
 *         localized: false
 *     }, {
 *         cmsStructureType: "Media",
 *         qualifier: "someQualifier6",
 *         i18nKey: 'i18nkeyForsomeQualifier6',
 *         localized: true,
 *         required: true
 *     }, {
 *         cmsStructureType: "Enum",
 *         cmsStructureEnumType:'de.mypackage.Orientation'
 *         qualifier: "someQualifier7",
 *         i18nKey: 'i18nkeyForsomeQualifier7',
 *         localized: true,
 *         required: true
 *     }]
 * </pre>
 *
 * <strong>The REST CRUD API</strong>, is given to the constructor of {@link genericEditorModule.service:GenericEditor GenericEditor}.
 * The CRUD API must support GET and PUT of JSON payloads.
 * The PUT method must return the updated payload in its response. Specific to the GET and PUT, the payload must fulfill the following requirements:
 * <ul>
 * 	<li>DateTime types: Must be serialized as long timestamps.</li>
 * 	<li>Media types: Must be serialized as identifier strings.</li>
 * 	<li>If a cmsStructureType is localized, then we expect that the CRUD API returns a map containing the type (string or map) and the map of values, where the key is the language and the value is the content that the type returns.</li>
 * </ul>
 *
 * The following is an example of a localized payload:
 * <pre>
 * {
 *    content: {
 * 		'en': 'content in english',
 * 		'fr': 'content in french',
 * 		'hi': 'content in hindi'
 * 	  }
 * }
 * </pre>
 *
 * <br/><br/>
 *
 * If a validation warning or error occurs, the PUT method of the REST CRUD API will return a validation warning/error object that contains an array of validation messages. The information returned for each validation message is as follows:
 * <ul>
 * 	<li><strong>subject:</strong> The qualifier that has the error</li>
 * 	<li><strong>message:</strong> The error message to be displayed</li>
 * 	<li><strong>type:</strong> The type of message returned. This is of the type ValidationError or Warning.</li>
 * 	<li><strong>language:</strong> The language the error needs to be associated with. If no language property is provided, a match with regular expression /(Language: \[)[a-z]{2}\]/g is attempted from the message property. As a fallback, it implies that the field is not localized.</li>
 * </ul>
 *
 * The following code is an example of an error response object:
 * <pre>
 * {
 *    errors: [{
 *        subject: 'qualifier1',
 *        message: 'error message for qualifier',
 *        type: 'ValidationError'
 *    }, {
 *        subject: 'qualifier2',
 *        message: 'error message for qualifier2 language: [fr]',
 *        type: 'ValidationError'
 *    }, {
 *        subject: 'qualifier3',
 *        message: 'error message for qualifier2',
 *        type: 'ValidationError'
 *    }, {
 *        subject: 'qualifier4',
 *        message: 'warning message for qualifier4',
 *        type: 'Warning'
 *    }]
 * }
 *
 * </pre>
 *
 * Whenever any sort of dropdown is used in one of the cmsStructureType widgets, it is advised using {@link genericEditorModule.service:GenericEditor#methods_refreshOptions refreshOptions method}. See this method documentation to learn more.
 *
 */
export declare function GenericEditorFactory(yjQuery: JQueryStatic, encode: any, GENERIC_EDITOR_LOADED_EVENT: string, GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT: string, VALIDATION_MESSAGE_TYPES: any, EDITOR_PUSH_TO_STACK_EVENT: string, EDITOR_POP_FROM_STACK_EVENT: string, lodash: lo.LoDashStatic, restServiceFactory: IRestServiceFactory, languageService: LanguageService, sharedDataService: ISharedDataService, systemEventService: SystemEventService, sanitize: any, sanitizeHTML: any, copy: any, isBlank: (value: any) => boolean, isObjectEmptyDeep: any, $q: angular.IQService, $log: angular.ILogService, $translate: angular.translate.ITranslateService, $injector: angular.auto.IInjectorService, seValidationMessageParser: SeValidationMessageParser, editorFieldMappingService: EditorFieldMappingService, genericEditorTabService: GenericEditorTabService, resetObject: any, deepObjectPropertyDiff: any, CONTEXT_SITE_ID: string, CONTEXT_CATALOG: string, CONTEXT_CATALOG_VERSION: string): {
    new (conf: IGenericEditorFactoryOptions): {
        hasFrontEndValidationErrors: boolean;
        submitButtonText: string;
        cancelButtonText: string;
        alwaysShowSubmit: boolean;
        alwaysShowReset: boolean;
        onReset: () => void;
        parameters: IUriContext;
        api: GenericEditorAPI;
        id: string;
        inProgress: boolean;
        smarteditComponentType: string;
        smarteditComponentId: string;
        editorStackId: string;
        updateCallback: (pristine: Payload, results: Payload) => void;
        structure: GenericEditorStructure;
        uriContext: angular.IPromise<IUriContext>;
        editorStructureService: any;
        editorCRUDService: any;
        initialContent: Payload;
        component: Payload;
        fields: GenericEditorField[];
        languages: ILanguage[];
        initialDirty: boolean;
        fieldsNonPristineState: any;
        _unregisterUnrelatedMessagesEvent: () => void;
        pristine: Payload;
        tabs: GenericEditorTab[];
        fieldsMap: TypedMap<GenericEditorField[]>;
        componentForm: angular.IFormController;
        tabSelected: boolean;
        targetedQualifier: string;
        bcPristine: Payload;
        bcComp: Payload;
        requiredLanguages: ILanguage[];
        onChangeEvents: any[];
        _finalize(): void;
        _setApi(api: GenericEditorAPI): void;
        _handleUnrelatedValidationMessages(key: string, validationData: TypedMap<any>): void;
        _isPrimitive(type: string): boolean;
        _getSelector(selector: string): any;
        pushEditorToStack(): void;
        popEditorFromStack(): void;
        /**
         * @ngdoc method
         * @name genericEditorModule.service:GenericEditor#reset
         * @methodOf genericEditorModule.service:GenericEditor
         *
         * @description
         * Sets the content within the editor to its original state.
         */
        reset(): angular.IPromise<void>;
        _switchToTabContainingQualifier(): void;
        /**
         * Removes validation errors generated in frontend, not the ones sent by outside or server.
         * Removes errors only from fields, not tabs.
         */
        _removeFrontEndValidationMessages(): void;
        /**
         * Removes all validation (local, outside or server) errors from fieds and tabs.
         */
        removeValidationMessages(): void;
        /**
         *  fetch will:
         *  - return data if initialContent is provided
         *  - make a call to the CRUD API to return the payload if initialContent is not provided
         *
         *  (In initialDirty is set to true, it is populated after loading and setting the content which will make the
         *   pristine and component states out of sync thus making the editor dirty)
         */
        fetch(): angular.IPromise<{}>;
        sanitizeLoad(response: any): any;
        load(): angular.IPromise<any>;
        getComponent(): Payload;
        sanitizePayload(payload: Payload, fields: GenericEditorField[]): Payload;
        _fieldsAreUserChecked(): boolean;
        /**
         * @ngdoc method
         * @name genericEditorModule.service:GenericEditor#preparePayload
         * @methodOf genericEditorModule.service:GenericEditor
         *
         * @description
         * Transforms the payload before POST/PUT to server
         *
         * @param {Object} the transformed payload
         */
        preparePayload(originalPayload: Payload): angular.IPromise<Payload>;
        onSubmit(): angular.IPromise<Payload>;
        /**
         * @ngdoc method
         * @name genericEditorModule.service:GenericEditor#submit
         * @methodOf genericEditorModule.service:GenericEditor
         *
         * @description
         * Saves the content within the form for a specified component. If there are any validation errors returned by the CRUD API after saving the content, it will display the errors.
         */
        submit(): angular.IPromise<{}>;
        _validationMessageBelongsToCurrentInstance(validationMessage: GenericEditorFieldMessage): boolean;
        _containsValidationMessageType(validationMessages: GenericEditorFieldMessage[], messageType: string): boolean;
        _isValidationMessageType(messageType: string): boolean;
        /**
         * Displays validation errors for fields and changes error states for all tabs.
         */
        _displayValidationMessages(validationMessages: GenericEditorFieldMessage[], keepAllErrors: boolean): angular.IPromise<void>;
        _collectUnrelatedValidationMessages(messages: GenericEditorFieldMessage[]): GenericEditorFieldMessage[];
        fieldAdaptor(fields: GenericEditorAttribute[]): GenericEditorField[];
        /**
         * @ngdoc method
         * @name genericEditorModule.service:GenericEditor#refreshOptions
         * @methodOf genericEditorModule.service:GenericEditor
         *
         * @description
         * Is invoked by HTML field templates that update and manage dropdowns.
         *  It updates the dropdown list upon initialization (creates a list of one option) and when performing a search (returns a filtered list).
         *  To do this, the GenericEditor fetches an implementation of the  {@link genericEditorModule.FetchDataHandlerInterface FetchDataHandlerInterface} using the following naming convention:
         * <pre>"fetch" + cmsStructureType + "DataHandler"</pre>
         * @param {GenericEditorField} field The field in the structure that requires a dropdown to be built.
         * @param {string} qualifier For a non-localized field, it is the actual field.qualifier. For a localized field, it is the ISO code of the language.
         * @param {string} search The value of the mask to filter the dropdown entries on.
         */
        refreshOptions(field: GenericEditorField, qualifier: string, search: string): void;
        _buildComparable(source: Payload): Payload;
        /**
         * @ngdoc method
         * @name genericEditorModule.service:GenericEditor#isDirty
         * @methodOf genericEditorModule.service:GenericEditor
         *
         * @description
         * A predicate function that returns true if the editor is in dirty state or false if it not.
         * The state of the editor is determined by comparing the current state of the component with the state of the component when it was pristine.
         *
         * @return {Boolean} An indicator if the editor is in dirty state or not.
         */
        isDirty(): boolean;
        /**
         * Evaluates the fields that are not in pristine state and populates this.fieldsNonPristineState object.
         */
        _populateFieldsNonPristineStates(): void;
        /**
         * Collects validation errors on all the form fields.
         * Returns the list of errors or empty list.
         * Each error contains the following properties:
         * type - VALIDATION_MESSAGE_TYPES
         * subject - the field qualifier.
         * message - error message.
         * fromSubmit - contains true if the error is related to submit operation, false otherwise.
         * isNonPristine - contains true if the field was modified (at least once) by the user, false otherwise.
         * language - optional language iso code.
         */
        _collectFrontEndValidationErrors(comesFromSubmit: boolean): GenericEditorFieldMessage[];
        /**
         * Returns true if the field was modified (at least once) by the user, false otherwise.
         */
        _isNonPristineState(qualifier: string, language?: string): boolean;
        /**
         * Finds a diff between pristine and component using {@link functionsModule.deepObjectPropertyDiff deepObjectPropertyDiff} function
         * and merge the result with initialObject based on the following logic:
         * Do nothing if the initialObject's property is true, use the value from the diff otherwise.
         */
        _getFieldsNonPristineState(initialObject: Payload, pristine: Payload, component: Payload): Payload;
        /**
         * Check for html validation errors on all the form fields.
         * If so, assign an error to a field that is not pristine.
         * The seGenericEditorFieldError will render these errors, just like
         * errors we receive from the backend.
         * It also validates error states for tabs.
         */
        isValid(comesFromSubmit?: boolean): boolean;
        /**
         * Changes error states of tabs based on whether the fields inside those tabs contain errors or not.
         */
        _validateTabsErrorStates(): void;
        /**
         * Returns the list of tabs by error states.
         */
        _getTabsByFieldsErrorState(hasErrors: boolean): GenericEditorTab[];
        /**
         * Sets the error state for a tab based on tab id.
         */
        _setTabErrorState(tabId: string, hasErrors: boolean): void;
        isSubmitDisabled(): boolean;
        _getUriContext(): angular.IPromise<IUriContext>;
        /**
         * Conversion function in case the first attribute of the response is an array of type structures.
         */
        _convertStructureArray(structure: any): GenericEditorStructure;
        init(): angular.IPromise<{}>;
        _buildFieldComparable(fieldValue: string, field: GenericEditorField): string | boolean;
        validate(conf: IGenericEditorFactoryOptions): void;
    };
};
