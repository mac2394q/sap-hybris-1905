/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';
import {SlotSynchronizationPanel} from './synchronize/slots/SlotSynchronizationPanel';
import {CmsSmarteditServicesModule} from '../services';
import {SharedComponentButton} from "./sharedComponent/sharedComponentButton";

@SeModule({
	imports: [
		'synchronizationPanelModule',
		'slotSynchronizationServiceModule',
		'pageContentSlotsServiceModule',
		CmsSmarteditServicesModule,

	],
	declarations: [SlotSynchronizationPanel, SharedComponentButton]
})
export class CmsComponentsModule {}
