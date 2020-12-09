import * as angular from 'angular';
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:INotificationConfiguration
 *
 * @description
 * Interface for Notification Configuration
 */
export interface INotificationConfiguration {
    /**
     * @ngdoc property
     * @name id
     * @propertyOf smarteditServicesModule.interface:INotificationConfiguration
     * @description The notification's unique identifier
     */
    id: string;
    /**
     * @ngdoc property
     * @name template
     * @propertyOf smarteditServicesModule.interface:INotificationConfiguration
     * @description The notification's HTML template. Either template or templateUrl should be present but not both.
     */
    template?: string;
    /**
     * @ngdoc property
     * @name template
     * @propertyOf smarteditServicesModule.interface:INotificationConfiguration
     * @description The notification's template URL. Either template or templateUrl should be present but not both.
     */
    templateUrl?: string;
}
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:INotificationService
 *
 * @description
 * INotificationService provides a service to display visual cues to inform
 * the user of the state of the application in the container or the iFramed application.
 * The interface defines the methods required to manage notifications that are to be displayed to the user.
 */
export declare abstract class INotificationService {
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:INotificationService#pushNotification
     * @methodOf smarteditServicesModule.interface:INotificationService
     *
     * @description
     * This method creates a new notification based on the given configuration and
     * adds it to the top of the list.
     *
     * The configuration must contain either a template or template URL, but not both.
     *
     * @param {Object} configuration The notification's configuration {@link smarteditServicesModule.interface:INotificationConfiguration INotificationConfiguration}
     *
     * @throws An error if no configuration is given.
     * @throws An error if the configuration does not contain a unique identifier.
     * @throws An error if the configuration's unique identifier is an empty string.
     * @throws An error if the configuration does not contain a template or templateUrl.
     * @throws An error if the configuration contains both a template and template Url.
     */
    pushNotification(configuration: INotificationConfiguration): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:INotificationService#removeNotification
     * @methodOf smarteditServicesModule.interface:INotificationService
     *
     * @description
     * This method removes the notification with the given ID from the list.
     *
     * @param {String} notificationId The notification's unique identifier.
     */
    removeNotification(notificationId: string): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:INotificationService#removeAllNotifications
     * @methodOf smarteditServicesModule.interface:INotificationService
     *
     * @description
     * This method removes all notifications.
     */
    removeAllNotifications(): angular.IPromise<void>;
}
