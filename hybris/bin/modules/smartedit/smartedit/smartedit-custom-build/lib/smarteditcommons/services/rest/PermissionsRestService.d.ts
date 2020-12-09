/// <reference types="angular" />
import { IPermissionsRestServiceQueryData, IPermissionsRestServiceResult } from "smarteditcommons/dtos";
import { IRestServiceFactory } from "./IRestServiceFactory";
export declare class PermissionsRestService {
    private readonly URI;
    private readonly resource;
    constructor(restServiceFactory: IRestServiceFactory);
    get(queryData: IPermissionsRestServiceQueryData): angular.IPromise<IPermissionsRestServiceResult>;
}
