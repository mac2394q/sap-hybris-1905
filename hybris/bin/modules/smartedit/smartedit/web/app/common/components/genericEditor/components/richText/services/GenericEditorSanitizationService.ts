/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeInjectable} from "smarteditcommons/di";

@SeInjectable()
export class GenericEditorSanitizationService {

	constructor(
		private $sanitize: angular.sanitize.ISanitizeService
	) {}

	isSanitized(content: any): boolean {
		let sanitizedContent = this.$sanitize(content);
		sanitizedContent = sanitizedContent.replace(/&#10;/g, '\n').replace(/&#160;/g, "\u00a0").replace(/<br>/g, '<br />');
		content = content.replace(/&#10;/g, '\n').replace(/&#160;/g, "\u00a0").replace(/<br>/g, '<br />');
		const sanitizedContentMatchesContent = sanitizedContent === content;
		return sanitizedContentMatchesContent;
	}

}
