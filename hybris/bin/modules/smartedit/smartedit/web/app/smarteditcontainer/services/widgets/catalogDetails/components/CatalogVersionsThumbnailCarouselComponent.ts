/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ICatalog, ICatalogVersion, IExperienceService, SeComponent} from "smarteditcommons";

/**
 * @ngdoc directive
 * @name CatalogDetailsModule.component:catalogVersionsThumbnailCarousel
 * @scope
 * @restrict E
 * @element catalog-versions-thumbnail-carousel
 *
 * @description
 * Component responsible for displaying a thumbnail of the provided catalog. When clicked,
 * it redirects to the storefront page for the catalog's active catalog version.
 *
 * @param {< Object} catalog Object representing the current catalog.
 * @param {< String} siteId The ID of the site associated with the provided catalog.
 */
@SeComponent({
	templateUrl: 'catalogVersionsThumbnailCarouselComponentTemplate.html',
	inputs: [
		'catalog',
		'siteId'
	]
})
export class CatalogVersionsThumbnailCarouselComponent {

	public catalog: ICatalog;
	public siteId: string;

	public selectedVersion: ICatalogVersion;

	constructor(
		private experienceService: IExperienceService
	) {}

	$onInit() {
		this.selectedVersion = this.getActiveVersion();
	}

	onClick() {
		this.experienceService.loadExperience({
			siteId: this.siteId,
			catalogId: this.catalog.catalogId,
			catalogVersion: this.selectedVersion.version
		});
	}

	private getActiveVersion() {
		return this.catalog.versions.find((catalogVersion) => {
			return catalogVersion.active;
		});
	}

}
