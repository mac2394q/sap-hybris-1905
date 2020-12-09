/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import * as angular from 'angular';
import {ModuleUtils} from './ModuleUtils';
import {LogService, ScriptUtils} from 'smarteditcommons';

describe('ModuleUtils test', () => {

	let moduleUtils: ModuleUtils;
	let logService: jasmine.SpyObj<LogService>;
	let scriptUtils: jasmine.SpyObj<ScriptUtils>;

	beforeEach(() => {

		logService = jasmine.createSpyObj<LogService>("logService", ['debug', 'error']);
		scriptUtils = jasmine.createSpyObj<ScriptUtils>("scriptUtils", ['inject']);

		moduleUtils = new ModuleUtils(logService, scriptUtils);

		angular.module('mainModule', []);
	});

	it('addModuleToAngularJSApp will attach module as a main module dependency if it exists in angular', () => {
		// GIVEN
		angular.module('ExistentApp', []);
		moduleUtils.addModuleToAngularJSApp('mainModule', 'ExistentApp');

		expect(angular.module('mainModule').requires).toContain('ExistentApp');
	});

	it('addModuleToAngularJSApp will log an error if the module does not exist in angular', () => {
		// WHEN
		moduleUtils.addModuleToAngularJSApp('mainModule', 'NonExistentApp');
		expect(logService.error).toHaveBeenCalledWith("Failed to load module NonExistentApp into mainModule; SmartEdit functionality may be compromised.");
		expect(angular.module('mainModule').requires).not.toContain('NonExistentApp');
	});

	it('injectApplications should inject scripts and return a list of modules', () => {
		const ANY_MODULE_NAME = 'anyModuleName';
		const apps: {location: string, name: string}[] = [{
			name: 'AppA',
			location: 'path/to/app-a.js'
		}, {
			name: 'AppB',
			location: 'path/to/app-b.js'
		}];

		spyOn(moduleUtils, 'addModuleToAngularJSApp');
		spyOn(moduleUtils, 'getNgModule');

		moduleUtils.injectApplications(ANY_MODULE_NAME, apps);

		expect(scriptUtils.inject).toHaveBeenCalledWith({
			srcs: apps.map((app) => app.location),
			callback: jasmine.any(Function)
		});

		const injectCallback = scriptUtils.inject.calls.argsFor(0)[0].callback;
		injectCallback();

		expect(moduleUtils.addModuleToAngularJSApp).toHaveBeenCalledWith(ANY_MODULE_NAME, apps[0].name);
		expect(moduleUtils.addModuleToAngularJSApp).toHaveBeenCalledWith(ANY_MODULE_NAME, apps[1].name);

		expect(moduleUtils.getNgModule).toHaveBeenCalledWith(apps[0].name);
		expect(moduleUtils.getNgModule).toHaveBeenCalledWith(apps[1].name);
	});

});
