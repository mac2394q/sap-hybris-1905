/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule, SeValueProvider} from "smarteditcommons/di";

import {SeRichTextLoaderService} from "./services/SeRichTextLoaderService";
import {GenericEditorSanitizationService} from "./services/GenericEditorSanitizationService";
import {SeRichTextFieldLocalizationService} from "./services/SeRichTextFieldLocalizationService";
import {SeRichTextFieldComponent} from "./SeRichTextFieldComponent";

/* @internal */
export const SE_RICH_TEXT_CONFIGURATION_CONSTANT: SeValueProvider = {
	provide: 'seRichTextConfiguration',
	useValue: {
		toolbar: 'full',
		toolbar_full: [
			{
				name: 'basicstyles',
				items: ['Bold', 'Italic', 'Strike', 'Underline']
			}, {
				name: 'paragraph',
				items: ['BulletedList', 'NumberedList', 'Blockquote']
			}, {
				name: 'editing',
				items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
			}, {
				name: 'links',
				items: ['Link', 'Unlink', 'Anchor']
			}, {
				name: 'tools',
				items: ['SpellChecker', 'Maximize']
			},
			'/',
			{
				name: 'styles',
				items: ['Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat']
			}, {
				name: 'insert',
				items: ['Image', 'Table', 'SpecialChar']
			}, {
				name: 'forms',
				items: ['Outdent', 'Indent']
			}, {
				name: 'clipboard',
				items: ['Undo', 'Redo']
			}, {
				name: 'document',
				items: ['PageBreak', 'Source']
			}
		],
		disableNativeSpellChecker: false,
		height: '100px',
		width: '100%',
		autoParagraph: false,
		enterMode: CKEDITOR.ENTER_BR,
		shiftEnterMode: CKEDITOR.ENTER_BR,
		basicEntities: false,
		allowedContent: true,
		fillEmptyBlocks: false,
		extraPlugins: 'colorbutton, colordialog'
	}
};

/* @internal */
export const RESOLVED_LOCAL_TO_CKEDITOR_LOCAL_MAP_CONSTANT: SeValueProvider = {
	provide: 'resolvedLocaleToCKEDITORLocaleMap',
	useValue: {
		in: 'id',
		es_CO: 'es'
	}
};

@SeModule({
	imports: [
		'ngSanitize',
		'smarteditServicesModule'
	],
	providers: [
		SE_RICH_TEXT_CONFIGURATION_CONSTANT,
		RESOLVED_LOCAL_TO_CKEDITOR_LOCAL_MAP_CONSTANT,
		SeRichTextLoaderService,
		GenericEditorSanitizationService,
		SeRichTextFieldLocalizationService
	],
	declarations: [
		SeRichTextFieldComponent
	]
})
export class SeRichTextFieldModule {}