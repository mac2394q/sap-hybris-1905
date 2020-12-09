/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';
import {IWaitDialogService} from 'smarteditcommons';
import {IframeManagerService} from './services';

/**
 * Backwards compatibility for partners and downstream teams
 * The deprecated modules below were moved to smarteditServicesModule
 *
 * IMPORTANT: THE DEPRECATED MODULES WILL NOT BE AVAILABLE IN FUTURE RELEASES
 * @deprecated since 1811
 */
/* @internal */
export function deprecatedSince1811() {
	angular.module('permissionServiceModule', ['smarteditServicesModule']);
	angular
		.module('iFrameManagerModule', ['smarteditServicesModule'])
		.service(
			'iFrameManager',
			(iframeManagerService: IframeManagerService, waitDialogService: IWaitDialogService) => {
				(iframeManagerService as any).showWaitModal = (key?: string) => {
					waitDialogService.showWaitModal(key);
				};
				(iframeManagerService as any).hideWaitModal = () => {
					waitDialogService.hideWaitModal();
				};
				return iframeManagerService;
			}
		);
	angular.module('catalogVersionPermissionRestServiceModule', ['smarteditServicesModule']);
	angular.module('catalogVersionDetailsModule', ['catalogDetailsModule']);
	angular.module('catalogVersionsThumbnailCarouselModule', ['catalogDetailsModule']);
	angular.module('homePageLinkModule', ['catalogDetailsModule']);
}

export function deprecatedSince1905() {
	angular.module('heartBeatServiceModule', ['smarteditServicesModule']);

	angular.module('alertCollectionModule', ['legacySmarteditCommonsModule']);
	angular.module('alertCollectionFacadesModule', ['legacySmarteditCommonsModule']);
	angular.module('alertFactoryModule', ['legacySmarteditCommonsModule']);
}

export const deprecate = () => {
	deprecatedSince1811();
	deprecatedSince1905();
};