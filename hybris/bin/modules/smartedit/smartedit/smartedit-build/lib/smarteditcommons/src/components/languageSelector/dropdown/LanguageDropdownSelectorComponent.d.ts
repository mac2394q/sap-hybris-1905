/// <reference types="angular" />
/**
 * @ngdoc directive
 * @name SmarteditCommonsModule.component:LanguageDropdownSelectorComponent
 * @element language-dropdown-selector
 * @description
 * An icon language dropdown selector which allows the user to select a language.
 *
 * Use the {@link smarteditCommonsModule.service:LanguageService languageService}
 * to call backend API in order to get the list of supported languages
 */
import { CrossFrameEventService, IToolingLanguage, LanguageService } from "smarteditcommons/services";
import { LanguageSelectorController } from "../LanguageSelectorController";
import './languageDropdownSelector.scss';
export declare class LanguageDropdownSelectorComponent extends LanguageSelectorController {
    constructor(SWITCH_LANGUAGE_EVENT: string, languageService: LanguageService, crossFrameEventService: CrossFrameEventService, $q: angular.IQService);
    protected orderLanguagesWithSelectedLanguage(selectedLanguage: IToolingLanguage, languages: IToolingLanguage[]): IToolingLanguage[];
}
