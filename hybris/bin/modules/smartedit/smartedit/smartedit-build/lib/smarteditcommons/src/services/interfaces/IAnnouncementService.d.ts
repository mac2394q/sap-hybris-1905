/// <reference types="angular" />
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IAnnouncementConfig
 *
 * @description
 * Interface for Announcement configuration
 */
export interface IAnnouncementConfig {
    /**
     * @ngdoc property
     * @name message
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description The announcement's message to display.
     * Either one of message, template or templateUrl must be present to display an announcement.
     */
    message?: string;
    /**
     * @ngdoc property
     * @name message
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description Optional title for the announcement's message.
     * This is only used when message is available.
     */
    messageTitle?: string;
    /**
     * @ngdoc property
     * @name template
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description The announcement's HTML template to display.
     * Either one of message, template or templateUrl must be present to display an announcement.
     */
    template?: string;
    /**
     * @ngdoc property
     * @name templateUrl
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description The announcement's tenmplate url to display.
     * Either one of message, template or templateUrl must be present to display an announcement.
     */
    templateUrl?: string;
    /**
     * @ngdoc property
     * @name controller
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description The custom controller that defines the given template or templateUrl.
     * The content of the controller in template or templateUrl can be accessed using '$announcementCtrl' alias.
     */
    controller?: angular.IControllerConstructor;
    /**
     * @ngdoc property
     * @name closeable
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description The optional boolean that determines if a close button must be displayed or not.
     * The default is true.
     */
    closeable?: boolean;
    /**
     * @ngdoc property
     * @name timeout
     * @propertyOf smarteditServicesModule.interface:IAnnouncementConfig
     * @description The optional timeout in milliseconds that determines when to close the announcement.
     * The default is 5000.
     */
    timeout?: number;
}
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IAnnouncementService
 *
 * @description
 * Interface for Announcement service
 */
export declare abstract class IAnnouncementService {
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IAnnouncementService#showAnnouncement
     * @methodOf smarteditServicesModule.interface:IAnnouncementService
     *
     * @description
     * This method creates a new announcement and displays it.
     *
     * The configuration must contain either a description, template or template URL, but not multiple.
     *
     * @param {IAnnouncementConfig} announcementConfig The announcement configuration defined by {@link smarteditServicesModule.interface:IAnnouncementConfig IAnnouncementConfig}
     * @returns {angular.IPromise<string>} returns a promise with announcement id
     */
    showAnnouncement(announcementConfig: IAnnouncementConfig): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IAnnouncementService#closeAnnouncement
     * @methodOf smarteditServicesModule.interface:IAnnouncementService
     *
     * @description
     * This method is used to close the announcement by given announcement id
     * @param {string} announcementId the announcement id
     * @returns {angular.IPromise<void>} An empty promise
     */
    closeAnnouncement(announcementId: string): angular.IPromise<void>;
}
