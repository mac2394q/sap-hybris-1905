/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ICatalog, ICatalogVersion, IExperienceService, SeComponent} from "smarteditcommons";

/**
 * @ngdoc directive
 * @name CatalogDetailsModule.directive:homePageLink
 * @scope
 * @restrict E
 * @element <home-page-link></home-page-link>
 *
 * @description
 * Directive that displays a link to the main storefront page.
 *
 * @param {< Object} catalog Object representing the provided catalog.
 * @param {< Boolean} catalogVersion Object representing the provided catalog version.
 * @param {< String} siteId The ID of the site the provided catalog is associated with.
 */
@SeComponent({
	templateUrl: 'homePageLinkComponentTemplate.html',
	inputs: [
		'catalog',
		'catalogVersion',
		'siteId'
	]
})
export class HomePageLinkComponent {

	public catalog: ICatalog;
	public catalogVersion: ICatalogVersion;
	public siteId: string;

	constructor(
		private experienceService: IExperienceService
	) {}

	onClick() {
		this.experienceService.loadExperience({
			siteId: this.siteId,
			catalogId: this.catalog.catalogId,
			catalogVersion: this.catalogVersion.version
		});
	}

}
