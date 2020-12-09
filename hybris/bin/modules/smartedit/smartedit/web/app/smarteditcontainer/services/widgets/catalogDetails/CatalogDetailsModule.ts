/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {diNameUtils, SeModule} from "smarteditcommons";
import {CatalogDetailsService} from "./CatalogDetailsService";
import {HomePageLinkComponent} from "./components/HomePageLinkComponent";
import {CatalogDetailsComponent} from "./components/CatalogDetailsComponent";
import {CatalogVersionDetailsComponent} from "./components/CatalogVersionDetailsComponent";
import {CatalogVersionsThumbnailCarouselComponent} from "./components/CatalogVersionsThumbnailCarouselComponent";

/**
 * @ngdoc object
 * @name CatalogDetailsModule.object:CATALOG_DETAILS_COLUMNS
 *
 * @description
 * Injectable angular constant<br/>
 * This object provides an enumeration with values for each of the possible places to add items to
 * extend the {@link CatalogDetailsModule.component:catalogVersionDetails} component. Currently,
 * the available options are CATALOG_DETAILS_COLUMNS.LEFT and CATALOG_DETAILS_COLUMNS.RIGHT.
 *
 */
export const CATALOG_DETAILS_COLUMNS = {
	LEFT: 'left',
	RIGHT: 'right'
};

@SeModule({
	imports: [
		'smarteditServicesModule',
		'resourceLocationsModule'
	],
	providers: [
		diNameUtils.makeValueProvider({CATALOG_DETAILS_COLUMNS}),
		CatalogDetailsService
	],
	declarations: [
		HomePageLinkComponent,
		CatalogDetailsComponent,
		CatalogVersionDetailsComponent,
		CatalogVersionsThumbnailCarouselComponent
	]
})
export class CatalogDetailsModule {}