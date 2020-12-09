/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {UrlUtils} from 'smarteditcommons';

describe('UrlUtils Test', () => {

	const urlUtils: UrlUtils = new UrlUtils();

	it('getQueryString will convert given object into query type', () => {

		const sampleObj = {
			key1: 'value1',
			key2: 'value2',
			key3: 'value3',
			key4: 'value4'
		};

		const queryString = urlUtils.getQueryString(sampleObj);

		expect(queryString).toBe('?&key1=value1&key2=value2&key3=value3&key4=value4');

	});

	it('parseQuery will convert give query into an object of params', () => {

		const query = '?abc=abc&def=def&ijk=789';

		const resultObj = urlUtils.parseQuery(query);

		expect(resultObj).toEqualData({
			abc: 'abc',
			def: 'def',
			ijk: '789'
		});

	});

}); 