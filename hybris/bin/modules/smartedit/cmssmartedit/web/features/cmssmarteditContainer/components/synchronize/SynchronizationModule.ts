/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from 'smarteditcommons';

import {PageSynchronizationPanel} from './pages/PageSynchronizationPanel';
import {PageSynchronizationHeaderComponent} from "./pages/PageSynchronizationHeaderComponent";

@SeModule({
	imports: [
		'translationServiceModule',
		'l10nModule',
		'functionsModule'
	],
	declarations: [
		PageSynchronizationPanel,
		PageSynchronizationHeaderComponent
	],
	providers: [{
		provide: 'PAGE_SYNC_STATUS_READY',
		useValue: 'PAGE_SYNC_STATUS_READY'
	}]
})
export class SynchronizationModule {}