import * as lo from 'lodash';
import { TruncatedText } from "smarteditcommons/dtos/TruncatedText";
/**
 * @internal
 *
 * @name TextTruncateService
 *
 * @description
 * Service containing truncate string functions.
 */
export declare class TextTruncateService {
    private lodash;
    constructor(lodash: lo.LoDashStatic);
    /**
     * @name TextTruncateService#truncateToNearestWord
     * @methodOf TextTruncateService
     *
     * @description
     * Truncates text to the nearest word depending on character length. Truncates below character length.
     *
     * @param {number} limit index in text to truncate to
     * @param {string} text text to be truncated
     * @return {TruncatedText}
     */
    truncateToNearestWord(limit: number, text: string, ellipsis?: string): TruncatedText;
    private getPositionOfCharacters;
}
