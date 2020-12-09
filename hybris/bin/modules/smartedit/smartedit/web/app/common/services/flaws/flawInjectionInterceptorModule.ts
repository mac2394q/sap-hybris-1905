/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {diNameUtils, SeModule} from 'smarteditcommons/di';
import {FlawInjectionInterceptor} from './FlawInjectionInterceptor';

/** @internal */
@SeModule({
	imports: [
		'interceptorHelperModule'
	],
	providers: [FlawInjectionInterceptor],
	config: ($httpProvider: angular.IHttpProvider) => {
		'ngInject';
		$httpProvider.interceptors.push(diNameUtils.buildServiceName(FlawInjectionInterceptor));
	},
	initialize: (flawInjectionInterceptor: FlawInjectionInterceptor) => {
		'ngInject';
		// mutates sites id
		flawInjectionInterceptor.registerRequestFlaw({
			test: (config: angular.IRequestConfig) => /sites\/[\w-]+\//.test(config.url),
			mutate: (config: angular.IRequestConfig) => {
				config.url = config.url.replace(/sites\/([\w-]+)\//, "sites/" + Math.random() + "/");
				return config;
			}
		});

	}
})
export class FlawInjectionInterceptorModule {}

