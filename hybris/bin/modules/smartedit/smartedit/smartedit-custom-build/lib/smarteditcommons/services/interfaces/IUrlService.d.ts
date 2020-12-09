/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:IUrlService
 *
 * @description
 * Provides an abstract extensible url service, Used to open a given URL
 * in a new browser url upon invocation.
 *
 * This class serves as an interface and should be extended, not instantiated.
 */
import { IUriContext } from './IUriContext';
export declare abstract class IUrlService {
    static TOKEN: string;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IUrlService#openUrlInPopup
     * @methodOf smarteditServicesModule.interface:IUrlService
     *
     * @description
     * Opens a given URL in a new browser pop up without authentication.
     *
     * @param {String} url - the URL we wish to open.
     */
    openUrlInPopup(url: string): void;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IUrlService#path
     * @methodOf smarteditServicesModule.interface:IUrlService
     *
     * @description
     * Navigates to the given path in the same browser tab.
     *
     * @param {String} path - the path we wish to navigate to.
     */
    path(path: string): void;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IUrlService#buildUriContext
     * @methodOf smarteditServicesModule.interface:IUrlService
     *
     * @description
     * Returns a uri context array populated with the given siteId, catalogId and catalogVersion information
     *
     * @param {String} siteId - site Id
     * @param {String} catalogId - catalog Id
     * @param {String} catalogVersion - catalog version
     *
     * @return {IUriContext} uri context array
     */
    buildUriContext(siteId: string, catalogId: string, catalogVersion: string): IUriContext;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.interface:IUrlService#buildPageUriContext
     * @methodOf smarteditServicesModule.interface:IUrlService
     *
     * @description
     * Returns a page uri context array populated with the given siteId, catalogId and catalogVersion information
     *
     * @param {String} siteId - site Id
     * @param {String} catalogId - catalog Id
     * @param {String} catalogVersion - catalog version
     *
     * @return {IUriContext} uri context array
     */
    buildPageUriContext(siteId: string, catalogId: string, catalogVersion: string): IUriContext;
}
