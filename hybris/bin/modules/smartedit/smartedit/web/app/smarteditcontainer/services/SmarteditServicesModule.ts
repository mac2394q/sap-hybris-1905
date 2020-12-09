/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
	diNameUtils,
	ContentCatalogRestService,
	InViewElementObserver,
	LegacySmarteditCommonsModule,
	PolyfillService,
	PriorityService,
	ProductCatalogRestService,
	SeModule,
	SmarteditBootstrapGateway,
	TestModeService
} from 'smarteditcommons';

import {
	AnnouncementService,
	BootstrapService,
	CatalogService,
	CatalogVersionPermissionRestService,
	ConfigurationExtractorService,
	ConfigurationService,
	CATALOG_VERSION_PERMISSIONS_RESOURCE_URI_CONSTANT,
	DelegateRestService,
	DragAndDropCrossOrigin,
	DEFAULT_DEFAULT_RULE_NAME,
	DEVICE_ORIENTATIONS,
	DEVICE_SUPPORTS,
	ExperienceService,
	FeatureService,
	IframeManagerService,
	NotificationMouseLeaveDetectionService,
	NotificationService,
	PageInfoService,
	PermissionsRegistrationService,
	PermissionService,
	PerspectiveService,
	PreviewService,
	ProductService,
	RestServiceFactory,
	SessionService,
	SharedDataService,
	SiteService,
	WaitDialogService
} from 'smarteditcontainer/services';

import {StorageModule} from "./storage/StorageModuleOuter";
import {ExperienceSelectorComponent, UserAccountComponent, YAnnouncementBoardComponent, YAnnouncementComponent} from 'smarteditcontainer/components';
import {AuthenticationModule} from '../modules/AuthenticationModuleOuter';

/**
 * @ngdoc overview
 * @name smarteditServicesModule
 *
 * @description
 * Module containing all the services shared within the smartedit container application
 */
@SeModule({
	declarations: [
		ExperienceSelectorComponent,
		UserAccountComponent,
		YAnnouncementBoardComponent,
		YAnnouncementComponent
	],
	imports: [
		'seConstantsModule',
		'ngResource',
		LegacySmarteditCommonsModule,
		'ngCookies',
		'functionsModule',
		'toolbarModule',
		'resourceLocationsModule',
		'yLoDashModule',
		'modalServiceModule',
		StorageModule.configure(),
		'previewDataDropdownPopulatorModule',
		'loadConfigModule',
		AuthenticationModule
	],
	providers: [
		SmarteditBootstrapGateway,
		CatalogService,
		CatalogVersionPermissionRestService,
		ConfigurationExtractorService,
		ConfigurationService,
		ContentCatalogRestService,
		BootstrapService,
		SharedDataService,
		PageInfoService,
		ProductCatalogRestService,
		TestModeService,
		PolyfillService,
		WaitDialogService,
		DelegateRestService,
		FeatureService,
		{
			provide: 'DEVICE_ORIENTATIONS',
			useValue: DEVICE_ORIENTATIONS
		},
		{
			provide: "DEVICE_SUPPORTS",
			useValue: DEVICE_SUPPORTS
		},
		IframeManagerService,
		RestServiceFactory,
		PerspectiveService,
		PreviewService,
		PriorityService,
		ProductService,
		SiteService,
		NotificationService,
		AnnouncementService,
		NotificationMouseLeaveDetectionService,
		DragAndDropCrossOrigin,
		InViewElementObserver,
		SessionService,
		PermissionsRegistrationService,
		ExperienceService,
		PermissionService,
		diNameUtils.makeValueProvider({DEFAULT_DEFAULT_RULE_NAME}),
		diNameUtils.makeValueProvider({
			CATALOG_VERSION_PERMISSIONS_RESOURCE_URI: CATALOG_VERSION_PERMISSIONS_RESOURCE_URI_CONSTANT
		}),
		diNameUtils.makeValueProvider({HEART_BEAT_TIMEOUT_THRESHOLD_MS: 10000}),
		diNameUtils.makeValueProvider({
			DRAG_AND_DROP_CROSS_ORIGIN_BEFORE_TIME: {
				START: 'START',
				END: 'END'
			}
		}),
	],
	initialize: (
		previewService: any) => {
		'ngInject';
	}
})
export class SmarteditServicesModule {}

