/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as CryptoJS from 'crypto-js';
import {SeInjectable} from 'smarteditcommons/di/SeInjectable';

/**
 * @ngdoc service
 * @name functionsModule.service:CryptographicUtils
 *
 * @description
 * utility service around Cryptographic operations.
 */
@SeInjectable()
export class CryptographicUtils {

    /**
     * @ngdoc method
     * @name functionsModule.service:CryptographicUtils#sha1Hash
     * @methodOf functionsModule.service:CryptographicUtils
     *
     * @description
     * A utility function that takes an input string and provides a cryptographic SHA1 hash value.
     * 
     * @param {String} data The input string to be encrypted.
     * @returns {String} the encrypted hashed result.
     */
	sha1Hash(data: string): string {
		return CryptoJS.SHA1(data).toString();
	}

	aesBase64Encrypt(base64EncodedMessage: string, secretPassphrase: string): string {
		return CryptoJS.AES.encrypt(CryptoJS.enc.Base64.parse(base64EncodedMessage), secretPassphrase).toString();
	}

	aesDecrypt(encryptedMessage: string, secretPassphrase: string): string {
		return CryptoJS.AES.decrypt(encryptedMessage, secretPassphrase).toString(CryptoJS.enc.Utf8);
	}
}