import { CacheAction } from './CacheAction';
import { EvictionTag } from './EvictionTag';
import { CacheService } from './CacheService';
import { LogService } from 'smarteditcommons/services/LogService';
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@CacheConfig
 * @description
 * Class level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} responsible for setting
 *  class level cache configuration to be merged into method specific {@link smarteditServicesModule.object:@Cached @Cached} and
 *  {@link smarteditServicesModule.object:@InvalidateCache @InvalidateCache} configurations.
 * @param {object} cacheConfig the configuration fo this cache
 * @param {cacheAction} cacheConfig.actions the list of {@link smarteditServicesModule.object:CacheAction CacheAction} characterizing this cache.
 * @param {EvictionTag[]} cacheConfig.tags a list of {@link smarteditServicesModule.object:EvictionTag EvictionTag} to control the eviction behaviour of this cache.
 */
export declare const CacheConfig: (args: {
    actions?: CacheAction[];
    tags?: EvictionTag[];
}) => ClassDecorator;
export declare function CacheConfigAnnotationFactory(logService: LogService): import("../annotationService").ClassAnnotationFactory;
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@Cached
 * @description
 * Method level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} responsible for performing
 * invocation arguments sensitive method caching.
 * <br/> This annotation must only be used on methods returning promises.
 * @param {object} cacheConfig the configuration fo this cache
 * <br/> This configuration will be merged with a class level {@link smarteditServicesModule.object:@CacheConfig @acheConfig} if any.
 * @throws if no {@link smarteditServicesModule.object:CacheAction CacheAction} is found in the resulting merge
 * @param {cacheAction} cacheConfig.actions the list of {@link smarteditServicesModule.object:CacheAction CacheAction} characterizing this cache.
 * @param {EvictionTag[]} cacheConfig.tags a list of {@link smarteditServicesModule.object:EvictionTag EvictionTag} to control the eviction behaviour of this cache.
 */
export declare const Cached: (args?: {
    actions: CacheAction[];
    tags?: EvictionTag[];
}) => MethodDecorator;
export declare function CachedAnnotationFactory(cacheService: CacheService): import("../annotationService").MethodAnnotationFactory;
/**
 * @ngdoc object
 * @name smarteditServicesModule.object:@InvalidateCache
 * @description
 * Method level typescript {@link http://www.typescriptlang.org/docs/handbook/decorators.html decorator factory} responsible for
 * invalidating all caches either directly or indirectly declaring the {@link smarteditServicesModule.object:EvictionTag eviction tag} passed as argument.
 * if no eviction tag is passed as argument, defaults to the optional eviction tags passed to the class through {@link smarteditServicesModule.object:@CacheConfig @CacheConfig}.
 *
 * @param {EvictionTag} evictionTag the {@link smarteditServicesModule.object:EvictionTag eviction tag}.
 */
export declare const InvalidateCache: (tag?: EvictionTag) => (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(...x: any[]) => any>) => void;
export declare function InvalidateCacheAnnotationFactory(cacheService: CacheService): import("../annotationService").MethodAnnotationFactory;
