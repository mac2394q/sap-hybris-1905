/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {LanguageService, SeRichTextFieldLocalizationService} from 'smarteditcommons';
import {promiseHelper} from 'testhelpers';

describe('seRichTextFieldLocalizationService', () => {
	const $q = promiseHelper.$q();

	let seRichTextFieldLocalizationService: SeRichTextFieldLocalizationService;
	let languageService: jasmine.SpyObj<LanguageService>;

	let resolvedLocaleToCKEDITORLocaleMap: any;

	let originalCKEDITOR: any;

	beforeAll(() => {
		originalCKEDITOR = window.CKEDITOR;
	});

	afterAll(() => {
		window.CKEDITOR = originalCKEDITOR;
	});

	beforeEach(() => {
		window.CKEDITOR = {
			config: {}
		};

		languageService = jasmine.createSpyObj<LanguageService>('languageService', ['getResolveLocale']);
		resolvedLocaleToCKEDITORLocaleMap = {
			en: 'xx'
		};

		seRichTextFieldLocalizationService = new SeRichTextFieldLocalizationService(
			languageService,
			resolvedLocaleToCKEDITORLocaleMap
		);
	});

	describe('localizeCKEditor', () => {
		it('should set global variable CKEDITOR\'s language to the current locale\'s equivalent in CKEDITOR when the conversion exists', function() {
			const existingLocale = 'en';
			expect(resolvedLocaleToCKEDITORLocaleMap[existingLocale]).not.toBeUndefined();

			languageService.getResolveLocale.and.returnValue($q.when(existingLocale));
			seRichTextFieldLocalizationService.localizeCKEditor();

			expect(languageService.getResolveLocale).toHaveBeenCalled();
			expect(CKEDITOR.config.language).toEqual('xx');
		});

		it('should set global variable CKEDITOR\'s language to the current locale when the conversion does not exist', function() {
			const nonexistingLocale = 'zz';
			expect(resolvedLocaleToCKEDITORLocaleMap[nonexistingLocale]).toBeUndefined();

			languageService.getResolveLocale.and.returnValue($q.when(nonexistingLocale));
			seRichTextFieldLocalizationService.localizeCKEditor();

			expect(languageService.getResolveLocale).toHaveBeenCalled();
			expect(CKEDITOR.config.language).toEqual(nonexistingLocale);
		});
	});
});
