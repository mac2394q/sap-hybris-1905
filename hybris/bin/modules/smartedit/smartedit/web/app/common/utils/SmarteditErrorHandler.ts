/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ErrorHandler} from '@angular/core';

export class SmarteditErrorHandler extends ErrorHandler {

	private ignorePatterns = [
		/Uncaught[\s]*\(in[\s]*promise\)/
	];

	constructor() {
		super();
	}

	handleError(error: {message: string}) {
        /*
         * original exception occuring in a promise based API won't show here
         * the catch set in ES6 promise decoration is necessary to log them
         */
		const message = (error && error.message) ? error.message : error;
		if (message && this.ignorePatterns.some((pattern) => pattern.test(message.toString()))) {
			return;
		}

		super.handleError(error);
	}
}