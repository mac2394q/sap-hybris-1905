/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {SakExecutorService} from "smartedit/services/sakExecutor/SakExecutorService";
import {WindowUtils} from 'smarteditcommons';
import {DecoratorService} from 'smartedit/services';

/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
describe('sakExecutor service', function() {

	let sakExecutor: SakExecutorService;
	const decorators = ['decorator1', 'decorator2'];

	const projectedContent = "someProjectedContent";
	const smarteditComponentType = "smarteditComponentType";
	const smarteditComponentId = "smarteditComponentId";
	let decoratorService: jasmine.SpyObj<DecoratorService>;
	let windowUtils: jasmine.SpyObj<WindowUtils>;
	let $window: jasmine.SpyObj<Window>;
	let element: jasmine.SpyObj<HTMLElement>;

	let node: HTMLElement;

	beforeEach(() => {

		node = jasmine.createSpyObj<HTMLElement>('node', ['getAttribute']);
		$window = jasmine.createSpyObj<Window>('WindowUtils', ['smarteditJQuery']);
		$window.smarteditJQuery.and.returnValue([node]);

		windowUtils = jasmine.createSpyObj<WindowUtils>('WindowUtils', ['getWindow']);
		windowUtils.getWindow.and.returnValue($window);


		element = jasmine.createSpyObj<HTMLElement>('element', ['getAttribute']);

		element.getAttribute.and.callFake((attributeName: string) => {
			return ({
				"data-smartedit-component-type": smarteditComponentType,
				"data-smartedit-component-id": smarteditComponentId
			} as any)[attributeName];
		});

		decoratorService = jasmine.createSpyObj('decoratorService', ['getDecoratorsForComponent']);
		decoratorService.getDecoratorsForComponent.and.callFake((type: string, id: string) => {
			if (id === smarteditComponentId && type === smarteditComponentType) {
				return Promise.resolve(decorators);
			} else {
				throw new Error("unexpected arguments passed to decoratorService.getDecoratorsForComponent");
			}
		});

		sakExecutor = new SakExecutorService(
			decoratorService,
			windowUtils
		);
	});

	it('sakExecutor.wrapDecorators fetches eligible decorators for given component type and stack those decorators around the projectedContent and returns a node', (done) => {

		sakExecutor.wrapDecorators(projectedContent, element).then((returnValue) => {

			expect(returnValue).toBe(node);

			expect($window.smarteditJQuery).toHaveBeenCalledWith(
				`<decorator-2 class='decorator2 se-decorator-wrap'
									active='false'
									data-smartedit-component-id='smarteditComponentId'
									data-smartedit-component-type='smarteditComponentType'
									component-attributes='componentAttributes'>
									<decorator-1 class='decorator1 se-decorator-wrap'
									active='false'
									data-smartedit-component-id='smarteditComponentId'
									data-smartedit-component-type='smarteditComponentType'
									component-attributes='componentAttributes'>
									someProjectedContent
								</decorator-1>
								</decorator-2>`.replace(/[\t]+/g, ""));
		});

		done();
	});

});
