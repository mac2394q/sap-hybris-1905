/// <reference types="angular" />
import { CrossFrameEventService, IToolingLanguage, LanguageService } from "smarteditcommons/services";
import { ISeComponent } from "smarteditcommons/di";
export declare class LanguageSelectorController implements ISeComponent {
    private SWITCH_LANGUAGE_EVENT;
    private languageService;
    private crossFrameEventService;
    private $q;
    selectedLanguage: IToolingLanguage;
    languages: IToolingLanguage[];
    private unRegisterEventService;
    constructor(SWITCH_LANGUAGE_EVENT: string, languageService: LanguageService, crossFrameEventService: CrossFrameEventService, $q: angular.IQService);
    $onInit(): void;
    $onDestroy(): void;
    /**
     * Triggered when an user selects a language.
     * @param {IToolingLanguage} language
     */
    onSelectedLanguage(language: IToolingLanguage): void;
    /**
     * Returns an ordered language array by name and sets the selected language at the beginning.
     *
     * @param {IToolingLanguage} selectedLanguage
     * @param {IToolingLanguage[]} languages
     * @returns {IToolingLanguage[]}
     */
    protected orderLanguagesWithSelectedLanguage(selectedLanguage: IToolingLanguage, languages: IToolingLanguage[]): IToolingLanguage[];
    /**
     * Triggered onInit and when language service sets a new language.
     *
     * @param {IToolingLanguage[]} languages
     * @param {string} isoCode
     */
    private setSelectedLanguage;
    /**
     * Finds the language with a specified isoCode.
     *
     * @param {string} isoCode
     * @returns {IToolingLanguage}
     */
    private findLanguageWithIsoCode;
    /**
     * Callback for setting the selected language.
     */
    private handleLanguageChange;
}
