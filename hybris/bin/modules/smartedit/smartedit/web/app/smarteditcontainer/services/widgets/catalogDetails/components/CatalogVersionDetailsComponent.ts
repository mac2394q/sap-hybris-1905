/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ICatalog, ICatalogVersion, ISeComponent, SeComponent} from "smarteditcommons";
import {CatalogDetailsItem, CatalogDetailsService} from "../CatalogDetailsService";

/**
 * @ngdoc overview
 * @name CatalogDetailsModule
 * @description
 * This module contains the {@link CatalogDetailsModule.component:catalogVersionDetails} component.
 */
/**
 * @ngdoc directive
 * @name CatalogDetailsModule.component:catalogVersionDetails
 * @scope
 * @restrict E
 * @element catalog-version-details
 *
 * @description
 * Component responsible for displaying a catalog version details. Contains a link, called homepage, that
 * redirects to the default page with the right experience (site, catalog, and catalog version).
 *
 * Can be extended with custom items to provide new links and functionality.
 *
 * @param {<Object} catalog Object representing the parent catalog of the catalog version to display.
 * @param {<Object} catalogVersion Object representing the catalog version to display.
 * @param {<Object} activeCatalogVersion Object representing the active catalog version of the parent catalog.
 * @param {<String} siteId The site associated with the provided catalog.
 */
@SeComponent({
	templateUrl: 'catalogVersionDetailsComponentTemplate.html',
	inputs: [
		'catalog',
		'catalogVersion',
		'activeCatalogVersion',
		'siteId'
	]
})
export class CatalogVersionDetailsComponent implements ISeComponent {

	public catalog: ICatalog;
	public catalogVersion: ICatalogVersion;
	public activeCatalogVersion: ICatalogVersion;
	public siteId: string;

	public leftItems: CatalogDetailsItem[];
	public rightItems: CatalogDetailsItem[];

	constructor(
		private catalogDetailsService: CatalogDetailsService
	) {}

	$onInit() {
		const customItems = this.catalogDetailsService.getItems();
		this.leftItems = customItems.left;
		this.rightItems = customItems.right;
	}

}
