/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Payload} from "../../dtos";

/**
 * @ngdoc interface
 * @name smarteditServicesModule.interface:ISite
 * @description
 * Interface for site information
 */
export interface ISite extends Payload {
	contentCatalogs: string[];
	name: {
		[index: string]: string;
	};
	previewUrl: string;
	uid: string;
}
