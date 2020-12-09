/// <reference types="angular" />
import * as lo from 'lodash';
import { Payload } from 'smarteditcommons/dtos';
import { IDefaultExperienceParams, IExperience } from "./IExperience";
/**
 * @ngdoc service
 * @name smarteditServicesModule.service:ExperienceService
 *
 * @description
 * ExperienceService deals with building experience objects given a context.
 */
export declare abstract class IExperienceService {
    protected lodash: lo.LoDashStatic;
    constructor(lodash: lo.LoDashStatic);
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:ExperienceService#getCurrentExperience
     * @methodOf smarteditServicesModule.service:ExperienceService
     *
     * @description
     * Retrieves the active experience.
     *
     * @returns {IExperience} an {@link smarteditServicesModule.interface:IExperience experience}
     */
    getCurrentExperience(): angular.IPromise<IExperience>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:ExperienceService#setCurrentExperience
     * @methodOf smarteditServicesModule.service:ExperienceService
     *
     * @description
     * Stores a given experience as current experience.
     * Invoking this method ensures that a hard refresh of the application will preserve the experience.
     *
     * @returns {angular.IPromise<IExperience>} a promise returning the experience
     */
    setCurrentExperience(experience: IExperience): angular.IPromise<IExperience>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:ExperienceService#hasCatalogVersionChanged
     * @methodOf smarteditServicesModule.service:ExperienceService
     *
     * @description
     * Determines whether the catalog version has changed between the previous and current experience
     *
     * @returns {angular.IPromise<boolean>} a promise returning whether thta catalog version has changed
     */
    hasCatalogVersionChanged(): angular.IPromise<boolean>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:ExperienceService#buildRefreshedPreviewUrl
     * @methodOf smarteditServicesModule.service:ExperienceService
     *
     * @description
     * Retrieves the active experience, creates a new preview ticket and returns a new preview url with an updated
     * previewTicketId query param
     *
     * @returns {angular.IPromise<string>} an url containing the new previewTicketId
     */
    buildRefreshedPreviewUrl(): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:ExperienceService#updateExperience
     * @methodOf smarteditServicesModule.service:ExperienceService
     *
     * @description
     * Retrieves the active experience, merges it with a new experience, creates a new preview ticket and reloads the
     * preview within the iframeManagerService
     *
     * @param {Payload=} newExperience The object containing new attributes to be merged with the current experience
     *
     * @returns {angular.IPromise<IExperience>} A promise of the updated experience
     */
    updateExperience(newExperience?: Payload): angular.IPromise<IExperience>;
    loadExperience(params: IDefaultExperienceParams): angular.IPromise<angular.ILocationService | void>;
    /**
     * @ngdoc method
     * @name smarteditServicesModule.service:ExperienceService#compareWithCurrentExperience
     * @methodOf smarteditServicesModule.service:ExperienceService
     *
     * @description
     * This method compares all the properties of given experience of type IDefaultExperienceParams with the current experience.
     *
     * @param {IDefaultExperienceParams} experience The object containing default experience params such as pageId, catalogId, catalogVersion and siteId
     *
     * @return {angular.IPromise<boolean>} A promise of true or false. True if current experience matches with the gien experience. Otherwise false.
     */
    compareWithCurrentExperience(experience: IDefaultExperienceParams): angular.IPromise<boolean>;
}
