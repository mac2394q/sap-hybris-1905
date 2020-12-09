/// <reference types="angular" />
/// <reference types="angular-mocks" />
import { SystemEventService } from "smarteditcommons/services";
import * as lo from "lodash";
import { GenericEditorInfo } from "../types";
export declare const DEFAULT_EDITOR_PUSH_TO_STACK_EVENT = "EDITOR_PUSH_TO_STACK_EVENT";
export declare const DEFAULT_EDITOR_POP_FROM_STACK_EVENT = "EDITOR_POP_FROM_STACK_EVENT";
export declare class GenericEditorStackService {
    private $log;
    private lodash;
    private EDITOR_PUSH_TO_STACK_EVENT;
    private EDITOR_POP_FROM_STACK_EVENT;
    private systemEventService;
    private _editorsStacks;
    constructor($log: angular.ILogService, lodash: lo.LoDashStatic, EDITOR_PUSH_TO_STACK_EVENT: string, EDITOR_POP_FROM_STACK_EVENT: string, systemEventService: SystemEventService);
    isAnyGenericEditorOpened(): boolean;
    areMultipleGenericEditorsOpened(): boolean;
    getEditorsStack(editorStackId: string): GenericEditorInfo[];
    isTopEditorInStack(editorStackId: string, editorId: string): boolean;
    private pushEditorEventHandler;
    private popEditorEventHandler;
    private validateId;
}
