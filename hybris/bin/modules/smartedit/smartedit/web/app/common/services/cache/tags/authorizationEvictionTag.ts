/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {EvictionTag} from '../EvictionTag';

// TODO : merge the EVENT strings and the tag ones
export const authorizationEvictionTag = new EvictionTag({event: "AUTHORIZATION_SUCCESS"});