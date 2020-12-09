/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {bootstrapService} from './BootstrapService';

/* forbiddenNameSpaces angular.module:false */
angular.element(document).ready(() => {

	// add sanitization of textarea's and input's
	Array.prototype.slice.apply(document.querySelectorAll("input:not([type='password'])"))
		.concat(Array.prototype.slice.apply(document.querySelectorAll("textarea")))
		.forEach((node: any) => {
			node.setAttribute('data-sanitize-html-input', '');
		});

	bootstrapService.bootstrap();
});
