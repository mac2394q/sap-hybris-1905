/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {NgModule} from '@angular/core';
import {SeEntryModule} from 'smarteditcommons';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';

@SeEntryModule('cmssmarteditContainer')
@NgModule({
	imports: [
		BrowserModule,
		UpgradeModule
	]
})
export class CmssmarteditContainerModule {}
