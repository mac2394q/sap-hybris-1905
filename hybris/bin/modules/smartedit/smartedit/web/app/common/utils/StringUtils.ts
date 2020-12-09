/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from 'smarteditcommons/di/SeInjectable';

/**
 * @ngdoc service
 * @name functionsModule.service:StringUtils
 *
 * @description
 * utility service around Strings.
 */
@SeInjectable()
export class StringUtils {

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
	isBlank(value: any): boolean {
		return (typeof value === 'undefined' || value === null || value === "null" || value.toString().trim().length === 0);
	}

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

	regExpFactory(pattern: string): RegExp {

		const onlyAlphanumericsRegex = new RegExp(/^[a-zA-Z\d]+$/i);
		const antRegex = new RegExp(/^[a-zA-Z\d\*]+$/i);

		let regexpKey;
		if (onlyAlphanumericsRegex.test(pattern)) {
			regexpKey = ['^', '$'].join(pattern);
		} else if (antRegex.test(pattern)) {
			regexpKey = ['^', '$'].join(pattern.replace(/\*/g, '.*'));
		} else {
			regexpKey = pattern;
		}

		return new RegExp(regexpKey, 'g');
	}

    /*
     * formats HTML outputs typically from Node.outerHTML to easy string comparison by:
     * - remove empty lines
     * - remove spaces between tags
     * - normalize remainign spaces to a single one
     * 
     */
	formatHTML(rawHTML: string): string {

		return rawHTML.replace(/^\s*\n/gm, "").replace(/\>[\t\s]+\</g, "><").replace(/[\r\n\t\s]+/g, " ");
	}

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
	sanitize = (str: string): string => {
        /* The correct solution for this is to use Negative Lookbehind Regex expression which is available as part of ES2018. // str.replace(/(?:(?<!\\)([()]))/g, '\\$1')
        But in order to support cross browser compatibility, the string is reversed and negative lookahead is used instead. */
		return !this.isBlank(str) ? str.split('').reverse().join('').replace(/(?:(([()])(?!\\)))/g, '$1\\').split('').reverse().join('') : str;
	}

	/**
	 * @ngdoc service
	 * @name functionsModule.service:StringUtils#encode
	 * @methodOf functionsModule.service:StringUtils
	 *
	 * @description
	 * will return a encoded value for any JSON object passed as argument
	 * @param {object} JSON object to be encoded
	 */
	encode = (object: any): any => {
		/* first we use encodeURIComponent to get percent-encoded UTF-8,
			* then we convert the percent encodings into raw bytes which
			* can be fed into btoa.
			* from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
			*/
		return btoa(encodeURIComponent(JSON.stringify(object)).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match: any, p1: string) {
				return String.fromCharCode(parseInt(p1, 16));
			}));
	}

}

export const stringUtils = new StringUtils();
