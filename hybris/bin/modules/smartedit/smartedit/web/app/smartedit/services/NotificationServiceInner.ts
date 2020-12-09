/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {GatewayProxied, INotificationService} from 'smarteditcommons';

/**
 * @ngdoc service
 * @name smarteditServicesModule.service:NotificationService
 * 
 * @description
 * The notification service is used to display visual cues to inform the user of the state of the application.
 */
/** @internal */
@GatewayProxied('pushNotification', 'removeNotification', 'removeAllNotifications')
export class NotificationService extends INotificationService {

	constructor() {
		super();
	}
}