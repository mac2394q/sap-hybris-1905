/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {AlertCollection} from './AlertCollection';
import {AlertCollectionComponentFacade} from './AlertCollectionComponentFacade';
import {AlertCollectionLegacySupport} from './AlertCollectionLegacySupport';
import {AlertCollectionServiceFacade} from './AlertCollectionServiceFacade';
import {AlertFactory} from './AlertFactory';
import {AlertService} from './AlertServiceOuter';
import {FunctionsModule, IAlertServiceType, SeModule, SeValueProvider} from 'smarteditcommons';

/**
 * @ngdoc overview
 * @name AlertServiceModule
 */
export const SE_ALERT_DEFAULTS: SeValueProvider = {
	provide: 'SE_ALERT_DEFAULTS',
	useValue: {
		type: IAlertServiceType.INFO,
		message: '',
		closeable: true,
		timeout: 3000
	}
};
@SeModule({
	imports: [FunctionsModule, 'yLoDashModule'],
	providers: [
		AlertCollection,
		AlertCollectionComponentFacade,
		AlertCollectionLegacySupport,
		AlertCollectionServiceFacade,
		AlertFactory,
		AlertService,
		SE_ALERT_DEFAULTS
	]
})
export class AlertServiceModule {}
