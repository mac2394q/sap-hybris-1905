/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Component, Inject, NgModule} from '@angular/core';
import {
	moduleUtils,
	AbstractDecorator,
	IUrlService,
	SeDecorator,
	SeEntryModule
} from 'smarteditcommons';

/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
// tslint:disable:max-classes-per-file
@SeDecorator()
@Component({
	selector: 'button-display',
	template: `
    <div>
    <button id='navigateToJSViewInner' (click)='navigateToJSView()'>Navigate to JS View</button>
    <button id='navigateToAngularViewInner' (click)='navigateToAngularView()'>Navigate to Angular View</button>
    <ng-content></ng-content>
    </div>`
})
export class ButtonDisplayDecorator extends AbstractDecorator {

	constructor(@Inject(IUrlService.TOKEN) private urlService: IUrlService) {
		super();
	}

	navigateToJSView() {
		this.urlService.path('/customView');
	}
	navigateToAngularView() {
		this.urlService.path('/ng/a');
	}

}

// angular.module('CMSApp', [])

@SeEntryModule('CMSApp')
@NgModule({
	declarations: [ButtonDisplayDecorator],
	entryComponents: [ButtonDisplayDecorator],
	providers: [
		moduleUtils.provideValues({e2eMode: true}),
		moduleUtils.bootstrap((decoratorService: any) => {
			decoratorService.addMappings({
				innerContentType: ['buttonDisplay']
			});

			decoratorService.enable('buttonDisplay');

		}, ['decoratorService'])
	]
})
export class CMSApp {}