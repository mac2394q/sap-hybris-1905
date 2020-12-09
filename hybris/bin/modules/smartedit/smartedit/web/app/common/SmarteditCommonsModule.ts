/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {InjectionToken, NgModule} from '@angular/core';
import {
	CachedAnnotationFactory,
	CacheConfigAnnotationFactory,
	CacheEngine,
	CacheService,
	CrossFrameEventService,
	CrossFrameEventServiceGateway,
	FingerPrintingService,
	GatewayFactory,
	GatewayProxiedAnnotationFactory,
	GatewayProxy,
	InvalidateCacheAnnotationFactory,
	LogService,
	SystemEventService
} from 'smarteditcommons/services';
import {
	moduleUtils,
	CryptographicUtils,
	FunctionsUtils,
	NodeUtils,
	PromiseUtils,
	ScriptUtils,
	StringUtils,
	UrlUtils,
	WindowUtils
} from 'smarteditcommons/utils';
import {CloneableUtils} from 'smarteditcommons/dtos';
import {BrowserService} from 'smarteditcommons/services/browser/BrowserService';
/**
 * @ngdoc overview
 * @name smarteditCommonsModule
 *
 * @description
 * Module containing all the services shared within the smartedit commons.
 */
const gatewayProxiedAnnotationFactoryToken = new InjectionToken<string>('gatewayProxiedAnnotationFactoryToKen');
const cachedAnnotationFactoryToken = new InjectionToken<string>('cachedAnnotationFactoryToken');
const cacheConfigAnnotationFactoryToken = new InjectionToken<string>('cacheConfigAnnotationFactoryToken');
const invalidateCacheAnnotationFactoryToken = new InjectionToken<string>('invalidateCacheAnnotationFactoryToken');

@NgModule({
	imports: [
	],
	providers: [
		LogService,
		BrowserService,
		FingerPrintingService,
		CacheEngine,
		CacheService,
		CloneableUtils,
		CrossFrameEventService,
		{
			provide: CrossFrameEventServiceGateway.crossFrameEventServiceGatewayToken,
			useClass: CrossFrameEventServiceGateway,
		},
		CryptographicUtils,
		FunctionsUtils,
		NodeUtils,
		PromiseUtils,
		ScriptUtils,
		StringUtils,
		UrlUtils,
		WindowUtils,
		SystemEventService,
		GatewayFactory,
		GatewayProxy,
		{
			provide: gatewayProxiedAnnotationFactoryToken,
			useFactory: GatewayProxiedAnnotationFactory,
			deps: [GatewayProxy]
		},
		{
			provide: cachedAnnotationFactoryToken,
			useFactory: CachedAnnotationFactory,
			deps: [CacheService]
		},
		{
			provide: cacheConfigAnnotationFactoryToken,
			useFactory: CacheConfigAnnotationFactory,
			deps: [LogService]
		},
		{
			provide: invalidateCacheAnnotationFactoryToken,
			useFactory: InvalidateCacheAnnotationFactory,
			deps: [CacheService]
		},
		moduleUtils.initialize((
			gatewayProxiedAnnotationFactory: any,
			cachedAnnotationFactory: any,
			cacheConfigAnnotationFactory: any,
			invalidateCacheAnnotationFactory: any
		) => {
			//
		}, [
				gatewayProxiedAnnotationFactoryToken,
				cachedAnnotationFactoryToken,
				cacheConfigAnnotationFactoryToken,
				invalidateCacheAnnotationFactoryToken
			])
	]
})
export class SmarteditCommonsModule {}
