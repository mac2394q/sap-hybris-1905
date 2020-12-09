import { LanguageService } from "smarteditcommons/services";
export declare class SeRichTextFieldLocalizationService {
    private languageService;
    private resolvedLocaleToCKEDITORLocaleMap;
    constructor(languageService: LanguageService, resolvedLocaleToCKEDITORLocaleMap: any);
    localizeCKEditor(): void;
    private convertResolvedToCKEditorLocale;
}
