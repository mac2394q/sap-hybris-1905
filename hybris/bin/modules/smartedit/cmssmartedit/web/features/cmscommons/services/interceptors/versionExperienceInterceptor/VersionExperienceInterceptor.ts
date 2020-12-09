/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {IExperience, ISharedDataService, SeInjectable} from "smarteditcommons";

/** @internal */
@SeInjectable()
export class VersionExperienceInterceptor implements angular.IHttpInterceptor {

	private static MODE_DEFAULT: string = 'DEFAULT';
	private static MODE_PREVIEW_VERSION: string = 'PREVIEWVERSION';
	private static PREVIEW_DATA_TYPE: string = 'PreviewData';

	constructor(
		private TYPES_RESOURCE_URI: string,
		private interceptorHelper: any,
		private sharedDataService: ISharedDataService) {

		this.request = this.request.bind(this);
	}

	request(config: angular.IRequestConfig) {

		if (this.isGET(config) && this.isPreviewDataTypeResourceEndpoint(config.url)) {
			return this.interceptorHelper.handleRequest(config, () => {
				return this.sharedDataService.get('experience').then((experience: IExperience) => {
					if (experience.versionId) {
						config.url = config.url.replace(VersionExperienceInterceptor.MODE_DEFAULT, VersionExperienceInterceptor.MODE_PREVIEW_VERSION);
					}
					return config;
				});
			});
		}
		return config;
	}

	private isGET(config: angular.IRequestConfig): boolean {
		return config.method === "GET";
	}

	private isPreviewDataTypeResourceEndpoint(url: string): boolean {
		return url.indexOf(this.TYPES_RESOURCE_URI) > -1 && url.indexOf(VersionExperienceInterceptor.PREVIEW_DATA_TYPE) > -1;
	}

}