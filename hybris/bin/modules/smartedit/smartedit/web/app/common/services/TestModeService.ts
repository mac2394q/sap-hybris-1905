/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {SeInjectable} from 'smarteditcommons/di';

/**
 * @ngdoc service
 * @name smarteditServicesModule.service:TestModeService
 *
 * @description
 * Used to determine whether smartedit is running in a e2e (test) mode
 */
/** @internal */
@SeInjectable()
export class TestModeService {

	// Constants
	private readonly TEST_KEY: string = 'e2eMode';

	constructor(private $injector: angular.auto.IInjectorService) {
	}

	/** 
	 * @ngdoc method
	 * @name smarteditServicesModule.service:TestModeService#isE2EMode
	 * @methodOf smarteditServicesModule.service:TestModeService
	 *
	 * @description
	 * returns true if smartedit is running in e2e (test) mode
	 *
	 * @returns {Boolean} true/false
	 */
	public isE2EMode(): boolean {
		return this.$injector.has(this.TEST_KEY) && this.$injector.get(this.TEST_KEY);
	}

}
