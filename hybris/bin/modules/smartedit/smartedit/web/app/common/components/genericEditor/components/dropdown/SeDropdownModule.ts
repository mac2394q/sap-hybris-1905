/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeModule} from "smarteditcommons/di";
import {SEDropdownServiceFactory} from "./SEDropdownServiceFactory";
import {SeDropdownComponent} from "./SeDropdownComponent";
import {DropdownPopulatorModule} from "../../populators/DropdownPopulatorModule";

/**
 * @ngdoc overview
 * @name seDropdownModule
 */
@SeModule({
	imports: [
		'smarteditServicesModule',
		'functionsModule',
		'seConstantsModule',
		DropdownPopulatorModule
	],
	providers: [
		{
			provide: 'DROPDOWN_IMPLEMENTATION_SUFFIX',
			useValue: 'DropdownPopulator'
		},
		{
			provide: 'LINKED_DROPDOWN',
			useValue: 'LinkedDropdown'
		},
		{
			provide: 'CLICK_DROPDOWN',
			useValue: 'ClickDropdown',
		},
		{
			provide: 'SEDropdownService',
			useFactory: SEDropdownServiceFactory
		}
	],
	declarations: [
		SeDropdownComponent
	]
})
export class SeDropdownModule {}