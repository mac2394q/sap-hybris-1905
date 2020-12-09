/// <reference types="angular" />
/// <reference types="angular-mocks" />
import { TypedMap } from 'smarteditcommons/dtos/TypedMap';
import { GenericEditorField, GenericEditorSanitizationService, IGenericEditor, SeRichTextFieldLocalizationService, SeRichTextLoaderService } from "../..";
export declare class SeRichTextFieldComponent {
    private seRichTextLoaderService;
    private seRichTextConfiguration;
    private genericEditorSanitizationService;
    private seRichTextFieldLocalizationService;
    private $timeout;
    private $element;
    field: GenericEditorField;
    qualifier: string;
    model: TypedMap<any>;
    editor: IGenericEditor;
    private mode;
    private editorInstance;
    constructor(seRichTextLoaderService: SeRichTextLoaderService, seRichTextConfiguration: any, genericEditorSanitizationService: GenericEditorSanitizationService, seRichTextFieldLocalizationService: SeRichTextFieldLocalizationService, $timeout: angular.ITimeoutService, $element: angular.IAugmentedJQuery);
    $postLink(): void;
    $onDestroy(): void;
    onChange(): void;
    onMode(): void;
    onInstanceReady(ev: any): void;
    requiresUserCheck(): boolean;
    reassignUserCheck(): void;
}
