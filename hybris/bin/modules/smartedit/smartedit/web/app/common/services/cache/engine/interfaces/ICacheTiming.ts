/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {ICacheItem} from "./ICacheItem";

export interface ICacheTiming {
	setAge(item: ICacheItem<any>): void;
}
