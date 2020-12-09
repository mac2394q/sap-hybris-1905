/// <reference types="angular-route" />
import { ExtraOptions, Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
/**
 * @description
 * The interface represents a shortcut component
 */
export interface SeShortcutComponent {
    shortcutLink: SeRouteShortcutConfig;
}
/**
 * @description
 * The shortcut configuration.
 * - titleI18nKey an optional title of the page shortcut link
 * - priority an optional number ranging from 0 to 1000 used for sorting where 0 is the first.
 * - shortcutComponent an optional component that will be rendered. This attribute is used only if titleI18nKey is not provided.
 * 	 Must implement SeShortcutComponent interface.
 */
interface ShortcutConfig {
    titleI18nKey?: string;
    priority?: number;
    shortcutComponent?: new (...args: any[]) => SeShortcutComponent;
}
/**
 * @description
 * Shortcut route configuration.
 */
export interface SeRouteShortcutConfig extends ShortcutConfig {
    fullPath: string;
}
/**
 * @description
 * SmartEdit route configuration
 */
export interface SeRoute extends Route, ShortcutConfig {
    children?: SeRoutes;
}
/**
 * @description
 * The legacy (angularJs) route configuration.
 */
export interface SeLegacyRoute extends ShortcutConfig {
    path: string;
    route: ng.route.IRoute;
}
/**
 * @description
 * Type represents an array of route configuration.
 */
export declare type SeRoutes = SeRoute[];
/**
 * @ngdoc service
 * @name SeRouteModule.service:SeRouteService
 * @description
 * The SeRouteService is a hybrid service that allows to add legacy (for AngularJS) as well as Angular routes to the application.
 * It also collects information about each route to build route related shortcut links.
 */
export declare class SeRouteService {
    static CATALOG_AWARE_PATH_PLACEHOLDERS: string[];
    static init($routeProvider: ng.route.IRouteProvider): void;
    /**
     * @ngdoc method
     * @name SeRouteModule.service:SeRouteService#provideNgRoute
     * @methodOf SeRouteModule.service:SeRouteService
     * @description
     * Adds new Angular route to the application. For more inforamtion please see documentation for RouterModule.forRoot.
     *
     * @param {SeRoutes} routes the list of routes.
     * @param {ExtraOptions} config represents options to configure the router.
     *
     * @returns {ModuleWithProviders<RouterModule>} a wrapper around an NgModule that associates it with the providers.
     */
    static provideNgRoute(routes: SeRoutes, config?: ExtraOptions): ModuleWithProviders<RouterModule>;
    /**
     * @ngdoc method
     * @name SeRouteModule.service:SeRouteService#provideLegacyRoute
     * @methodOf SeRouteModule.service:SeRouteService
     * @description
     * Adds new AngularJS route to the application.
     *
     * @param {SeLegacyRoute} legacyRoute legacy route config
     *
     * @returns {ng.route.IRouteProvider} the route provider
     */
    static provideLegacyRoute(legacyRoute: SeLegacyRoute): ng.route.IRouteProvider;
    /**
     * @ngdoc method
     * @name SeRouteModule.service:SeRouteService#routeShortcutConfigs
     * @methodOf SeRouteModule.service:SeRouteService
     * @description
     * Returns a list of all shortcut configs.
     */
    static readonly routeShortcutConfigs: SeRouteShortcutConfig[];
    private static $routeProvider;
    private static routeShortcuts;
    /**
     * Populates the route shortcut list. It filters route shortcuts that cannot be used
     * as shortcuts.
     */
    private static provideRouteShortcutConfigs;
    /**
     * Recursively reads the list of routes and calculates the full path for each route.
     * Then populates the shortcut configs array with calculated data.
     */
    private static generateRouteShortcutConfig;
    /**
     * Returns the full path concatenating parent route with current one.
     */
    private static getFullPath;
    /**
     * Validates all Angular routes. Each route should start with NG_ROUTE_PREFIX.
     */
    private static validateNgRoutes;
    /**
     * Validates whether the route shortcut config can be registered.
     * It's not registered if:
     * - the fullPath is not provided
     * - the fullPath contains placeholders that are not in CATALOG_AWARE_PATH_PLACEHOLDERS list.
     */
    private static canRegisterRouteShortcutConfig;
}
export {};
