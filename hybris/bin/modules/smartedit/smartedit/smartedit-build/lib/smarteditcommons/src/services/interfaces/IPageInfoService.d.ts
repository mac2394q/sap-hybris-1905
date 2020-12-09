import * as angular from 'angular';
/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IPageInfoService
 *
 * @description
 * The IPageInfoService provides information about the storefront page currently loaded in the iFrame.
 */
export declare abstract class IPageInfoService {
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IPageInfoService#getPageUID
     * @methodOf smarteditServicesModule.interface:IPageInfoService
     *
     * @description
     * This extracts the pageUID of the storefront page loaded in the smartedit iframe.
     *
     * @return {angular.IPromise<string>} A promise resolving to a string matching the page's ID
     */
    getPageUID(): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IPageInfoService#getPageUUID
     * @methodOf smarteditServicesModule.interface:IPageInfoService
     *
     * @description
     * This extracts the pageUUID of the storefront page loaded in the smartedit iframe.
     * The UUID is different from the UID in that it is an encoding of uid and catalog version combined
     *
     * @return {angular.IPromise<string>} A promise resolving to the page's UUID
     */
    getPageUUID(): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IPageInfoService#getCatalogVersionUUIDFromPage
     * @methodOf smarteditServicesModule.interface:IPageInfoService
     *
     * @description
     * This extracts the catalogVersionUUID of the storefront page loaded in the smartedit iframe.
     * The UUID is different from the UID in that it is an encoding of uid and catalog version combined
     *
     * @return {angular.IPromise<string>} A promise resolving to the page's UUID
     */
    getCatalogVersionUUIDFromPage(): angular.IPromise<string>;
}
