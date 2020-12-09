import * as angular from "angular";
import { IUriContext } from "smarteditcommons/services";
import { Payload } from 'smarteditcommons/dtos';
import { GenericEditorAPI, GenericEditorStructure, IGenericEditor, IGenericEditorConstructor } from "./types";
import './genericEditor.scss';
interface GenericEditorComponentScope extends angular.IScope {
    componentForm?: angular.IFormController;
}
/**
 * @ngdoc directive
 * @name genericEditorModule.directive:genericEditor
 * @scope
 * @restrict E
 * @element generic-editor
 *
 * @description
 * Component responsible for generating custom HTML CRUD form for any smarteditComponent type.
 *
 * The controller has a method that creates a new instance for the {@link genericEditorModule.service:GenericEditor GenericEditor}
 * and sets the scope of smarteditComponentId and smarteditComponentType to a value that has been extracted from the original DOM element in the storefront.
 *
 * @param {= String} id Id of the current generic editor.
 * @param {= String} smarteditComponentType The SmartEdit component type that is to be created, read, updated, or deleted.
 * @param {= String} smarteditComponentId The identifier of the SmartEdit component that is to be created, read, updated, or deleted.
 * @param {< String =} structureApi The data binding to a REST Structure API that fulfills the contract described in the  {@link genericEditorModule.service:GenericEditor GenericEditor} service. Only the Structure API or the local structure must be set.
 * @param {< String =} structure The data binding to a REST Structure JSON that fulfills the contract described in the {@link genericEditorModule.service:GenericEditor GenericEditor} service. Only the Structure API or the local structure must be set.
 * @param {= String} contentApi The REST API used to create, read, update, or delete content.
 * @param {= Object} content The model for the generic editor (the initial content when the component is being edited).
 * @param {< Object =} uriContext is an optional parameter and is used to pass the uri Params which can be used in making
 * api calls in custom widgets. It is an optional parameter and if not found, generic editor will find an experience in
 * sharedDataService and set this uriContext.
 * @param {= Function =} submit It exposes the inner submit function to the invoker scope. If this parameter is set, the directive will not display an inner submit button.
 * @param {= Function =} reset It exposes the inner reset function to the invoker scope. If this parameter is set, the directive will not display an inner cancel button.
 * @param {= Function =} isDirty Indicates if the the generic editor is in a pristine state (for example: has been modified).
 * @param {= Function =} isValid Indicates if all of the containing forms and controls in the generic editor are valid.
 * @param {& Function =} getApi Exposes the generic editor's api object
 * @param {< Function =} updateCallback Callback called at the end of a successful submit. It is invoked with two arguments: the pristine object and the response from the server.
 * @param {= Function =} customOnSubmit It exposes the inner onSubmit function to the invoker scope. If the parameter is set, the inner onSubmit function is overridden by the custom function and the custom function must return a promise in the response format expected by the generic editor.
 * @param {< String =} editorStackId When working with nested components, a generic editor can be opened from within another editor. This parameter is used to specify the stack of nested editors.
 */
export declare class GenericEditorComponent {
    private $scope;
    private GenericEditor;
    private isBlank;
    private generateIdentifier;
    private yjQuery;
    private $element;
    private $attrs;
    id: string;
    smarteditComponentId: string;
    smarteditComponentType: string;
    structureApi: string;
    structure: GenericEditorStructure;
    contentApi: string;
    content: Payload;
    uriContext: angular.IPromise<IUriContext>;
    submit: () => void;
    reset: () => void;
    isDirty: () => boolean;
    isValid: () => boolean;
    getApi: (api: {
        $api: GenericEditorAPI;
    }) => void;
    updateCallback: (pristine: Payload, results: Payload) => void;
    customOnSubmit: () => angular.IPromise<any>;
    editorStackId: string;
    $doCheck: () => void;
    showNoEditSupportDisclaimer: () => boolean;
    editor: IGenericEditor;
    private showResetButton;
    private showSubmitButton;
    constructor($scope: GenericEditorComponentScope, GenericEditor: IGenericEditorConstructor, isBlank: (value: any) => boolean, generateIdentifier: any, yjQuery: JQueryStatic, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes);
    $onChanges(): void;
    $onDestroy(): void;
    $postLink(): void;
    showCommands(): boolean;
    showCancel(): boolean;
    showSubmit(): boolean;
    isSubmitDisabled(): boolean;
}
export {};
