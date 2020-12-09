/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons';
import {AlertCollection} from './AlertCollection';
import {Alert} from './Alert';

/**
 * @ngdoc service
 * @name AlertServiceModule.service:AlertCollectionServiceFacade
 * @description
 * The alertCollectionServiceFacade is the interface of alertCollection exposed to the service layer of the application
 */
@SeInjectable()
export class AlertCollectionServiceFacade {
	constructor(private alertCollection: AlertCollection) {}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertCollectionServiceFacade#addAlert
     * @methodOf AlertServiceModule.service:AlertCollectionServiceFacade
     * @param {Alert} newAlert the new alert to be added to the collection.
     */
	addAlert(newAlert: Alert): void {
		this.alertCollection.addAlert(newAlert);
	}

    /**
     * @ngdoc method
     * @name AlertServiceModule.service:AlertCollectionServiceFacade#removeAlert
     * @methodOf AlertServiceModule.service:AlertCollectionServiceFacade
     * @param {Alert} alertToRemove the alert to be removed from the collection.
     */
	removeAlert(alertToRemove: Alert): void {
		this.alertCollection.removeAlert(alertToRemove);
	}
}
