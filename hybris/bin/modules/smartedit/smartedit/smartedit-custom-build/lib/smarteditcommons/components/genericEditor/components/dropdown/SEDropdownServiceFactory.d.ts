/// <reference types="angular" />
/// <reference types="angular-cookies" />
/// <reference types="angular-mocks" />
/// <reference types="angular-resource" />
/// <reference types="angular-route" />
/// <reference types="angular-sanitize" />
/// <reference types="angular-translate" />
import { SystemEventService } from "smarteditcommons/services/SystemEventService";
import { SEDropdownAPI, SEDropdownConfiguration } from "./types";
import { IDropdownPopulator } from '../../populators/types';
import { GenericEditorField, GenericEditorOption } from '../../types';
/**
 * @internal
 * @ngdoc service
 * @name seDropdownModule.service:SEDropdownService
 *
 * @description
 * The SEDropdownService handles the initialization and the rendering of the {@link seDropdownModule.directive:seDropdown seDropdown} Angular component.
 */
export declare const SEDropdownServiceFactory: ($q: import("angular").IQService, $injector: import("angular").auto.IInjectorService, $log: import("angular").ILogService, isBlank: (value: any) => boolean, isFunctionEmpty: any, LINKED_DROPDOWN: string, CLICK_DROPDOWN: string, DROPDOWN_IMPLEMENTATION_SUFFIX: string, systemEventService: SystemEventService, getKeyHoldingDataFromResponse: any, VALIDATION_MESSAGE_TYPES: any) => {
    new (conf: SEDropdownConfiguration): {
        getApi: ($api: {
            $api: SEDropdownAPI;
        }) => void;
        setYSelectAPI: any;
        $api: SEDropdownAPI;
        resultsHeaderTemplateUrl: string;
        resultsHeaderTemplate: string;
        isMultiDropdown: boolean;
        initialized: boolean;
        qualifier: string;
        reset: () => void;
        field: GenericEditorField;
        model: any;
        id: string;
        onClickOtherDropdown: (key?: string, qualifier?: string) => void;
        items: GenericEditorOption[];
        ySelectAPI: any;
        selection: any;
        eventId: string;
        clickEventKey: string;
        populator: IDropdownPopulator;
        isPaged: boolean;
        fetchStrategy: any;
        _respondToChange(key: any, handle: any): void;
        _respondToOtherClicks(key: any, qualifier: string): void;
        /**
         * @ngdoc method
         * @name seDropdownModule.service:SEDropdownService#triggerAction
         * @methodOf seDropdownModule.service:SEDropdownService
         *
         * @description
         * Publishes an asynchronous event for the currently selected option
         */
        triggerAction(): void;
        onClick(): void;
        /**
         * @ngdoc method
         * @name seDropdownModule.service:SEDropdownService#fetchAll
         * @methodOf seDropdownModule.service:SEDropdownService
         *
         * @description
         * Uses the configured implementation of {@link dropdownPopulatorModule.DropdownPopulatorInterface DropdownPopulatorInterface}
         * to populate the seDropdown items using {@link dropdownPopulatorModule.DropdownPopulatorInterface:populate populate}
         *
         * @returns {Promise} A promise that resolves to a list of options to be populated
         */
        fetchAll(search: string): import("angular").IPromise<GenericEditorOption[]>;
        /**
         * @ngdoc method
         * @name seDropdownModule.service:SEDropdownService#fetchEntity
         * @methodOf seDropdownModule.service:SEDropdownService
         *
         * @description
         * Uses the configured implementation of {@link dropdownPopulatorModule.DropdownPopulatorInterface DropdownPopulatorInterface}
         * to populate a single item {@link dropdownPopulatorModule.DropdownPopulatorInterface:getItem getItem}
         *
         * @param {String} id The id of the option to fetch
         *
         * @returns {Promise} A promise that resolves to the option that was fetched
         */
        fetchEntity(id: string): import("angular").IPromise<GenericEditorOption>;
        /**
         * @ngdoc method
         * @name seDropdownModule.service:SEDropdownService#fetchPage
         * @methodOf seDropdownModule.service:SEDropdownService
         *
         * @param {String} search The search to filter options by
         * @param {Number} pageSize The number of items to be returned
         * @param {Number} currentPage The page to be returned
         *
         * @description
         * Uses the configured implementation of {@link dropdownPopulatorModule.DropdownPopulatorInterface DropdownPopulatorInterface}
         * to populate the seDropdown items using {@link dropdownPopulatorModule.DropdownPopulatorInterface:fetchPage fetchPage}
         *
         * @returns {Promise} A promise that resolves to an object containing the array of items and paging information
         */
        fetchPage(search: string, pageSize: number, currentPage: number): import("angular").IPromise<void | import("../../populators/types").DropdownPopulatorFetchPageResponse>;
        /**
         * @ngdoc method
         * @name seDropdownModule.service:SEDropdownService#init
         * @methodOf seDropdownModule.service:SEDropdownService
         *
         * @description
         * Initializes the seDropdown with a configured dropdown populator based on field attributes used when instantiating
         * the {@link  seDropdownModule.service:SEDropdownService}.
         */
        init(): void;
        getState(field: GenericEditorField): any;
        isPopulatorPaged(populatorName: string): boolean;
        initializeAPI(): void;
    };
};
