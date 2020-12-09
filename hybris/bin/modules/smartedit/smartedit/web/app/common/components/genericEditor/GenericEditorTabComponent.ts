/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ISeComponent, SeComponent} from "smarteditcommons/di";
import {Payload} from 'smarteditcommons/dtos';
import {GenericEditorComponent} from "./GenericEditorComponent";
import {GenericEditorField} from "./types";

@SeComponent({
	templateUrl: 'genericEditorTabComponentTemplate.html',
	inputs: [
		'tabId'
	],
	require: {
		ge: '^^genericEditor'
	}
})
export class GenericEditorTabComponent implements ISeComponent {

	public ge: GenericEditorComponent;
	public id: string;
	public fields: GenericEditorField[];
	public tabId: string;
	public component: Payload;

	$onInit(): void {
		this.id = this.ge.editor.id;
		this.fields = this.ge.editor.fieldsMap[this.tabId];
		this.component = this.ge.editor.component;
	}
}
