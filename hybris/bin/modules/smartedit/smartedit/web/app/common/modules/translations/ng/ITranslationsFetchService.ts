/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {InjectionToken} from '@angular/core';
import {TypedMap} from 'smarteditcommons/dtos';

/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
export const ITranslationsFetchServiceTOKEN = new InjectionToken<string>('translationsFetchService');

export type TranslationMap = TypedMap<string>;

export interface ITranslationsFetchService {

	get(lang: string): Promise<TranslationMap>;
}