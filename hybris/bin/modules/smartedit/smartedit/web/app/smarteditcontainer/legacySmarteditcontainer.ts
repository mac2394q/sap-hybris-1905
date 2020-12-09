/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {doImport as forcedImport} from './forcedImports';
forcedImport();
import {deprecate} from "smarteditcontainer/deprecate";
deprecate();

import * as angular from 'angular';
import {
	instrument,
	AuthorizationService,
	Cloneable,
	GatewayFactory,
	GenericEditorModule,
	IFeatureService,
	IPermissionService,
	IRestServiceFactory,
	IUrlService,
	IWaitDialogService,
	PermissionContext,
	SeModule,
	SeRouteService,
	TreeModule,
	TypedMap
} from 'smarteditcommons';
import {
	AnnouncementService,
	BootstrapService,
	CatalogAwareRouteResolverModule,
	DelegateRestService,
	ExperienceService,
	HeartBeatService,
	IframeManagerService,
	PermissionsRegistrationService,
	PerspectiveService,
	SharedDataService,
	SmarteditServicesModule,
	StorageService
} from 'smarteditcontainer/services';
import {ConfigurationService} from 'smarteditcontainer/services/ConfigurationService';
import {SmarteditDefaultController} from 'smarteditcontainer/components/SmarteditDefaultController';
import {ToolbarItemContextComponent} from 'smarteditcontainer/components/topToolbars/toolbarItemContext/ToolbarItemContextComponent';
import {AdministrationModule} from 'smarteditcontainer/modules';
import {CatalogDetailsModule} from "smarteditcontainer/services/widgets/catalogDetails/CatalogDetailsModule";
import {AlertServiceModule} from './services/alerts/AlertServiceModule';
import {SitesLinkComponent} from './components/sitesLink/SitesLinkComponent';


declare global {

	/* @internal */
	interface InternalSmartedit {
		smartEditBootstrapped: TypedMap<boolean>;
	}
}

const TOP_LEVEL_MODULE_NAME = 'smarteditcontainer';

@SeModule({
	declarations: [ToolbarItemContextComponent],
	imports: [
		SmarteditServicesModule,
		AdministrationModule,
		AlertServiceModule,
		'landingPageModule',
		'templateCacheDecoratorModule',
		'ngRoute',
		'ngResource',
		'ui.bootstrap',
		'coretemplates',
		'loadConfigModule',
		'alertsBoxModule',
		'httpAuthInterceptorModule',
		'experienceInterceptorModule',
		'toolbarModule',
		'modalServiceModule',
		CatalogDetailsModule,
		'experienceSelectorButtonModule',
		'inflectionPointSelectorModule',
		'paginationFilterModule',
		'resourceLocationsModule',
		'perspectiveSelectorModule',
		'hasOperationPermissionModule',
		'l10nModule',
		TreeModule,
		'ySelectModule',
		'yHelpModule',
		'renderServiceModule',
		'systemAlertsModule',
		'yCollapsibleContainerModule',
		'yNotificationPanelModule',
		CatalogAwareRouteResolverModule,
		'catalogVersionPermissionModule',
		'httpErrorInterceptorServiceModule',
		'unauthorizedErrorInterceptorModule',
		'resourceNotFoundErrorInterceptorModule',
		'nonvalidationErrorInterceptorModule',
		'permissionErrorInterceptorModule',
		'previewErrorInterceptorModule',
		'retryInterceptorModule',
		'seConstantsModule',
		'pageSensitiveDirectiveModule',
		'yjqueryModule',
		GenericEditorModule,
		'recompileDomModule'
	],
	providers: [
		HeartBeatService
	],
	config: (
		$provide: angular.auto.IProvideService,
		readObjectStructureFactory: () => (arg: Cloneable) => Cloneable,
		LANDING_PAGE_PATH: string,
		STORE_FRONT_CONTEXT: string,
		$routeProvider: angular.route.IRouteProvider,
		$logProvider: angular.ILogProvider,
		catalogAwareRouteResolverFunctions: any
	) => {
		'ngInject';

		instrument($provide, readObjectStructureFactory(), TOP_LEVEL_MODULE_NAME);

		/*
		* no .otherwise({redirectTo: '/'}); otherwise legacy router will kick in even for ng routes
		*/

		SeRouteService.init($routeProvider);
		SeRouteService.provideLegacyRoute({
			path: LANDING_PAGE_PATH,
			route: {
				template: '<landing-page></landing-page>'
			},
			priority: 1,
			shortcutComponent: SitesLinkComponent
		});

		SeRouteService.provideLegacyRoute({
			path: STORE_FRONT_CONTEXT,
			route: {
				templateUrl: 'mainview.html',
				controller: SmarteditDefaultController,
				resolve: {
					setExperience: catalogAwareRouteResolverFunctions.storefrontResolve
				}
			},
			priority: 30,
			titleI18nKey: 'se.route.storefront.title'
		});
		$logProvider.debugEnabled(false);
	},
	initialize: (
		$rootScope: angular.IRootScopeService,
		$log: angular.ILogService,
		$q: angular.IQService,
		DEFAULT_RULE_NAME: string,
		EVENTS: any,
		smarteditBootstrapGateway: any,
		toolbarServiceFactory: any,
		perspectiveService: PerspectiveService,
		gatewayFactory: GatewayFactory,
		loadConfigManagerService: any,
		bootstrapService: BootstrapService,
		heartBeatService: HeartBeatService,
		iframeManagerService: IframeManagerService,
		waitDialogService: IWaitDialogService,
		experienceService: ExperienceService,
		restServiceFactory: IRestServiceFactory,
		delegateRestService: DelegateRestService,
		sharedDataService: SharedDataService,
		urlService: IUrlService,
		featureService: IFeatureService,
		storageService: StorageService,
		renderService: any,
		closeOpenModalsOnBrowserBack: any,
		authorizationService: AuthorizationService,
		permissionService: IPermissionService,
		httpErrorInterceptorService: any,
		unauthorizedErrorInterceptor: any,
		resourceNotFoundErrorInterceptor: any,
		nonValidationErrorInterceptor: any,
		previewErrorInterceptor: any,
		permissionErrorInterceptor: any,
		retryInterceptor: any,
		yjQuery: any,
		SMARTEDIT_IFRAME_WRAPPER_ID: string,
		PERSPECTIVE_SELECTOR_WIDGET_KEY: string,
		permissionsRegistrationService: PermissionsRegistrationService,
		configurationService: ConfigurationService,
		announcementService: AnnouncementService
	) => {
		'ngInject';
		gatewayFactory.initListener();
		httpErrorInterceptorService.addInterceptor(retryInterceptor);
		httpErrorInterceptorService.addInterceptor(unauthorizedErrorInterceptor);
		httpErrorInterceptorService.addInterceptor(resourceNotFoundErrorInterceptor);
		httpErrorInterceptorService.addInterceptor(nonValidationErrorInterceptor);
		httpErrorInterceptorService.addInterceptor(previewErrorInterceptor);
		httpErrorInterceptorService.addInterceptor(permissionErrorInterceptor);

		loadConfigManagerService.loadAsObject().then((configurations: any) => {
			sharedDataService.set('defaultToolingLanguage', configurations.defaultToolingLanguage);
		});

		permissionService.registerDefaultRule({
			names: [DEFAULT_RULE_NAME],
			verify: (permissionNameObjs: PermissionContext[]) => {
				const permissionNames = permissionNameObjs.map((permissionName: PermissionContext) => {
					return permissionName.name;
				});
				return authorizationService.hasGlobalPermissions(permissionNames);
			}
		});

		featureService.addToolbarItem({
			toolbarId: 'smartEditPerspectiveToolbar',
			key: PERSPECTIVE_SELECTOR_WIDGET_KEY,
			nameI18nKey: 'se.perspective.selector.widget',
			type: 'TEMPLATE',
			priority: 1,
			section: 'left',
			include: 'perspectiveSelectorWrapperTemplate.html'
		});

		const smartEditHeaderToolbarService = toolbarServiceFactory.getToolbarService("smartEditHeaderToolbar");

		smartEditHeaderToolbarService.addItems([{
			key: 'headerToolbar.logoTemplate',
			type: 'TEMPLATE',
			include: 'headerToolbarLogoTemplate.html',
			priority: 1,
			section: 'left'
		}, {
			key: 'headerToolbar.userAccountTemplate',
			type: 'HYBRID_ACTION',
			iconClassName: 'sap-icon--customer',
			include: 'headerToolbarUserAccountTemplate.html',
			priority: 1,
			actionButtonFormat: 'compact',
			section: 'right',
			dropdownPosition: 'right'
		}, {
			key: 'headerToolbar.languageSelectorTemplate',
			type: 'HYBRID_ACTION',
			iconClassName: 'sap-icon--world',
			include: 'headerToolbarLanguageSelectorTemplate.html',
			priority: 2,
			actionButtonFormat: 'compact',
			section: 'right',
			dropdownPosition: 'center'
		}, {
			key: 'headerToolbar.configurationTemplate',
			type: 'ACTION',
			actionButtonFormat: 'compact',
			iconClassName: 'icon-action-settings',
			callback: () => {
				configurationService.editConfiguration();
			},
			priority: 3,
			section: 'right',
			permissions: ['smartedit.configurationcenter.read']
		}]);


		const smartEditExperienceToolbarService = toolbarServiceFactory.getToolbarService("smartEditExperienceToolbar");

		smartEditExperienceToolbarService.addItems([{
			key: 'se.cms.shortcut',
			type: 'TEMPLATE',
			include: 'ShortcutLinkWrapperTemplate.html',
			priority: 1,
			section: 'left'
		}, {
			key: 'experienceToolbar.deviceSupportTemplate',
			type: 'TEMPLATE',
			include: 'deviceSupportTemplate.html',
			priority: 1,
			section: 'right'
		}, {
			type: 'TEMPLATE',
			key: 'experienceToolbar.experienceSelectorTemplate',
			className: 'se-experience-selector',
			include: 'experienceSelectorWrapperTemplate.html',
			priority: 1, // first in the middle
			section: 'middle'
		}]);

		function offSetStorefront() {
			// Set the storefront offset
			yjQuery(SMARTEDIT_IFRAME_WRAPPER_ID).css('padding-top', (yjQuery('.se-toolbar-group') as JQuery).height() + 'px');
		}

		smarteditBootstrapGateway.subscribe("loading", (eventId: string, data: any) => {
			const deferred = $q.defer();

			iframeManagerService.setCurrentLocation(data.location);
			waitDialogService.showWaitModal();

			const smartEditBootstrapped = getBootstrapNamespace();
			delete smartEditBootstrapped[data.location];

			return deferred.promise;
		});

		smarteditBootstrapGateway.subscribe("unloading", (eventId: string, data: any) => {
			const deferred = $q.defer();

			waitDialogService.showWaitModal();

			return deferred.promise;
		});

		smarteditBootstrapGateway.subscribe("bootstrapSmartEdit", (eventId: string, data: any) => {
			offSetStorefront();
			const deferred = $q.defer();
			const smartEditBootstrapped = getBootstrapNamespace();

			if (!smartEditBootstrapped[data.location]) {
				smartEditBootstrapped[data.location] = true;
				loadConfigManagerService.loadAsObject().then((configurations: any) => {
					bootstrapService.bootstrapSEApp(configurations);
					deferred.resolve();
				});
			} else {
				deferred.resolve();
			}
			return deferred.promise;
		});

		smarteditBootstrapGateway.subscribe("smartEditReady", function() {
			const deferred = $q.defer();
			deferred.resolve();

			waitDialogService.hideWaitModal();
			return deferred.promise;
		});

		$rootScope.$on('$routeChangeSuccess', function() {
			closeOpenModalsOnBrowserBack();
		});

		gatewayFactory.createGateway('accessTokens').subscribe("get", function() {
			return $q.when(storageService.getAuthTokens());
		});

		// storefront actually loads twice all the JS files, including webApplicationInjector.js, smartEdit must be protected against receiving twice a smartEditBootstrap event
		function getBootstrapNamespace(): any {
			/* forbiddenNameSpaces window._:false */
			if (window.__smartedit__.smartEditBootstrapped) {
				window.__smartedit__.smartEditBootstrapped = {};
			}
			return window.__smartedit__.smartEditBootstrapped;
		}

		permissionsRegistrationService.registerRulesAndPermissions();

	}
})
/** @internal */
export class Smarteditcontainer {}
