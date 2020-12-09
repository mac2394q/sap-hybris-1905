/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeComponent} from "smarteditcommons/di";
import * as angular from "angular";
import {GenericEditorField, GenericEditorFieldMessage} from "../";

/**
 * @ngdoc directive
 * @name genericEditorModule.component:seGenericEditorFieldMessages
 * @element se-generic-editor-field-messages
 *
 * @description
 * Component responsible for displaying validation messages like errors or warnings.
 *
 * @param {< Object} field The field object that contains array of messages.
 * @param {< String} qualifier For a non-localized field, it is the actual field.qualifier. For a localized field, it is the ISO code of the language.
 */
@SeComponent({
	templateUrl: 'genericEditorFieldMessagesComponentTemplate.html',
	inputs: [
		'field',
		'qualifier'
	]
})
export class SeGenericEditorFieldMessagesComponent {

	public field: GenericEditorField;
	public qualifier: string;
	public errors: string[];
	public warnings: string[];

	private previousMessages: string = null;

	constructor(
		private VALIDATION_MESSAGE_TYPES: any
	) {}

	getFilteredMessagesByType(messageType: string): string[] {
		return (this.field.messages || []).filter((validationMessage: GenericEditorFieldMessage) => {
			return validationMessage.marker === this.qualifier && !validationMessage.format && validationMessage.type === messageType;
		}).map((validationMessage) => {
			return validationMessage.message;
		});
	}

	$doCheck(): void {
		if (this.field) {
			// TODO: Remove angular.
			const currentMessages = angular.toJson(this.field.messages);
			if (this.previousMessages !== currentMessages) {
				this.previousMessages = currentMessages;
				this.errors = this.getFilteredMessagesByType(this.VALIDATION_MESSAGE_TYPES.VALIDATION_ERROR);
				this.warnings = this.getFilteredMessagesByType(this.VALIDATION_MESSAGE_TYPES.WARNING);
			}
		}
	}
}
