/// <reference types="angular" />
import { GenericEditorOption } from "../..";
export interface IDropdownPopulator {
    populate(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
    isPaged(): boolean;
    fetchAll(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
    fetchPage(payload: DropdownPopulatorPagePayload): angular.IPromise<DropdownPopulatorFetchPageResponse>;
    populateAttributes(items: GenericEditorOption[], idAttribute: string, orderedLabelAttributes: string[]): GenericEditorOption[];
    search(items: GenericEditorOption[], searchTerm: string): angular.IPromise<GenericEditorOption[]>;
    getItem(payload: DropdownPopulatorItemPayload): angular.IPromise<GenericEditorOption>;
}
