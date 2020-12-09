/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Injectable} from '@angular/core';
import {GatewayProxied, ITranslationsFetchService, TranslationMap} from 'smarteditcommons';

/* @internal */
@GatewayProxied()
@Injectable()
export class TranslationsFetchService implements ITranslationsFetchService {

	get(lang: string): Promise<TranslationMap> {
		'proxyFunction';
		return null;
	}
}