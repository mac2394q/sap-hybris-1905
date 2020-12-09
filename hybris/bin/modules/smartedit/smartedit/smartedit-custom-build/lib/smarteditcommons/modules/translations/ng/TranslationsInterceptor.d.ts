import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationMap } from 'smarteditcommons/modules/translations/ng/ITranslationsFetchService';
export declare const I18NMAP_TOKEN = "I18NMAP_TOKEN";
export declare class TranslationsInterceptor implements HttpInterceptor {
    private injector;
    constructor(injector: Injector);
    intercept(request: HttpRequest<TranslationMap>, next: HttpHandler): Observable<HttpEvent<TranslationMap>>;
}
