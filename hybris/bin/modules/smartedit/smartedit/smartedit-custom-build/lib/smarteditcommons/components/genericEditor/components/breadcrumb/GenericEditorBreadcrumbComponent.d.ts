/// <reference types="angular-translate" />
import { GenericEditorInfo, GenericEditorStackService } from '../..';
import './genericEditorBreadcrumb.scss';
/**
 * @ngdoc directive
 * @name genericEditorBreadcrumbModule.component:genericEditorBreadcrumb
 * @element generic-editor-breadcrumb
 *
 * @description
 * Component responsible for rendering a breadcrumb on top of the generic editor.
 * @param {< String} editorStackId The string that identifies the stack of editors being edited together.
 */
export declare class GenericEditorBreadcrumbComponent {
    private $translate;
    private genericEditorStackService;
    private editorsStack;
    private ge;
    constructor($translate: angular.translate.ITranslateService, genericEditorStackService: GenericEditorStackService);
    getEditorsStack(): GenericEditorInfo[];
    showBreadcrumb(): boolean;
    getComponentName(breadcrumbItem: GenericEditorInfo): any;
}
