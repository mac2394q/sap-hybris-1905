/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './vendors';
import 'jasmine';
import {
	CachedAnnotationFactory,
	CacheConfigAnnotationFactory,
	CacheService,
	GatewayProxiedAnnotationFactory,
	GatewayProxy,
	InvalidateCacheAnnotationFactory,
	LogService,
	OperationContextAnnotationFactory,
	OperationContextService,
} from "smarteditcommons";

interface CoreAnnotationsHelperMocks {
	cacheService: jasmine.SpyObj<CacheService>;
	gatewayProxy: jasmine.SpyObj<GatewayProxy>;
	operationContextService: jasmine.SpyObj<OperationContextService>;
}

class CoreAnnotationsHelper {

	initCached(): jasmine.SpyObj<CacheService> {

		///////////////////////////////////////////////////////

		const logService = jasmine.createSpyObj<LogService>('logService', ['debug']);

		CacheConfigAnnotationFactory(logService);

		///////////////////////////////////////////////////////

		const cacheService: jasmine.SpyObj<CacheService> = jasmine.createSpyObj<CacheService>('cacheService', ['handle', 'evict']);
		cacheService.handle.and.callFake((target: any, methdName: string, method: (...args: any[]) => any, invocationArguments: IArguments) => {
			return method.apply(undefined, invocationArguments);
		});
		CachedAnnotationFactory(cacheService);

		InvalidateCacheAnnotationFactory(cacheService);

		return cacheService;

	}


	initGatewayProxied(): jasmine.SpyObj<any> {

		const gatewayProxy: GatewayProxy = jasmine.createSpyObj<any>('gatewayProxy', ['initForService']);

		GatewayProxiedAnnotationFactory(gatewayProxy);
		return gatewayProxy;
	}

	initOperationContextService(): jasmine.SpyObj<OperationContextService> {
		const $injector = jasmine.createSpyObj<any>('$injector', ['has', 'get']);
		const operationContextService: jasmine.SpyObj<OperationContextService> = jasmine.createSpyObj<OperationContextService>('operationContextService', ['register']);
		const OPERATION_CONTEXT = jasmine.createSpy();

		OperationContextAnnotationFactory($injector, operationContextService, OPERATION_CONTEXT);
		return operationContextService;
	}

	init(): CoreAnnotationsHelperMocks {

		return {
			cacheService: this.initCached(),
			gatewayProxy: this.initGatewayProxied(),
			operationContextService: this.initOperationContextService()
		};

	}
}

export const coreAnnotationsHelper = new CoreAnnotationsHelper();
