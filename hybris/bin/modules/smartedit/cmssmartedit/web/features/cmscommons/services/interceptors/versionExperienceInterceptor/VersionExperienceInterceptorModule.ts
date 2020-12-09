/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {diNameUtils, SeModule} from 'smarteditcommons';
import {VersionExperienceInterceptor} from './VersionExperienceInterceptor';

@SeModule({
	imports: [
		'interceptorHelperModule'
	],
	providers: [VersionExperienceInterceptor],
	config: ($httpProvider: angular.IHttpProvider) => {
		'ngInject';
		$httpProvider.interceptors.push(diNameUtils.buildServiceName(VersionExperienceInterceptor));
	}
})
export class VersionExperienceInterceptorModule {}
