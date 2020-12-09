/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {I18N_RESOURCE_URI} from 'smarteditcommons/utils';
import {TranslationMap} from 'smarteditcommons/modules/translations/ng/ITranslationsFetchService';

export const I18NMAP_TOKEN = "I18NMAP_TOKEN";

/*
 * This interceptor will return a mock map of translation
 * when such a map is found in window.__smartedit__.i18nMocks
 */
/* @internal */
@Injectable()
export class TranslationsInterceptor implements HttpInterceptor {

	constructor(private injector: Injector) {
	}

	intercept(request: HttpRequest<TranslationMap>, next: HttpHandler): Observable<HttpEvent<TranslationMap>> {

		if (request.url.includes(I18N_RESOURCE_URI) && Object.keys(this.injector.get(I18NMAP_TOKEN)).length) {
			const locale = request.url.substr(request.url.lastIndexOf('/') + 1);
			return new Observable<HttpResponse<TranslationMap>>((ob) => {
				ob.next(new HttpResponse({status: 200, body: {value: this.injector.get(I18NMAP_TOKEN)[locale]}}));
			}).pipe(take(1));
		}
		return next.handle(request);
	}
}

