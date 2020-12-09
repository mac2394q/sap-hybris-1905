import { InjectionToken } from '@angular/core';
import { TypedMap } from 'smarteditcommons/dtos';
export declare const ITranslationsFetchServiceTOKEN: InjectionToken<string>;
export declare type TranslationMap = TypedMap<string>;
export interface ITranslationsFetchService {
    get(lang: string): Promise<TranslationMap>;
}
