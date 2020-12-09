/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {TranslationFile} from './TranslationFile';
import {Payload, TypedMap} from 'smarteditcommons/dtos';

/** @internal */
export class TranslationOptions {
	prefix?: string;
	key: string;
	suffix?: string;
	files?: TranslationFile[];
	fileMap?: TypedMap<string>;
	$http?: Payload;
}
