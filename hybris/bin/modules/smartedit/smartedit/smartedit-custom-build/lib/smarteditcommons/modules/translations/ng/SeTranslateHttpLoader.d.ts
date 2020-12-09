import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { ITranslationsFetchService } from './ITranslationsFetchService';
import { TypedMap } from 'smarteditcommons/dtos';
export declare class SeTranslateHttpLoader implements TranslateLoader {
    private translationsFetchService;
    constructor(translationsFetchService: ITranslationsFetchService);
    /**
     * Gets the translations from the server
     */
    getTranslation(lang: string): Observable<TypedMap<string>>;
}
