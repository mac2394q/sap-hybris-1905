/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GenericEditorField} from "../..";

/* @internal */
export interface SEDropdownConfiguration {
	field: GenericEditorField;
	qualifier: string;
	model: any;
	id: string;
	onClickOtherDropdown?: (key?: string, qualifier?: string) => void;
	getApi?: ($api: {$api: SEDropdownAPI}) => void;
}

/* @internal */
export interface SEDropdownAPI {
	setResultsHeaderTemplateUrl(resultsHeaderTemplateUrl: string): void;
	setResultsHeaderTemplate(resultsHeaderTemplate: string): void;
}

/* @internal */
export interface ISEDropdownService {
	qualifier: string;
	initialized: boolean;
	isMultiDropdown: boolean;
	resultsHeaderTemplateUrl: string;
	resultsHeaderTemplate: string;
	init(): void;
	onClick(): void;
	triggerAction(): void;
	reset(): void;
}

/* @internal */
export interface ISEDropdownServiceConstructor {
	new(conf: SEDropdownConfiguration): ISEDropdownService;
}