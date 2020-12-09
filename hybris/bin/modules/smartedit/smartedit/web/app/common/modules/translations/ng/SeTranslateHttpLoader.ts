/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {Inject, Injectable} from '@angular/core';
import {TranslateLoader} from "@ngx-translate/core";
import {from, Observable} from 'rxjs';
import {ITranslationsFetchService, ITranslationsFetchServiceTOKEN} from './ITranslationsFetchService';
import {TypedMap} from 'smarteditcommons/dtos';

/* @internal */
@Injectable()
export class SeTranslateHttpLoader implements TranslateLoader {
	constructor(@Inject(ITranslationsFetchServiceTOKEN) private translationsFetchService: ITranslationsFetchService) {}

	/**
	 * Gets the translations from the server
	 */
	public getTranslation(lang: string): Observable<TypedMap<string>> {
		return from(this.translationsFetchService.get(lang));
	}
}