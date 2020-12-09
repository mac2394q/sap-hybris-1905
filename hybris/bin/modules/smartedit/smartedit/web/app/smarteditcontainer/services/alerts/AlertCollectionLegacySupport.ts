/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons';
import {AlertCollection} from './AlertCollection';

/**
 * @ngdoc service
 * @name AlertServiceModule.service:AlertCollectionLegacySupport
 * @deprecated since 1905
 * @description
 * The alertCollectionLegacySupport exposes an interface to the alertService to handle the
 * legacy removeAlertById function
 */
@SeInjectable()
export class AlertCollectionLegacySupport {
	constructor(private alertCollection: AlertCollection) {}

    /**
     * @ngdoc method
     * @deprecated since 1905
     * @name AlertServiceModule.service:AlertCollectionLegacySupport#removeAlertById
     * @methodOf AlertServiceModule.service:AlertCollectionLegacySupport
     * @param {string} id the id of the alert to be removed.
     */
	removeAlertById(id: string): void {
		const alertToRemove = this.alertCollection.getAlerts().find((alert: any) => {
			return alert.id === id;
		});
		return this.alertCollection.removeAlert(alertToRemove);
	}
}
