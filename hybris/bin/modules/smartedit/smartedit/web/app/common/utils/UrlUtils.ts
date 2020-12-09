/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * @ngdoc service
 * @name functionsModule.service:UrlUtils
 *
 * @description
 * A collection of utility methods for manipulating URLs
 */
export class UrlUtils {

	/**
	 * @ngdoc method
	 * @name functionsModule.service:UrlUtils#getOrigin
	 * @methodOf functionsModule.service:UrlUtils
	 * @description
	 * returns document location origin
	 * Some browsers still do not support W3C document.location.origin, this function caters for gap.
	 * @param {String =} url optional any url
	 */
	getOrigin(url?: string): string {
		if (url) {
			let link = document.createElement('a');
			link.setAttribute('href', url);
			const origin = link.protocol + "//" + link.hostname + (link.port ? ':' + link.port : '');
			link = null; // GC
			return origin;
		} else {
			return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
	}

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
	updateUrlParameter(url: string, key: string, value: string): string {
		const i = url.indexOf('#');
		const hash = i === -1 ? '' : url.substr(i);
		url = i === -1 ? url : url.substr(0, i);
		const regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		const separator = url.indexOf('?') !== -1 ? "&" : "?";

		if (url.match(regex)) {
			url = url.replace(regex, '$1' + key + "=" + value + '$2');
		} else {
			url = url + separator + key + "=" + value;
		}
		return url + hash;
	}

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
	getQueryString(params: any): string {

		let queryString = "";
		if (params) {
			for (const param in params) {
				if (params.hasOwnProperty(param)) {
					queryString += '&' + encodeURIComponent(param) + "=" + encodeURIComponent(params[param]);
				}
			}
		}
		return "?" + queryString;
	}

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
	parseQuery(str: any): JSON {

		const objURL = {} as any;

		str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0: any, $1: any, $2: any, $3: any) {
			objURL[$1] = $3;

		});
		return objURL;
	}
}

export const urlUtils = new UrlUtils();