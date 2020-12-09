/**
 * Key value pairs where the key is the permission and the value is a boolean string
 * Used in IPermissionsRestServiceResult
 */
export interface IPermissionsRestServicePair {
    key: string;
    value: string;
}
/**
 * Result of getting permissions form the PermissionsRestService.get
 */
export interface IPermissionsRestServiceResult {
    id?: string;
    permissions: IPermissionsRestServicePair[];
}
/**
 * The input param type for PermissionsRestService.get
 */
export interface IPermissionsRestServiceQueryData {
    user: string;
    permissionNames: string;
}
