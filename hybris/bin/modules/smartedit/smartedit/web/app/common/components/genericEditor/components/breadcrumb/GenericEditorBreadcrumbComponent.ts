/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeComponent} from "smarteditcommons/di";
import {GenericEditorInfo, GenericEditorStackService} from '../..';
import {GenericEditorComponent} from '../../GenericEditorComponent';
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
@SeComponent({
	templateUrl: 'genericEditorBreadcrumbComponentTemplate.html',
	require: {
		ge: '^^genericEditor'
	}
})
export class GenericEditorBreadcrumbComponent {
	private editorsStack: GenericEditorInfo[];
	private ge: GenericEditorComponent;

	constructor(
		private $translate: angular.translate.ITranslateService,
		private genericEditorStackService: GenericEditorStackService
	) {}

	getEditorsStack(): GenericEditorInfo[] {
		if (!this.editorsStack) {
			this.editorsStack = this.genericEditorStackService.getEditorsStack(this.ge.editorStackId);
		}

		return this.editorsStack;
	}

	showBreadcrumb(): boolean {
		return this.getEditorsStack().length > 1;
	}

	getComponentName(breadcrumbItem: GenericEditorInfo): any {
		if (!breadcrumbItem.component.name) {
			return this.$translate.instant('se.breadcrumb.name.empty');
		}

		return breadcrumbItem.component.name;
	}

}
