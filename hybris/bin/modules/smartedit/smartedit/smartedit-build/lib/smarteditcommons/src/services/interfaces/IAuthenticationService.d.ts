import * as angular from 'angular';
/**
 * @ngdoc service
 * @name authenticationModule.service:authenticationService
 *
 * @description
 * The authenticationService is used to authenticate and logout from SmartEdit.
 * It also allows the management of entry points used to authenticate the different resources in the application.
 *
 */
export declare abstract class IAuthenticationService {
    protected reauthInProgress: IReAuthInProgress;
    protected initialized: boolean;
    /**
     * @ngdoc method
     * @name authenticationModule.service:authenticationService#authenticate
     * @methodOf authenticationModule.service:authenticationService
     *
     * @description
     * Authenticates the current SmartEdit user against the entry point assigned to the requested resource. If no
     * suitable entry point is found, the resource will be authenticated against the
     * {@link resourceLocationsModule.object:DEFAULT_AUTHENTICATION_ENTRY_POINT DEFAULT_AUTHENTICATION_ENTRY_POINT}
     *
     * @param {String} resource The URI identifying the resource to access.
     * @returns {Promise} A promise that resolves if the authentication is successful.
     */
    authenticate(resource: string): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name authenticationModule.service:authenticationService#logout
     * @methodOf authenticationModule.service:authenticationService
     *
     * @description
     * The logout method removes all stored authentication tokens and redirects to the
     * landing page.
     *
     */
    logout(): angular.IPromise<any[]>;
    isReAuthInProgress(entryPoint: string): angular.IPromise<boolean>;
    /**
     * @ngdoc method
     * @name authenticationModule.service:authenticationService#setReAuthInProgress
     * @methodOf authenticationModule.service:authenticationService
     *
     * @description
     * Used to indicate that the user is currently within a re-authentication flow for the given entry point.
     * This flow is entered by default through authentication token expiry.
     *
     * @param {String} entryPoint The entry point which the user must be re-authenticated against.
     *
     */
    setReAuthInProgress(entryPoint: string): angular.IPromise<void>;
    /**
     * @ngdoc method
     * @name authenticationModule.service:authenticationService#filterEntryPoints
     * @methodOf authenticationModule.service:authenticationService
     *
     * @description
     * Will retrieve all relevant authentication entry points for a given resource.
     * A relevant entry point is an entry value of the authenticationMap found in {@link smarteditServicesModule.sharedDataService sharedDataService}.The key used in that map is a regular expression matching the resource.
     * When no entry point is found, the method returns the {@link resourceLocationsModule.object:DEFAULT_AUTHENTICATION_ENTRY_POINT DEFAULT_AUTHENTICATION_ENTRY_POINT}
     * @param {string} resource The URL for which a relevant authentication entry point must be found.
     */
    filterEntryPoints(resource: string): angular.IPromise<string[]>;
    /**
     * @ngdoc method
     * @name authenticationModule.service:authenticationService##isAuthEntryPoint
     * @methodOf authenticationModule.service:authenticationService
     *
     * @description
     * Indicates if the resource URI provided is one of the registered authentication entry points.
     *
     * @param {String} resource The URI to compare
     * @returns {Boolean} Flag that will be true if the resource URI provided is an authentication entry point.
     */
    isAuthEntryPoint(resource: string): angular.IPromise<boolean>;
    /**
     * @ngdoc method
     * @name authenticationModule.service:authenticationService##isAuthenticated
     * @methodOf authenticationModule.service:authenticationService
     *
     * @description
     * Indicates if the resource URI provided maps to a registered authentication entry point and the associated entry point has an authentication token.
     *
     * @param {String} resource The URI to compare
     * @returns {Boolean} Flag that will be true if the resource URI provided maps to an authentication entry point which has an authentication token.
     */
    isAuthenticated(url: string): angular.IPromise<boolean>;
}
export interface IReAuthInProgress {
    [endPoint: string]: boolean;
}
