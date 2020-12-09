/// <reference types="angular" />
/**
 * @ngdoc directive
 * @name dateTimePickerModule.directive:dateFormatter
 * @description
 *
 * # The dateTimePicker
 * The date formatter is for displaying the date in the desired format.
 * You can pass the desired format in the attributes of this directive and it will be shown.
 * It is  used with the <input> tag as we cant use date filter with it.
 * for eg- <input type='text'  data-date-formatter  format-type="short">
 * format-type can be short, medium etc.
 * If the format-type is not given in the directive template, by default it uses the short type
 */
export declare class DateFormatterDirective {
    private dateFilter;
    private DATE_CONSTANTS;
    private $element;
    formatType: string;
    private defaultFormatType;
    private ngModel;
    constructor(dateFilter: any, DATE_CONSTANTS: any, $element: angular.IAugmentedJQuery);
    $onInit(): void;
}
