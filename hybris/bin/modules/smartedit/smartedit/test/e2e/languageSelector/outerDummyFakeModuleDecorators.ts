/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {Component, NgModule} from '@angular/core';
import {IContextualMenuConfiguration, SeCustomComponent, SeEntryModule, SeTranslationModule} from "smarteditcommons";

/* tslint:disable:max-classes-per-file */
angular.module('FakeModule', [
	'smarteditServicesModule',
	'dummyModule'
])
	.run(function(contextualMenuService: any, decoratorService: any, smarteditroot: string) {

		decoratorService.addMappings({
			'^((?!Slot).)*$': ['contextualMenu']
		});

		decoratorService.enable('contextualMenu');

		contextualMenuService.addItems({
			componentType1: [{
				key: 'templateString2',
				i18nKey: 'TEMPLATEURL',
				condition(configuration: IContextualMenuConfiguration) {
					(configuration.element as any).addClass('conditionClass1');
					return true;
				},
				action: {
					templateUrl: 'ctxTemplate.html'
				},
				displayClass: 'editbutton',
				iconIdle: smarteditroot + '/../../test/e2e/contextualMenu/icons/contextualmenu_edit_off.png',
				iconNonIdle: smarteditroot + '/../../test/e2e/contextualMenu/icons/contextualmenu_edit_on.png',
				smallIcon: smarteditroot + '/../../cmssmartedit/icons/info.png'
			}]
		});

	});
angular.module('dummyModule', ['l10nModule'])
	.controller('dummyController', function() {

		this.$onInit = function() {
			this.dummyText = {
				en: 'dummyText in english',
				fr: 'dummyText in french'
			};
		};

	})
	.component('dummy', {
		template: '<div>{{ctrl.dummyText | l10n}}</div>',
		controller: 'dummyController',
		controllerAs: 'ctrl',
		bindings: {}
	});

/////////////////////////////////////////////////////

@SeCustomComponent()
@Component({
	selector: 'dummy-angular',
	template: `<div [translate]="'dummyKey2'"></div>`
})
export class Dummy2Component {
}

@SeEntryModule("FakeModule")
@NgModule({
	imports: [
		SeTranslationModule.forChild()
	],
	declarations: [
		Dummy2Component
	],
	entryComponents: [
		Dummy2Component
	]
})
export class FakeModule {

}

document.body.append(document.createElement("dummy-angular"));