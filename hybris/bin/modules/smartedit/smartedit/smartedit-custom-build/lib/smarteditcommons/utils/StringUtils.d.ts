/**
 * @ngdoc service
 * @name functionsModule.service:StringUtils
 *
 * @description
 * utility service around Strings.
 */
export declare class StringUtils {
    /**
     * @ngdoc service
     * @name functionsModule.service:StringUtils#isBlank
     * @methodOf functionsModule.service:StringUtils
     *
     * @description
     * <b>isBlank</b> will check if a given string is undefined or null or empty.
     * - returns TRUE for undefined / null/ empty string
     * - returns FALSE otherwise
     *
     * @param {String} inputString any input string.
     *
     * @returns {boolean} true if the string is null else false
     */
    isBlank(value: any): boolean;
    /**
     * @ngdoc method
     * @name functionsModule.service:StringUtils#regExpFactory
     * @methodOf functionsModule.service:StringUtils
     *
     * @description
     * <b>regExpFactory</b> will convert a given pattern into a regular expression.
     * This method will prepend and append a string with ^ and $ respectively replaces
     * and wildcards (*) by proper regex wildcards.
     *
     * @param {String} pattern any string that needs to be converted to a regular expression.
     *
     * @returns {RegExp} a regular expression generated from the given string.
     *
     */
    regExpFactory(pattern: string): RegExp;
    formatHTML(rawHTML: string): string;
    /**
     * @ngdoc service
     * @name functionsModule.service:StringUtils#sanitize
     * @methodOf functionsModule.service:StringUtils
     *
     * @description
     * <b>escapes any harmful scripting from a string, leaves innocuous HTML untouched/b>
     * @param {String} a string that needs to be sanitized.
     *
     * @returns {String} the sanitized string.
     *
     */
    sanitize: (str: string) => string;
    /**
     * @ngdoc service
     * @name functionsModule.service:StringUtils#encode
     * @methodOf functionsModule.service:StringUtils
     *
     * @description
     * will return a encoded value for any JSON object passed as argument
     * @param {object} JSON object to be encoded
     */
    encode: (object: any) => any;
}
export declare const stringUtils: StringUtils;
