/// <reference types="angular" />
/// <reference types="angular-mocks" />
/// <reference types="angular-translate" />
import { TranslateService } from '@ngx-translate/core';
import { Payload } from 'smarteditcommons/dtos';
import { CrossFrameEventService } from '../crossFrame/CrossFrameEventService';
import { IRestServiceFactory } from "../rest/IRestServiceFactory";
import { IStorageService } from "../interfaces/IStorageService";
import { IBrowserService } from "../interfaces/IBrowserService";
/**
 * @ngdoc interface
 * @name smarteditCommonsModule.interface:ILanguage
 * @description
 * Interface for language information
 */
export interface ILanguage extends Payload {
    active: boolean;
    isocode: string;
    name: string;
    nativeName: string;
    required: boolean;
}
export interface IToolingLanguage {
    isoCode: string;
    name: string;
}
/**
 * @ngdoc service
 * @name smarteditCommonsModule.service:LanguageService
 */
export declare class LanguageService {
    private $log;
    private $translate;
    private translateService;
    private $q;
    private languageServiceGateway;
    private crossFrameEventService;
    private browserService;
    private storageService;
    private SWITCH_LANGUAGE_EVENT;
    private SELECTED_LANGUAGE;
    private languageRestService;
    private i18nLanguageRestService;
    private initDeferred;
    constructor($log: angular.ILogService, $translate: angular.translate.ITranslateService, translateService: TranslateService, $q: angular.IQService, languageServiceGateway: any, crossFrameEventService: CrossFrameEventService, browserService: IBrowserService, storageService: IStorageService, SWITCH_LANGUAGE_EVENT: string, SELECTED_LANGUAGE: string, LANGUAGE_RESOURCE_URI: string, I18N_LANGUAGES_RESOURCE_URI: string, restServiceFactory: IRestServiceFactory);
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#getBrowserLanguageIsoCode
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @deprecated since 1808
     *
     * @description
     * Uses the browser's current locale to determine the selected language ISO code.
     *
     * @returns {String} The language ISO code of the browser's currently selected locale.
     */
    getBrowserLanguageIsoCode(): string;
    setInitialized(initialized: boolean): void;
    isInitialized(): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#getBrowserLocale
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @deprecated since 1808 - use browserService instead.
     *
     * @description
     * determines the browser locale in the format en_US
     *
     * @returns {string} the browser locale
     */
    getBrowserLocale(): string;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#getResolveLocale
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Resolve the user preference tooling locale. It determines in the
     * following order:
     *
     * 1. Check if the user has previously selected the language
     * 2. Check if the user browser locale is supported in the system
     *
     * @returns {angular.IPromise<string>} the locale
     */
    getResolveLocale(): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#getResolveLocaleIsoCode
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Resolve the user preference tooling locale ISO code. i.e.: If the selected tooling language is 'en_US',
     * the resolved value will be 'en'.
     *
     * @returns {angular.IPromise<string>} A promise that resolves to the isocode of the tooling language.
     */
    getResolveLocaleIsoCode(): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#getLanguagesForSite
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Fetches a list of language descriptors for the specified storefront site UID.
     * The object containing the list of sites is fetched using REST calls to the cmswebservices languages API.
     *
     * @param {string} siteUID the site unique identifier.
     *
     * @returns {angular.IPromise<ILanguage[]>} A promise that resolves to an array of ILanguage.
     */
    getLanguagesForSite(siteUID: string): angular.IPromise<ILanguage[]>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#getToolingLanguages
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Retrieves a list of language descriptors using REST calls to the smarteditwebservices i18n API.
     *
     * @returns {angular.IPromise<IToolingLanguage[]>} A promise that resolves to an array of IToolingLanguage.
     */
    getToolingLanguages(): angular.IPromise<IToolingLanguage[]>;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#setSelectedToolingLanguage
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Set the user preference language in the storage service
     *
     * @param {IToolingLanguage} language the language object to be saved.
     */
    setSelectedToolingLanguage(language: IToolingLanguage): void;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#registerSwitchLanguage
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Register a callback function to the gateway in order to switch the tooling language
     */
    registerSwitchLanguage(): void;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#convertBCP47TagToJavaTag
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Method converts the BCP47 language tag representing the locale to the default java representation.
     * For example, method converts "en-US" to "en_US".
     *
     * @param {string} languageTag the language tag to be converted.
     *
     * @returns {string} the languageTag in java representation
     */
    convertBCP47TagToJavaTag(languageTag: string): string;
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service:LanguageService#convertJavaTagToBCP47Tag
     * @methodOf smarteditCommonsModule.service:LanguageService
     *
     * @description
     * Method converts the default java language tag representing the locale to the BCP47 representation.
     * For example, method converts "en_US" to "en-US".
     *
     * @param {string} languageTag the language tag to be converted.
     *
     * @returns {string} the languageTag in BCP47 representation
     */
    convertJavaTagToBCP47Tag(languageTag: string): string;
    private _getDefaultLanguage;
    private setApplicationTitle;
}
