/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SeRichTextLoaderService} from "smarteditcommons";
declare const inject: any;

describe('seRichTextLoaderService', () => {

	let seRichTextLoaderService: SeRichTextLoaderService;
	let $interval: any;
	let $q: angular.IQService;

	let originalCKEDITOR: any;

	beforeAll(() => {
		originalCKEDITOR = window.CKEDITOR;
	});

	afterAll(() => {
		window.CKEDITOR = originalCKEDITOR;
	});

	beforeEach(inject(function(_$q_: angular.IQService, _$interval_: any) {
		$q = _$q_;
		$interval = _$interval_;
	}));

	describe('load', () => {
		it('should return a resolved promise when CK Editor reports that it is loaded', () => {
			window.CKEDITOR = {
				status: 'loaded'
			};
			seRichTextLoaderService = new SeRichTextLoaderService(
				$q,
				$interval
			);

			const result = seRichTextLoaderService.load();
			$interval.flush(400);

			expect(result).toBeResolved();
		});

		it('should return an unresolved promise when CK Editor is not loaded yet', () => {
			window.CKEDITOR = {
				status: 'dummyStatus'
			};
			seRichTextLoaderService = new SeRichTextLoaderService(
				$q,
				$interval
			);

			const result = seRichTextLoaderService.load();
			$interval.flush(400);

			expect(result).not.toBeResolved();
		});
	});

});
