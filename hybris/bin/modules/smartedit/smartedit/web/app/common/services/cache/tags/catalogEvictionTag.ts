/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {EvictionTag} from '../EvictionTag';
import {userEvictionTag} from './userEvictionTag';


export const catalogSyncedEvictionTag = new EvictionTag({event: "CATALOG_SYNCHRONIZED_EVENT"});

export const catalogEvictionTag = new EvictionTag({event: "CATALOG_EVENT", relatedTags: [catalogSyncedEvictionTag, userEvictionTag]});
