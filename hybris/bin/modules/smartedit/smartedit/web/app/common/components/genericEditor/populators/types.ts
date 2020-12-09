/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Payload} from "smarteditcommons/dtos";
import {GenericEditorField, GenericEditorOption} from "../..";

export interface IDropdownPopulator {
	/* @deprecated since 1811 */
	populate(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
	isPaged(): boolean;
	fetchAll(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
	fetchPage(payload: DropdownPopulatorPagePayload): angular.IPromise<DropdownPopulatorFetchPageResponse>;
	populateAttributes(items: GenericEditorOption[], idAttribute: string, orderedLabelAttributes: string[]): GenericEditorOption[];
	search(items: GenericEditorOption[], searchTerm: string): angular.IPromise<GenericEditorOption[]>;
	getItem(payload: DropdownPopulatorItemPayload): angular.IPromise<GenericEditorOption>;
}

/* @internal */
export interface DropdownPopulatorPayload {
	id?: string;
	field: GenericEditorField;
	model: Payload;
	selection: GenericEditorOption;
	search: string;
}

/* @internal */
export interface DropdownPopulatorItemPayload {
	id: string;
	field: GenericEditorField;
	model: Payload;
}

/* @internal */
export interface DropdownPopulatorPagePayload extends DropdownPopulatorPayload {
	pageSize: number;
	currentPage: number;
}

/* @internal */
export interface DropdownPopulatorFetchPageResponse {
	field: GenericEditorField;
	[index: string]: any;
}