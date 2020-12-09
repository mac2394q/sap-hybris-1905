/// <reference types="angular" />
import * as lo from 'lodash';
import { LanguageService } from 'smarteditcommons/services';
import { DropdownPopulatorInterface } from "./DropdownPopulatorInterface";
import { DropdownPopulatorPayload, GenericEditorOption } from "..";
/**
 * @ngdoc service
 * @name dropdownPopulatorModule.service:optionsDropdownPopulator
 * @description
 * implementation of {@link dropdownPopulatorModule.DropdownPopulatorInterface DropdownPopulatorInterface} for "EditableDropdown" cmsStructureType
 * containing options attribute.
 */
export declare class OptionsDropdownPopulator extends DropdownPopulatorInterface {
    private $q;
    languageService: LanguageService;
    constructor(lodash: lo.LoDashStatic, $q: angular.IQService, languageService: LanguageService);
    /**
     * @ngdoc method
     * @name dropdownPopulatorModule.service:optionsDropdownPopulator#populate
     * @methodOf dropdownPopulatorModule.service:optionsDropdownPopulator
     *
     * @description
     * Implementation of the {@link dropdownPopulatorModule.DropdownPopulatorInterface#populate DropdownPopulatorInterface.populate} method
     */
    populate(payload: DropdownPopulatorPayload): angular.IPromise<GenericEditorOption[]>;
}
