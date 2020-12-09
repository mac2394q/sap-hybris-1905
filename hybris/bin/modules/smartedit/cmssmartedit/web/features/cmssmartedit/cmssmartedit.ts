/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {NgModule} from '@angular/core';
import {SyncIndicatorDecorator} from 'cmssmartedit/components/synchronize/slots/SyncIndicatorDecorator';
import {diBridgeUtils, SeEntryModule} from 'smarteditcommons';
import './components/contextualSlotDropdown.scss';

@SeEntryModule('cmssmartedit')
@NgModule({
	imports: [
		BrowserModule,
		UpgradeModule
	],
	declarations: [
		SyncIndicatorDecorator
	],
	entryComponents: [
		SyncIndicatorDecorator
	],
	providers: [
		diBridgeUtils.upgradeProvider('$q'),
		diBridgeUtils.upgradeProvider('catalogService'),
		diBridgeUtils.upgradeProvider('slotSynchronizationService'),
		diBridgeUtils.upgradeProvider('crossFrameEventService'),
		diBridgeUtils.upgradeProvider('pageInfoService'),
		diBridgeUtils.upgradeProvider('SYNCHRONIZATION_STATUSES'),
		diBridgeUtils.upgradeProvider('SYNCHRONIZATION_POLLING')
	]
})
export class CmssmarteditModule {}
