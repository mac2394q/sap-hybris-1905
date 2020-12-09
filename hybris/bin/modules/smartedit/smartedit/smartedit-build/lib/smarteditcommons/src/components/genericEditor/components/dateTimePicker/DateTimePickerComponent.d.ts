/// <reference types="angular" />
/// <reference types="angular-mocks" />
import { TypedMap } from 'smarteditcommons/dtos';
import { DateTimePickerLocalizationService, GenericEditorField } from "../..";
/**
 * @ngdoc directive
 * @name dateTimePickerModule.directive:dateTimePicker
 * @description
 * The dateTimePicker directive
 * @param {=String} name The name of the datepicker.
 * @param {=Object} model The model object for the datepicker.
 * @param {<Boolean} isEditable This property specifies whether the datepicker can be edited or not.
 * @param {=Object} field The field description of the field being edited.
 */
export declare class DateTimePickerComponent {
    private $timeout;
    private dateTimePickerLocalizationService;
    private DATE_CONSTANTS;
    private formatDateAsUtc;
    private $element;
    name: string;
    model: TypedMap<any>;
    isEditable: boolean;
    field: GenericEditorField;
    placeholderText: string;
    constructor($timeout: angular.ITimeoutService, dateTimePickerLocalizationService: DateTimePickerLocalizationService, DATE_CONSTANTS: any, formatDateAsUtc: any, $element: any);
    $onInit(): void;
    private readonly node;
    private readonly datetimepicker;
}
