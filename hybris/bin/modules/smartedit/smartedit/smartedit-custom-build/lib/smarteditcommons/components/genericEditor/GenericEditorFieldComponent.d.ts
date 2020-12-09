/// <reference types="angular" />
import { TypedMap } from 'smarteditcommons/dtos';
import { GenericEditorComponent } from "./GenericEditorComponent";
import { GenericEditorField, IGenericEditor } from "./types";
interface GenericEditorFieldComponentScope extends angular.IScope {
    editor?: IGenericEditor;
    model: TypedMap<any>;
    field?: GenericEditorField;
    qualifier?: string;
    id: string;
    editorStackId: string;
    isFieldDisabled: () => boolean;
}
export declare class GenericEditorFieldComponent {
    private $scope;
    field: GenericEditorField;
    model: TypedMap<any>;
    qualifier: string;
    id: string;
    ge: GenericEditorComponent;
    constructor($scope: GenericEditorFieldComponentScope);
    $onInit(): void;
    /**
     * @internal
     *
     * This method is used to check if the field is disabled. If the field is not localized,
     * then it's the same as field.enabled. However, if the field is localized, then this
     * method will return a different result for each language. For example, this allows to
     * have 'en' disabled but 'fr' disabled, depending on language permissions.
     *
     */
    isFieldDisabled(): boolean;
}
export {};
