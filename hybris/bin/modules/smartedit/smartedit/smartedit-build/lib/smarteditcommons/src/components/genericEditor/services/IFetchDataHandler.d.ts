/// <reference types="angular" />
import { GenericEditorField } from "..";
/**
 * @ngdoc service
 * @name genericEditorServicesModule.FetchDataHandlerInterface
 *
 * @description
 * Interface describing the contract of a fetchDataHandler fetched through dependency injection by the
 * {@link genericEditorModule.service:GenericEditor GenericEditor} to populate dropdowns
 */
export interface IFetchDataHandler {
    /**
     * @ngdoc method
     * @name genericEditorServicesModule.FetchDataHandlerInterface#getById
     * @methodOf genericEditorServicesModule.FetchDataHandlerInterface
     *
     * @description
     * will returns a promise resolving to an entity, of type defined by field, matching the given identifier
     *
     * @param {GenericEditorField} field the field descriptor in {@link genericEditorModule.service:GenericEditor GenericEditor}
     * @param {String} identifier the value identifying the entity to fetch
     * @returns {String} an entity
     */
    getById(field: GenericEditorField, identifier: string): angular.IPromise<string>;
    /**
     * @ngdoc method
     * @name genericEditorServicesModule.FetchDataHandlerInterface#findBymask
     * @methodOf genericEditorServicesModule.FetchDataHandlerInterface
     *
     * @description
     * will returns a promise resolving to list of entities, of type defined by field, eligible for a given search mask
     *
     * @param {GenericEditorField} field the field descriptor in {@link genericEditorModule.service:GenericEditor GenericEditor}
     * @param {String} mask the value against witch to fetch entities.
     * @returns {String[]} a list of eligible entities
     */
    findByMask(field: GenericEditorField, mask: string): angular.IPromise<string[]>;
}
