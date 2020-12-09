import { ModuleWithProviders } from '@angular/core';
import { IStorageService } from 'smarteditcommons/services';
import { ITranslationsFetchService } from './ITranslationsFetchService';
export declare class SeTranslationModule {
    static forChild(): ModuleWithProviders<any>;
    static forRoot(TranslationsFetchServiceClass: new (...args: any[]) => ITranslationsFetchService, StorageServiceClass: new (...args: any[]) => IStorageService): ModuleWithProviders;
}
