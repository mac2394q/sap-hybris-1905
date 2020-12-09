/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lo from 'lodash';
import {Payload} from 'smarteditcommons/dtos';
import {IDefaultExperienceParams, IExperience, IExperienceCatalogVersion} from "./IExperience";
import {IPreviewCatalogVersionData, IPreviewData} from "./IPreview";

/**
 * @ngdoc service
 * @name smarteditServicesModule.service:ExperienceService
 *
 * @description
 * ExperienceService deals with building experience objects given a context.
 */

export abstract class IExperienceService {

	constructor(protected lodash: lo.LoDashStatic) {
	}

	/* @internal */
	updateExperiencePageContext(pageCatalogVersionUuid: string, pageId: string): angular.IPromise<IExperience> {
		'proxyFunction';
		return null;
	}

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
	getCurrentExperience(): angular.IPromise<IExperience> {
		'proxyFunction';
		return null;
	}

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
	setCurrentExperience(experience: IExperience): angular.IPromise<IExperience> {
		'proxyFunction';
		return null;
	}

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
	hasCatalogVersionChanged(): angular.IPromise<boolean> {
		'proxyFunction';
		return null;
	}

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
	buildRefreshedPreviewUrl(): angular.IPromise<string> {
		'proxyFunction';
		return null;
	}

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
	updateExperience(newExperience?: Payload): angular.IPromise<IExperience> {
		'proxyFunction';
		return null;
	}

	loadExperience(params: IDefaultExperienceParams): angular.IPromise<angular.ILocationService | void> {
		'proxyFunction';
		return null;
	}

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
	compareWithCurrentExperience(experience: IDefaultExperienceParams): angular.IPromise<boolean> {
		'proxyFunction';
		return null;
	}

	/** @internal */
	_convertExperienceToPreviewData(experience: IExperience, resourcePath: string): IPreviewData {
		const previewData = this.lodash.cloneDeep(experience) as any;
		const catalogVersions: IPreviewCatalogVersionData[] = [];

		delete previewData.catalogDescriptor;
		delete previewData.siteDescriptor;
		delete previewData.languageDescriptor;
		delete previewData.pageContext;
		delete previewData.productCatalogVersions;

		if (experience.productCatalogVersions && experience.productCatalogVersions.length) {
			experience.productCatalogVersions.forEach((productCatalogVersion: IExperienceCatalogVersion) => {
				catalogVersions.push({
					catalog: productCatalogVersion.catalog,
					catalogVersion: productCatalogVersion.catalogVersion
				});
			});
		}
		catalogVersions.push({
			catalog: experience.catalogDescriptor.catalogId,
			catalogVersion: experience.catalogDescriptor.catalogVersion
		});

		previewData.catalogVersions = catalogVersions;
		previewData.language = experience.languageDescriptor.isocode;
		previewData.resourcePath = resourcePath;
		previewData.siteId = experience.siteDescriptor.uid;

		return previewData as IPreviewData;
	}
}