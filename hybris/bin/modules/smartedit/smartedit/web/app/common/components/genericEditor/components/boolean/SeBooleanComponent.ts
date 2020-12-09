/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ISeComponent, SeComponent} from "smarteditcommons/di";
import {TypedMap} from "smarteditcommons/dtos";

import {GenericEditorField, IGenericEditor} from "../..";
import './SeBoolean.scss';

/**
 * @ngdoc directive
 * @name seBooleanModule.directive:seBoolean
 * @scope
 * @restrict E
 * @element se-boolean
 *
 * @description
 * Component responsible for generating custom toggle for the {@link genericEditorModule.service:GenericEditor genericEditor}.
 *
 * The following is an example of a possible field structures that can be returned by the Structure API for seBoolean to work:
 * {
 *   cmsStructureType: "Boolean",
 *   qualifier: "someQualifier",
 *   i18nKey: 'i18nkeyForSomeQualifier',
 *   localized: false,
 *   defaultValue: true
 * }
 *
 * There is an optional property called defaultValue (which can be set to TRUE to enable the toggle by default)
 */
@SeComponent({
	templateUrl: 'booleanComponentTemplate.html',
	inputs: [
		'field',
		'qualifier',
		'model',
		'editor'
	]
})
export class SeBooleanComponent implements ISeComponent {

	public field: GenericEditorField;
	public qualifier: string;
	public model: TypedMap<any>;
	public editor: IGenericEditor;

	$onInit(): void {
		if (this.model[this.qualifier] === undefined) {
			const defaultValue = this.field.defaultValue !== undefined ? this.field.defaultValue : false;
			this.model[this.qualifier] = defaultValue;
			this.editor.pristine[this.qualifier] = defaultValue;
		}
	}

}
