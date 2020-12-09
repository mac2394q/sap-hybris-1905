import { TranslationFile } from './TranslationFile';
import { Payload, TypedMap } from 'smarteditcommons/dtos';
/** @internal */
export declare class TranslationOptions {
    prefix?: string;
    key: string;
    suffix?: string;
    files?: TranslationFile[];
    fileMap?: TypedMap<string>;
    $http?: Payload;
}
