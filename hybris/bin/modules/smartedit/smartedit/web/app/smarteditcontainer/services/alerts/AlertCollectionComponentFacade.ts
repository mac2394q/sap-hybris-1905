/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons';
import {AlertCollection} from './AlertCollection';
import {Alert} from './Alert';

/**
 * @ngdoc service
 * @name AlertServiceModule.service:AlertCollectionComponentFacade
 * @description
 * The alertCollectionComponentFacade is the interface of alertCollection exposed to the component/view layer of the application
 */
@SeInjectable()
export class AlertCollectionComponentFacade {
	constructor(public alertCollection: AlertCollection) {}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertCollectionComponentFacade#getAlerts
     * @methodOf AlertServiceModule.service:AlertCollectionComponentFacade
     * @returns {Alert[]} a list of all alerts.
     */
	getAlerts(): Alert[] {
		return this.alertCollection.getAlerts();
	}
}
