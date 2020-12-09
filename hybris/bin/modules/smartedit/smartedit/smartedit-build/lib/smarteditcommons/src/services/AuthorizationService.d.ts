/// <reference types="angular" />
/// <reference types="angular-mocks" />
import { PermissionsRestService } from './rest/PermissionsRestService';
import { ISessionService } from './interfaces/ISessionService';
/**
 * @ngdoc service
 * @name smarteditCommonsModule.service.AuthorizationService
 *
 * @description
 * This service makes calls to the Global Permissions REST API to check if the current user was
 * granted certain permissions.
 */
export declare class AuthorizationService {
    private $log;
    private sessionService;
    private permissionsRestService;
    static ERR_INVALID_PERMISSION_NAMES: Error;
    constructor($log: angular.ILogService, sessionService: ISessionService, permissionsRestService: PermissionsRestService);
    /**
     * @ngdoc method
     * @name smarteditCommonsModule.service.AuthorizationService#hasGlobalPermissions
     * @methodOf smarteditCommonsModule.service.AuthorizationService
     *
     * @description
     * This method checks if the current user is granted the given global permissions.
     *
     * @param {String[]} permissionNames The list of global permissions to check.
     *
     * @return {Boolean} true if the user is granted all of the given permissions, false otherwise
     *
     * @throws Will throw an error if the permissionNames array is empty
     */
    hasGlobalPermissions(permissionNames: string[]): angular.IPromise<boolean>;
    private getPermissionResult;
    private mergePermissionResults;
    private getPermissions;
}
