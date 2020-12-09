/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {DelegateRestService} from 'smartedit/services';

import {annotationService, GatewayProxied} from 'smarteditcommons';

describe('test DelegateRestService ', () => {

	let delegateRestService: DelegateRestService;

	beforeEach(() => {

		delegateRestService = new DelegateRestService();
	});

	it('checks GatewayProxied', () => {
		expect(annotationService.getClassAnnotation(DelegateRestService, GatewayProxied)).toEqual([]);
	});

	it('delegateForVoid is left unimplemented', function() {
		expect(delegateRestService.delegateForVoid).toBeEmptyFunction();
	});

	it('delegateForSingleInstance is left unimplemented', function() {
		expect(delegateRestService.delegateForSingleInstance).toBeEmptyFunction();
	});

	it('delegateForArray is left unimplemented', function() {
		expect(delegateRestService.delegateForArray).toBeEmptyFunction();
	});

	it('delegateForPage is left unimplemented', function() {
		expect(delegateRestService.delegateForPage).toBeEmptyFunction();
	});

});
