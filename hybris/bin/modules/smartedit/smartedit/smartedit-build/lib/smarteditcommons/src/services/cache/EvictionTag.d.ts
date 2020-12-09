/**
 * @ngdoc object
 * @name smarteditServicesModule.object:EvictionTag
 * @description
 * A {@link smarteditServicesModule.object:@Cached @Cached} annotation is tagged with 0 to n EvictionTag, each EvictionTag possibly referencing other evictionTags.
 * <br/>An EvictionTag enables a method cache to be evicted 2 different ways:
 * <ul>
 * <li> An event with the same name as the tag is raised.</li>
 * <li> {@link smarteditServicesModule.service:CacheService#methods_evict evict} method of {@link smarteditServicesModule.service:CacheService cacheService} is invoked with the tag.</li>
 * </ul>
 */
export declare class EvictionTag {
    /**
     * @ngdoc property
     * @name name
     * @propertyOf smarteditServicesModule.object:EvictionTag
     * @description
     * event upon which the cache should be cleared.
     */
    event: string;
    /**
     * @ngdoc property
     * @name relatedTags
     * @propertyOf smarteditServicesModule.object:EvictionTag
     * @description
     * other EvictionTag instances grouped under this evictionTag.
     */
    relatedTags?: EvictionTag[];
    constructor(args: {
        event: string;
        relatedTags?: EvictionTag[];
    });
}
