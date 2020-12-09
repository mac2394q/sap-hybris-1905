/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
	diNameUtils,
	InViewElementObserver,
	LegacySmarteditCommonsModule,
	PolyfillService,
	PriorityService,
	SeModule,
	TestModeService
} from 'smarteditcommons';

import {
	AlertService,
	AnnouncementService,
	AuthenticationService,
	CatalogService,
	ComponentHandlerService,
	ContextualMenuService,
	DelegateRestService,
	DragAndDropCrossOrigin,
	ExperienceService,
	FeatureService,
	NotificationMouseLeaveDetectionService,
	NotificationService,
	PageInfoService,
	PermissionService,
	PerspectiveService,
	PreviewService,
	RestServiceFactory,
	SessionService,
	SeNamespaceService,
	SharedDataService,
	WaitDialogService
} from 'smartedit/services';

import {StorageModule} from "./storage/StorageModuleInner";
import {
	DEFAULT_CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS,
	DEFAULT_CONTRACT_CHANGE_LISTENER_PROCESS_QUEUE_THROTTLE,
	DEFAULT_PROCESS_QUEUE_POLYFILL_INTERVAL,
	DEFAULT_REPROCESS_TIMEOUT,
	SmartEditContractChangeListener
} from "./SmartEditContractChangeListener";

/**
 * @ngdoc overview
 * @name smarteditServicesModule
 *
 * @description
 * Module containing all the services shared within the smartedit application
 */
@SeModule({
	imports: [
		'coretemplates',
		'seConstantsModule',
		'ngResource',
		'functionsModule',
		'yLoDashModule',
		'timerModule',
		'resizeListenerModule',
		'positionRegistryModule',
		LegacySmarteditCommonsModule,
		StorageModule
	],
	providers: [
		AuthenticationService,
		SharedDataService,
		AlertService,
		CatalogService,
		ComponentHandlerService,
		PageInfoService,
		TestModeService,
		PolyfillService,
		WaitDialogService,
		DelegateRestService,
		RestServiceFactory,
		PreviewService,
		PriorityService,
		PerspectiveService,
		FeatureService,
		NotificationService,
		AnnouncementService,
		NotificationMouseLeaveDetectionService,
		ContextualMenuService,
		DragAndDropCrossOrigin,
		InViewElementObserver,
		ExperienceService,
		SeNamespaceService,
		PermissionService,
		SessionService,
		diNameUtils.makeValueProvider({DEFAULT_REPROCESS_TIMEOUT}),
		diNameUtils.makeValueProvider({DEFAULT_PROCESS_QUEUE_POLYFILL_INTERVAL}),
		diNameUtils.makeValueProvider({DEFAULT_CONTRACT_CHANGE_LISTENER_INTERSECTION_OBSERVER_OPTIONS}),
		diNameUtils.makeValueProvider({DEFAULT_CONTRACT_CHANGE_LISTENER_PROCESS_QUEUE_THROTTLE}),
		SmartEditContractChangeListener
	],
	initialize: (
		notificationMouseLeaveDetectionService: NotificationMouseLeaveDetectionService) => {
		'ngInject';
	}
})
export class SmarteditServicesModule {}
