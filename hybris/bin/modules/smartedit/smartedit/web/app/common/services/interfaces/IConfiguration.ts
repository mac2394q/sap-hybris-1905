/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Payload} from 'smarteditcommons/dtos';

export interface IConfiguration extends Payload {
	defaultToolingLanguage: string;
	domain: string;
	previewTicketURI: string;
	smarteditroot: string;
	whiteListedStorefronts: string[];
	storefrontPreviewRoute: string;
}