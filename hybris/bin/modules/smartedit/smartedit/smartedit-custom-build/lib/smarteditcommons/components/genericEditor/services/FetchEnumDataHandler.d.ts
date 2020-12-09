/// <reference types="angular" />
import { IFetchDataHandler } from "./IFetchDataHandler";
import { IRestServiceFactory } from "smarteditcommons/services/rest/IRestServiceFactory";
import { GenericEditorField } from "../types";
export declare class FetchEnumDataHandler implements IFetchDataHandler {
    private $q;
    private restServiceFactory;
    private isBlank;
    private ENUM_RESOURCE_URI;
    static resetForTests(): void;
    private static cache;
    private restServiceForEnum;
    constructor($q: angular.IQService, restServiceFactory: IRestServiceFactory, isBlank: (value: any) => boolean, ENUM_RESOURCE_URI: string);
    findByMask(field: GenericEditorField, search?: string): angular.IPromise<string[]>;
    getById(field: GenericEditorField, identifier: string): angular.IPromise<string>;
}
