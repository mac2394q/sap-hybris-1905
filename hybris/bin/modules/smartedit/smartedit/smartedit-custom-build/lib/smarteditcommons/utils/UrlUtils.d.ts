/**
 * @ngdoc service
 * @name functionsModule.service:UrlUtils
 *
 * @description
 * A collection of utility methods for manipulating URLs
 */
export declare class UrlUtils {
    /**
     * @ngdoc method
     * @name functionsModule.service:UrlUtils#getOrigin
     * @methodOf functionsModule.service:UrlUtils
     * @description
     * returns document location origin
     * Some browsers still do not support W3C document.location.origin, this function caters for gap.
     * @param {String =} url optional any url
     */
    getOrigin(url?: string): string;
    /**
     * @ngdoc method
     * @name functionsModule.service:UrlUtils#updateUrlParameter
     * @methodOf functionsModule.service:UrlUtils
     *
     * @description
     * Updates a URL to contain the query param and value provided. If already exists then it is updated,
     * if it did not previously exist, then it will be added.
     *
     * @param {String} url The url to be updated (this param will not be modified)
     * @param {String} key The query param key
     * @param {String} value The query param value
     *
     * @returns {String} The url with updated key/value
     */
    updateUrlParameter(url: string, key: string, value: string): string;
    /**
     * @ngdoc method
     * @name functionsModule.service:UrlUtils#getQueryString
     * @methodOf functionsModule.service:UrlUtils
     *
     * @description
     * <b>getQueryString</b> will convert a given object into a query string.
     *
     * Below is the code snippet for sample input and sample output:
     *
     * <pre>
     * var params = {
     *  key1 : 'value1',
     *  key2 : 'value2',
     *  key3 : 'value3'
     *  }
     *
     *  var output = getQueryString(params);
     *
     *  // The output is '?&key1=value1&key2=value2&key3=value3'
     *
     * </pre>
     * @param {Object} params Object containing a list of params.
     *
     * @returns {String} a query string
     */
    getQueryString(params: any): string;
    /**
     * @ngdoc method
     * @name functionsModule.service:UrlUtils#parseQuery
     * @methodOf functionsModule.service:UrlUtils
     *
     * @description
     * <b>parseQuery</b> will convert a given query string to an object.
     *
     * Below is the code snippet for sample input and sample output:
     *
     * <pre>
     * var query = '?key1=value1&key2=value2&key3=value3';
     *
     * var output = parseQuery(query);
     *
     * // The output is { key1 : 'value1', key2 : 'value2', key3 : 'value3' }
     *
     * </pre>
     * @param {String} query String that needs to be parsed.
     *
     * @returns {Object} an object containing all params of the given query
     */
    parseQuery(str: any): JSON;
}
export declare const urlUtils: UrlUtils;
