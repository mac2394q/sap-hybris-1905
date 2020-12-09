/// <reference types="angular" />
import { Payload } from "smarteditcommons/dtos";
import { GenericEditorField, GenericEditorOption } from "../..";
export interface IDropdownPopulator {
    populate(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
    isPaged(): boolean;
    fetchAll(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
    fetchPage(payload: DropdownPopulatorPagePayload): angular.IPromise<DropdownPopulatorFetchPageResponse>;
    populateAttributes(items: GenericEditorOption[], idAttribute: string, orderedLabelAttributes: string[]): GenericEditorOption[];
    search(items: GenericEditorOption[], searchTerm: string): angular.IPromise<GenericEditorOption[]>;
    getItem(payload: DropdownPopulatorItemPayload): angular.IPromise<GenericEditorOption>;
}
export interface DropdownPopulatorPayload {
    id?: string;
    field: GenericEditorField;
    model: Payload;
    selection: GenericEditorOption;
    search: string;
}
export interface DropdownPopulatorItemPayload {
    id: string;
    field: GenericEditorField;
    model: Payload;
}
export interface DropdownPopulatorPagePayload extends DropdownPopulatorPayload {
    pageSize: number;
    currentPage: number;
}
export interface DropdownPopulatorFetchPageResponse {
    field: GenericEditorField;
    [index: string]: any;
}
