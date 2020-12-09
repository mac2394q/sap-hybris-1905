/// <reference types="angular" />
import * as lo from "lodash";
import { IRestServiceFactory, LanguageService } from "smarteditcommons/services";
import { DropdownPopulatorInterface } from "./DropdownPopulatorInterface";
import { DropdownPopulatorFetchPageResponse, DropdownPopulatorItemPayload, DropdownPopulatorPagePayload, DropdownPopulatorPayload, GenericEditorOption } from "../..";
/**
 * @ngdoc service
 * @name dropdownPopulatorModule.service:uriDropdownPopulator
 * @description
 * implementation of {@link dropdownPopulatorModule.DropdownPopulatorInterface DropdownPopulatorInterface} for "EditableDropdown" cmsStructureType
 * containing uri attribute.
 */
export declare class UriDropdownPopulator extends DropdownPopulatorInterface {
    lodash: lo.LoDashStatic;
    private $q;
    private restServiceFactory;
    private getDataFromResponse;
    private getKeyHoldingDataFromResponse;
    languageService: LanguageService;
    constructor(lodash: lo.LoDashStatic, $q: angular.IQService, restServiceFactory: IRestServiceFactory, getDataFromResponse: any, getKeyHoldingDataFromResponse: any, languageService: LanguageService);
    _buildQueryParams(dependsOn: string, model: any): {};
    /**
     * @ngdoc method
     * @name dropdownPopulatorModule.service:uriDropdownPopulator#fetchAll
     * @methodOf dropdownPopulatorModule.service:uriDropdownPopulator
     *
     * @description
     * Implementation of the {@link dropdownPopulatorModule.DropdownPopulatorInterface#fetchAll DropdownPopulatorInterface.fetchAll} method
     */
    fetchAll(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
    /**
     * @ngdoc method
     * @name dropdownPopulatorModule.service:uriDropdownPopulator#fetchPage
     * @methodOf dropdownPopulatorModule.service:uriDropdownPopulator
     *
     * @description
     * Implementation of the {@link dropdownPopulatorModule.DropdownPopulatorInterface#fetchPage DropdownPopulatorInterface.fetchPage} method
     */
    fetchPage(payload: DropdownPopulatorPagePayload): angular.IPromise<DropdownPopulatorFetchPageResponse>;
    /**
     * @ngdoc method
     * @name dropdownPopulatorModule.service:uriDropdownPopulator#getItem
     * @methodOf dropdownPopulatorModule.service:uriDropdownPopulator
     *
     * @description
     * Implementation of the {@link dropdownPopulatorModule.DropdownPopulatorInterface#getItem DropdownPopulatorInterface.getItem} method
     *
     * @param {Object} payload The payload object containing the uri and other options
     * @param {String} payload.id The id of the item to fetch
     * @param {String} payload.field.uri The uri used to make a rest call to fetch data
     * @param {String} [payload.field.dependsOn=null] A comma separated list of attributes to include from the model when building the request params
     * @param {String} [payload.field.idAttribute=id] The name of the attribute to use when setting the id attribute
     * @param {String} [payload.field.labelAttributes=label] A list of attributes to use when setting the label attribute
     * @param {String} [payload.model=null] The model used when building query params on attributes defined in payload.field.dependsOn
     *
     * @returns {Promise} A promise that resolves to the option that was fetched
     */
    getItem(payload: DropdownPopulatorItemPayload): angular.IPromise<GenericEditorOption>;
}
