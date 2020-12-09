/// <reference types="angular-translate" />
import { LanguageService } from "smarteditcommons/services";
import { TypedMap } from 'smarteditcommons/dtos';
/**
 * @ngdoc service
 * @name dateTimePickerModule.service:dateTimePickerLocalizationService
 *
 * @description
 * The dateTimePickerLocalizationService is responsible for both localizing the date time picker as well as the tooltips
 */
export declare class DateTimePickerLocalizationService {
    private $translate;
    private resolvedLocaleToMomentLocaleMap;
    private tooltipsMap;
    private languageService;
    constructor($translate: angular.translate.ITranslateService, resolvedLocaleToMomentLocaleMap: any, tooltipsMap: TypedMap<string>, languageService: LanguageService);
    localizeDateTimePicker(datetimepicker: any): void;
    private convertResolvedToMomentLocale;
    private getLocalizedTooltips;
    private compareTooltips;
    private localizeDateTimePickerUI;
    private localizeDateTimePickerTooltips;
}
