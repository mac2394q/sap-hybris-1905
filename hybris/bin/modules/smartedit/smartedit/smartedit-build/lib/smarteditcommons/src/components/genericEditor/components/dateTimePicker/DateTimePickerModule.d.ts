import { SeValueProvider } from "smarteditcommons/di";
/**
 * @ngdoc object
 * @name dateTimePickerModule.object:resolvedLocaleToMomentLocaleMap
 *
 * @description
 * Contains a map of all inconsistent locales ISOs between SmartEdit and MomentJS
 *
 */
export declare const RESOLVED_LOCALE_TO_MOMENT_LOCAL_MAP_CONSTANT: SeValueProvider;
/**
 * @ngdoc object
 * @name dateTimePickerModule.object: tooltipsMap
 *
 * @description
 * Contains a map of all tooltips to be localized in the date time picker
 *
 */
export declare const TOOLTIPS_MAP_CONSTANT: SeValueProvider;
/**
 * @ngdoc overview
 * @name dateTimePickerModule
 * @description
 * # The dateTimePickerModule
 *
 * The date time picker service module is a module used for displaying a date time picker
 *
 * Use the {@link dateTimePickerModule.directive:dateTimePicker dateTimePicker} to open the date time picker.
 *
 * Once the datetimepicker is opened, its {@link dateTimePickerModule.service:dateTimePickerLocalizationService dateTimePickerLocalizationService} is used to localize the tooling.
 */
export declare class DateTimePickerModule {
}
