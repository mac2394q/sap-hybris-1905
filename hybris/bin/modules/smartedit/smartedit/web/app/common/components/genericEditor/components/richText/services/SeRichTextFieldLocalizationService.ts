/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {LanguageService} from "smarteditcommons/services";
import {SeInjectable} from "smarteditcommons/di";

@SeInjectable()
export class SeRichTextFieldLocalizationService {

	constructor(
		private languageService: LanguageService,
		private resolvedLocaleToCKEDITORLocaleMap: any
	) {}

	localizeCKEditor(): void {
		this.languageService.getResolveLocale().then((locale) => {
			CKEDITOR.config.language = this.convertResolvedToCKEditorLocale(locale);
		});
	}

	private convertResolvedToCKEditorLocale(resolvedLocale: string): string {
		const conversion = this.resolvedLocaleToCKEDITORLocaleMap[resolvedLocale];
		if (conversion) {
			return conversion;
		}
		return resolvedLocale;
	}

}
