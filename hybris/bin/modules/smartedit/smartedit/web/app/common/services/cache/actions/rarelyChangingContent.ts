/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {CacheAction} from '../CacheAction';


/** @internal */
export const RarelyChangingContentName: string = 'RarelyChangingContent';


export const rarelyChangingContent = new CacheAction(RarelyChangingContentName);