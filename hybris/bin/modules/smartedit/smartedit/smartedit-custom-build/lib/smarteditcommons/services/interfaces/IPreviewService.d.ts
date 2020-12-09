import * as angular from 'angular';
import { IPreviewData } from './IPreview';
import { UrlUtils } from "smarteditcommons/utils/UrlUtils";
/**
 * @name smarteditServicesModule.interface:IPreviewService
 *
 * @description
 *
 * Interface for previewService.
 *
 * This service is for managing the storefront preview ticket and is proxied across the gateway. (implements)
 *
 */
export declare abstract class IPreviewService {
    protected urlUtils: UrlUtils;
    constructor(urlUtils: UrlUtils);
    /**
     * @name smarteditServicesModule.interface:IPreviewService#createPreview
     * @methodOf smarteditServicesModule.interface:IPreviewService
     *
     * @description
     * This method will create a new previewTicket for the given experience, using the preview API
     * <br />
     * This method does *NOT* update the current experience.
     *
     * @param {Object} previewData Data representing storefront preview
     *
     * @returns {Object} A {@link smarteditServicesModule.interface:IPreview IPreviewData} object with the ticketId
     */
    createPreview(previewData: IPreviewData): angular.IPromise<IPreviewData>;
    /**
     * @name smarteditServicesModule.interface:IPreviewService#updatePreview
     * @methodOf smarteditServicesModule.interface:IPreviewService
     *
     * @description
     * This method will update a previewTicket for the given the preview data, using the preview API
     *
     * @param {Object} previewData Data representing storefront preview containing the preview ticketId
     *
     * @returns {Object} A {@link smarteditServicesModule.interface:IPreview IPreviewData} object with the ticketId
     */
    updatePreview(previewData: IPreviewData): angular.IPromise<IPreviewData>;
    /**
     * @name smarteditServicesModule.interface:IPreviewService#getResourcePathFromPreviewUrl
     * @methodOf smarteditServicesModule.interface:IPreviewService
     *
     * @description
     * This method will preduce a resourcePath from a given preview url
     * <br />
     * This method does *NOT* update the current experience.
     *
     * @param {Object} previewUrl A URL for a storefornt with preview
     *
     * @returns {Object} A {@link smarteditServicesModule.interface:IPreview IPreviewData} object
     */
    getResourcePathFromPreviewUrl(previewUrl: string): angular.IPromise<string>;
    /**
     * @name smarteditServicesModule.interface:IPreviewService#updateUrlWithNewPreviewTicketId
     * @methodOf smarteditServicesModule.interface:IPreviewService
     *
     * @description
     * This method will create a new preview ticket, and return the given url with an updated previewTicketId query param
     * <br />
     * This method does *NOT* update the current experience.
     *
     * @param {string} storefrontUrl Existing storefront url
     * @param {Object} previewData JSON representing storefront previewData (catalog, catalaog vesion, etc...)
     *
     * @returns {string} A new string with storefrontUrl having the new ticket ID inside
     */
    updateUrlWithNewPreviewTicketId(storefrontUrl: string, previewData: IPreviewData): angular.IPromise<string>;
}
